"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchStartupDetails, sendProposal } from "@/lib/mentorApi";

function ProposalForm() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const startupId = searchParams.get("startupId");

	const [startup, setStartup] = useState(null);
	const [subject, setSubject] = useState("");
	const [message, setMessage] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!startupId) return;
		fetchStartupDetails(startupId)
			.then((d) => {
				setStartup(d.startup);
				setSubject(`Mentorship proposal for ${d.startup.startup_name}`);
			})
			.catch((ex) => setError(ex.message || "Failed to load startup"));
	}, [startupId]);

	async function onSubmit(e) {
		e.preventDefault();
		if (!startupId || !subject.trim()) return;
		setLoading(true);
		setError("");
		try {
			await sendProposal({
				startup_id: Number(startupId),
				subject: subject.trim(),
				message: message.trim(),
			});
			router.push(
				`/mentor/requests/proposal/success?startupId=${startupId}&subject=${encodeURIComponent(subject)}`,
			);
		} catch (ex) {
			setError(ex.message || "Failed to send proposal");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="p-8 max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold text-gray-900 mb-2">Send proposal</h1>
			{startup ? (
				<p className="text-gray-500 text-sm mb-6">To: {startup.startup_name}</p>
			) : null}

			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			<form onSubmit={onSubmit} className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
				<div>
					<label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
					<input
						value={subject}
						onChange={(e) => setSubject(e.target.value)}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
					/>
				</div>
				<div>
					<label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
					<textarea
						value={message}
						onChange={(e) => setMessage(e.target.value)}
						rows={8}
						required
						className="w-full px-4 py-2 border rounded-xl text-sm"
						placeholder="Describe your mentorship plan, availability, and focus areas…"
					/>
				</div>
				<button
					type="submit"
					disabled={loading || !startupId}
					className="w-full py-3 bg-[#115543] text-white rounded-xl font-bold text-sm disabled:opacity-50"
				>
					{loading ? "Sending…" : "Send proposal"}
				</button>
			</form>
		</div>
	);
}

export default function MentorProposalPage() {
	return (
		<Suspense fallback={<p className="p-8 text-gray-500">Loading…</p>}>
			<ProposalForm />
		</Suspense>
	);
}
