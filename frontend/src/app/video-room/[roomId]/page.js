"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

export default function VideoRoomPage({ params }) {
	const roomId = params?.roomId || "";
	const videoRef = useRef(null);
	const [stream, setStream] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		let activeStream;
		async function openMedia() {
			try {
				activeStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
				setStream(activeStream);
				if (videoRef.current) videoRef.current.srcObject = activeStream;
			} catch (ex) {
				setError(ex.message || "Camera or microphone permission was blocked.");
			}
		}
		openMedia();
		return () => activeStream?.getTracks?.().forEach((track) => track.stop());
	}, []);

	useEffect(() => {
		if (videoRef.current && stream) videoRef.current.srcObject = stream;
	}, [stream]);

	return (
		<main className="min-h-screen bg-slate-950 p-4 text-white">
			<div className="mx-auto flex min-h-[calc(100vh-2rem)] max-w-5xl flex-col">
				<header className="mb-4 flex flex-wrap items-center justify-between gap-3">
					<div>
						<p className="text-xs font-bold uppercase tracking-widest text-emerald-300">StartupConnect video room</p>
						<h1 className="mt-1 text-2xl font-black">Room {roomId}</h1>
					</div>
					<Link href="/dashboard" className="rounded-lg border border-white/20 px-4 py-2 text-sm font-bold text-white hover:bg-white/10">
						Back
					</Link>
				</header>

				<section className="grid flex-1 gap-4 lg:grid-cols-[1fr_280px]">
					<div className="overflow-hidden rounded-2xl border border-white/10 bg-black">
						{stream ? (
							<video ref={videoRef} autoPlay muted playsInline className="h-full min-h-[420px] w-full object-cover" />
						) : (
							<div className="flex h-full min-h-[420px] items-center justify-center px-6 text-center text-slate-300">
								{error || "Requesting camera and microphone access..."}
							</div>
						)}
					</div>
					<aside className="rounded-2xl border border-white/10 bg-white/5 p-5">
						<h2 className="font-bold">Session details</h2>
						<p className="mt-2 break-all font-mono text-xs text-slate-300">{roomId}</p>
						<p className="mt-4 text-sm text-slate-300">
							This room is linked from platform chat calls. Keep the chat page open for call status, participants, and screen-share tracking.
						</p>
					</aside>
				</section>
			</div>
		</main>
	);
}
