"use client";

import Sidebar from "@/components/mentor/Sidebar";
import MentorAuthGuard from "@/components/mentor/MentorAuthGuard";

export default function MentorLayoutClient({ children }) {
	return (
		<MentorAuthGuard>
			<div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
				<Sidebar />
				<div className="flex-grow flex flex-col overflow-hidden bg-[#fbfcfc]">
					<main className="flex-grow overflow-y-auto">{children}</main>
				</div>
			</div>
		</MentorAuthGuard>
	);
}
