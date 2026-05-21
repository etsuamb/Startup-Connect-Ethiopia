"use client";

import { useEffect, useMemo, useState } from "react";
import {
fetchEngagementAnalytics,
fetchFundingAnalytics,
fetchReportsOverview,
fetchStartupAnalytics,
fetchSystemAnalytics,
} from "@/lib/adminApi";
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
className="inline-flex items-center gap-2 rounded-full bg-emerald-600 text-white px-4 py-2 text-sm font-semibold hover:bg-emerald-700 transition"
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

const colorClasses = {
  indigo: { bg: "bg-indigo-50 text-indigo-600", border: "border-indigo-100", text: "text-indigo-700" },
  emerald: { bg: "bg-emerald-50 text-emerald-600", border: "border-emerald-100", text: "text-emerald-700" },
  violet: { bg: "bg-violet-50 text-violet-600", border: "border-violet-100", text: "text-violet-700" },
  amber: { bg: "bg-amber-50 text-amber-600", border: "border-amber-100", text: "text-amber-700" },
  sky: { bg: "bg-sky-50 text-sky-600", border: "border-sky-100", text: "text-sky-700" },
  rose: { bg: "bg-rose-50 text-rose-600", border: "border-rose-100", text: "text-rose-700" },
  teal: { bg: "bg-teal-50 text-teal-600", border: "border-teal-100", text: "text-teal-700" },
  orange: { bg: "bg-orange-50 text-orange-600", border: "border-orange-100", text: "text-orange-700" },
};

const overviewConfig = {
  users: {
    label: "Total Users",
    color: "indigo",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  startups: {
    label: "Registered Startups",
    color: "emerald",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  investors: {
    label: "Verified Investors",
    color: "violet",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  mentors: {
    label: "Active Mentors",
    color: "amber",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  projects: {
    label: "Total Projects",
    color: "sky",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  investment_requests: {
    label: "Investment Requests",
    color: "rose",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
      </svg>
    ),
  },
  investments: {
    label: "Completed Investments",
    color: "teal",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  payments: {
    label: "Processed Payments",
    color: "orange",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      </svg>
    ),
  },
};

export default function AdminReportsPage() {
const [system, setSystem] = useState(null);
const [startupStats, setStartupStats] = useState(null);
const [fundingStats, setFundingStats] = useState(null);
const [engagement, setEngagement] = useState(null);
const [overview, setOverview] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");

useEffect(() => {
let cancelled = false;
(async () => {
try {
const [sys, startups, funding, engage, ov] = await Promise.all([
fetchSystemAnalytics(),
fetchStartupAnalytics(),
fetchFundingAnalytics(),
fetchEngagementAnalytics(),
fetchReportsOverview(),
]);
if (cancelled) return;
setSystem(sys.system);
setStartupStats(startups);
setFundingStats(funding);
setEngagement(engage);
setOverview(ov.overview);
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

const fundingLabels = useMemo(() => (fundingStats?.by_month || []).map((r) => r.month), [fundingStats]);
const fundingData = useMemo(() => (fundingStats?.by_month || []).map((r) => r.amount), [fundingStats]);

const engagementLabels = useMemo(() => (engagement?.by_week || []).map((r) => r.week), [engagement]);
const engagementData = useMemo(() => (engagement?.by_week || []).map((r) => r.active_users), [engagement]);

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
<header className="flex items-start justify-between gap-4 mb-8">
<div>
<h1 className="text-3xl font-bold text-slate-800">Platform Reports</h1>
<p className="text-sm text-slate-500 mt-1">Analytics, trends and downloadable data for administrators.</p>
</div>
<div className="flex items-center gap-3">
<DownloadButton filename="overview.csv" content={makeCSV(overview)} />
</div>
</header>

{error ? <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div> : null}

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
datasets: [
{
data: startupsByStatusData,
backgroundColor: ["#10B981", "#F97316", "#60A5FA", "#F43F5E"],
},
],
}}
/>
) : (
<p className="text-sm text-slate-500">No data</p>
)}
</div>

<div className="bg-white rounded-2xl p-6 border border-slate-100 lg:col-span-2">
<div className="flex items-center justify-between mb-4">
<h3 className="font-semibold text-slate-800">Monthly funding</h3>
<DownloadButton filename="funding_by_month.csv" content={makeCSV(fundingStats?.by_month)} />
</div>
{fundingLabels.length ? (
<Line
data={{
labels: fundingLabels,
datasets: [
{
label: "Amount",
data: fundingData,
borderColor: "#10B981",
backgroundColor: "rgba(16,185,129,0.08)",
},
],
}}
/>
) : (
<p className="text-sm text-slate-500">No funding data</p>
)}
</div>
</section>

<section className="bg-white rounded-2xl p-6 border border-slate-100">
<div className="flex items-center justify-between">
<h3 className="font-semibold text-slate-800">Weekly engagement</h3>
<DownloadButton filename="engagement_by_week.csv" content={makeCSV(engagement?.by_week)} />
</div>
{engagementLabels.length ? (
<Bar
data={{
labels: engagementLabels,
datasets: [
{
label: "Active users",
data: engagementData,
backgroundColor: "#60A5FA",
},
],
}}
/>
) : (
<p className="text-sm text-slate-500 mt-4">No engagement data</p>
)}
</section>

{overview ? (
<section className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm">
<h3 className="font-bold text-slate-800 text-lg mb-6">Platform Directory Overview</h3>
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
{Object.entries(overviewConfig).map(([key, config]) => {
const val = overview[key] ?? 0;
const colorClass = colorClasses[config.color] || colorClasses.indigo;
return (
<div
key={key}
className="flex items-center gap-4 p-5 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-200 hover:shadow-md transition-all duration-300 group"
>
<div className={`p-3.5 rounded-xl ${colorClass.bg} transition-all duration-300 group-hover:scale-110`}>
{config.icon}
</div>
<div>
<p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{config.label}</p>
<p className="text-2xl font-black text-slate-800 mt-1">{val}</p>
</div>
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
