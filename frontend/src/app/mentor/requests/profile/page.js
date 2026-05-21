"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import {
	acceptRequest,
	fetchMentorRequest,
	fetchStartupDetails,
	rejectRequest,
} from "@/lib/mentorApi";

function ProfileContent() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const requestId = searchParams.get("requestId");
	const startupId = searchParams.get("startupId");

	const [data, setData] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [busy, setBusy] = useState(false);

	useEffect(() => {
		let cancelled = false;
		(async () => {
			setLoading(true);
			setError("");
			try {
				if (requestId) {
					const d = await fetchMentorRequest(requestId);
					if (!cancelled) setData({ type: "request", ...d });
				} else if (startupId) {
					const d = await fetchStartupDetails(startupId);
					if (!cancelled) setData({ type: "startup", startup: d.startup, documents: d.documents });
				} else {
					setError("Missing requestId or startupId");
				}
			} catch (ex) {
				if (!cancelled) setError(ex.message || "Failed to load profile");
			} finally {
				if (!cancelled) setLoading(false);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [requestId, startupId]);

	const req = data?.request;
	const startup = data?.type === "startup" ? data.startup : req;
	const documents = data?.documents || [];

	async function onAccept() {
		if (!requestId) return;
		setBusy(true);
		try {
			await acceptRequest(requestId);
			router.push("/mentor/requests");
		} catch (ex) {
			setError(ex.message || "Accept failed");
		} finally {
			setBusy(false);
		}
	}

	async function onReject() {
		if (!requestId) return;
		const reason = window.prompt("Reason (optional):") || "";
		setBusy(true);
		try {
			await rejectRequest(requestId, reason);
			router.push("/mentor/requests");
		} catch (ex) {
			setError(ex.message || "Reject failed");
		} finally {
			setBusy(false);
		}
	}

	if (loading) return <p className="p-8 text-gray-500 text-sm">Loading…</p>;
	if (error) return <p className="p-8 text-red-600 text-sm">{error}</p>;
	if (!startup) return <p className="p-8 text-gray-500 text-sm">Not found.</p>;

	const sid = startup.startup_id;

	return (
		<div className="p-8 max-w-4xl mx-auto">
			<Link href="/mentor/requests" className="text-sm text-[#115543] font-bold">
				← Back to requests
			</Link>

			<h1 className="text-2xl font-bold text-gray-900 mt-4">{startup.startup_name}</h1>
			<p className="text-gray-500 text-sm mt-1">
				{startup.industry} · {startup.business_stage || "—"}
			</p>

			{req ? (
				<div className="mt-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
					<p className="font-bold text-sm">Request: {req.subject}</p>
					<p className="text-sm text-gray-600 mt-1">{req.message}</p>
					<p className="text-xs text-gray-500 mt-2 capitalize">Status: {req.status}</p>
				</div>
			) : null}

			<div className="mt-6 bg-white rounded-2xl p-6 border border-gray-100 space-y-4">
				{startup.startup_tagline ? <p>{startup.startup_tagline}</p> : null}
				{startup.description ? <p className="text-sm text-gray-600">{startup.description}</p> : null}
				<div className="grid grid-cols-2 gap-4 text-sm">
					<div><span className="text-gray-500">City:</span> {startup.city || "—"}</div>
					<div><span className="text-gray-500">Team:</span> {startup.team_size ?? "—"}</div>
					<div><span className="text-gray-500">Founded:</span> {startup.founded_year ?? "—"}</div>
					<div><span className="text-gray-500">Website:</span> {startup.website || "—"}</div>
				</div>
			</div>

			{documents.length > 0 ? (
				<div className="mt-6">
					<h2 className="font-bold mb-2">Documents</h2>
					<ul className="text-sm space-y-1">
						{documents.map((d) => (
							<li key={d.document_id}>{d.file_name || d.description}</li>
						))}
					</ul>
				</div>
			) : null}

			<div className="mt-8 flex flex-wrap gap-3">
				{req?.status === "pending" ? (
					<>
						<button
							type="button"
							disabled={busy}
							onClick={onAccept}
							className="px-6 py-2 bg-[#115543] text-white rounded-xl font-bold text-sm"
						>
							Accept
						</button>
						<button
							type="button"
							disabled={busy}
							onClick={onReject}
							className="px-6 py-2 border border-gray-200 rounded-xl font-bold text-sm"
						>
							Decline
						</button>
					</>
				) : null}
				<Link
					href={`/mentor/requests/proposal?startupId=${sid}`}
					className="px-6 py-2 border border-[#115543] text-[#115543] rounded-xl font-bold text-sm"
				>
					Send proposal
				</Link>
			</div>
		</div>
	);
}

export default function MentorRequestProfilePage() {
	return (
		<Suspense fallback={<p className="p-8 text-gray-500">Loading…</p>}>
			<ProfileContent />
		</Suspense>
	);
}
