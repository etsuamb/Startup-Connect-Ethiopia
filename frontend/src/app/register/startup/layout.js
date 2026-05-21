import { RegFlowProvider } from "@/components/register/RegFlowProvider";

export default function StartupRegisterLayout({ children }) {
	return <RegFlowProvider role="Startup">{children}</RegFlowProvider>;
}
