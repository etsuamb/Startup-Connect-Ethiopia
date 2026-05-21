/**
 * Adds Mentor Portal API requests to Postman collection.
 * Run: node scripts/add_postman_mentor_portal.js
 */
const fs = require("fs");
const path = require("path");

const collectionPath = path.join(
	__dirname,
	"..",
	"Connect Startup Backend API.postman_collection.json",
);

function authHeader() {
	return [{ key: "Authorization", value: "Bearer {{token}}" }];
}

function urlObj(segments, queryStr) {
	const raw =
		"http://localhost:5000/" + segments.join("/") + (queryStr ? "?" + queryStr : "");
	return {
		raw,
		host: ["http://localhost:5000"],
		path: segments,
		...(queryStr
			? {
					query: queryStr.split("&").map((p) => {
						const i = p.indexOf("=");
						return { key: p.slice(0, i), value: p.slice(i + 1) };
					}),
				}
			: {}),
	};
}

function jsonReq(name, method, segments, rawBody, description) {
	return {
		name,
		request: {
			method,
			header: [...authHeader(), { key: "Content-Type", value: "application/json" }],
			body: { mode: "raw", raw: rawBody },
			url: urlObj(segments),
			...(description ? { description } : {}),
		},
	};
}

function getReq(name, segments, query, description) {
	return {
		name,
		request: {
			method: "GET",
			header: authHeader(),
			url: urlObj(segments, query),
			...(description ? { description } : {}),
		},
	};
}

const portalFolder = {
	name: "Mentor Portal (dashboard & discovery)",
	description:
		"Mentor actor endpoints for the frontend portal. Login as Mentor first (Auth → Login).",
	item: [
		getReq("Mentor Dashboard", ["api", "mentors", "dashboard"], null, "KPIs, pending requests, upcoming sessions"),
		getReq("Get My Profile", ["api", "mentors", "profile"], null, "Returns { mentor: { ...user fields } }"),
		getReq("List Mentorship Requests", ["api", "mentors", "mentorship-requests"], "status=pending&page=1&limit=20"),
		getReq("Get My Startups", ["api", "mentors", "my-startups"], null, "Accepted mentorships"),
		getReq("Browse Startups", ["api", "mentors", "startups"], "search=&industry=&page=1&limit=20"),
		getReq("Startup Details", ["api", "mentors", "startups", "1"], null, "Replace 1 with startup_id"),
		jsonReq(
			"Send Proposal",
			"POST",
			["api", "mentors", "proposals"],
			'{\n  "startup_id": 1,\n  "subject": "Mentorship proposal",\n  "message": "I would like to mentor your startup on GTM and fundraising."\n}',
		),
		jsonReq(
			"Accept Request",
			"PUT",
			["api", "mentors", "mentorship-requests", "1", "accept"],
			"{}",
		),
		jsonReq(
			"Reject Request",
			"PUT",
			["api", "mentors", "mentorship-requests", "1", "reject"],
			'{ "reason": "Capacity full this quarter" }',
		),
		getReq("Mentorship History", ["api", "mentors", "mentorships"]),
	],
};

const mentorshipMentorFolder = {
	name: "Mentorship (Mentor flows)",
	description: "Shared /api/mentorship routes used by mentor portal pages.",
	item: [
		getReq("Incoming Requests", ["api", "mentorship", "requests", "incoming"]),
		getReq("Request Detail", ["api", "mentorship", "requests", "1"]),
		jsonReq(
			"Respond to Request",
			"PUT",
			["api", "mentorship", "requests", "1", "respond"],
			'{ "status": "accepted" }',
		),
		getReq("List Sessions", ["api", "mentorship", "sessions"]),
		jsonReq(
			"Schedule Session",
			"POST",
			["api", "mentorship", "sessions"],
			'{\n  "mentorship_request_id": 1,\n  "scheduled_at": "2026-06-01T10:00:00.000Z",\n  "duration_minutes": 60,\n  "meeting_link": "https://meet.example.com/room",\n  "notes": "Kickoff session"\n}',
		),
		jsonReq(
			"Update Session Status",
			"PUT",
			["api", "mentorship", "sessions", "1"],
			'{ "status": "completed", "notes": "Session completed successfully" }',
		),
		getReq("Mentorship History", ["api", "mentorship", "history"]),
		getReq("List Reports", ["api", "mentorship", "reports"]),
		jsonReq(
			"Submit Report",
			"POST",
			["api", "mentorship", "reports"],
			'{\n  "mentorship_session_id": 1,\n  "report_title": "Session 1 Summary",\n  "summary": "Discussed pitch and GTM.",\n  "progress_rating": 4,\n  "mentor_notes": "Strong progress"\n}',
		),
		getReq("List Resources", ["api", "mentorship", "resources"]),
		getReq("Mentor Payments", ["api", "mentorship", "payments"]),
	],
};

const raw = fs.readFileSync(collectionPath, "utf8");
const collection = JSON.parse(raw);

const mentorIdx = collection.item.findIndex((f) => f.name === "Mentor");
if (mentorIdx === -1) {
	console.error("Mentor folder not found");
	process.exit(1);
}

const mentorFolder = collection.item[mentorIdx];
const names = new Set(mentorFolder.item.map((i) => i.name));
for (const folder of [portalFolder, mentorshipMentorFolder]) {
	if (!names.has(folder.name)) {
		mentorFolder.item.unshift(folder);
		names.add(folder.name);
	}
}

const singleAdds = [
	getReq("Get Mentor Dashboard", ["api", "mentors", "dashboard"]),
	getReq("Get My Mentor Profile", ["api", "mentors", "profile"]),
	getReq("My Startups (assigned)", ["api", "mentors", "my-startups"]),
	getReq("Browse Startups for Mentor", ["api", "mentors", "startups"], "page=1&limit=20"),
	jsonReq(
		"Send Mentorship Proposal",
		"POST",
		["api", "mentors", "proposals"],
		'{\n  "startup_id": 1,\n  "subject": "Mentorship proposal",\n  "message": "Happy to support your team."\n}',
	),
	getReq("Get Mentorship Request Detail", ["api", "mentorship", "requests", "1"]),
];

for (const req of singleAdds) {
	if (!names.has(req.name)) {
		mentorFolder.item.push(req);
		names.add(req.name);
	}
}

const authIdx = collection.item.findIndex((f) => f.name === "Auth");
if (authIdx !== -1) {
	const auth = collection.item[authIdx];
	if (!auth.item.some((i) => i.name === "Mentor Login")) {
		auth.item.push({
			name: "Mentor Login",
			request: {
				method: "POST",
				header: [{ key: "Content-Type", value: "application/json" }],
				body: {
					mode: "raw",
					raw: '{\n  "email": "mentor.register@test.com",\n  "password": "YourMentorPass123!"\n}',
				},
				url: urlObj(["api", "auth", "login"]),
				description: "Use a registered Mentor account. Saves token via test script if configured.",
			},
			event: [
				{
					listen: "test",
					script: {
						type: "text/javascript",
						exec: [
							"const response = pm.response.json();",
							"if (response.token) { pm.collectionVariables.set('token', response.token); }",
						],
					},
				},
			],
		});
	}
}

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
console.log("Updated Postman collection with Mentor Portal endpoints.");
