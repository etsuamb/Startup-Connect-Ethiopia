import AccountAccessGuard from "@/components/auth/AccountAccessGuard";

export const metadata = {
	title: "Startup Portal | StartupConnect",
};

export default function StartupLayout({ children }) {
	return <AccountAccessGuard requiredRole="Startup">{children}</AccountAccessGuard>;
}
