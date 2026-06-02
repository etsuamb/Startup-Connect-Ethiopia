"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
	fetchEngagementAnalytics,
	fetchFundingAnalytics,
	fetchPendingUsers,
	fetchStartupAnalytics,
	fetchSystemAnalytics,
} from "@/lib/adminApi";
import AdminTabs from "@/components/admin/AdminTabs";
import { useAdminLocale } from "@/components/admin/AdminLocaleProvider";

const STAT_CARDS = [
	{ labelKey: "dashboard.totalUsers", valueKey: "total_users" },
	{ labelKey: "dashboard.verifiedStartups", valueKey: "total_startups" },
	{ labelKey: "dashboard.investors", valueKey: "total_investors" },
	{ labelKey: "dashboard.mentors", valueKey: "total_mentors" },
];

const METRIC_CARDS = [
	{ labelKey: "dashboard.verifiedUsers", valueKey: "total_verified_users" },
	{
		labelKey: "dashboard.platformFeeRevenue",
		valueKey: "revenue_from_platform_fees",
		format: "currency",
	},
	{ labelKey: "dashboard.mentorshipPayments", valueKey: "total_mentorship_transactions" },
	{ labelKey: "dashboard.investmentPayments", valueKey: "total_investment_transactions" },
];

const ACTION_LINKS = [
	{
		href: "/admin/users",
		titleKey: "dashboard.reviewPendingAccounts",
		descriptionKey: "dashboard.reviewPendingAccountsHelp",
	},
	{
		href: "/admin/startups",
		titleKey: "dashboard.manageStartupListings",
		descriptionKey: "dashboard.manageStartupListingsHelp",
	},
	{
		href: "/admin/projects",
		titleKey: "dashboard.reviewProjects",
		descriptionKey: "dashboard.reviewProjectsHelp",
	},
	{
		href: "/admin/mentorship",
		titleKey: "dashboard.mentorshipOversight",
		descriptionKey: "dashboard.mentorshipOversightHelp",
	},
	{
		href: "/admin/reports",
		titleKey: "dashboard.openPlatformReports",
		descriptionKey: "dashboard.openPlatformReportsHelp",
	},
	{
		href: "/admin/investments",
		titleKey: "dashboard.overseeInvestments",
		descriptionKey: "dashboard.overseeInvestmentsHelp",
	},
	{
		href: "/admin/payments",
		titleKey: "dashboard.reviewPayments",
		descriptionKey: "dashboard.reviewPaymentsHelp",
	},
	{
		href: "/admin/moderation",
		titleKey: "dashboard.chatModeration",
		descriptionKey: "dashboard.chatModerationHelp",
	},
	{
		href: "/admin/activity",
		titleKey: "dashboard.systemActivity",
		descriptionKey: "dashboard.systemActivityHelp",
	},
];

const ACTION_PAGE_SIZE = 4;

function formatCardValue(card, stats, loading) {
	if (loading) return "...";
	const raw = stats?.[card.valueKey];
	if (card.format === "currency") {
		return Number(raw || 0).toLocaleString(undefined, {
			style: "currency",
			currency: "ETB",
			maximumFractionDigits: 0,
		});
	}
	return raw ?? 0;
}

