import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const metadata = {
	title: "Admin Dashboard | StartupConnect",
	description: "Platform management for StartupConnect",
};

export default function AdminLayout({ children }) {
	return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
