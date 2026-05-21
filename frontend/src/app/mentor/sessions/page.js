"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMentorSessions, scheduleSession, updateSession } from "@/lib/mentorApi";

export default function MentorSessionsPage() {
	const [sessions, setSessions] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({
		mentorship_request_id: "",
		scheduled_at: "",
		duration_minutes: "60",
		meeting_link: "",
		notes: "",
	});

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const data = await fetchMentorSessions();
			setSessions(Array.isArray(data) ? data : data.sessions || []);
		} catch (ex) {
			setError(ex.message || "Failed to load sessions");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function onSchedule(e) {
		e.preventDefault();
		setError("");
		try {
			await scheduleSession({
				mentorship_request_id: Number(form.mentorship_request_id),
				scheduled_at: new Date(form.scheduled_at).toISOString(),
				duration_minutes: Number(form.duration_minutes),
				meeting_link: form.meeting_link || undefined,
				notes: form.notes || undefined,
			});
			setShowForm(false);
			setForm({
				mentorship_request_id: "",
				scheduled_at: "",
				duration_minutes: "60",
				meeting_link: "",
				notes: "",
			});
			await load();
		} catch (ex) {
			setError(ex.message || "Schedule failed");
		}
	}

	async function markComplete(sessionId) {
		try {
			await updateSession(sessionId, { status: "completed" });
			await load();
		} catch (ex) {
			setError(ex.message || "Update failed");
		}
	}

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Sessions</h1>
				<button
					type="button"
					onClick={() => setShowForm(!showForm)}
					className="px-4 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold"
				>
					Schedule session
				</button>
			</div>

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			{showForm ? (
				<form onSubmit={onSchedule} className="mb-8 bg-white rounded-2xl p-6 border border-gray-100 space-y-3">
					<input
						type="number"
						placeholder="Mentorship request ID (accepted request)"
						value={form.mentorship_request_id}
						onChange={(e) => setForm({ ...form, mentorship_request_id: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="datetime-local"
						value={form.scheduled_at}
						onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="number"
						placeholder="Duration (minutes)"
						value={form.duration_minutes}
						onChange={(e) => setForm({ ...form, duration_minutes: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="url"
						placeholder="Meeting link (optional)"
						value={form.meeting_link}
						onChange={(e) => setForm({ ...form, meeting_link: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<textarea
						placeholder="Notes"
						value={form.notes}
						onChange={(e) => setForm({ ...form, notes: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<button type="submit" className="px-6 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold">
						Save session
					</button>
				</form>
			) : null}

			{loading ? (
				<p className="text-gray-500 text-sm">Loading…</p>
			) : sessions.length === 0 ? (
				<p className="text-gray-500 text-sm">No sessions scheduled.</p>
			) : (
				<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
							<tr>
								<th className="p-4">Startup</th>
								<th className="p-4">When</th>
								<th className="p-4">Duration</th>
								<th className="p-4">Status</th>
								<th className="p-4">Actions</th>
							</tr>
						</thead>
						<tbody>
							{sessions.map((s) => (
								<tr key={s.mentorship_session_id} className="border-t border-gray-100">
									<td className="p-4 font-medium">{s.startup_name}</td>
									<td className="p-4">{new Date(s.scheduled_at).toLocaleString()}</td>
									<td className="p-4">{s.duration_minutes} min</td>
									<td className="p-4 capitalize">{s.status}</td>
									<td className="p-4">
										{s.status === "scheduled" ? (
											<button
												type="button"
												onClick={() => markComplete(s.mentorship_session_id)}
												className="text-xs font-bold text-emerald-700"
											>
												Mark completed
											</button>
										) : null}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
