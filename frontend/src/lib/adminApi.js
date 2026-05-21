import { apiFetch, apiPatchJson, apiPutJson } from "./api";
import { API_BASE } from "./config";
import { getToken } from "./authStorage";

/** Dashboard analytics & entity management (`/admin/dashboard/*`) */
export function fetchSystemAnalytics() {
	return apiFetch("/admin/dashboard/analytics/system");
}

export function fetchStartupAnalytics() {
	return apiFetch("/admin/dashboard/analytics/startups");
}

export function fetchFundingAnalytics() {
	return apiFetch("/admin/dashboard/analytics/funding");
}

export function fetchEngagementAnalytics() {
	return apiFetch("/admin/dashboard/analytics/engagement");
}

export function fetchDashboardStartups(params = {}) {
	const q = new URLSearchParams();
	if (params.status) q.set("status", params.status);
	if (params.listed) q.set("listed", params.listed);
	if (params.account) q.set("account", params.account);
	if (params.limit) q.set("limit", String(params.limit));
	if (params.offset) q.set("offset", String(params.offset));
	const qs = q.toString();
	return apiFetch(`/admin/dashboard/startups${qs ? `?${qs}` : ""}`);
}

export function fetchDashboardStartup(startupId) {
	return apiFetch(`/admin/dashboard/startups/${startupId}`);
}

export function updateStartupStatus(startupId, status, comment) {
	return apiPatchJson(`/admin/dashboard/startups/${startupId}/status`, {
		status,
		comment,
	});
}

export function fetchDashboardMentors(params = {}) {
	const q = new URLSearchParams();
	if (params.approval) q.set("approval", params.approval);
	if (params.listed) q.set("listed", params.listed);
	if (params.account) q.set("account", params.account);
	if (params.limit) q.set("limit", String(params.limit));
	const qs = q.toString();
	return apiFetch(`/admin/dashboard/mentors${qs ? `?${qs}` : ""}`);
}

export function updateMentorApproval(mentorId, approved, reason) {
	return apiPatchJson(`/admin/dashboard/mentors/${mentorId}/approval`, {
		approved,
		reason,
	});
}

export function fetchDashboardInvestors(params = {}) {
	const q = new URLSearchParams();
	if (params.approval) q.set("approval", params.approval);
	if (params.listed) q.set("listed", params.listed);
	if (params.account) q.set("account", params.account);
	if (params.limit) q.set("limit", String(params.limit));
	const qs = q.toString();
	return apiFetch(`/admin/dashboard/investors${qs ? `?${qs}` : ""}`);
}

export function updateInvestorApproval(investorId, approved, reason) {
	return apiPatchJson(`/admin/dashboard/investors/${investorId}/approval`, {
		approved,
		reason,
	});
}

/** User approval workflow (`/admin/users/*`) */
export function fetchPendingUsers() {
	return apiFetch("/admin/users/pending");
}

export function fetchPendingUser(userId) {
	return apiFetch(`/admin/users/pending/${userId}`);
}

export function approveUser(userId, comment) {
	return apiPutJson(`/admin/users/approve/${userId}`, { comment });
}

export function rejectUser(userId, reason) {
	return apiPutJson(`/admin/users/reject/${userId}`, { reason });
}

async function fetchAdminDocumentBlob(documentId, path) {
	const token = getToken();
	if (!token) throw new Error("Not authenticated");
	const url = `${API_BASE}${path}`;
	const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
	if (!res.ok) {
		let message = "Could not open document";
		try {
			const data = await res.json();
			message = data.message || data.error || message;
		} catch {
			/* ignore */
		}
		const err = new Error(message);
		err.status = res.status;
		throw err;
	}
	return res.blob();
}

/** Open a pending user's uploaded file in a new tab (auth required). */
export async function openAdminDocument(documentId, { isMentorDocument = false } = {}) {
	const primary = isMentorDocument
		? `/admin/mentor-documents/${documentId}`
		: `/admin/documents/${documentId}`;
	const fallback = isMentorDocument
		? `/admin/documents/${documentId}`
		: `/admin/mentor-documents/${documentId}`;

	let blob;
	try {
		blob = await fetchAdminDocumentBlob(documentId, primary);
	} catch (ex) {
		if (ex.status === 404) {
			blob = await fetchAdminDocumentBlob(documentId, fallback);
		} else {
			throw ex;
		}
	}

	const blobUrl = URL.createObjectURL(blob);
	window.open(blobUrl, "_blank", "noopener,noreferrer");
	setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
}

/** Legacy admin helpers */
export function fetchReportsOverview() {
	return apiFetch("/admin/reports/overview");
}

export function fetchMaintenanceStatus() {
	return apiFetch("/admin/maintenance/status");
}

export function fetchMentorshipOverview() {
	return apiFetch("/admin/mentorship/overview");
}

/** Admin password change with email verification */
export function changeAdminPassword(currentPassword, newPassword) {
	return apiPutJson("/auth/admin/change-password", {
		currentPassword,
		newPassword,
	});
}

/** Admin notification management */
export function fetchNotifications() {
	return apiFetch("/notifications");
}

export function markNotificationRead(id) {
	return apiPatchJson(`/notifications/${id}`, { is_read: true });
}

export function markAllNotificationsRead() {
	return apiPutJson("/notifications/mark-all-read", {});
}

export function fetchUnreadNotificationCount() {
	return apiFetch("/notifications/unread-count");
}

/** Active session management */
export function fetchActiveSessions() {
	return apiFetch("/auth/sessions");
}

export function revokeActiveSession(token) {
	return apiFetch(`/auth/sessions/${token}`, {
		method: "DELETE",
	});
}

export function revokeAllOtherSessions(currentToken = "") {
	return apiFetch("/auth/sessions", {
		method: "DELETE",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ currentToken }),
	});
}

