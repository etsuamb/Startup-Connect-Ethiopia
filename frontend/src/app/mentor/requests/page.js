"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
	acceptRequest,
	fetchIncomingRequests,
	rejectRequest,
} from "@/lib/mentorApi";

export default function MentorRequestsPage() {
	const [requests, setRequests] = useState([]);
	const [filter, setFilter] = useState("pending");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [busyId, setBusyId] = useState(null);

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const rows = await fetchIncomingRequests();
			setRequests(Array.isArray(rows) ? rows : []);
		} catch (ex) {
			setError(ex.message || "Failed to load requests");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const filtered = useMemo(
		() => requests.filter((r) => (filter === "all" ? true : r.status === filter)),
		[requests, filter],
	);

	const stats = useMemo(
		() => ({
			pending: requests.filter((r) => r.status === "pending").length,
			accepted: requests.filter((r) => r.status === "accepted").length,
			rejected: requests.filter((r) => r.status === "rejected").length,
		}),
		[requests],
	);

	async function onAccept(id) {
		setBusyId(id);
		try {
			await acceptRequest(id);
			await load();
		} catch (ex) {
			setError(ex.message || "Accept failed");
		} finally {
			setBusyId(null);
		}
	}

	async function onReject(id) {
		const reason = window.prompt("Rejection reason (optional):") || "";
		setBusyId(id);
		try {
			await rejectRequest(id, reason);
			await load();
		} catch (ex) {
			setError(ex.message || "Reject failed");
		} finally {
			setBusyId(null);
		}
	}

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Mentorship Requests</h1>

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			<div className="grid grid-cols-3 gap-4 mb-6">
				{[
					["Pending", stats.pending],
					["Accepted", stats.accepted],
					["Rejected", stats.rejected],
				].map(([label, n]) => (
					<div key={label} className="bg-white rounded-xl p-4 border border-gray-100 text-center">
						<p className="text-2xl font-bold text-gray-900">{n}</p>
						<p className="text-xs text-gray-500 uppercase font-bold">{label}</p>
					</div>
				))}
			</div>

			<div className="flex gap-2 mb-6">
				{["pending", "accepted", "rejected", "all"].map((f) => (
					<button
						key={f}
						type="button"
						onClick={() => setFilter(f)}
						className={`px-4 py-1.5 rounded-full text-xs font-bold capitalize ${
							filter === f ? "bg-[#115543] text-white" : "bg-white border border-gray-200"
						}`}
					>
						{f}
					</button>
				))}
			</div>

			{loading ? (
				<p className="text-gray-500 text-sm">Loading…</p>
			) : filtered.length === 0 ? (
				<p className="text-gray-500 text-sm">No requests found.</p>
			) : (
				<div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
					<table className="w-full text-sm">
						<thead className="bg-gray-50 text-left text-xs uppercase text-gray-500">
							<tr>
								<th className="p-4">Startup</th>
								<th className="p-4">Subject</th>
								<th className="p-4">Status</th>
								<th className="p-4">Actions</th>
							</tr>
						</thead>
						<tbody>
							{filtered.map((r) => (
								<tr key={r.mentorship_request_id} className="border-t border-gray-100">
									<td className="p-4 font-medium">{r.startup_name}</td>
									<td className="p-4 text-gray-600">{r.subject}</td>
									<td className="p-4 capitalize">{r.status}</td>
									<td className="p-4 flex flex-wrap gap-2">
										<Link
											href={`/mentor/requests/profile?requestId=${r.mentorship_request_id}`}
											className="text-xs font-bold text-[#115543]"
										>
											View
										</Link>
										{r.status === "pending" ? (
											<>
												<button
													type="button"
													disabled={busyId === r.mentorship_request_id}
													onClick={() => onAccept(r.mentorship_request_id)}
													className="text-xs font-bold text-emerald-700"
												>
													Accept
												</button>
												<button
													type="button"
													disabled={busyId === r.mentorship_request_id}
													onClick={() => onReject(r.mentorship_request_id)}
													className="text-xs font-bold text-red-600"
												>
													Decline
												</button>
											</>
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
