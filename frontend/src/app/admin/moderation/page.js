"use client";

import { useCallback, useEffect, useState } from "react";
import {
	fetchAdminProjects,
	fetchChatModerationLogs,
	fetchChatModerationStats,
	fetchChatViolations,
	fetchContentFlags,
	flagProjectContent,
	removeProject,
	reviewContentFlag,
	restoreProject,
	suspendUserChat,
	unsuspendUserChat,
	warnChatUser,
} from "@/lib/adminApi";
import AdminTabs from "@/components/admin/AdminTabs";

export default function AdminModerationPage() {
	const [tab, setTab] = useState("logs");
	const [logs, setLogs] = useState([]);
	const [violations, setViolations] = useState([]);
	const [flags, setFlags] = useState([]);
	const [projects, setProjects] = useState([]);
	const [stats, setStats] = useState(null);
	const [selectedProject, setSelectedProject] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const [logData, violData, statData, flagData, projData] = await Promise.all([
				fetchChatModerationLogs({ limit: 50 }),
				fetchChatViolations(),
				fetchChatModerationStats(24),
				fetchContentFlags("pending"),
				fetchAdminProjects({ limit: 50 }),
			]);
			setLogs(logData.logs || []);
			setViolations(violData.violations || []);
			setStats(statData.stats || null);
			setFlags(flagData.flags || []);
			setProjects(projData.projects || []);
		} catch (ex) {
			setError(ex.message || "Failed to load moderation data");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		load();
	}, [load]);

	async function handleSuspend(userId) {
		const hours = Number(window.prompt("Suspend chat for how many hours?", "72") || 72);
		const notes = window.prompt("Notes (optional):") || "";
		try {
			await suspendUserChat(userId, { hours, notes });
			setMsg("User chat suspended");
			load();
		} catch (ex) {
			setError(ex.message);
		}
	}

	async function handleUnsuspend(userId) {
		try {
			await unsuspendUserChat(userId);
			setMsg("Chat suspension lifted");
			load();
		} catch (ex) {
			setError(ex.message);
		}
	}

	async function handleWarn(userId) {
		const message = window.prompt("Warning message to send:") || "Please follow chat guidelines.";
		try {
			await warnChatUser(userId, message);
			setMsg("Warning sent");
		} catch (ex) {
			setError(ex.message);
		}
	}

	return (
		<div className="max-w-7xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">Content moderation</h1>
				<p className="text-slate-300 text-sm">
					Review flagged chat and project content, enforce guidelines, approve or remove posts.
				</p>
			</section>

			{error ? <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div> : null}
			{msg ? <div className="mb-4 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm">{msg}</div> : null}

			{stats ? (
				<div className="grid sm:grid-cols-3 gap-4 mb-8">
					<div className="bg-white rounded-2xl p-5 border border-slate-100">
						<p className="text-xs font-bold text-slate-400 uppercase">Flags (24h)</p>
						<p className="text-2xl font-black mt-1">
							{(Number(stats.investor_flags_24h) || 0) + (Number(stats.mentor_flags_24h) || 0)}
						</p>
					</div>
					<div className="bg-white rounded-2xl p-5 border border-slate-100">
						<p className="text-xs font-bold text-slate-400 uppercase">Repeat offenders</p>
						<p className="text-2xl font-black mt-1">{stats.repeat_offenders ?? "—"}</p>
					</div>
					<div className="bg-white rounded-2xl p-5 border border-slate-100">
						<p className="text-xs font-bold text-slate-400 uppercase">Chat suspended</p>
						<p className="text-2xl font-black mt-1">{stats.suspended_users ?? "—"}</p>
					</div>
				</div>
			) : null}

			<AdminTabs
				tabs={[
					{ id: "logs", label: "Flagged chat" },
					{ id: "violations", label: "Repeat offenders" },
					{ id: "flags", label: "Content queue" },
					{ id: "projects", label: "Projects / posts" },
				]}
				active={tab}
				onChange={setTab}
			/>

			{loading ? (
				<p className="text-sm text-slate-500">Loading…</p>
			) : tab === "flags" ? (
				<div className="bg-white rounded-2xl border divide-y">
					{flags.length === 0 ? <p className="p-6 text-sm text-slate-500">No pending flagged content.</p> : flags.map((f) => (
						<div key={f.flag_id} className="p-4 flex justify-between gap-4">
							<div>
								<p className="text-xs font-bold text-slate-500">{f.entity_type} #{f.entity_id}</p>
								<p className="text-sm">{f.reason || "Flagged"}</p>
							</div>
							<div className="flex gap-2 shrink-0">
								<button type="button" onClick={async () => { await reviewContentFlag(f.flag_id, "approved"); load(); }} className="text-xs font-bold text-emerald-700">Approve</button>
								<button type="button" onClick={async () => { await reviewContentFlag(f.flag_id, "removed"); load(); }} className="text-xs font-bold text-red-600">Remove</button>
								<button type="button" onClick={async () => { await reviewContentFlag(f.flag_id, "dismissed"); load(); }} className="text-xs font-bold text-slate-600">Dismiss</button>
							</div>
						</div>
					))}
				</div>
			) : tab === "projects" ? (
				<>
					<div className="bg-white rounded-2xl border overflow-x-auto">
						<table className="w-full text-sm">
							<thead className="bg-slate-50 text-xs uppercase text-left">
								<tr>
									<th className="px-4 py-3">Project</th>
									<th className="px-4 py-3">Startup</th>
									<th className="px-4 py-3">Status</th>
									<th className="px-4 py-3">Actions</th>
								</tr>
							</thead>
							<tbody className="divide-y">
								{projects.map((p) => (
									<tr key={p.project_id}>
										<td className="px-4 py-3">{p.project_title}</td>
										<td className="px-4 py-3">{p.startup_name}</td>
										<td className="px-4 py-3">{p.status}</td>
										<td className="px-4 py-3 flex flex-wrap gap-2">
											<button type="button" onClick={() => setSelectedProject(p)} className="text-xs font-bold text-emerald-700 hover:underline">View details</button>
											<button type="button" onClick={async () => { await flagProjectContent(p.project_id); load(); }} className="text-xs font-bold text-amber-700">Flag</button>
											<button type="button" onClick={async () => { await removeProject(p.project_id); load(); }} className="text-xs font-bold text-red-600">Remove</button>
											{p.status === "cancelled" ? <button type="button" onClick={async () => { await restoreProject(p.project_id); load(); }} className="text-xs font-bold text-emerald-700">Restore</button> : null}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					{selectedProject ? (
						<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
							<div className="bg-white rounded-2xl max-w-2xl w-full p-6 border shadow-xl max-h-[90vh] overflow-y-auto">
								<div className="flex justify-between items-start mb-4">
									<div>
										<h2 className="text-xl font-bold text-slate-900">{selectedProject.project_title}</h2>
										<p className="text-sm text-slate-500">{selectedProject.startup_name} · {selectedProject.startup_email}</p>
									</div>
									<button type="button" onClick={() => setSelectedProject(null)} className="text-slate-400 hover:text-slate-600 text-xl">×</button>
								</div>
								<dl className="grid sm:grid-cols-2 gap-3 text-sm mb-4">
									<div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500 uppercase">Status</dt><dd className="font-medium capitalize">{selectedProject.status}</dd></div>
									<div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500 uppercase">Funding goal</dt><dd className="font-medium">{Number(selectedProject.funding_goal || 0).toLocaleString()} ETB</dd></div>
									<div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500 uppercase">Raised</dt><dd className="font-medium">{Number(selectedProject.amount_raised || 0).toLocaleString()} ETB</dd></div>
									<div className="rounded-xl bg-slate-50 p-3"><dt className="text-xs text-slate-500 uppercase">Timeline</dt><dd>{selectedProject.start_date ? new Date(selectedProject.start_date).toLocaleDateString() : "—"} – {selectedProject.end_date ? new Date(selectedProject.end_date).toLocaleDateString() : "—"}</dd></div>
								</dl>
								{selectedProject.project_description ? (
									<div className="rounded-xl border border-slate-100 p-4">
										<p className="text-xs font-bold text-slate-500 uppercase mb-2">Description</p>
										<p className="text-sm text-slate-700 whitespace-pre-wrap">{selectedProject.project_description}</p>
									</div>
								) : null}
							</div>
						</div>
					) : null}
				</>
			) : tab === "logs" ? (
				<div className="bg-white rounded-2xl border border-slate-100 divide-y divide-slate-100">
					{logs.length === 0 ? (
						<p className="p-6 text-sm text-slate-500">No flagged messages in this period.</p>
					) : (
						logs.map((log, i) => (
							<div key={`${log.channel}-${log.log_id}-${i}`} className="p-4">
								<div className="flex justify-between gap-2 text-xs text-slate-500 mb-2">
									<span>
										{log.channel || "chat"} · {log.first_name} {log.last_name} · {log.flagged_reason}
									</span>
									<span>{log.created_at ? new Date(log.created_at).toLocaleString() : ""}</span>
								</div>
								<p className="text-sm text-slate-800 bg-slate-50 rounded-xl p-3 border border-slate-100">
									{log.attempted_message || "(content hidden)"}
								</p>
							</div>
						))
					)}
				</div>
			) : (
				<div className="bg-white rounded-2xl border border-slate-100 overflow-x-auto">
					<table className="w-full text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-500 text-left">
							<tr>
								<th className="px-4 py-3">User</th>
								<th className="px-4 py-3">Violations</th>
								<th className="px-4 py-3">Suspended until</th>
								<th className="px-4 py-3">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-100">
							{violations.map((v) => (
								<tr key={v.user_id}>
									<td className="px-4 py-3">
										{v.first_name} {v.last_name}
										<br />
										<span className="text-xs text-slate-500">{v.email}</span>
									</td>
									<td className="px-4 py-3 font-semibold">{v.violation_count ?? v.total_violations}</td>
									<td className="px-4 py-3 text-slate-500">
										{v.is_chat_suspended && v.suspended_until
											? new Date(v.suspended_until).toLocaleString()
											: v.is_chat_suspended
												? "Yes"
												: "—"}
									</td>
									<td className="px-4 py-3">
										<div className="flex flex-wrap gap-1">
											<button
												type="button"
												onClick={() => handleWarn(v.user_id)}
												className="px-2 py-1 rounded-lg bg-amber-100 text-amber-800 text-[10px] font-bold"
											>
												Warn
											</button>
											<button
												type="button"
												onClick={() => handleSuspend(v.user_id)}
												className="px-2 py-1 rounded-lg bg-red-600 text-white text-[10px] font-bold"
											>
												Suspend
											</button>
											<button
												type="button"
												onClick={() => handleUnsuspend(v.user_id)}
												className="px-2 py-1 rounded-lg border text-[10px] font-bold"
											>
												Unsuspend
											</button>
										</div>
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
