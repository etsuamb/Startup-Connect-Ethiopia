"use client";

import { useRouter } from "next/navigation";
import { saveProjectDraft } from "@/lib/projectDraft";

export default function ProjectCreateContinueButton({ formId }) {
	const router = useRouter();

	function onClick() {
		const form =
			(typeof document !== "undefined" && document.getElementById(formId)) ||
			null;
		if (!form) return;
		const fd = new FormData(form);
		const fundingRaw = String(fd.get("requiredFunding") || "").replace(
			/,/g,
			"",
		);
		const draft = {
			project_title: String(fd.get("project_title") || "").trim(),
			industry: String(fd.get("industry") || "").trim(),
			stage: String(fd.get("stage") || "").trim(),
			summary: String(fd.get("summary") || "").trim(),
			problem: String(fd.get("problem") || "").trim(),
			solution: String(fd.get("solution") || "").trim(),
			requiredFunding: fundingRaw || "0",
			expectedImpact: String(fd.get("expectedImpact") || "").trim(),
			mentor_requested: "false",
		};
		saveProjectDraft(draft);
		router.push("/startup/project/documents");
	}

	return (
		<button
			type="button"
			onClick={onClick}
			className="px-6 py-3.5 bg-[#0f3d32] hover:bg-[#0a2921] text-white font-bold rounded-lg transition shadow-md text-xs"
		>
			Continue to Documents
		</button>
	);
}
