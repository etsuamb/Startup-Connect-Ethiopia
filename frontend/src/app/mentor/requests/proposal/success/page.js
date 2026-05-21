"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
	const searchParams = useSearchParams();
	const subject = searchParams.get("subject") || "Your proposal";

	return (
		<div className="p-8 max-w-lg mx-auto text-center">
			<div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
				<span className="text-2xl">✓</span>
			</div>
			<h1 className="text-2xl font-bold text-gray-900">Proposal sent</h1>
			<p className="text-gray-500 text-sm mt-2">{decodeURIComponent(subject)}</p>
			<p className="text-gray-600 text-sm mt-4">
				The startup will be notified and can accept or respond to your proposal.
			</p>
			<div className="mt-8 flex flex-col gap-3">
				<Link
					href="/mentor/dashboard"
					className="py-3 bg-[#115543] text-white rounded-xl font-bold text-sm"
				>
					Back to dashboard
				</Link>
				<Link href="/mentor/requests" className="py-3 border rounded-xl font-bold text-sm">
					View requests
				</Link>
			</div>
		</div>
	);
}

export default function ProposalSuccessPage() {
	return (
		<Suspense fallback={<p className="p-8 text-gray-500">Loading…</p>}>
			<SuccessContent />
		</Suspense>
	);
}
