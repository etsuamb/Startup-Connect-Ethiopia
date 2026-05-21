"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getRole, getToken } from "@/lib/authStorage";

export default function AdminAuthGuard({ children }) {
	const router = useRouter();
	const [ready, setReady] = useState(false);

	useEffect(() => {
		const token = getToken();
		const role = getRole();
		if (!token || role !== "Admin") {
			router.replace("/login");
			return;
		}
		setReady(true);
	}, [router]);

	if (!ready) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-[#f8fafc] text-slate-500 text-sm font-medium">
				Loading admin workspace…
			</div>
		);
	}

	return children;
}
