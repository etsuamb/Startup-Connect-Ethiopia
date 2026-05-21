"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { apiFetch, apiPostJson } from "@/lib/api";

export default function DiscoverApplyForm() {
	const router = useRouter();
	const sp = useSearchParams();
	const type = (sp.get("type") || "investor").toLowerCase();
	const investorId = sp.get("investorId");
	const mentorId = sp.get("mentorId");

	const [projects, setProjects] = useState([]);
	const [loading, setLoading] = useState(true);
	const [err, setErr] = useState("");
	const [submitErr, setSubmitErr] = useState("");
	const [submitting, setSubmitting] = useState(false);

	const [projectTitle, setProjectTitle] = useState("");
	const [amount, setAmount] = useState("");
	const [useOfFunds, setUseOfFunds] = useState("");
	const [milestones, setMilestones] = useState("");
	const [message, setMessage] = useState("");

	useEffect(() => {
		let cancelled = false;
		(async () => {
			try {
				const res = await apiFetch("/projects");
				if (cancelled) return;
				const list = res.projects || [];
				setProjects(list);
				if (list[0]?.project_title) setProjectTitle(list[0].project_title);
			} catch (e) {
				if (!cancelled) setErr(e.message || "Could not load projects");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);

	async function onSubmit(e) {
		e.preventDefault();
		setSubmitErr("");
		const amt = Number(String(amount).replace(/,/g, ""));
		if (!projectTitle.trim()) {
			setSubmitErr("Select or enter a project name.");
			return;
		}
		if (!Number.isFinite(amt) || amt <= 0) {
			setSubmitErr("Enter a valid funding amount.");
			return;
		}
		if (!message.trim()) {
			setSubmitErr("Message is required.");
			return;
		}

		setSubmitting(true);
		try {
			if (type === "mentor" && mentorId) {
				await apiPostJson(`/startups/discover/mentors/${mentorId}/apply`, {
					application: {
						startupProject: projectTitle.trim(),
						mentorshipFocus: useOfFunds || "",
						preferredSessionFormat: "",
						expectedOutcomes: milestones || "",
						messageToMentor: message.trim(),
					},
				});
			} else if (investorId) {
				await apiPostJson(`/startups/discover/investors/${investorId}/apply`, {
					application: {
						startupProject: projectTitle.trim(),
						requestedAmount: amt,
						useOfFunds: useOfFunds || "",
						expectedMilestones: milestones || "",
						messageToInvestor: message.trim(),
					},
				});
			} else {
				setSubmitErr("Missing investor or mentor id in URL.");
				setSubmitting(false);
				return;
			}
			router.push("/startup/discover");
		} catch (ex) {
			setSubmitErr(ex.message || "Submit failed");
		} finally {
			setSubmitting(false);
		}
	}

	const heading =
		type === "mentor" ? "Apply for mentorship" : "Apply for investment";

	return (
		<form onSubmit={onSubmit} className="contents">
			<div className="px-8 pt-8 pb-4">
				<h1 className="text-2xl font-bold text-[#0f3d32] mb-1">{heading}</h1>
				<p className="text-xs text-gray-400 font-medium tracking-tight">
					{type === "mentor"
						? "Request guidance from the selected mentor."
						: "Submit your funding request to the selected investor."}
				</p>
				{err ? (
					<p className="text-xs text-amber-700 mt-2">{err}</p>
				) : null}
				{loading ? (
					<p className="text-xs text-gray-500 mt-2">Loading projects…</p>
				) : null}
			</div>

			<div className="px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
				<div className="lg:col-span-8 flex flex-col gap-6">
					<div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
							<div>
								<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
									Startup project
								</label>
								{projects.length > 0 ? (
									<select
										className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none appearance-none"
										value={projectTitle}
										onChange={(e) => setProjectTitle(e.target.value)}
									>
										{projects.map((p) => (
											<option key={p.project_id} value={p.project_title}>
												{p.project_title}
											</option>
										))}
									</select>
								) : (
									<input
										className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none"
										value={projectTitle}
										onChange={(e) => setProjectTitle(e.target.value)}
										placeholder="Your project name"
									/>
								)}
							</div>
							{type === "investor" ? (
								<div>
									<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
										Funding amount requested (USD)
									</label>
									<input
										type="text"
										value={amount}
										onChange={(e) => setAmount(e.target.value)}
										placeholder="e.g. 150000"
										className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none"
									/>
								</div>
							) : null}
						</div>

						{type === "investor" ? (
							<div className="mb-6">
								<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
									Use of funds
								</label>
								<textarea
									rows="3"
									value={useOfFunds}
									onChange={(e) => setUseOfFunds(e.target.value)}
									className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"
								/>
							</div>
						) : (
							<div className="mb-6">
								<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
									Mentorship focus
								</label>
								<textarea
									rows="3"
									value={useOfFunds}
									onChange={(e) => setUseOfFunds(e.target.value)}
									className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"
								/>
							</div>
						)}

						<div className="mb-6">
							<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
								{type === "mentor" ? "Expected outcomes" : "Expected milestones"}
							</label>
							<textarea
								rows="3"
								value={milestones}
								onChange={(e) => setMilestones(e.target.value)}
								className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"
							/>
						</div>

						<div>
							<label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">
								{type === "mentor" ? "Message to mentor" : "Message to investor"}
							</label>
							<textarea
								rows="3"
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								required
								className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"
							/>
						</div>
					</div>

					{submitErr ? (
						<p className="text-xs text-red-600 font-bold">{submitErr}</p>
					) : null}

					<div className="flex items-center justify-end gap-4 mt-4">
						<button
							type="submit"
							disabled={submitting}
							className="bg-[#0f3d32] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#0a2921] transition shadow-lg disabled:opacity-60"
						>
							{submitting ? "Submitting…" : "Submit application"}
						</button>
					</div>
				</div>
			</div>
		</form>
	);
}