export default function AdminDashboard() {
	const { dateLocale, t } = useAdminLocale();
	const [stats, setStats] = useState(null);
	const [startupStats, setStartupStats] = useState(null);
	const [fundingStats, setFundingStats] = useState(null);
	const [engagement, setEngagement] = useState(null);
	const [analyticsTab, setAnalyticsTab] = useState("system");
	const [pendingCount, setPendingCount] = useState(0);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [actionPage, setActionPage] = useState(0);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const [analytics, pending, startups, funding, engage] = await Promise.all([
					fetchSystemAnalytics(),
					fetchPendingUsers(),
					fetchStartupAnalytics(),
					fetchFundingAnalytics(),
					fetchEngagementAnalytics(),
				]);
				if (cancelled) return;
				setStats(analytics.system);
				setStartupStats(startups);
				setFundingStats(funding);
				setEngagement(engage);
				setPendingCount(pending.pending?.length ?? 0);
			} catch (ex) {
				if (!cancelled) setError(ex.message || t("dashboard.loadError"));
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [t]);

	const s = stats || {};
	const actionTotalPages = Math.max(1, Math.ceil(ACTION_LINKS.length / ACTION_PAGE_SIZE));
	const visibleActionLinks = ACTION_LINKS.slice(
		actionPage * ACTION_PAGE_SIZE,
		actionPage * ACTION_PAGE_SIZE + ACTION_PAGE_SIZE,
	);

	return (
		<div className="mx-auto max-w-7xl pb-10">
			{error ? (
				<div className="mb-6 rounded-2xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-medium text-red-700 shadow-sm">
					{error}
				</div>
			) : null}

			<section className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end">
				<div>
					<p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0a4d3c]">{t("dashboard.adminOverview")}</p>
					<h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">StartupConnect Ethiopia</h1>
					<p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">{t("dashboard.intro")}</p>
				</div>
			</section>

			<section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
				{STAT_CARDS.map((card) => (
					<div key={card.labelKey} className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition hover:shadow-md">
						<p className="text-xs font-semibold text-gray-500">{t(card.labelKey)}</p>
						<p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{formatCardValue(card, s, loading)}</p>
					</div>
				))}
			</section>

			<section className="mb-7 rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
				<div className="flex flex-col justify-between gap-3 border-b border-gray-100 pb-4 md:flex-row md:items-center">
					<div>
						<p className="text-xs font-bold uppercase tracking-[0.2em] text-gray-400">{t("dashboard.statisticsOverview")}</p>
						<p className="mt-1 text-sm text-gray-500">
							{t("dashboard.lastUpdated")}:{" "}
							{new Date().toLocaleString(dateLocale, {
								weekday: "short",
								month: "short",
								day: "numeric",
								hour: "numeric",
								minute: "2-digit",
							})}
						</p>
					</div>
				</div>

				<div className="pt-5">
					<AdminTabs
						tabs={[
							{ id: "system", label: t("dashboard.statisticsOverview") },
							{ id: "users", label: t("dashboard.userAnalytics") },
							{ id: "startups", label: t("dashboard.startupAnalytics") },
							{ id: "investments", label: t("dashboard.investmentAnalytics") },
							{ id: "engagement", label: t("dashboard.engagement") },
						]}
						active={analyticsTab}
						onChange={setAnalyticsTab}
					/>

					{analyticsTab === "system" ? (
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
							{METRIC_CARDS.map((card) => (
								<div key={card.labelKey} className="rounded-xl bg-gray-50 p-4 ring-1 ring-inset ring-gray-100">
									<p className="text-xs font-semibold text-gray-500">{t(card.labelKey)}</p>
									<p className="mt-3 text-xl font-bold tracking-tight text-gray-900">{formatCardValue(card, s, loading)}</p>
								</div>
							))}
						</div>
					) : null}
					{analyticsTab === "startups" && startupStats?.by_status ? (
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
							{startupStats.by_status.map((row) => (
								<div key={row.status} className="rounded-xl bg-slate-50 p-4 ring-1 ring-inset ring-slate-100">
									<p className="text-xs font-semibold text-slate-500">{row.status}</p>
									<p className="mt-2 text-2xl font-bold text-slate-900">{row.count}</p>
								</div>
							))}
						</div>
					) : null}
					{analyticsTab === "investments" && fundingStats ? (
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							<AnalyticsValue label={t("dashboard.totalRequests")} value={fundingStats.total_requests ?? fundingStats.total_funding_requests ?? "..."} />
							<AnalyticsValue label={t("dashboard.approved")} value={fundingStats.approved ?? "..."} />
							<AnalyticsValue label={t("dashboard.pending")} value={fundingStats.pending ?? "..."} />
						</div>
					) : null}
					{analyticsTab === "engagement" && engagement ? (
						<div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
							<AnalyticsValue label={t("dashboard.activeUsersRecent")} value={engagement.active_users ?? engagement.total_active ?? "..."} />
						</div>
					) : null}
					{analyticsTab === "users" && stats ? (
						<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
							<AnalyticsValue label={t("dashboard.totalUsers")} value={stats.total_users} />
							<AnalyticsValue label={t("dashboard.verified")} value={stats.total_verified_users} />
							<AnalyticsValue label={t("dashboard.pendingApproval")} value={stats.pending_users} />
							<AnalyticsValue label={t("dashboard.active")} value={stats.active_users} />
						</div>
					) : null}
				</div>
			</section>

			<div className="grid grid-cols-1 gap-7 xl:grid-cols-[1.2fr_0.8fr]">
				<section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0a4d3c]">{t("dashboard.platformPulse")}</p>
							<h2 className="mt-2 text-lg font-bold text-gray-900">{t("dashboard.approvalOverview")}</h2>
						</div>
						<span className="rounded-full bg-[#0a4d3c]/10 px-3 py-1 text-xs font-bold text-[#0a4d3c]">{t("dashboard.operational")}</span>
					</div>

					<div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
						<PulseCard label={t("dashboard.pendingVerifications")} value={loading ? "..." : pendingCount} help={t("dashboard.pendingVerificationsHelp")} />
						<PulseCard label={t("dashboard.activeUserVolume")} value={loading ? "..." : s.active_users ?? 0} help={t("dashboard.activeUserVolumeHelp")} />
						<PulseCard label={t("dashboard.projectsListed")} value={loading ? "..." : s.total_projects ?? 0} help={t("dashboard.projectsListedHelp")} />
						<PulseCard label={t("dashboard.fundingRequests")} value={loading ? "..." : s.total_funding_requests ?? 0} help={t("dashboard.fundingRequestsHelp")} />
					</div>
				</section>

				<section className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
					<div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-4">
						<div>
							<p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0a4d3c]">{t("dashboard.actionCenter")}</p>
							<h2 className="mt-2 text-lg font-bold text-gray-900">{t("dashboard.adminControls")}</h2>
						</div>
						<span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-bold text-orange-700">{t("dashboard.priority")}</span>
					</div>

					<div className="mt-3 divide-y divide-gray-100">
						{visibleActionLinks.map((item) => (
							<Link key={item.href} href={item.href} className="group flex items-center justify-between gap-4 py-3.5">
								<div>
									<p className="text-sm font-bold text-gray-800 transition group-hover:text-[#0a4d3c]">{t(item.titleKey)}</p>
									<p className="mt-1 text-xs leading-5 text-gray-500">{t(item.descriptionKey)}</p>
								</div>
								<span className="text-sm font-bold text-gray-300 transition group-hover:text-[#0a4d3c]">
									→
								</span>
							</Link>
						))}
					</div>

					<div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-4">
						<p className="text-xs text-gray-500">{t("dashboard.page", { current: actionPage + 1, total: actionTotalPages })}</p>
						<div className="flex items-center gap-2">
							<button
								type="button"
								onClick={() => setActionPage((page) => Math.max(0, page - 1))}
								disabled={actionPage === 0}
								className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-bold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
							>
								{t("dashboard.previous")}
							</button>
							<button
								type="button"
								onClick={() => setActionPage((page) => Math.min(actionTotalPages - 1, page + 1))}
								disabled={actionPage >= actionTotalPages - 1}
								className="rounded-lg bg-[#0a4d3c] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#07382b] disabled:cursor-not-allowed disabled:opacity-40"
							>
								{t("dashboard.next")}
							</button>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
}

function AnalyticsValue({ label, value }) {
	return (
		<div className="rounded-xl bg-gray-50 p-4 ring-1 ring-inset ring-gray-100">
			<p className="text-xs font-semibold text-gray-500">{label}</p>
			<p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
		</div>
	);
}

function PulseCard({ label, value, help }) {
	return (
		<div className="rounded-xl border border-gray-100 bg-gray-50/70 p-4">
			<p className="text-xs font-bold text-gray-600">{label}</p>
			<p className="mt-3 text-2xl font-bold tracking-tight text-gray-900">{value}</p>
			<p className="mt-2 text-xs leading-5 text-gray-500">{help}</p>
		</div>
	);
}
