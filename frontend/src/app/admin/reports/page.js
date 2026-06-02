"use client";

import { useEffect, useMemo, useState } from "react";
import {
	downloadReportExport,
	fetchEngagementAnalytics,
	fetchFinancialReport,
	fetchFundingAnalytics,
	fetchKpiReport,
	fetchReportsOverview,
	fetchStartupAnalytics,
	fetchSystemAnalytics,
	fetchUsageReport,
} from "@/lib/adminApi";
import { formatMonthLabel, formatWeekLabel } from "@/lib/adminDisplay";
import { Bar, Line, Pie } from "react-chartjs-2";
import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
PointElement,
LineElement,
ArcElement,
Tooltip,
Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend);

function DownloadButton({ filename = "report.csv", content = "" }) {
function download() {
const blob = new Blob([content], { type: "text/csv;charset=utf-8;" });
const url = URL.createObjectURL(blob);
const a = document.createElement("a");
a.href = url;
a.download = filename;
document.body.appendChild(a);
a.click();
a.remove();
setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
return (
<button
type="button"
onClick={download}
className="inline-flex items-center gap-2 rounded-full bg-[#0a4d3c] text-white px-4 py-2 text-sm font-semibold hover:bg-[#07382b] transition"
>
Download CSV
</button>
);
}

function StatCard({ label, value, delta }) {
return (
<div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
<p className="text-xs font-bold text-slate-400 uppercase">{label}</p>
<p className="text-2xl font-black text-slate-800 mt-1">{value ?? 0}</p>
{typeof delta === "number" ? (
<p className={`text-sm mt-1 ${delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
{delta >= 0 ? `+${delta}%` : `${delta}%`}
</p>
) : null}
</div>
);
}

const overviewConfig = {
  users: { label: "Total Users" },
  startups: { label: "Registered Startups" },
  investors: { label: "Verified Investors" },
  mentors: { label: "Active Mentors" },
  projects: { label: "Total Projects" },
  investment_requests: { label: "Investment Requests" },
  investments: { label: "Completed Investments" },
  payments: { label: "Processed Payments" },
};

export default function AdminReportsPage() {
const [system, setSystem] = useState(null);
const [startupStats, setStartupStats] = useState(null);
const [fundingStats, setFundingStats] = useState(null);
const [engagement, setEngagement] = useState(null);
const [overview, setOverview] = useState(null);
const [financial, setFinancial] = useState(null);
const [usage, setUsage] = useState(null);
const [kpis, setKpis] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [exporting, setExporting] = useState("");

async function handleServerExport(type) {
	setExporting(type);
	setError("");
	try {
		await downloadReportExport(type);
	} catch (ex) {
		setError(ex.message || "Export failed");
	} finally {
		setExporting("");
	}
}

useEffect(() => {
let cancelled = false;
(async () => {
try {
const [sys, startups, funding, engage, ov, fin, use, kpi] = await Promise.all([
fetchSystemAnalytics(),
fetchStartupAnalytics(),
fetchFundingAnalytics(),
fetchEngagementAnalytics(),
fetchReportsOverview(),
fetchFinancialReport(),
fetchUsageReport(30),
fetchKpiReport(),
]);
if (cancelled) return;
setSystem(sys.system);
setStartupStats(startups);
setFundingStats(funding);
setEngagement(engage);
setOverview(ov.overview);
setFinancial(fin);
setUsage(use.usage);
setKpis(kpi.kpis);
} catch (ex) {
if (!cancelled) setError(ex.message || "Failed to load reports");
} finally {
if (!cancelled) setLoading(false);
}
})();
return () => {
cancelled = true;
};
}, []);

const startupsByStatusLabels = useMemo(() => (startupStats?.by_status || []).map((r) => r.status), [startupStats]);
const startupsByStatusData = useMemo(() => (startupStats?.by_status || []).map((r) => r.count), [startupStats]);

const fundingLabels = useMemo(
	() => (fundingStats?.by_month || fundingStats?.monthly_requests || []).map((r) => formatMonthLabel(r.month)),
	[fundingStats],
);
const fundingData = useMemo(
	() => (fundingStats?.by_month || fundingStats?.monthly_requests || []).map((r) => Number(r.amount || 0)),
	[fundingStats],
);

const engagementLabels = useMemo(
	() => (engagement?.by_week || []).map((r) => formatWeekLabel(r.week)),
	[engagement],
);
const engagementData = useMemo(
	() => (engagement?.by_week || []).map((r) => r.active_users),
	[engagement],
);

function makeCSV(obj) {
if (!obj) return "";
if (Array.isArray(obj)) {
const keys = Array.from(new Set(obj.flatMap((r) => Object.keys(r))));
const rows = [keys.join(",")].concat(
obj.map((r) => keys.map((k) => JSON.stringify(r[k] ?? "")).join(",")),
);
return rows.join("\n");
}
return Object.entries(obj)
.map(([k, v]) => `${k},${JSON.stringify(v ?? "")}`)
.join("\n");
}

return (
<div className="max-w-7xl mx-auto pb-12">
<header className="mb-8">
<div>
<h1 className="text-3xl font-bold text-slate-800">Platform activity reports</h1>
<p className="text-sm text-slate-500 mt-1 max-w-2xl">
	Summary of users, funding, engagement, payments, and platform growth. Export data for offline analysis.
</p>
</div>
<div className="flex flex-wrap items-center gap-3 mt-4">
<DownloadButton filename="overview.csv" content={makeCSV(overview)} />
{["users", "projects", "investments"].map((type) => (
<button
key={type}
type="button"
disabled={!!exporting}
onClick={() => handleServerExport(type)}
className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
>
{exporting === type ? "Exporting…" : `Export ${type} (server)`}
</button>
))}
</div>
</header>

{error ? <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div> : null}

{!loading && (financial || usage || kpis) ? (
<section className="grid md:grid-cols-3 gap-4 mb-8">
<div className="bg-white rounded-2xl p-5 border">
<h3 className="text-xs font-bold text-slate-400 uppercase mb-3">KPI reporting</h3>
{kpis ? Object.entries(kpis).slice(0, 6).map(([k, v]) => (
<p key={k} className="text-sm flex justify-between"><span className="text-slate-500">{k.replace(/_/g, " ")}</span><strong>{String(v)}</strong></p>
)) : null}
</div>
<div className="bg-white rounded-2xl p-5 border">
<h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Financial reporting</h3>
{financial?.summary ? Object.entries(financial.summary).map(([k, v]) => (
<p key={k} className="text-sm flex justify-between"><span className="text-slate-500">{k.replace(/_/g, " ")}</span><strong>{Number(v).toLocaleString()}</strong></p>
)) : null}
</div>
<div className="bg-white rounded-2xl p-5 border">
<h3 className="text-xs font-bold text-slate-400 uppercase mb-3">Usage (30 days)</h3>
{usage ? Object.entries(usage).map(([k, v]) => (
<p key={k} className="text-sm flex justify-between"><span className="text-slate-500">{k.replace(/_/g, " ")}</span><strong>{v}</strong></p>
)) : null}
</div>
</section>
) : null}

{loading ? (
<p className="text-slate-500 text-sm">Loading analytics.</p>
) : (
<div className="space-y-8">
<section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
<StatCard label="Users" value={system?.total_users ?? 0} delta={system?.user_delta_percent} />
<StatCard label="Projects" value={system?.total_projects ?? 0} delta={system?.project_delta_percent} />
<StatCard label="Funding requests" value={system?.total_funding_requests ?? 0} delta={system?.funding_delta_percent} />
<StatCard label="Investments" value={system?.total_investments ?? 0} delta={system?.investment_delta_percent} />
</section>

<section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="bg-white rounded-2xl p-6 border border-slate-100">
<h3 className="font-semibold text-slate-800 mb-4">Startups by status</h3>
{startupsByStatusLabels.length ? (
<Pie
data={{
labels: startupsByStatusLabels,
datasets: [{ data: startupsByStatusData, backgroundColor: ["#10B981", "#F97316", "#60A5FA", "#F43F5E"] }],
}}
/>
) : (
<p className="text-sm text-slate-500">No startup status data yet.</p>
)}
</div>
<div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-slate-100">
<h3 className="font-semibold text-slate-800 mb-4">Funding requests by status</h3>
{(fundingStats?.requests_by_status || []).length ? (
<ul className="space-y-2 text-sm">
{fundingStats.requests_by_status.map((r) => (
<li key={r.status} className="flex justify-between border-b border-slate-50 pb-2">
<span className="capitalize">{r.status}</span>
<span className="font-semibold">{r.count} · ETB {Number(r.total_requested || 0).toLocaleString()}</span>
</li>
))}
</ul>
) : (
<p className="text-sm text-slate-500">No funding request breakdown available.</p>
)}
</div>
</section>

<section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
<div className="bg-white rounded-2xl p-6 border border-slate-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-slate-800">Monthly funding requests</h3>
<DownloadButton filename="funding_by_month.csv" content={makeCSV(fundingStats?.by_month || fundingStats?.monthly_requests)} />
</div>
{fundingLabels.length ? (
<Line
data={{
labels: fundingLabels,
datasets: [
{
label: "Requested amount (ETB)",
data: fundingData,
borderColor: "#10B981",
backgroundColor: "rgba(16,185,129,0.08)",
},
],
}}
options={{ responsive: true, plugins: { legend: { display: true } } }}
/>
) : (
<p className="text-sm text-slate-500">No funding requests recorded yet. Data appears when startups receive investment offers.</p>
)}
</div>

<div className="bg-white rounded-2xl p-6 border border-slate-100">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-slate-800">Weekly admin activity</h3>
<DownloadButton filename="engagement_by_week.csv" content={makeCSV(engagement?.by_week)} />
</div>
{engagementLabels.length ? (
<Bar
data={{
labels: engagementLabels,
datasets: [
{
label: "Active admin actions",
data: engagementData,
backgroundColor: "#60A5FA",
},
],
}}
options={{ responsive: true }}
/>
) : (
<p className="text-sm text-slate-500">Activity chart builds from audit log entries over the last 12 weeks.</p>
)}
</div>
</section>

{engagement?.mentorship || engagement?.chat ? (
<section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
{engagement.mentorship ? Object.entries(engagement.mentorship).map(([k, v]) => (
<div key={k} className="bg-white rounded-xl p-4 border">
<p className="text-xs text-slate-500 uppercase">{k.replace(/_/g, " ")}</p>
<p className="text-xl font-bold mt-1">{v}</p>
</div>
)) : null}
{engagement.chat ? Object.entries(engagement.chat).slice(0, 2).map(([k, v]) => (
<div key={k} className="bg-white rounded-xl p-4 border">
<p className="text-xs text-slate-500 uppercase">{k.replace(/_/g, " ")}</p>
<p className="text-xl font-bold mt-1">{v}</p>
</div>
)) : null}
</section>
) : null}

{overview ? (
<section className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
<h3 className="font-bold text-slate-800 text-lg mb-6">Platform Directory Overview</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{Object.entries(overviewConfig).map(([key, config]) => {
const val = overview[key] ?? 0;
return (
<div
key={key}
className="rounded-2xl border border-gray-100 bg-gray-50/50 p-5 hover:bg-white hover:border-gray-200 hover:shadow-sm transition-all duration-300"
>
<p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">{config.label}</p>
<p className="text-2xl font-black text-gray-800 mt-1">{val}</p>
</div>
);
})}
</div>
</section>
) : null}
</div>
)}
</div>
);
}
