"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiFetch } from "@/lib/api";

function fmtMoney(n) {
	const x = Number(n);
	if (!Number.isFinite(x)) return "—";
	return new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0,
	}).format(x);
}

export default function StartupProjectListFromApi() {
	const [data, setData] = useState(null);
	const [err, setErr] = useState("");

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await apiFetch("/projects");
				if (!cancelled) setData(res);
			} catch (e) {
				if (!cancelled) setErr(e.message || "Failed to load projects");
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	if (err) {
		return (
			<p className="text-sm text-red-600 font-medium mb-6">{err}</p>
		);
	}

	if (!data) {
		return (
			<p className="text-sm text-gray-500 font-medium mb-6">
				Loading projects…
			</p>
		);
	}

	if (data.pending_admin_approval) {
		return (
			<div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-8">
				<p className="text-sm font-bold text-amber-900 mb-1">
					Awaiting admin approval
				</p>
				<p className="text-xs text-amber-800">
					Once your startup account is approved, your projects will appear here.
				</p>
			</div>
		);
	}

	const projects = data.projects || [];
	const total = projects.length;
	const published = projects.filter((p) => p.status === "active").length;

	return (
		<>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
				<div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
					<div>
						<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
							Total Projects
						</p>
						<p className="text-3xl font-bold text-gray-900">{total}</p>
					</div>
					<div className="w-12 h-12 bg-[#eff6ff] rounded-xl flex items-center justify-center text-[#3b82f6]">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
							/>
						</svg>
					</div>
				</div>
				<div className="bg-white rounded-[20px] p-6 shadow-sm border border-gray-100 flex items-center justify-between">
					<div>
						<p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
							Published
						</p>
						<p className="text-3xl font-bold text-gray-900">{published}</p>
					</div>
					<div className="w-12 h-12 bg-[#f0fdf4] rounded-xl flex items-center justify-center text-[#22c55e]">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
							/>
						</svg>
					</div>
				</div>
			</div>

			<div className="flex flex-col gap-5 mb-12">
				{projects.length === 0 ? (
					<p className="text-sm text-gray-600 font-medium">
						No projects yet.{" "}
						<Link
							href="/startup/project/create"
							className="text-[#0f3d32] font-bold underline"
						>
							Create a project
						</Link>
					</p>
				) : (
					projects.map((p) => {
						const goal = Number(p.funding_goal) || 0;
						const raised = Number(p.amount_raised) || 0;
						const pct =
							goal > 0 ? Math.min(100, Math.round((raised / goal) * 100)) : 0;
						return (
							<div
								key={p.project_id}
								className="bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row overflow-hidden relative border-l-4 border-l-[#0f3d32]"
							>
								<div className="flex-grow p-6 flex flex-col">
									<div className="flex justify-between items-start mb-2">
										<h3 className="text-xl font-bold text-gray-900">
											{p.project_title}
										</h3>
										<span className="bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-md">
											{p.status}
										</span>
									</div>
									<p className="text-sm text-gray-600 line-clamp-2 mb-4">
										{p.description || "—"}
									</p>
									<div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-4 border-t border-gray-100 pt-6">
										<div>
											<p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
												Funding goal
											</p>
											<p className="text-sm font-bold text-gray-900">
												{fmtMoney(goal)}
											</p>
										</div>
										<div>
											<p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
												Raised
											</p>
											<p className="text-sm font-bold text-gray-900">
												{fmtMoney(raised)}
											</p>
										</div>
										<div className="md:col-span-2">
											<p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">
												Progress
											</p>
											<div className="flex items-center gap-3">
												<div className="w-full bg-gray-100 rounded-full h-1.5">
													<div
														className="bg-[#0f3d32] h-full rounded-full"
														style={{ width: `${pct}%` }}
													/>
												</div>
												<span className="text-xs font-bold text-gray-900">
													{pct}%
												</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						);
					})
				)}
			</div>
		</>
	);
}
