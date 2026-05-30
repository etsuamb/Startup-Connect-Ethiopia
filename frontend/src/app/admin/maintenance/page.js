"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
	clearOldAuditLogs,
	createCategory,
	deleteCategory,
	downloadBackup,
	fetchBackupStatus,
	fetchCategories,
	fetchMaintenanceStatus,
	fetchPlatformSettings,
	scheduleReport,
	restoreBackup,
	triggerBackup,
	updatePlatformSettings,
} from "@/lib/adminApi";
import AdminTabs from "@/components/admin/AdminTabs";

const TABS = [
	{ id: "health", label: "Database & backup" },
	{ id: "categories", label: "Categories" },
	{ id: "config", label: "Platform config" },
	{ id: "housekeeping", label: "Housekeeping" },
];

const CONFIG_LABELS = {
	userRegistration: "Allow new user sign-ups",
	strictVerification: "Require manual admin approval for new users",
	twoFactorRequired: "Require two-factor authentication",
	notifNewUsers: "Notify admins of new registrations",
	notifVerification: "Notify admins of verification requests",
	notifAlerts: "Send system alert notifications",
};

export default function AdminMaintenancePage() {
	const [tab, setTab] = useState("health");
	const [status, setStatus] = useState(null);
	const [backup, setBackup] = useState(null);
	const [backupLogs, setBackupLogs] = useState([]);
	const [categories, setCategories] = useState([]);
	const [config, setConfig] = useState(null);
	const [days, setDays] = useState(365);
	const [reportType, setReportType] = useState("users");
	const [newCat, setNewCat] = useState({ name: "", slug: "" });
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState("");
	const [msg, setMsg] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		try {
			const [st, bk, cats, settings] = await Promise.all([
				fetchMaintenanceStatus(),
				fetchBackupStatus(),
				fetchCategories(),
				fetchPlatformSettings(),
			]);
			setStatus(st);
			setBackup(bk.backup);
			setBackupLogs(bk.logs || []);
			setCategories(cats.categories || []);
			setConfig(settings.settings?.platform_config || null);
		} catch (ex) {
			setError(ex.message);
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		load();
	}, [load]);

	async function handleClearLogs() {
		if (!window.confirm(`Delete audit logs older than ${days} days? This cannot be undone.`)) return;
		setBusy(true);
		try {
			const data = await clearOldAuditLogs(days);
			setMsg(data.message || `Deleted ${data.deleted} entries`);
		} catch (ex) {
			setError(ex.message);
		} finally {
			setBusy(false);
		}
	}

	async function saveConfig() {
		if (!config) return;
		setBusy(true);
		try {
			await updatePlatformSettings(config);
			setMsg("Platform configuration saved — registration and notification rules are now active.");
		} catch (ex) {
			setError(ex.message);
		} finally {
			setBusy(false);
		}
	}

	return (
		<div className="max-w-4xl mx-auto pb-12">
			<section className="mb-8 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-3xl font-bold mb-2">System maintenance</h1>
				<p className="text-slate-300 text-sm max-w-2xl">
					Operational tools for database health, backup tracking, industry categories, platform rules, and log housekeeping. Each action below writes to the server and appears in audit logs where applicable.
				</p>
			</section>

			{error ? <div className="mb-4 p-4 rounded-2xl bg-red-50 text-red-700 text-sm">{error}</div> : null}
			{msg ? <div className="mb-4 p-4 rounded-2xl bg-emerald-50 text-emerald-800 text-sm">{msg}</div> : null}

			<AdminTabs tabs={TABS} active={tab} onChange={setTab} />

			{loading ? (
				<p className="text-sm text-slate-500">Loading…</p>
			) : tab === "health" ? (
				<div className="space-y-6">
					<div className="bg-white rounded-2xl border p-6">
						<h2 className="font-bold mb-1">Database connection</h2>
						<p className="text-xs text-slate-500 mb-3">Checks that the API can reach PostgreSQL right now.</p>
						<p className={`text-sm font-semibold ${status?.database === "ok" ? "text-emerald-700" : "text-red-700"}`}>
							{status?.database === "ok" ? "● Connected and responding" : "● Unavailable — check backend and DATABASE_URL"}
						</p>
						{status?.timestamp ? (
							<p className="text-xs text-slate-400 mt-2">Last checked {new Date(status.timestamp).toLocaleString()}</p>
						) : null}
						<p className="text-xs text-slate-500 mt-3 border-t pt-3">
							Schema migrations: run <code className="bg-slate-100 px-1 rounded">node scripts/run_migration.js</code> from the backend folder when deploying schema changes.
						</p>
					</div>
					<div className="bg-white rounded-2xl border p-6">
						<h2 className="font-bold mb-1">Backup tracking</h2>
						<p className="text-xs text-slate-500 mb-3">
							Creates a downloadable JSON snapshot of the public database tables and records each backup attempt.
						</p>
						<dl className="text-sm space-y-2 mb-4">
							<div className="flex justify-between">
								<dt className="text-slate-500">Last backup</dt>
								<dd>{backup?.last_backup_at ? new Date(backup.last_backup_at).toLocaleString() : "Never recorded"}</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-slate-500">Status</dt>
								<dd className="capitalize">{backup?.last_backup_status || "not configured"}</dd>
							</div>
							<div className="flex justify-between">
								<dt className="text-slate-500">Storage</dt>
								<dd>{backup?.storage || "manual"}</dd>
							</div>
						</dl>
						<button
							type="button"
							disabled={busy}
							onClick={async () => {
								setBusy(true);
								try {
									const d = await triggerBackup();
									setMsg(d.message || "Backup metadata recorded.");
									await load();
								} catch (ex) {
									setError(ex.message);
								} finally {
									setBusy(false);
								}
							}}
							className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold disabled:opacity-50"
						>
							Create backup now
						</button>
						<div className="mt-5 border-t pt-4">
							<h3 className="mb-3 text-sm font-bold">Backup logs</h3>
							<div className="space-y-2">
								{backupLogs.length ? backupLogs.map((log) => (
									<div key={log.backup_log_id} className="flex flex-col gap-2 rounded-xl border border-slate-100 bg-slate-50 p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
										<div>
											<p className="font-bold text-slate-900">#{log.backup_log_id} - {log.status}</p>
											<p className="text-slate-500">
												{log.completed_at ? new Date(log.completed_at).toLocaleString() : new Date(log.started_at).toLocaleString()}
												{log.file_size_bytes ? ` - ${Number(log.file_size_bytes).toLocaleString()} bytes` : ""}
											</p>
											{log.error_message ? <p className="mt-1 text-red-600">{log.error_message}</p> : null}
										</div>
										{log.status === "completed" ? (
											<div className="flex flex-wrap gap-2">
												<button
													type="button"
													onClick={async () => {
														try {
															await downloadBackup(log.backup_log_id);
														} catch (ex) {
															setError(ex.message);
														}
													}}
													className="self-start rounded-lg border border-emerald-200 bg-white px-3 py-1.5 font-bold text-emerald-700"
												>
													Download
												</button>
												<button
													type="button"
													onClick={async () => {
														if (!window.confirm("Restore this backup? This replaces current database rows.")) return;
														try {
															const d = await restoreBackup(log.backup_log_id);
															setMsg(d.message || "Backup restored.");
															await load();
														} catch (ex) {
															setError(ex.message);
														}
													}}
													className="self-start rounded-lg border border-red-200 bg-white px-3 py-1.5 font-bold text-red-700"
												>
													Restore
												</button>
											</div>
										) : null}
									</div>
								)) : (
									<p className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">No backup logs yet.</p>
								)}
							</div>
						</div>
					</div>
				</div>
			) : tab === "categories" ? (
				<div className="space-y-6">
					<div className="bg-white rounded-2xl border p-6">
						<h2 className="font-bold mb-1">Industry categories</h2>
						<p className="text-xs text-slate-500 mb-4">
							Categories used in filters and registration forms across the platform (e.g. Technology, Agriculture).
						</p>
						<ul className="divide-y mb-4">
							{categories.length === 0 ? (
								<li className="py-3 text-sm text-slate-500">No categories yet.</li>
							) : categories.map((c) => (
								<li key={c.category_id} className="py-2 flex justify-between text-sm">
									<span>{c.name} <span className="text-slate-400">({c.slug})</span></span>
									<button type="button" onClick={async () => { await deleteCategory(c.category_id); await load(); }} className="text-red-600 text-xs font-bold">Delete</button>
								</li>
							))}
						</ul>
						<div className="flex gap-2">
							<input placeholder="Display name" value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} className="flex-1 px-3 py-2 border rounded-xl text-sm" />
							<input placeholder="slug" value={newCat.slug} onChange={(e) => setNewCat({ ...newCat, slug: e.target.value })} className="flex-1 px-3 py-2 border rounded-xl text-sm" />
							<button type="button" onClick={async () => { await createCategory({ ...newCat, category_type: "industry" }); setNewCat({ name: "", slug: "" }); await load(); }} className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-sm font-bold">Add</button>
						</div>
					</div>
				</div>
			) : tab === "config" && config ? (
				<div className="bg-white rounded-2xl border p-6 space-y-4">
					<h2 className="font-bold mb-1">Platform configuration</h2>
					<p className="text-xs text-slate-500 mb-2">
						These toggles control registration, verification, and admin notifications. Same settings can also be edited under Settings.
					</p>
					{Object.entries(config).map(([key, val]) => (
						<label key={key} className="flex items-center justify-between gap-4 text-sm border-b border-slate-50 pb-3">
							<span className="font-medium">{CONFIG_LABELS[key] || key.replace(/([A-Z])/g, " $1")}</span>
							{typeof val === "boolean" ? (
								<input
									type="checkbox"
									checked={!!val}
									onChange={(e) => setConfig({ ...config, [key]: e.target.checked })}
								/>
							) : (
								<span className="text-slate-500 text-xs">{String(val)}</span>
							)}
						</label>
					))}
					<button type="button" disabled={busy} onClick={saveConfig} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold disabled:opacity-50">
						Save configuration
					</button>
				</div>
			) : tab === "housekeeping" ? (
				<div className="space-y-6">
					<div className="bg-white rounded-2xl border p-6">
						<h2 className="font-bold mb-1">Clear old audit logs</h2>
						<p className="text-xs text-slate-500 mb-3">Permanently removes audit entries older than the threshold to free database space.</p>
						<label className="block text-xs font-bold text-slate-500 mb-1">Keep logs from the last (days)</label>
						<input type="number" min={30} value={days} onChange={(e) => setDays(Number(e.target.value))} className="w-full max-w-xs px-4 py-2 border rounded-xl mb-4" />
						<button type="button" disabled={busy} onClick={handleClearLogs} className="px-5 py-2.5 rounded-xl bg-red-600 text-white text-sm font-bold disabled:opacity-50">Clear audit logs</button>
					</div>
					<div className="bg-white rounded-2xl border p-6">
						<h2 className="font-bold mb-1">Schedule report export</h2>
						<p className="text-xs text-slate-500 mb-3">Records a scheduled export request in audit logs. Download immediately from the Reports page.</p>
						<select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full max-w-xs px-4 py-2 border rounded-xl mb-4 bg-white">
							<option value="users">Users</option>
							<option value="projects">Projects</option>
							<option value="investments">Investments</option>
						</select>
						<button type="button" disabled={busy} onClick={async () => { const d = await scheduleReport(reportType); setMsg(d.message); }} className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white text-sm font-bold disabled:opacity-50">Record schedule</button>
					</div>
				</div>
			) : null}

			<p className="text-sm text-slate-500 mt-8">
				Related: <Link href="/admin/reports" className="text-emerald-700 font-bold">Reports</Link>
				{" · "}
				<Link href="/admin/activity" className="text-emerald-700 font-bold">Activity & audit</Link>
				{" · "}
				<Link href="/admin/settings" className="text-emerald-700 font-bold">Settings</Link>
			</p>
		</div>
	);
}
