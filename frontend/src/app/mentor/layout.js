import MentorLayoutClient from "@/components/mentor/MentorLayoutClient";

export const metadata = {
	title: "Mentor Portal | StartupConnect",
	description: "Mentor dashboard and mentorship tools",
};

export default function MentorLayout({ children }) {
	return <MentorLayoutClient>{children}</MentorLayoutClient>;
}
