"use client";

import { useCallback, useEffect, useState } from "react";
import {
	fetchMentorConversations,
	fetchMentorMessages,
	sendMentorMessage,
} from "@/lib/mentorApi";

export default function MentorMessagesPage() {
	const [conversations, setConversations] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [sending, setSending] = useState(false);

	const loadConversations = useCallback(async () => {
		setLoading(true);
		try {
			const data = await fetchMentorConversations();
			const list = data.conversations || data || [];
			setConversations(Array.isArray(list) ? list : []);
			if (!activeId && list[0]) {
				setActiveId(list[0].mentor_conversation_id);
			}
		} catch (ex) {
			setError(ex.message || "Failed to load conversations");
		} finally {
			setLoading(false);
		}
	}, [activeId]);

	useEffect(() => {
		loadConversations();
	}, [loadConversations]);

	useEffect(() => {
		if (!activeId) return;
		fetchMentorMessages(activeId)
			.then((d) => setMessages(d.messages || []))
			.catch((ex) => setError(ex.message || "Failed to load messages"));
	}, [activeId]);

	async function handleSend(e) {
		e.preventDefault();
		if (!text.trim() || !activeId) return;
		setSending(true);
		try {
			await sendMentorMessage(activeId, text.trim());
			setText("");
			const d = await fetchMentorMessages(activeId);
			setMessages(d.messages || []);
		} catch (ex) {
			setError(ex.message || "Send failed");
		} finally {
			setSending(false);
		}
	}

	const active = conversations.find((c) => c.mentor_conversation_id === activeId);

	return (
		<div className="p-8 max-w-6xl mx-auto h-full flex flex-col">
			<h1 className="text-2xl font-bold text-gray-900 mb-4">Messages</h1>
			{error ? (
				<div className="mb-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm">{error}</div>
			) : null}

			<div className="flex flex-1 min-h-[480px] bg-white rounded-2xl border border-gray-100 overflow-hidden">
				<div className="w-72 border-r border-gray-100 overflow-y-auto">
					{loading ? (
						<p className="p-4 text-sm text-gray-500">Loading…</p>
					) : conversations.length === 0 ? (
						<p className="p-4 text-sm text-gray-500">No conversations yet.</p>
					) : (
						conversations.map((c) => (
							<button
								key={c.mentor_conversation_id}
								type="button"
								onClick={() => setActiveId(c.mentor_conversation_id)}
								className={`w-full text-left p-4 border-b border-gray-50 hover:bg-gray-50 ${
									activeId === c.mentor_conversation_id ? "bg-emerald-50" : ""
								}`}
							>
								<p className="font-bold text-sm">{c.startup_name || `Startup #${c.startup_id}`}</p>
								{c.last_message_preview ? (
									<p className="text-xs text-gray-500 truncate">{c.last_message_preview}</p>
								) : null}
							</button>
						))
					)}
				</div>

				<div className="flex-1 flex flex-col">
					{active ? (
						<>
							<div className="p-4 border-b border-gray-100 font-bold text-sm">
								{active.startup_name || `Startup #${active.startup_id}`}
							</div>
							<div className="flex-1 overflow-y-auto p-4 space-y-3">
								{messages.map((m) => (
									<div
										key={m.mentor_chat_message_id || m.message_id}
										className={`max-w-[80%] p-3 rounded-xl text-sm ${
											m.sender_role === "Mentor" || m.sender_user_id
												? "bg-[#115543] text-white ml-auto"
												: "bg-gray-100 text-gray-800"
										}`}
									>
										{m.text_body || m.body || m.message_text}
									</div>
								))}
							</div>
							<form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-2">
								<input
									value={text}
									onChange={(e) => setText(e.target.value)}
									placeholder="Type a message…"
									className="flex-1 px-4 py-2 border rounded-xl text-sm"
								/>
								<button
									type="submit"
									disabled={sending}
									className="px-4 py-2 bg-[#115543] text-white rounded-xl text-sm font-bold disabled:opacity-50"
								>
									Send
								</button>
							</form>
						</>
					) : (
						<div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
							Select a conversation
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
