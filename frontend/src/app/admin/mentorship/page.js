"use client";

import { useEffect, useState } from "react";
import {
	fetchMentorshipOverview,
	fetchMentorshipPayments,
	fetchMentorshipReports,
	fetchMentorshipRequests,
	fetchMentorshipSessions,
} from "@/lib/adminApi";
import AdminTabs from "@/components/admin/AdminTabs";

const TABS = [
	{ id: "overview", label: "Overview" },
	{ id: "requests", label: "Requests" },
	{ id: "sessions", label: "Sessions" },
	{ id: "reports", label: "Progress reports" },
	{ id: "payments", label: "Payments" },
];

const OVERVIEW_LABELS = {
	mentorship_requests: "Total requests",
	mentorship_sessions: "Scheduled sessions",
	mentorship_reports: "Progress reports",
	mentorship_resources: "Shared resources",
	mentorship_payments: "Mentorship payments",
};

function rowKey(r, tab) {
	return (
		r.mentorship_request_id ||
		r.mentorship_session_id ||
		r.report_id ||
		r.payment_id ||
		`${tab}-${r.created_at}`
	);
}

function renderDetails(r, tab) {
	if (tab === "requests") {
		return (
			<div>
				<p className="font-medium text-slate-900">{r.subject || "Mentorship request"}</p>
				<p className="text-xs text-slate-500">
					{r.startup_name} → {r.headline || r.mentor_email}
				</p>
			</div>
		);
	}
	if (tab === "sessions") {
		return (
			<div>
				<p className="font-medium text-slate-900">{r.session_title || r.meeting_link || "Session"}</p>
				<p className="text-xs text-slate-500">
					{r.startup_name} · {r.headline}
					{r.scheduled_at ? ` · ${new Date(r.scheduled_at).toLocaleString()}` : ""}
				</p>
			</div>
		);
	}
	if (tab === "reports") {
		return (
			<div>
				<p className="font-medium text-slate-900">{r.report_title || r.summary || "Progress report"}</p>
				<p className="text-xs text-slate-500">
					{r.startup_name} · {r.headline}
				</p>
			</div>
		);
	}
	if (tab === "payments") {
		return (
			<div>
				<p className="font-medium text-slate-900">
					ETB {Number(r.amount || 0).toLocaleString()} · {r.reference_type || "mentorship"}
				</p>
				<p className="text-xs text-slate-500">
					{r.sender_first_name} → {r.receiver_first_name}
				</p>
			</div>
		);
	}
	return null;
}

export default function AdminMentorshipPage() {
	const [tab, setTab] = useState("overview");
	const [overview, setOverview] = useState(null);
	const [rows, setRows] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		let cancelled = false;
		(async () => {
			setLoading(true);
			setError("");
			try {
				if (tab === "overview") {
					const data = await fetchMentorshipOverview();
					if (!cancelled) setOverview(data.counts || data.overview || data);
				} else if (tab === "requests") {
					const data = await fetchMentorshipRequests();
					if (!cancelled) setRows(Array.isArray(data) ? data : data.requests || []);
				} else if (tab === "sessions") {
					const data = await fetchMentorshipSessions();
					if (!cancelled) setRows(data.sessions || []);
				} else if (tab === "reports") {
					const data = await fetchMentorshipReports();
					if (!cancelled) setRows(data.reports || []);
				} else {
					const data = await fetchMentorshipPayments();
					if (!cancelled) setRows(data.payments || []);
				}
			} catch (ex) {
				if (!cancelled) setError(ex.message || "Failed to load");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [tab]);

	return (
		<div className="max-w-7xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">Mentorship oversight</h1>
				<p className="text-slate-300 text-sm">
					Monitor mentorship requests, scheduled sessions, progress reports, and related payments across the platform.
				</p>
			</section>

			{error ? <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div> : null}
			<AdminTabs tabs={TABS} active={tab} onChange={setTab} />

			{loading ? (
				<p className="text-slate-500 text-sm">Loading…</p>
			) : tab === "overview" && overview ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
					{Object.entries(overview)
						.filter(([k]) => OVERVIEW_LABELS[k])
						.map(([k, v]) => (
							<div key={k} className="bg-white rounded-2xl p-5 border">
								<p className="text-xs font-bold text-slate-400 uppercase">{OVERVIEW_LABELS[k]}</p>
								<p className="text-2xl font-black mt-1">{String(v)}</p>
							</div>
						))}
				</div>
			) : (
				<div className="bg-white rounded-2xl border overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
							<tr>
								<th className="px-4 py-3">Details</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Created</th>
							</tr>
						</thead>
						<tbody>
							{rows.length === 0 ? (
								<tr>
									<td colSpan={3} className="px-4 py-8 text-slate-500">
										No records in this section yet.
									</td>
								</tr>
							) : (
								rows.map((r) => (
									<tr key={rowKey(r, tab)} className="border-t">
										<td className="px-4 py-3">{renderDetails(r, tab)}</td>
										<td className="px-4 py-3 capitalize">{r.status || "—"}</td>
										<td className="px-4 py-3 text-slate-500">
											{r.created_at ? new Date(r.created_at).toLocaleString() : "—"}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			)}
		</div>
	);
}
