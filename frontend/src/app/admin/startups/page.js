"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
	fetchDashboardInvestors,
	fetchDashboardMentors,
	fetchDashboardStartups,
	updateInvestorApproval,
	updateMentorApproval,
	updateStartupStatus,
} from "@/lib/adminApi";

const TABS = [
	{ id: "all", label: "All" },
	{ id: "startup", label: "Startups" },
	{ id: "mentor", label: "Mentors" },
	{ id: "investor", label: "Investors" },
];

const STARTUP_STATUSES = ["Pending", "Active", "Funded", "Closed"];

const STATUS_STYLE = {
	Pending: "bg-amber-50 text-amber-800 ring-amber-200/80",
	Active: "bg-emerald-50 text-emerald-800 ring-emerald-200/80",
	Funded: "bg-sky-50 text-sky-800 ring-sky-200/80",
	Closed: "bg-slate-100 text-slate-600 ring-slate-200/80",
};

const TYPE_STYLE = {
	startup: "bg-orange-50 text-orange-800 ring-orange-200/80",
	mentor: "bg-rose-50 text-rose-800 ring-rose-200/80",
	investor: "bg-blue-50 text-blue-800 ring-blue-200/80",
};

function normalizeStartups(rows) {
	return (rows || []).map((s) => ({
		kind: "startup",
		id: s.startup_id,
		name: s.startup_name,
		subtitle: s.startup_tagline,
		person: [s.first_name, s.last_name].filter(Boolean).join(" ") || "—",
		email: s.owner_email,
		focus: s.industry,
		extra: s.business_stage,
		listed: Boolean(s.is_listed),
		status: s.status || "Pending",
		editable: Boolean(s.is_approved && s.is_active),
		raw: s,
	}));
}

function normalizeMentors(rows) {
	return (rows || []).map((m) => ({
		kind: "mentor",
		id: m.mentor_id,
		name: m.professional_title || m.headline || [m.first_name, m.last_name].filter(Boolean).join(" "),
		subtitle: m.primary_industry,
		person: [m.first_name, m.last_name].filter(Boolean).join(" ") || "—",
		email: m.email,
		focus: m.expertise,
		extra: m.years_experience != null ? `${m.years_experience} yrs` : null,
		listed: Boolean(m.is_approved),
		status: m.is_approved ? "Listed" : "Hidden",
		editable: Boolean(m.user_approved && m.is_active),
		raw: m,
	}));
}

function normalizeInvestors(rows) {
	return (rows || []).map((i) => ({
		kind: "investor",
		id: i.investor_id,
		name: i.organization_name || [i.first_name, i.last_name].filter(Boolean).join(" "),
		subtitle: i.investor_type,
		person: [i.first_name, i.last_name].filter(Boolean).join(" ") || "—",
		email: i.email,
		focus: i.preferred_industry,
		extra: i.investment_stage,
		listed: Boolean(i.is_approved),
		status: i.is_approved ? "Listed" : "Hidden",
		editable: Boolean(i.user_approved && i.is_active),
		raw: i,
	}));
}

function ListedCell({ listed }) {
	return listed ? (
		<span className="inline-flex items-center gap-1.5 text-emerald-700">
			<span className="h-2 w-2 rounded-full bg-emerald-500" />
			Listed
		</span>
	) : (
		<span className="inline-flex items-center gap-1.5 text-slate-500">
			<span className="h-2 w-2 rounded-full bg-slate-300" />
			Hidden
		</span>
	);
}

