"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchMentorReports, submitReport } from "@/lib/mentorApi";

export default function MentorReportsPage() {
	const [reports, setReports] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [showForm, setShowForm] = useState(false);
	const [form, setForm] = useState({
		mentorship_session_id: "",
		report_title: "",
		summary: "",
		progress_rating: "4",
		mentor_notes: "",
	});

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const data = await fetchMentorReports();
			setReports(Array.isArray(data) ? data : data.reports || []);
		} catch (ex) {
			setError(ex.message || "Failed to load reports");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		try {
			await submitReport({
				mentorship_session_id: Number(form.mentorship_session_id),
				report_title: form.report_title,
				summary: form.summary,
				progress_rating: Number(form.progress_rating),
				mentor_notes: form.mentor_notes || undefined,
			});
			setShowForm(false);
			await load();
		} catch (ex) {
			setError(ex.message || "Submit failed");
		}
	}

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-gray-900">Reports</h1>
				<button
					type="button"
					onClick={() => setShowForm(!showForm)}
					className="px-4 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold"
				>
					Submit report
				</button>
			</div>

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			{showForm ? (
				<form onSubmit={onSubmit} className="mb-8 bg-white rounded-2xl p-6 border space-y-3">
					<input
						type="number"
						placeholder="Session ID"
						value={form.mentorship_session_id}
						onChange={(e) => setForm({ ...form, mentorship_session_id: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="text"
						placeholder="Report title"
						value={form.report_title}
						onChange={(e) => setForm({ ...form, report_title: e.target.value })}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<textarea
						placeholder="Summary"
						value={form.summary}
						onChange={(e) => setForm({ ...form, summary: e.target.value })}
						required
						rows={4}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<input
						type="number"
						min={1}
						max={5}
						placeholder="Progress rating 1-5"
						value={form.progress_rating}
						onChange={(e) => setForm({ ...form, progress_rating: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<textarea
						placeholder="Mentor notes"
						value={form.mentor_notes}
						onChange={(e) => setForm({ ...form, mentor_notes: e.target.value })}
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
					<button type="submit" className="px-6 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold">
						Submit
					</button>
				</form>
			) : null}

			{loading ? (
				<p className="text-gray-500 text-sm">Loading…</p>
			) : reports.length === 0 ? (
				<p className="text-gray-500 text-sm">No reports yet.</p>
			) : (
				<ul className="space-y-3">
					{reports.map((r) => (
						<li key={r.report_id} className="bg-white rounded-xl p-4 border border-gray-100">
							<p className="font-bold text-sm">{r.report_title}</p>
							<p className="text-xs text-gray-500 mt-1">{r.startup_name}</p>
							<p className="text-sm text-gray-600 mt-2">{r.summary}</p>
							<p className="text-xs text-gray-400 mt-2">
								{new Date(r.created_at).toLocaleDateString()} · Rating: {r.progress_rating ?? "—"}
							</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
