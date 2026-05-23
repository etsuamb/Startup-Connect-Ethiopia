"use client";

import Sidebar from "@/components/startup/Sidebar";

const previewThreads = [
  {
    id: 1,
    name: "Investor conversations",
    subtitle: "Messaging will be connected here later.",
    time: "Soon",
  },
  {
    id: 2,
    name: "Accepted offers only",
    subtitle: "Chat access will remain gated by accepted investment offers.",
    time: "Planned",
  },
];

export default function StartupChatPage() {
  return (
    <div className="flex min-h-screen overflow-hidden bg-white font-sans text-gray-900">
      <Sidebar />

      <main className="flex h-screen flex-grow overflow-hidden bg-white">
        <aside className="flex w-[340px] shrink-0 flex-col border-r border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-4">
            <h1 className="mb-4 text-xl font-bold text-gray-900">Investor Chat</h1>
            <input
              disabled
              placeholder="Search conversations..."
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-[13px] text-gray-400 outline-none"
            />
          </div>

          <div className="flex-grow overflow-y-auto">
            {previewThreads.map((thread) => (
              <div key={thread.id} className="flex gap-4 border-b border-gray-50 p-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0f3d32] text-[13px] font-bold text-white">
                  IN
                </div>
                <div className="min-w-0 flex-grow">
                  <div className="flex items-baseline justify-between gap-2">
                    <h4 className="truncate text-[15px] font-bold text-gray-900">{thread.name}</h4>
                    <span className="shrink-0 text-[10px] font-bold text-gray-400">{thread.time}</span>
                  </div>
                  <p className="mt-1 truncate text-[13px] text-gray-500">{thread.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex flex-grow flex-col overflow-hidden">
          <div className="flex h-[76px] shrink-0 items-center border-b border-gray-200 px-8">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0f3d32] text-[13px] font-bold text-white">
                IN
              </div>
              <div>
                <h2 className="text-lg font-bold leading-tight text-gray-900">Startup messaging is disconnected</h2>
                <p className="text-[11px] font-bold text-[#0f3d32]">Ready for future integration</p>
              </div>
            </div>
          </div>

          <div className="flex flex-grow items-center justify-center p-8 text-center">
            <div className="max-w-md">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e9f7ef] text-[#0f3d32]">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Messaging is not integrated yet</h3>
              <p className="mt-3 text-sm leading-6 text-gray-500">
                This startup page no longer calls the chat backend. The layout is kept so you can reconnect investor conversations, files, and voice messages later.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3 border-t border-gray-200 bg-white p-6">
            <button disabled className="flex h-11 w-11 items-center justify-center rounded-xl border border-gray-200 text-gray-300">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828L18 9.828a4 4 0 10-5.657-5.657L5.757 10.757a6 6 0 108.486 8.486L20.829 12.657" />
              </svg>
            </button>
            <input
              disabled
              placeholder="Messaging integration will be added later"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-5 py-3.5 text-[14px] text-gray-400 outline-none"
            />
            <button disabled className="rounded-xl bg-gray-300 px-6 py-3.5 text-[14px] font-bold text-white">
              Send
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
