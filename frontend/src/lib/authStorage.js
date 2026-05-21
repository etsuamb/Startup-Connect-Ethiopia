const TOKEN = "sc_access_token";
const REFRESH = "sc_refresh_token";
const ROLE = "sc_role";

export function getToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(TOKEN);
}

export function getRefreshToken() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(REFRESH);
}

export function getRole() {
	if (typeof window === "undefined") return null;
	return localStorage.getItem(ROLE);
}

export function setSession({ token, refreshToken, role }) {
	if (typeof window === "undefined") return;
	if (token != null) localStorage.setItem(TOKEN, token);
	if (refreshToken != null) localStorage.setItem(REFRESH, refreshToken);
	if (role != null) localStorage.setItem(ROLE, role);
}

export function clearSession() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(TOKEN);
	localStorage.removeItem(REFRESH);
	localStorage.removeItem(ROLE);
}
