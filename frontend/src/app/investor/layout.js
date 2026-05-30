import AccountAccessGuard from "@/components/auth/AccountAccessGuard";

export const metadata = {
	title: "Investor Portal | StartupConnect",
};

export default function InvestorLayout({ children }) {
	return <AccountAccessGuard requiredRole="Investor">{children}</AccountAccessGuard>;
}
