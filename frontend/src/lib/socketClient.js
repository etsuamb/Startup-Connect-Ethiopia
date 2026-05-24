"use client";

import { io } from "socket.io-client";
import { getToken } from "@/lib/authStorage";

let socketInstance = null;

export function getSocketUrl() {
	if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_SOCKET_URL) {
		return process.env.NEXT_PUBLIC_SOCKET_URL;
	}
	if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_API_URL) {
		return process.env.NEXT_PUBLIC_API_URL.replace(/\/api\/?$/, "");
	}
	return process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
}

export function getChatSocket() {
	if (typeof window === "undefined") return null;

	const token = getToken();
	if (!token) return null;

	if (socketInstance?.connected) return socketInstance;

	if (socketInstance) {
		socketInstance.auth = { token };
		if (!socketInstance.connected) socketInstance.connect();
		return socketInstance;
	}

	socketInstance = io(getSocketUrl(), {
		auth: { token },
		transports: ["websocket", "polling"],
		reconnection: true,
		reconnectionAttempts: 8,
		reconnectionDelay: 1000,
		autoConnect: true,
	});

	return socketInstance;
}

export function disconnectChatSocket() {
	if (socketInstance) {
		socketInstance.disconnect();
		socketInstance = null;
	}
}

export const MODERATION_WARNING =
	"For your safety and transaction protection, sharing personal contact information outside StartupConnect is not allowed.";
