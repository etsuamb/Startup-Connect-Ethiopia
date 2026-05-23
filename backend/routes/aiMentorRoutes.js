const router = require("express").Router();
const pool = require("../config/db");
const { authenticate, authorizeRoles } = require("../middleware/authMiddleware");
const { generateMentorResponse } = require("../services/aiMentorService");

async function ensureAiMentorSchema() {
	await pool.query(`
		CREATE TABLE IF NOT EXISTS ai_mentor_sessions (
			ai_mentor_session_id SERIAL PRIMARY KEY,
			startup_id INTEGER NOT NULL REFERENCES startups(startup_id) ON DELETE CASCADE,
			title VARCHAR(255) NOT NULL DEFAULT 'AI Mentor Chat',
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
			updated_at TIMESTAMPTZ
		)
	`);

	await pool.query(`
		CREATE TABLE IF NOT EXISTS ai_mentor_messages (
			ai_mentor_message_id SERIAL PRIMARY KEY,
			session_id INTEGER NOT NULL REFERENCES ai_mentor_sessions(ai_mentor_session_id) ON DELETE CASCADE,
			sender VARCHAR(20) NOT NULL CHECK (sender IN ('startup', 'ai')),
			message TEXT NOT NULL,
			created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
		)
	`);
}

async function getStartupForUser(userId) {
	const result = await pool.query(
		`SELECT
			 s.startup_id,
			 s.startup_name,
			 s.industry,
			 s.business_stage,
			 s.description,
			 s.funding_needed,
			 s.location,
			 p.project_title,
			 p.description AS project_description,
			 p.funding_goal,
			 p.industry AS project_industry,
			 p.lifecycle_stage,
			 p.problem_statement,
			 p.solution_statement,
			 p.expected_impact
		 FROM startups s
		 LEFT JOIN LATERAL (
			SELECT *
			FROM projects p
			WHERE p.startup_id = s.startup_id
			ORDER BY
				CASE WHEN p.status = 'active' THEN 0 ELSE 1 END,
				p.created_at DESC
			LIMIT 1
		 ) p ON true
		 WHERE s.user_id = $1`,
		[userId],
	);

	return result.rows[0] || null;
}

function buildStartupProfile(startup) {
	return `
Name: ${startup.startup_name || "Not provided"}
Industry: ${startup.project_industry || startup.industry || "Not provided"}
Stage: ${startup.lifecycle_stage || startup.business_stage || "Not provided"}
Location: ${startup.location || "Not provided"}
Funding Need: ${startup.funding_goal || startup.funding_needed || "Not provided"}
Description: ${startup.description || "Not provided"}
Current Project: ${startup.project_title || "Not provided"}
Project Description: ${startup.project_description || "Not provided"}
Problem: ${startup.problem_statement || "Not provided"}
Solution: ${startup.solution_statement || "Not provided"}
Expected Impact: ${startup.expected_impact || "Not provided"}
`;
}

