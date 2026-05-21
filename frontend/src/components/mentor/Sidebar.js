"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMentorDashboard } from "@/lib/mentorApi";
import { clearSession } from "@/lib/authStorage";

export default function Sidebar() {
	const pathname = usePathname();
	const router = useRouter();
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		fetchMentorDashboard()
			.then((d) => setProfile(d.profile))
			.catch(() => {});
	}, []);

	const links = [
		{ id: "overview", label: "Overview", href: "/mentor/dashboard" },
		{ id: "requests", label: "Requests", href: "/mentor/requests" },
		{ id: "startups", label: "My Startups", href: "/mentor/startups" },
		{ id: "sessions", label: "Sessions", href: "/mentor/sessions" },
		{ id: "messages", label: "Messages", href: "/mentor/messages" },
		{ id: "resources", label: "Resources", href: "/mentor/resources" },
		{ id: "reports", label: "Reports", href: "/mentor/reports" },
	];

	function logout() {
		clearSession();
		router.push("/login");
	}

	const name = profile
		? `${profile.first_name || ""} ${profile.last_name || ""}`.trim()
		: "Mentor";
	const title = profile?.headline || profile?.professional_title || "Advisor";

	return (
		<aside className="w-[260px] bg-[#0a3a2e] flex flex-col shrink-0 h-full overflow-y-auto text-white">
			<div className="p-8 pb-6">
				<Link href="/mentor/dashboard" className="font-bold text-white text-[22px]">
					Mentor Portal
				</Link>
			</div>

			<nav className="px-4 py-4 flex flex-col gap-1.5 flex-grow">
				{links.map((item) => {
					const isActive =
						pathname === item.href ||
						(item.href !== "/mentor/dashboard" && pathname?.startsWith(item.href));
					return (
						<Link
							key={item.id}
							href={item.href}
							className={`px-4 py-3 rounded-xl text-[14px] font-bold transition ${
								isActive
									? "bg-[#115543] text-white"
									: "text-[#86b5a5] hover:bg-[#0d4738] hover:text-white"
							}`}
						>
							{item.label}
						</Link>
					);
				})}
			</nav>

			<div className="p-4 mt-auto">
				<div className="bg-[#082a21] rounded-xl p-4">
					<p className="text-[13px] font-bold text-white">{name}</p>
					<p className="text-[11px] text-[#86b5a5]">{title}</p>
				</div>
				<button
					type="button"
					onClick={logout}
					className="w-full mt-4 px-4 py-2.5 text-[#86b5a5] hover:text-white font-bold text-[13px] text-left"
				>
					Logout
				</button>
			</div>
		</aside>
	);
}
