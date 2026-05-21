"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { browseStartups, fetchMyStartups } from "@/lib/mentorApi";

export default function MentorStartupsPage() {
	const [tab, setTab] = useState("mine");
	const [mine, setMine] = useState([]);
	const [browse, setBrowse] = useState([]);
	const [search, setSearch] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const load = useCallback(async () => {
		setLoading(true);
		setError("");
		try {
			const [myData, browseData] = await Promise.all([
				fetchMyStartups(),
				browseStartups({ search: search || undefined, limit: 50 }),
			]);
			setMine(myData.startups || []);
			setBrowse(browseData.startups || []);
		} catch (ex) {
			setError(ex.message || "Failed to load startups");
		} finally {
			setLoading(false);
		}
	}, [search]);

	useEffect(() => {
		load();
	}, [load]);

	const list = tab === "mine" ? mine : browse;

	return (
		<div className="p-8 max-w-6xl mx-auto">
			<h1 className="text-2xl font-bold text-gray-900 mb-6">Startups</h1>

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			<div className="flex flex-wrap gap-3 mb-6">
				<button
					type="button"
					onClick={() => setTab("mine")}
					className={`px-4 py-2 rounded-full text-sm font-bold ${
						tab === "mine" ? "bg-[#115543] text-white" : "bg-white border"
					}`}
				>
					My startups ({mine.length})
				</button>
				<button
					type="button"
					onClick={() => setTab("browse")}
					className={`px-4 py-2 rounded-full text-sm font-bold ${
						tab === "browse" ? "bg-[#115543] text-white" : "bg-white border"
					}`}
				>
					Browse all
				</button>
				{tab === "browse" ? (
					<input
						type="text"
						placeholder="Search startups…"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="px-4 py-2 border rounded-full text-sm flex-1 min-w-[200px]"
					/>
				) : null}
			</div>

			{loading ? (
				<p className="text-gray-500 text-sm">Loading…</p>
			) : list.length === 0 ? (
				<p className="text-gray-500 text-sm">No startups found.</p>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{list.map((s) => (
						<div
							key={s.startup_id}
							className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm"
						>
							<h3 className="font-bold text-lg text-gray-900">{s.startup_name}</h3>
							<p className="text-sm text-gray-500 mt-1">{s.industry || "—"} · {s.business_stage || "—"}</p>
							{s.startup_tagline ? (
								<p className="text-sm text-gray-600 mt-2">{s.startup_tagline}</p>
							) : null}
							<div className="mt-4 flex gap-3">
								<Link
									href={`/mentor/requests/profile?startupId=${s.startup_id}`}
									className="text-sm font-bold text-[#115543]"
								>
									View profile
								</Link>
								<Link
									href={`/mentor/requests/proposal?startupId=${s.startup_id}`}
									className="text-sm font-bold text-gray-600"
								>
									Send proposal
								</Link>
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
}
