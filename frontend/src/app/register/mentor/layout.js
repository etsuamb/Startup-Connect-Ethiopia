import { RegFlowProvider } from "@/components/register/RegFlowProvider";

export default function MentorRegisterLayout({ children }) {
	return <RegFlowProvider role="Mentor">{children}</RegFlowProvider>;
}
