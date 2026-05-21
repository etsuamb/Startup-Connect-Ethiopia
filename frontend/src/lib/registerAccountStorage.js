const KEY = "sc_registration_account_info";

export function saveRegistrationAccountInfo(info) {
	if (typeof window === "undefined") return;
	const payload = {
		first_name: info.first_name?.trim() || "",
		last_name: info.last_name?.trim() || "",
		full_name: info.full_name?.trim() || `${info.first_name?.trim() || ""} ${info.last_name?.trim() || ""}`.trim(),
		email: info.email?.trim() || "",
		password: info.password || "",
		confirm_password: info.confirm_password || info.password || "",
		phone_number: info.phone_number || "",
	};
	sessionStorage.setItem(KEY, JSON.stringify(payload));
}

export function loadRegistrationAccountInfo() {
	if (typeof window === "undefined") return null;
	try {
		const saved = sessionStorage.getItem(KEY);
		return saved ? JSON.parse(saved) : null;
	} catch {
		return null;
	}
}

export function clearRegistrationAccountInfo() {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(KEY);
}
