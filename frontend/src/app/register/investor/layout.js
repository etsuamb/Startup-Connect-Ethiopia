import { RegFlowProvider } from "@/components/register/RegFlowProvider";

export default function InvestorRegisterLayout({ children }) {
	return <RegFlowProvider role="Investor">{children}</RegFlowProvider>;
}
