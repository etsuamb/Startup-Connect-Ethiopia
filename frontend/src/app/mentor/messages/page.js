"use client";

import { useCallback, useEffect, useState } from "react";
import Sidebar from "@/components/mentor/Sidebar";
import {
	fetchMentorConversations,
	fetchMentorMessages,
	sendMentorMessage,
	sendMentorChatFile,
} from "@/lib/mentorApi";

export default function MentorMessagesPage() {
	const [conversations, setConversations] = useState([]);
	const [activeId, setActiveId] = useState(null);
	const [messages, setMessages] = useState([]);
	const [text, setText] = useState("");
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");
	const [sending, setSending] = useState(false);
	const [isRecording, setIsRecording] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);

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
		if (!activeId) return;

		if (selectedFile) {
			// Handle file upload
			const formData = new FormData();
			formData.append('file', selectedFile);
			if (text.replace(`📎 ${selectedFile.name}`, '').trim()) {
				formData.append('caption', text.replace(`📎 ${selectedFile.name}`, '').trim());
			}

			setSending(true);
			try {
				const data = await sendMentorChatFile(activeId, formData);
				setMessages((current) => [...current, data.message]);
				setSelectedFile(null);
				setText("");
				const d = await fetchMentorMessages(activeId);
				setMessages(d.messages || []);
			} catch (ex) {
				setError(ex.message || "Unable to send file.");
			} finally {
				setSending(false);
			}
		} else {
			// Handle text-only message
			if (!text.trim()) return;
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
	}

	function startVoiceRecording() {
		if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
			setError("Voice recognition is not supported in your browser.");
			return;
		}

		const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
		const recognition = new SpeechRecognition();
		recognition.continuous = false;
		recognition.interimResults = true;
		recognition.lang = 'en-US';

		recognition.onstart = () => {
			setIsRecording(true);
		};

		recognition.onresult = (event) => {
			const transcript = Array.from(event.results)
				.map(result => result[0].transcript)
				.join('');
			setText(transcript);
		};

		recognition.onerror = (event) => {
			console.error("Speech recognition error:", event.error);
			setIsRecording(false);
			setError(event.error === 'not-allowed' ? "Microphone access denied" : "Voice recognition failed");
		};

		recognition.onend = () => {
			setIsRecording(false);
		};

		recognition.start();
	}

	function handleFileSelect(event) {
		const file = event.target.files[0];
		if (file) {
			setSelectedFile(file);
			setText(`📎 ${file.name}`);
		}
	}

	const active = conversations.find((c) => c.mentor_conversation_id === activeId);

	return (
		<div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
			<Sidebar />

			<div className="flex-grow flex flex-col overflow-hidden bg-white">
				<header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 z-10 shrink-0 h-[72px]">
					<div className="relative w-full max-w-[480px]">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
						</div>
						<input
							type="text"
							placeholder="Search conversations..."
							className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition"
						/>
					</div>

					<div className="flex items-center gap-5 text-gray-500">
						<button className="hover:text-gray-800 transition relative">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
						</button>
						<button className="hover:text-gray-800 transition">
							<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
						</button>
					</div>
				</header>

				<div className="flex flex-grow overflow-hidden">
					<div className="w-[340px] shrink-0 border-r border-gray-200 flex flex-col bg-white">
						<div className="p-4 border-b border-gray-100">
							<div className="relative">
								<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
									<svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
								</div>
								<input
									type="text"
									placeholder="Search conversations..."
									className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] outline-none focus:bg-gray-100 transition"
								/>
							</div>
						</div>

						<div className="flex-grow overflow-y-auto">
							{loading ? (
								<p className="p-4 text-sm text-gray-500">Loading conversations...</p>
							) : conversations.length === 0 ? (
								<p className="p-4 text-sm text-gray-500">No conversations yet.</p>
							) : (
								conversations.map((c) => (
									<div
										key={c.mentor_conversation_id}
										onClick={() => setActiveId(c.mentor_conversation_id)}
										className={`p-4 border-b border-gray-50 cursor-pointer flex gap-4 transition relative ${
											activeId === c.mentor_conversation_id ? 'bg-[#e8fbf0]' : 'hover:bg-gray-50'
										}`}
									>
										{activeId === c.mentor_conversation_id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a4d3c]"></div>}
										<div className="relative shrink-0">
											<div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0a4d3c] to-[#0a3229] flex items-center justify-center text-[13px] font-bold text-white">
												{(c.startup_name || `Startup #${c.startup_id}`).charAt(0).toUpperCase()}
											</div>
										</div>

										<div className="flex-grow min-w-0 pr-1">
											<div className="flex justify-between items-baseline mb-1">
												<h4 className={`text-[15px] truncate ${activeId === c.mentor_conversation_id ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
													{c.startup_name || `Startup #${c.startup_id}`}
												</h4>
												{c.unread_count > 0 && (
													<span className="bg-[#0a4d3c] text-white text-[10px] rounded-full px-2 py-0.5 font-bold">
														{c.unread_count}
													</span>
												)}
											</div>
											<p className={`text-[13px] truncate ${activeId === c.mentor_conversation_id ? 'text-[#0a4d3c] font-medium' : 'text-gray-500'}`}>
												{c.last_message_preview || "No messages yet"}
											</p>
										</div>
									</div>
								))
							)}
						</div>
					</div>

					<div className="flex-grow flex flex-col bg-white overflow-hidden relative">
						{active ? (
							<>
								<div className="h-[76px] px-8 border-b border-gray-200 flex justify-between items-center shrink-0">
									<div className="flex items-center gap-4">
										<div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0a4d3c] to-[#0a3229] flex items-center justify-center text-[13px] font-bold text-white">
											{(active.startup_name || `Startup #${active.startup_id}`).charAt(0).toUpperCase()}
										</div>
										<div>
											<h2 className="text-lg font-bold text-gray-900 leading-tight">{active.startup_name || `Startup #${active.startup_id}`}</h2>
											<div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0a4d3c]">
												<span className="w-2 h-2 rounded-full bg-[#0a4d3c]"></span>
												Online
											</div>
										</div>
									</div>

									<div className="flex items-center gap-3">
										<button className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition shadow-sm">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
											View Profile
										</button>
										<button className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition shadow-sm">
											<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
											More
										</button>
									</div>
								</div>

								{error && (
									<div className="mx-8 mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
								)}

								<div className="flex-1 overflow-y-auto p-8 space-y-4">
									{messages.length === 0 ? (
										<div className="rounded-xl border border-dashed border-gray-200 bg-[#f8fafc] p-8 text-center text-gray-500">
											No messages yet. Start the conversation!
										</div>
									) : (
										messages.map((m) => (
											<div
												key={m.mentor_chat_message_id || m.message_id}
												className={`max-w-[78%] rounded-2xl px-5 py-3 ${
													m.sender_role === "Mentor" || m.sender_user_id
														? "ml-auto bg-[#0f3d32] text-white"
														: "bg-[#f3f4f6] text-gray-900"
												}`}
											>
												{m.message_type === 'file' ? (
													<div>
														<div className="flex items-center gap-3 mb-2">
															<svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
															</svg>
															<div className="min-w-0">
																<p className="text-sm font-medium truncate">{m.file_name || 'Attachment'}</p>
																{m.file_size_bytes && (
																	<p className="text-xs opacity-70">
																		{(m.file_size_bytes / 1024).toFixed(1)} KB
																	</p>
																)}
															</div>
														</div>
														{m.text_body && (
															<p className="text-sm leading-6 mt-2">{m.text_body}</p>
														)}
													</div>
												) : (
													<p className="text-sm leading-6">{m.text_body || m.body || m.message_text}</p>
												)}
												<p className={`mt-2 text-[11px] ${m.sender_role === "Mentor" || m.sender_user_id ? "text-white/60" : "text-gray-400"}`}>
													{m.created_at ? new Date(m.created_at).toLocaleString() : "Just now"}
												</p>
											</div>
										))
									)}
								</div>

								<form onSubmit={handleSend} className="border-t border-gray-100 p-4">
									<div className="flex gap-3">
										<div className="relative flex-1">
											<input
												value={text}
												onChange={(e) => setText(e.target.value)}
												placeholder="Type your message..."
												className="w-full rounded-xl border border-gray-200 bg-[#f8fafc] px-4 py-3 pr-24 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
											/>
											<div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
												<input
													type="file"
													id="mentor-file-upload"
													className="hidden"
													onChange={handleFileSelect}
												/>
												<label
													htmlFor="mentor-file-upload"
													className="cursor-pointer rounded-lg p-2 hover:bg-gray-200 transition"
												>
													<svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
													</svg>
												</label>
												<button
													type="button"
													onClick={startVoiceRecording}
													className={`rounded-lg p-2 transition ${isRecording ? 'bg-red-100 hover:bg-red-200' : 'hover:bg-gray-200'}`}
												>
													{isRecording ? (
														<svg className="w-4 h-4 text-red-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
															<circle cx="12" cy="12" r="6" />
														</svg>
													) : (
														<svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
															<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
														</svg>
													)}
												</button>
											</div>
										</div>
										<button
											type="submit"
											disabled={sending || !text.trim()}
											className="rounded-xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0a2921] disabled:cursor-not-allowed disabled:opacity-50"
										>
											Send
										</button>
									</div>
									{selectedFile && (
										<div className="mt-2 flex items-center gap-2 text-xs text-gray-600">
											<span className="bg-gray-100 rounded-lg px-2 py-1">
												📎 {selectedFile.name} ({(selectedFile.size / 1024).toFixed(1)} KB)
											</span>
											<button
												type="button"
												onClick={() => {
													setSelectedFile(null);
													setText("");
												}}
												className="text-red-600 hover:text-red-800"
											>
												Remove
											</button>
										</div>
									)}
								</form>
							</>
						) : (
							<div className="flex-1 flex items-center justify-center text-gray-500 text-sm">
								Select a conversation to start messaging
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}