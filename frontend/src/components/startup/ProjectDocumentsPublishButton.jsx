"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiPostForm } from "@/lib/api";
import { clearProjectDraft, loadProjectDraft } from "@/lib/projectDraft";

export default function ProjectDocumentsPublishButton({ formId }) {
	const router = useRouter();
	const [err, setErr] = useState("");
	const [loading, setLoading] = useState(false);

	async function onClick() {
		setErr("");
		const draft = loadProjectDraft();
		if (!draft || !String(draft.project_title || "").trim()) {
			setErr("Complete step 1 (project info) before uploading documents.");
			return;
		}
		const form =
			(typeof document !== "undefined" && document.getElementById(formId)) ||
			null;
		if (!form) return;

		const pitch = form.querySelector('input[name="pitch_deck"]');
		const bp = form.querySelector('input[name="business_plan"]');
		const fin = form.querySelector('input[name="financial_projection"]');
		const tax = form.querySelector('input[name="tax_clearance"]');
		const demo = form.querySelector('input[name="demo_video"]');

		if (!pitch?.files?.[0]) {
			setErr("Pitch deck (PDF) is required.");
			return;
		}
		if (!bp?.files?.[0]) {
			setErr("Business plan is required.");
			return;
		}
		if (!fin?.files?.[0]) {
			setErr("Financial projection is required.");
			return;
		}

		const fd = new FormData();
		for (const [k, v] of Object.entries(draft)) {
			if (v != null && v !== "") fd.append(k, String(v));
		}
		fd.append("pitch_deck", pitch.files[0]);
		fd.append("business_plan", bp.files[0]);
		fd.append("financial_projection", fin.files[0]);
		if (tax?.files?.[0]) fd.append("tax_clearance", tax.files[0]);
		if (demo?.files?.[0]) fd.append("demo_video", demo.files[0]);

		setLoading(true);
		try {
			await apiPostForm("/projects/create", fd);
			clearProjectDraft();
			router.push("/startup/project");
		} catch (e) {
			setErr(e.message || "Could not publish project");
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="flex flex-col items-end gap-2">
			{err ? (
				<p className="text-xs text-red-600 font-medium text-right max-w-md">
					{err}
				</p>
			) : null}
			<button
				type="button"
				disabled={loading}
				onClick={onClick}
				className="px-8 py-3.5 bg-[#0f3d32] hover:bg-[#0a2921] text-white font-bold rounded-lg transition shadow-md text-sm disabled:opacity-60"
			>
				{loading ? "Publishing…" : "Publish Project"}
			</button>
		</div>
	);
}
