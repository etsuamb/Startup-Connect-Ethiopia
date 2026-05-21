"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchMentorDashboard } from "@/lib/mentorApi";

export default function MentorDashboard() {
	const [data, setData] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchMentorDashboard()
			.then(setData)
			.catch((ex) => setError(ex.message || "Failed to load dashboard"))
			.finally(() => setLoading(false));
	}, []);

	const stats = data?.stats || {};
	const profile = data?.profile;

	return (
		<div className="p-8 max-w-6xl mx-auto">
			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			<h1 className="text-2xl font-bold text-gray-900 mb-1">
				Welcome{profile?.first_name ? `, ${profile.first_name}` : ""}
			</h1>
			<p className="text-gray-500 text-sm mb-8">Your mentorship overview</p>

			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
				{[
					["Active startups", stats.active_startups],
					["Pending requests", stats.pending_requests],
					["Upcoming sessions", stats.upcoming_sessions],
					["Total earnings", stats.total_earnings != null ? `$${Number(stats.total_earnings).toFixed(0)}` : "—"],
				].map(([label, val]) => (
					<div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
						<p className="text-[10px] font-bold text-gray-400 uppercase">{label}</p>
						<p className="text-2xl font-black text-gray-900 mt-1">
							{loading ? "—" : val ?? 0}
						</p>
					</div>
				))}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<section className="bg-white rounded-2xl p-6 border border-gray-100">
					<div className="flex justify-between items-center mb-4">
						<h2 className="font-bold text-gray-900">Pending requests</h2>
						<Link href="/mentor/requests" className="text-sm text-[#115543] font-bold">
							View all
						</Link>
					</div>
					{loading ? (
						<p className="text-sm text-gray-500">Loading…</p>
					) : (data?.pending_requests?.length ?? 0) === 0 ? (
						<p className="text-sm text-gray-500">No pending requests.</p>
					) : (
						<ul className="space-y-3">
							{data.pending_requests.map((r) => (
								<li
									key={r.mentorship_request_id}
									className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
								>
									<div>
										<p className="font-bold text-sm">{r.startup_name}</p>
										<p className="text-xs text-gray-500">{r.subject}</p>
									</div>
									<Link
										href={`/mentor/requests/profile?requestId=${r.mentorship_request_id}`}
										className="text-xs font-bold text-[#115543]"
									>
										Review
									</Link>
								</li>
							))}
						</ul>
					)}
				</section>

				<section className="bg-white rounded-2xl p-6 border border-gray-100">
					<div className="flex justify-between items-center mb-4">
						<h2 className="font-bold text-gray-900">Upcoming sessions</h2>
						<Link href="/mentor/sessions" className="text-sm text-[#115543] font-bold">
							View all
						</Link>
					</div>
					{loading ? (
						<p className="text-sm text-gray-500">Loading…</p>
					) : (data?.upcoming_sessions?.length ?? 0) === 0 ? (
						<p className="text-sm text-gray-500">No upcoming sessions.</p>
					) : (
						<ul className="space-y-3">
							{data.upcoming_sessions.map((s) => (
								<li key={s.mentorship_session_id} className="p-3 bg-gray-50 rounded-xl">
									<p className="font-bold text-sm">{s.startup_name}</p>
									<p className="text-xs text-gray-500">
										{new Date(s.scheduled_at).toLocaleString()} · {s.duration_minutes} min
									</p>
								</li>
							))}
						</ul>
					)}
				</section>
			</div>
		</div>
	);
}
