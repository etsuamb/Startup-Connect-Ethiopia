"use client";

import { useCallback, useEffect, useState } from "react";
import {
	createInvestmentDispute,
	fetchInvestmentDisputes,
	fetchInvestmentRequests,
	fetchInvestments,
	resolveInvestmentDispute,
	updateInvestmentRequestStatus,
	verifyInvestment,
	verifyInvestmentRequest,
} from "@/lib/adminApi";
import AdminTabs from "@/components/admin/AdminTabs";

const STATUSES = ["pending", "approved", "rejected", "withdrawn"];

export default function AdminInvestmentsPage() {
	const [tab, setTab] = useState("requests");
	const [requests, setRequests] = useState([]);
	const [investments, setInvestments] = useState([]);
	const [disputes, setDisputes] = useState([]);
	const [filter, setFilter] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const [reqData, invData, dispResult] = await Promise.all([
				fetchInvestmentRequests(),
				fetchInvestments({ limit: 100 }),
				fetchInvestmentDisputes().catch((ex) => ({ error: ex.message, disputes: [] })),
			]);
			setRequests(reqData.investment_requests || []);
			setInvestments(invData.investments || []);
			if (dispResult.error) {
				setDisputes([]);
			} else {
				setDisputes(dispResult.disputes || []);
			}
		} catch (ex) {
			setError(ex.message || "Failed to load investments");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	const filteredRequests = filter
		? requests.filter((r) => r.status === filter)
		: requests;

	async function setRequestStatus(id, status) {
		const comment = window.prompt(`Optional note for ${status}:`) || "";
		setError("");
		setMsg("");
		try {
			await updateInvestmentRequestStatus(id, status, comment);
			setMsg(`Request marked as ${status}`);
			await load();
		} catch (ex) {
			setError(ex.message || "Update failed");
		}
	}

	return (
		<div className="max-w-7xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">Investment oversight</h1>
				<p className="text-slate-300 text-sm">
					Track investment history, verify legitimacy, approve requests, and resolve disputes.
				</p>
			</section>

			{error ? (
				<div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}
			{msg ? (
				<div className="mb-4 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm">{msg}</div>
			) : null}

			<AdminTabs
				tabs={[
					{ id: "requests", label: `Funding requests (${requests.length})` },
					{ id: "investments", label: `History (${investments.length})` },
					{ id: "disputes", label: `Disputes (${disputes.length})` },
				]}
				active={tab}
				onChange={setTab}
			/>

			{tab === "requests" ? (
				<>
					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="mb-4 px-4 py-2 border rounded-xl text-sm bg-white"
					>
						<option value="">All statuses</option>
						{STATUSES.map((s) => (
							<option key={s} value={s}>
								{s}
							</option>
						))}
					</select>
					<div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
						{loading ? (
							<p className="p-6 text-sm text-slate-500">Loading…</p>
						) : (
							<table className="w-full text-sm">
								<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
									<tr>
										<th className="px-4 py-3">Startup</th>
										<th className="px-4 py-3">Investor</th>
										<th className="px-4 py-3">Project</th>
										<th className="px-4 py-3">Amount</th>
										<th className="px-4 py-3">Status</th>
										<th className="px-4 py-3">Actions</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-slate-100">
									{filteredRequests.map((r) => (
										<tr key={r.investment_request_id}>
											<td className="px-4 py-3">{r.startup_name}</td>
											<td className="px-4 py-3">{r.investor_organization || "—"}</td>
											<td className="px-4 py-3">{r.project_title}</td>
											<td className="px-4 py-3 font-semibold">{r.requested_amount}</td>
											<td className="px-4 py-3 capitalize">{r.status}</td>
											<td className="px-4 py-3">
												<div className="flex gap-1 flex-wrap">
													{r.status === "pending" ? (
														<>
															<button type="button" onClick={() => setRequestStatus(r.investment_request_id, "approved")} className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">Approve</button>
															<button type="button" onClick={() => setRequestStatus(r.investment_request_id, "rejected")} className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold">Reject</button>
														</>
													) : null}
													<button type="button" onClick={async () => { await verifyInvestmentRequest(r.investment_request_id); setMsg("Marked verified"); await load(); }} className="px-2 py-1 rounded-lg border text-[10px] font-bold">Verify</button>
													<button type="button" onClick={async () => { const reason = window.prompt("Dispute reason:"); if (!reason) return; await createInvestmentDispute({ investment_request_id: r.investment_request_id, reason }); setMsg("Dispute opened"); await load(); }} className="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 text-[10px] font-bold">Dispute</button>
												</div>
											</td>
										</tr>
									))}
								</tbody>
							</table>
						)}
					</div>
				</>
			) : tab === "disputes" ? (
				<div className="bg-white rounded-2xl border overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-left">
							<tr>
								<th className="px-4 py-3">Startup</th>
								<th className="px-4 py-3">Reason</th>
								<th className="px-4 py-3">Status</th>
								<th className="px-4 py-3">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{disputes.map((d) => (
								<tr key={d.dispute_id}>
									<td className="px-4 py-3">{d.startup_name || "—"}</td>
									<td className="px-4 py-3">{d.reason}</td>
									<td className="px-4 py-3">{d.status}</td>
									<td className="px-4 py-3">
										{d.status === "open" ? (
											<>
												<button type="button" onClick={async () => { await resolveInvestmentDispute(d.dispute_id, "resolved"); await load(); }} className="text-xs font-bold text-emerald-700">Resolve</button>
												<button type="button" onClick={async () => { await resolveInvestmentDispute(d.dispute_id, "dismissed"); await load(); }} className="text-xs font-bold text-slate-600 ml-2">Dismiss</button>
											</>
										) : "—"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
					{loading ? (
						<p className="p-6 text-sm text-slate-500">Loading…</p>
					) : (
						<table className="w-full text-sm">
							<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
								<tr>
									<th className="px-4 py-3">Project</th>
									<th className="px-4 py-3">Startup</th>
									<th className="px-4 py-3">Investor</th>
									<th className="px-4 py-3">Amount</th>
									<th className="px-4 py-3">Status</th>
									<th className="px-4 py-3">Date</th>
									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{investments.map((inv) => (
									<tr key={inv.investment_id}>
										<td className="px-4 py-3">{inv.project_title}</td>
										<td className="px-4 py-3">{inv.startup_first_name}</td>
										<td className="px-4 py-3">{inv.investor_first_name}</td>
										<td className="px-4 py-3 font-semibold">{inv.amount}</td>
										<td className="px-4 py-3 capitalize">{inv.status}{inv.admin_verified ? " ✓" : ""}</td>
										<td className="px-4 py-3 text-slate-500">
											{inv.created_at ? new Date(inv.created_at).toLocaleDateString() : "—"}
										</td>
										<td className="px-4 py-3">
											<button type="button" onClick={async () => { await verifyInvestment(inv.investment_id); setMsg("Investment verified"); await load(); }} className="text-xs font-bold text-emerald-700">Verify legitimacy</button>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			)}
		</div>
	);
}
