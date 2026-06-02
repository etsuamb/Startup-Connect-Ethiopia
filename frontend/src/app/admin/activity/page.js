"use client";

import { useCallback, useEffect, useState } from "react";
import {
	downloadAuditLogsExport,
	fetchAuditLogs,
	fetchErrorLogs,
	fetchFraudSummary,
	fetchLoginAttempts,
	fetchMonitoringSummary,
	fetchSecurityEvents,
} from "@/lib/adminApi";
import { formatAuditAction, formatEntityType } from "@/lib/adminDisplay";
import AdminTabs from "@/components/admin/AdminTabs";

export default function AdminActivityPage() {
	const [tab, setTab] = useState("audit");
	const [auditLogs, setAuditLogs] = useState([]);
	const [loginAttempts, setLoginAttempts] = useState([]);
	const [securityEvents, setSecurityEvents] = useState([]);
	const [summary, setSummary] = useState(null);
	const [fraud, setFraud] = useState(null);
	const [errorLogs, setErrorLogs] = useState([]);
	const [securityAlerts, setSecurityAlerts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const [audit, logins, events, sum, fraudData, errData] = await Promise.all([
				fetchAuditLogs({ limit: 100 }),
				fetchLoginAttempts({ limit: 50 }),
				fetchSecurityEvents({ limit: 50 }),
				fetchMonitoringSummary(24),
				fetchFraudSummary(),
				fetchErrorLogs(50),
			]);
			setAuditLogs(audit.logs || []);
			setLoginAttempts(logins.attempts || logins.login_attempts || []);
			setSecurityEvents(events.events || events.security_events || []);
			setSummary(sum.summary || sum);
			setFraud(fraudData.fraud || null);
			setErrorLogs(errData.error_logs || []);
			setSecurityAlerts(errData.security_alerts || []);
		} catch (ex) {
			setError(ex.message || "Failed to load activity");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	return (
		<div className="max-w-7xl mx-auto pb-12">
			<section className="mb-8 rounded-2xl bg-[#0a4d3c] text-white p-8 border border-[#07382b]/20">
				<h1 className="text-3xl font-bold mb-2">Monitoring & security</h1>
				<p className="text-white/80 text-sm max-w-2xl">
					Audit trail of admin actions, login attempts, security events, and system errors. The entity column shows what record was affected (user, payment, project, etc.).
				</p>
			</section>

			{error ? <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div> : null}

			{summary ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
					<div className="bg-white rounded-2xl p-5 border">
						<p className="text-xs font-bold text-slate-400 uppercase">Login attempts (24h)</p>
						<p className="text-2xl font-black mt-1">{summary.login_attempts ?? 0}</p>
					</div>
					<div className="bg-white rounded-2xl p-5 border">
						<p className="text-xs font-bold text-slate-400 uppercase">Failed logins (24h)</p>
						<p className="text-2xl font-black mt-1">{summary.failed_logins ?? 0}</p>
					</div>
					<div className="bg-white rounded-2xl p-5 border">
						<p className="text-xs font-bold text-slate-400 uppercase">Security events</p>
						<p className="text-2xl font-black mt-1">{summary.security_events ?? 0}</p>
					</div>
					<div className="bg-white rounded-2xl p-5 border">
						<p className="text-xs font-bold text-slate-400 uppercase">Elevated severity</p>
						<p className="text-2xl font-black mt-1">{summary.elevated_security_events ?? 0}</p>
					</div>
				</div>
			) : null}

			{fraud ? (
				<div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
					{Object.entries(fraud).map(([k, v]) => (
						<div key={k} className="bg-white rounded-xl p-4 border text-center">
							<p className="text-[10px] font-bold text-slate-400 uppercase">{k.replace(/_/g, " ")}</p>
							<p className="text-xl font-black mt-1">{v}</p>
						</div>
					))}
				</div>
			) : null}

			<div className="flex flex-wrap gap-2 mb-6 items-center">
				<AdminTabs
					tabs={[
						{ id: "audit", label: "Audit logs" },
						{ id: "logins", label: "Login attempts" },
						{ id: "security", label: "Security events" },
						{ id: "errors", label: "Error logs" },
						{ id: "alerts", label: "Security alerts" },
					]}
					active={tab}
					onChange={setTab}
				/>
				{tab === "audit" ? (
					<button
						type="button"
						onClick={() => downloadAuditLogsExport()}
						className="ml-auto px-4 py-2 rounded-full bg-slate-800 text-white text-xs font-bold"
					>
						Export audit CSV
					</button>
				) : null}
			</div>

			<div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
				{loading ? (
					<p className="p-6 text-sm text-slate-500">Loading…</p>
				) : tab === "audit" ? (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
							<tr>
								<th className="px-4 py-3">Time</th>
								<th className="px-4 py-3">Action</th>
								<th className="px-4 py-3">Record affected</th>
								<th className="px-4 py-3">Record type</th>
								<th className="px-4 py-3">Performed by</th>
								<th className="px-4 py-3">Notes</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{auditLogs.length === 0 ? (
								<tr><td colSpan={6} className="px-4 py-8 text-slate-500">No audit entries yet.</td></tr>
							) : auditLogs.map((log) => (
								<tr key={log.audit_log_id}>
									<td className="px-4 py-3 text-slate-500 whitespace-nowrap">
										{log.created_at ? new Date(log.created_at).toLocaleString() : "—"}
									</td>
									<td className="px-4 py-3 font-medium capitalize">{formatAuditAction(log.action)}</td>
									<td className="px-4 py-3 font-mono text-xs">
										{log.entity_id != null ? `#${log.entity_id}` : "—"}
									</td>
									<td className="px-4 py-3 text-slate-600">{formatEntityType(log.entity_type)}</td>
									<td className="px-4 py-3">
										{log.actor_name || log.actor_email || (log.actor_user_id ? `User #${log.actor_user_id}` : "System")}
									</td>
									<td className="px-4 py-3 text-slate-600 max-w-xs truncate">{log.details || "—"}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : tab === "errors" ? (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-left">
							<tr>
								<th className="px-4 py-3">Time</th>
								<th className="px-4 py-3">Source</th>
								<th className="px-4 py-3">Level</th>
								<th className="px-4 py-3">Message</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{errorLogs.map((e) => (
								<tr key={e.log_id}>
									<td className="px-4 py-3 text-slate-500">{e.created_at ? new Date(e.created_at).toLocaleString() : "—"}</td>
									<td className="px-4 py-3">{e.source}</td>
									<td className="px-4 py-3">{e.level}</td>
									<td className="px-4 py-3">{e.message}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : tab === "alerts" ? (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-left">
							<tr>
								<th className="px-4 py-3">Time</th>
								<th className="px-4 py-3">Type</th>
								<th className="px-4 py-3">Severity</th>
								<th className="px-4 py-3">Message</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{securityAlerts.map((e) => (
								<tr key={e.event_id}>
									<td className="px-4 py-3 text-slate-500">{e.created_at ? new Date(e.created_at).toLocaleString() : "—"}</td>
									<td className="px-4 py-3">{e.source}</td>
									<td className="px-4 py-3">{e.level}</td>
									<td className="px-4 py-3">{e.message}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : tab === "logins" ? (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
							<tr>
								<th className="px-4 py-3">Time</th>
								<th className="px-4 py-3">Email</th>
								<th className="px-4 py-3">Success</th>
								<th className="px-4 py-3">Reason</th>
								<th className="px-4 py-3">IP</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{loginAttempts.map((a) => (
								<tr key={a.attempt_id || `${a.email}-${a.created_at}`}>
									<td className="px-4 py-3 text-slate-500">
										{a.created_at ? new Date(a.created_at).toLocaleString() : "—"}
									</td>
									<td className="px-4 py-3">{a.email}</td>
									<td className="px-4 py-3">
										<span
											className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
												a.success ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
											}`}
										>
											{a.success ? "Yes" : "No"}
										</span>
									</td>
									<td className="px-4 py-3">{a.failure_reason || "—"}</td>
									<td className="px-4 py-3 font-mono text-xs">{a.ip_address || "—"}</td>
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
							<tr>
								<th className="px-4 py-3">Time</th>
								<th className="px-4 py-3">Type</th>
								<th className="px-4 py-3">Severity</th>
								<th className="px-4 py-3">User</th>
								<th className="px-4 py-3">Details</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{securityEvents.map((e) => (
								<tr key={e.event_id}>
									<td className="px-4 py-3 text-slate-500">
										{e.created_at ? new Date(e.created_at).toLocaleString() : "—"}
									</td>
									<td className="px-4 py-3">{e.event_type}</td>
									<td className="px-4 py-3 capitalize">{e.severity}</td>
									<td className="px-4 py-3">{e.user_id || e.email || "—"}</td>
									<td className="px-4 py-3 max-w-xs truncate">{e.details || e.message || "—"}</td>
								</tr>
							))}
						</tbody>
					</table>
				)}
			</div>
		</div>
	);
}
