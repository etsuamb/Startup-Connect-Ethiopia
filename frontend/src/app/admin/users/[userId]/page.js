import PendingUserDetailPage from "@/components/admin/PendingUserDetailPage";

export default async function AdminPendingUserDetailPage({ params }) {
	const { userId } = await params;
	return <PendingUserDetailPage userId={userId} />;
}