router.post(
	"/chat",
	authenticate,
	authorizeRoles("Startup"),
	async (req, res) => {
		try {
			await ensureAiMentorSchema();

			const { sessionId, message } = req.body || {};
			const cleanMessage = String(message || "").trim();

			if (!cleanMessage) {
				return res.status(400).json({ error: "message is required" });
			}

			if (cleanMessage.length > 2000) {
				return res.status(400).json({ error: "Message is too long. Please shorten it." });
			}

			const startup = await getStartupForUser(req.user.user_id);
			if (!startup) {
				return res.status(404).json({ error: "Startup profile not found" });
			}

			let activeSessionId = sessionId ? Number(sessionId) : null;
			if (activeSessionId) {
				const sessionCheck = await pool.query(
					"SELECT ai_mentor_session_id FROM ai_mentor_sessions WHERE ai_mentor_session_id = $1 AND startup_id = $2",
					[activeSessionId, startup.startup_id],
				);
				if (sessionCheck.rowCount === 0) {
					return res.status(404).json({ error: "AI mentor session not found" });
				}
			}

			if (!activeSessionId) {
				const title = cleanMessage.slice(0, 60) || "AI Mentor Chat";
				const sessionResult = await pool.query(
					`INSERT INTO ai_mentor_sessions (startup_id, title)
					 VALUES ($1, $2)
					 RETURNING ai_mentor_session_id`,
					[startup.startup_id, title],
				);
				activeSessionId = sessionResult.rows[0].ai_mentor_session_id;
			}

			await pool.query(
				`INSERT INTO ai_mentor_messages (session_id, sender, message)
				 VALUES ($1, 'startup', $2)`,
				[activeSessionId, cleanMessage],
			);

			const historyResult = await pool.query(
				`SELECT sender, message
				 FROM ai_mentor_messages
				 WHERE session_id = $1
				 ORDER BY created_at ASC
				 LIMIT 20`,
				[activeSessionId],
			);

			const reply = await generateMentorResponse({
				startupProfile: buildStartupProfile(startup),
				chatHistory: historyResult.rows,
				userMessage: cleanMessage,
			});

			const aiMessageResult = await pool.query(
				`INSERT INTO ai_mentor_messages (session_id, sender, message)
				 VALUES ($1, 'ai', $2)
				 RETURNING ai_mentor_message_id, sender, message, created_at`,
				[activeSessionId, reply],
			);

			await pool.query(
				"UPDATE ai_mentor_sessions SET updated_at = CURRENT_TIMESTAMP WHERE ai_mentor_session_id = $1",
				[activeSessionId],
			);

			res.json({
				sessionId: activeSessionId,
				reply,
				message: aiMessageResult.rows[0],
			});
		} catch (error) {
			console.error("AI Mentor Error:", error);
			res.status(500).json({ error: error.message || "AI Mentor Assistant failed to respond" });
		}
	},
);

router.get(
	"/sessions",
	authenticate,
	authorizeRoles("Startup"),
	async (req, res) => {
		try {
			await ensureAiMentorSchema();
			const startup = await getStartupForUser(req.user.user_id);
			if (!startup) {
				return res.status(404).json({ error: "Startup profile not found" });
			}

			const result = await pool.query(
				`SELECT
					 s.ai_mentor_session_id AS id,
					 s.title,
					 s.created_at,
					 s.updated_at,
					 (
						SELECT message
						FROM ai_mentor_messages
						WHERE session_id = s.ai_mentor_session_id
						ORDER BY created_at ASC
						LIMIT 1
					 ) AS first_message
				 FROM ai_mentor_sessions s
				 WHERE s.startup_id = $1
				 ORDER BY COALESCE(s.updated_at, s.created_at) DESC`,
				[startup.startup_id],
			);

			res.json({ sessions: result.rows });
		} catch (error) {
			res.status(500).json({ error: error.message || "Failed to load AI mentor sessions" });
		}
	},
);

router.get(
	"/messages/:sessionId",
	authenticate,
	authorizeRoles("Startup"),
	async (req, res) => {
		try {
			await ensureAiMentorSchema();
			const startup = await getStartupForUser(req.user.user_id);
			if (!startup) {
				return res.status(404).json({ error: "Startup profile not found" });
			}

			const sessionId = Number(req.params.sessionId);
			const sessionCheck = await pool.query(
				"SELECT ai_mentor_session_id FROM ai_mentor_sessions WHERE ai_mentor_session_id = $1 AND startup_id = $2",
				[sessionId, startup.startup_id],
			);
			if (sessionCheck.rowCount === 0) {
				return res.status(404).json({ error: "AI mentor session not found" });
			}

			const result = await pool.query(
				`SELECT ai_mentor_message_id AS id, sender, message, created_at
				 FROM ai_mentor_messages
				 WHERE session_id = $1
				 ORDER BY created_at ASC`,
				[sessionId],
			);

			res.json({ messages: result.rows });
		} catch (error) {
			res.status(500).json({ error: error.message || "Failed to load AI mentor messages" });
		}
	},
);

module.exports = router;
