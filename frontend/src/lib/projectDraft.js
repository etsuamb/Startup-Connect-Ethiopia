const KEY = "sc_project_create_draft";

export function saveProjectDraft(obj) {
	if (typeof window === "undefined") return;
	sessionStorage.setItem(KEY, JSON.stringify(obj));
}

export function loadProjectDraft() {
	if (typeof window === "undefined") return null;
	try {
		const s = sessionStorage.getItem(KEY);
		return s ? JSON.parse(s) : null;
	} catch {
		return null;
	}
}

export function clearProjectDraft() {
	if (typeof window === "undefined") return;
	sessionStorage.removeItem(KEY);
}
