"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, getToken } from "@/lib/authStorage";

export default function MentorAuthGuard({ children }) {
	const router = useRouter();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const token = getToken();
		const role = getRole();
		if (!token || role !== "Mentor") {
			router.replace("/login");
			return;
		}
		setReady(true);
	}, [router]);

	if (!ready) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#f8f9fa] text-slate-500 text-sm">
				Loading mentor portal…
			</div>
		);
	}

	return children;
}
