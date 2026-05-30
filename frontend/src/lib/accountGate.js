export function isAccountGateError(error) {
	const code = error?.code || error?.data?.code;
	const message = String(error?.message || error?.data?.message || error?.data?.error || "");
	return (
		code === "EMAIL_NOT_VERIFIED" ||
		code === "ACCOUNT_PENDING_APPROVAL" ||
		/email must be verified|verify your email/i.test(message) ||
		/pending admin approval|waiting for admin approval|administrator approves/i.test(message)
	);
}

export function accountGateTitle(error) {
	const code = error?.code || error?.data?.code;
	const message = String(error?.message || error?.data?.message || error?.data?.error || "");
	if (code === "EMAIL_NOT_VERIFIED" || /verify your email|email must be verified/i.test(message)) {
		return "Verify your email to continue";
	}
	return "Waiting for admin approval";
}

export function accountGateMessage(error) {
	const code = error?.code || error?.data?.code;
	const message = String(error?.message || error?.data?.message || error?.data?.error || "");
	if (code === "EMAIL_NOT_VERIFIED" || /verify your email|email must be verified/i.test(message)) {
		return "Your email address must be verified before you can use this feature. Check your inbox for the verification link, then sign in again.";
	}
	return "Your account is registered, but the platform stays read-only until an administrator approves it. You can review account details in Settings.";
}

export function settingsPathForRole(role) {
	if (role === "Startup") return "/startup/settings";
	if (role === "Investor") return "/investor/settings";
	if (role === "Mentor") return "/mentor/settings";
	if (role === "Admin") return "/admin/settings";
	return "/login";
}

export function hasFullPlatformAccess(user) {
	if (!user) return false;
	if (user.role === "Admin") return true;
	return Boolean(user.email_verified) && Boolean(user.is_approved);
}

export function isRestrictedAccount(user) {
	return Boolean(user && user.role !== "Admin" && !hasFullPlatformAccess(user));
}

export function isSettingsPath(pathname, role) {
	const base = settingsPathForRole(role);
	if (!base || base === "/login") return false;
	return pathname === base || pathname.startsWith(`${base}/`);
}

export function routeAfterLogin(router, user) {
	const role = user?.role;
	if (role === "Admin") {
		router.push("/admin/dashboard");
		return;
	}
	if (!hasFullPlatformAccess(user)) {
		router.push(settingsPathForRole(role));
		return;
	}
	if (role === "Startup") router.push("/startup/dashboard");
	else if (role === "Investor") router.push("/investor/dashboard");
	else if (role === "Mentor") router.push("/mentor/dashboard");
	else router.push("/");
}
