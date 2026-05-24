import { API_BASE } from "./config";
import { getToken } from "./authStorage";

function authHeaders() {
	const t = getToken();
	const h = { Accept: "application/json" };
	if (t) h.Authorization = `Bearer ${t}`;
	return h;
}

export async function apiFetch(path, options = {}) {
	const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
	const headers = { ...authHeaders(), ...(options.headers || {}) };
	const res = await fetch(url, { ...options, headers });
	const text = await res.text();
	let data;
	try {
		data = text ? JSON.parse(text) : null;
	} catch {
		data = { raw: text };
	}
	if (!res.ok) {
		const chapaMessage = data?.chapa_message
			? typeof data.chapa_message === "string"
				? data.chapa_message
				: JSON.stringify(data.chapa_message)
			: null;
		const err = new Error(
			chapaMessage ||
				(data && (data.message || data.error)) ||
				res.statusText ||
				"Request failed",
		);
		err.code = data?.code;
		err.status = res.status;
		err.data = data;
		throw err;
	}
	return data;
}

export async function apiPostJson(path, body) {
	return apiFetch(path, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

export async function apiPostForm(path, formData) {
	return apiFetch(path, {
		method: "POST",
		body: formData,
	});
}

export async function apiPutForm(path, formData) {
	return apiFetch(path, {
		method: "PUT",
		body: formData,
	});
}

export async function apiPutJson(path, body) {
	return apiFetch(path, {
		method: "PUT",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

export async function apiPatchJson(path, body) {
	return apiFetch(path, {
		method: "PATCH",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body),
	});
}

export async function apiFetchBlob(path) {
	const url = `${API_BASE}${path.startsWith("/") ? path : `/${path}`}`;
	const res = await fetch(url, {
		headers: authHeaders(),
	});
	if (!res.ok) {
		const text = await res.text();
		let data;
		try {
			data = text ? JSON.parse(text) : null;
		} catch {
			data = { raw: text };
		}
		const err = new Error((data && (data.message || data.error)) || res.statusText || "Request failed");
		err.status = res.status;
		err.data = data;
		throw err;
	}
	const blob = await res.blob();
	return {
		blob,
		contentType: res.headers.get("Content-Type") || "application/octet-stream",
		filename: res.headers.get("Content-Disposition")?.match(/filename="?([^";]+)"?/)?.[1] || path.split("/").pop(),
	};
}

export async function loginRequest(email, password) {
	return apiPostJson("/auth/login", { email, password });
}

export async function registerMultipart(formData) {
	return apiPostForm("/auth/register", formData);
}