export default function AdminDirectoryPage() {
	const [tab, setTab] = useState("all");
	const [rows, setRows] = useState([]);
	const [counts, setCounts] = useState({ startup: 0, mentor: 0, investor: 0, listed: 0 });
	const [search, setSearch] = useState("");
	const [visibilityFilter, setVisibilityFilter] = useState("");
	const [statusFilter, setStatusFilter] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [busyId, setBusyId] = useState(null);
	const [editRow, setEditRow] = useState(null);
	const [note, setNote] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const base = { limit: 200, account: "approved" };
			if (visibilityFilter === "listed") base.listed = "true";
			if (visibilityFilter === "hidden") base.listed = "false";

			const startupParams = { ...base };
			if (statusFilter) startupParams.status = statusFilter;

			const [startupRes, mentorRes, investorRes] = await Promise.all([
				fetchDashboardStartups(startupParams),
				fetchDashboardMentors(base),
				fetchDashboardInvestors(base),
			]);

			const combined = [
				...normalizeStartups(startupRes.startups),
				...normalizeMentors(mentorRes.mentors),
				...normalizeInvestors(investorRes.investors),
			].sort((a, b) => a.name.localeCompare(b.name));

			setRows(combined);
			setCounts({
				startup: startupRes.summary?.total ?? startupRes.startups?.length ?? 0,
				mentor: mentorRes.summary?.total ?? mentorRes.mentors?.length ?? 0,
				investor: investorRes.summary?.total ?? investorRes.investors?.length ?? 0,
				listed:
					(startupRes.summary?.listed ?? 0) +
					(mentorRes.summary?.listed ?? 0) +
					(investorRes.summary?.listed ?? 0),
			});
		} catch (ex) {
			setError(ex.message || "Failed to load directory");
		} finally {
			setLoading(false);
		}
	}, [tab, visibilityFilter, statusFilter]);

	useEffect(() => {
		load();
	}, [load]);

	const filtered = useMemo(() => {
		let list = rows;
		if (tab !== "all") list = list.filter((r) => r.kind === tab);
		const q = search.trim().toLowerCase();
		if (!q) return list;
		return list.filter((r) => {
			const blob = [r.name, r.subtitle, r.person, r.email, r.focus, r.extra, r.kind]
				.filter(Boolean)
				.join(" ")
				.toLowerCase();
			return blob.includes(q);
		});
	}, [rows, search, tab]);

	const showStartupStatusFilter = tab === "all" || tab === "startup";

	async function saveEdit() {
		if (!editRow) return;
		setBusyId(`${editRow.kind}-${editRow.id}`);
		setError("");
		try {
			if (editRow.kind === "startup") {
				await updateStartupStatus(editRow.id, editRow.nextValue, note);
			} else if (editRow.kind === "mentor") {
				await updateMentorApproval(editRow.id, editRow.nextValue === "listed", note);
			} else {
				await updateInvestorApproval(editRow.id, editRow.nextValue === "listed", note);
			}
			setEditRow(null);
			setNote("");
			load();
		} catch (ex) {
			setError(ex.message || "Update failed");
		} finally {
			setBusyId(null);
		}
	}

	return (
		<div className="max-w-7xl mx-auto pb-12">
			{editRow ? (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4" role="dialog">
					<div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl border border-slate-200">
						<h2 className="text-lg font-semibold text-slate-900">Update</h2>
						<p className="mt-1 text-sm text-slate-600 truncate">{editRow.name}</p>
						<p className="mt-3 text-sm font-medium text-slate-800 capitalize">
							{editRow.kind} · {editRow.nextLabel}
						</p>
						<input
							type="text"
							value={note}
							onChange={(e) => setNote(e.target.value)}
							placeholder="Note (optional)"
							className="mt-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"
						/>
						<div className="mt-6 flex gap-2">
							<button
								type="button"
								onClick={() => {
									setEditRow(null);
									setNote("");
								}}
								className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
							>
								Cancel
							</button>
							<button
								type="button"
								onClick={saveEdit}
								disabled={busyId != null}
								className="flex-1 rounded-lg bg-emerald-600 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
							>
								{busyId != null ? "Saving…" : "Save"}
							</button>
						</div>
					</div>
				</div>
			) : null}

			<header className="mb-6 rounded-[32px] bg-gradient-to-r from-slate-900 to-slate-800 text-white p-8">
				<h1 className="text-2xl md:text-3xl font-bold tracking-tight">Public directory</h1>
				<p className="text-slate-300 text-sm mt-2 max-w-3xl">
					Manage which approved startups, mentors, and investors appear in Discover search. Listed profiles are visible to other users; hidden profiles remain in the system but are not shown publicly. Startups can also have an operational status (Pending, Active, Funded, Closed).
				</p>
			</header>

			{error ? (
				<div className="mb-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
					{error}
				</div>
			) : null}

			<div className="mb-6 flex flex-wrap gap-2 border-b border-slate-200 pb-1">
				{TABS.map((t) => (
					<button
						key={t.id}
						type="button"
						onClick={() => setTab(t.id)}
						className={`px-4 py-2 text-sm font-semibold rounded-t-lg border-b-2 -mb-px transition ${
							tab === t.id
								? "border-emerald-600 text-emerald-700"
								: "border-transparent text-slate-500 hover:text-slate-800"
						}`}
					>
						{t.label}
					</button>
				))}
			</div>

			<div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
				{[
					{ label: "Startups", value: counts.startup },
					{ label: "Mentors", value: counts.mentor },
					{ label: "Investors", value: counts.investor },
					{ label: "Listed", value: counts.listed },
				].map((item) => (
					<div key={item.label} className="rounded-xl border border-slate-200 bg-white px-4 py-3">
						<p className="text-xs text-slate-500">{item.label}</p>
						<p className="text-xl font-semibold text-slate-900 tabular-nums">{item.value ?? "—"}</p>
					</div>
				))}
			</div>

			<div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<div className="relative flex-1 max-w-md">
					<svg
						className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
						/>
					</svg>
					<input
						type="search"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search…"
						className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
					/>
				</div>
				<div className="flex flex-wrap gap-2">
					<select
						value={visibilityFilter}
						onChange={(e) => setVisibilityFilter(e.target.value)}
						className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
					>
						<option value="">All visibility</option>
						<option value="listed">Listed</option>
						<option value="hidden">Hidden</option>
					</select>
					{showStartupStatusFilter ? (
						<select
							value={statusFilter}
							onChange={(e) => setStatusFilter(e.target.value)}
							className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700"
						>
							<option value="">All startup statuses</option>
							{STARTUP_STATUSES.map((st) => (
								<option key={st} value={st}>
									{st}
								</option>
							))}
						</select>
					) : null}
				</div>
			</div>

			<div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
				{loading ? (
					<p className="px-6 py-16 text-center text-sm text-slate-500">Loading…</p>
				) : filtered.length === 0 ? (
					<p className="px-6 py-16 text-center text-sm text-slate-500">No results.</p>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full min-w-[880px] text-sm">
							<thead>
								<tr className="border-b border-slate-100 bg-slate-50/80 text-left text-xs font-medium uppercase tracking-wide text-slate-500">
									<th className="px-4 py-3 font-semibold">Type</th>
									<th className="px-4 py-3 font-semibold">Profile</th>
									<th className="px-4 py-3 font-semibold">Member</th>
									<th className="px-4 py-3 font-semibold">Focus</th>
									<th className="px-4 py-3 font-semibold">Detail</th>
									<th className="px-4 py-3 font-semibold">Visibility</th>
									<th className="px-4 py-3 font-semibold">Status</th>
									<th className="px-4 py-3 font-semibold w-32" />
								</tr>
							</thead>
							<tbody className="divide-y divide-slate-100">
								{filtered.map((r) => {
									const rowKey = `${r.kind}-${r.id}`;
									const isBusy = busyId === rowKey;

									return (
										<tr key={rowKey} className="hover:bg-slate-50/60">
											<td className="px-4 py-3.5">
												<span
													className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium capitalize ring-1 ring-inset ${
														TYPE_STYLE[r.kind]
													}`}
												>
													{r.kind}
												</span>
											</td>
											<td className="px-4 py-3.5">
												<p className="font-medium text-slate-900">{r.name}</p>
												{r.subtitle ? (
													<p className="text-xs text-slate-500 truncate max-w-[180px]">{r.subtitle}</p>
												) : null}
											</td>
											<td className="px-4 py-3.5">
												<p className="text-slate-800">{r.person}</p>
												<p className="text-xs text-slate-500">{r.email}</p>
											</td>
											<td className="px-4 py-3.5 text-slate-700 max-w-[140px] truncate">
												{r.focus || "—"}
											</td>
											<td className="px-4 py-3.5 text-slate-700">{r.extra || "—"}</td>
											<td className="px-4 py-3.5">
												<ListedCell listed={r.listed} />
											</td>
											<td className="px-4 py-3.5">
												{r.kind === "startup" ? (
													<span
														className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
															STATUS_STYLE[r.status] || STATUS_STYLE.Pending
														}`}
													>
														{r.status}
													</span>
												) : (
													<span className="text-xs font-medium text-slate-600">{r.status}</span>
												)}
											</td>
											<td className="px-4 py-3.5">
												{r.kind === "startup" ? (
													<select
														disabled={!r.editable || isBusy}
														value={r.status}
														title={r.editable ? undefined : "Account inactive"}
														onChange={(e) => {
															const next = e.target.value;
															if (next === r.status) return;
															setEditRow({
																kind: "startup",
																id: r.id,
																name: r.name,
																nextValue: next,
																nextLabel: next,
															});
														}}
														className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium disabled:opacity-40"
													>
														{STARTUP_STATUSES.map((st) => (
															<option key={st} value={st}>
																{st}
															</option>
														))}
													</select>
												) : (
													<select
														disabled={!r.editable || isBusy}
														value={r.listed ? "listed" : "hidden"}
														title={r.editable ? undefined : "Account inactive"}
														onChange={(e) => {
															const next = e.target.value;
															const nextLabel = next === "listed" ? "Listed" : "Hidden";
															if ((next === "listed") === r.listed) return;
															setEditRow({
																kind: r.kind,
																id: r.id,
																name: r.name,
																nextValue: next,
																nextLabel,
															});
														}}
														className="w-full rounded-lg border border-slate-200 px-2 py-1.5 text-xs font-medium disabled:opacity-40"
													>
														<option value="listed">Listed</option>
														<option value="hidden">Hidden</option>
													</select>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>

			{!loading && filtered.length > 0 ? (
				<p className="mt-3 text-xs text-slate-400 tabular-nums">
					{filtered.length} {filtered.length === 1 ? "entry" : "entries"}
				</p>
			) : null}
		</div>
	);
}
