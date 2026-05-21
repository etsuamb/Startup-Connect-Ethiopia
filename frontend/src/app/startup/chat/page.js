"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/startup/Sidebar";
import { searchInvestors, getInvestorMessages, sendInvestorMessage } from "@/lib/startupApi";

export default function StartupChatPage() {
  const [investors, setInvestors] = useState([]);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadInvestors() {
      try {
        const data = await searchInvestors({ query: "" });
        setInvestors(data.investors || []);
        if (data.investors?.[0]) {
          selectInvestor(data.investors[0]);
        }
      } catch (err) {
        setError(err.message || "Unable to load investor list.");
      } finally {
        setLoading(false);
      }
    }
    loadInvestors();
  }, []);

  async function selectInvestor(investor) {
    setSelectedInvestor(investor);
    setMessages([]);
    setError(null);
    try {
      const data = await getInvestorMessages(investor.investor_id);
      setMessages(data.messages || []);
    } catch (err) {
      setError(err.message || "Unable to load messages.");
    }
  }

  async function handleSend(event) {
    event.preventDefault();
    if (!selectedInvestor || !messageText.trim()) {
      return;
    }
    const text = messageText.trim();
    setMessageText("");
    try {
      await sendInvestorMessage(selectedInvestor.investor_id, text);
      setMessages((current) => [
        ...current,
        { sender: "startup", message: text, created_at: new Date().toISOString() },
      ]);
    } catch (err) {
      setError(err.message || "Unable to send message.");
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f8fb] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">Investor Chat</h1>
          <p className="text-sm text-gray-500 mt-1">Connect with investors directly to discuss your project and next steps.</p>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1400px] mx-auto pb-24">
          {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
            <aside className="rounded-[30px] border border-gray-100 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Investors</h2>
              {loading ? (
                <p className="text-gray-500">Loading investors…</p>
              ) : investors.length === 0 ? (
                <p className="text-gray-500">No investors available.</p>
              ) : (
                <div className="space-y-3">
                  {investors.map((investor) => (
                    <button
                      key={investor.investor_id}
                      onClick={() => selectInvestor(investor)}
                      className={`w-full text-left rounded-2xl p-4 transition ${selectedInvestor?.investor_id === investor.investor_id ? "bg-[#0f3d32] text-white" : "bg-[#f8fafc] text-gray-900 hover:bg-gray-100"}`}
                    >
                      <div className="font-semibold">{investor.organization_name || `${investor.first_name || ""} ${investor.last_name || ""}`.trim() || "Investor"}</div>
                      <p className="text-sm text-gray-500 mt-1">{investor.industry || investor.sector || "Investment partner"}</p>
                    </button>
                  ))}
                </div>
              )}
            </aside>
            <section className="rounded-[30px] border border-gray-100 bg-white p-6 shadow-sm flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedInvestor ? (selectedInvestor.organization_name || `${selectedInvestor.first_name || ""} ${selectedInvestor.last_name || ""}`.trim()) : "Select an investor"}</h2>
                  <p className="text-sm text-gray-500">{selectedInvestor ? selectedInvestor.industry || selectedInvestor.sector : "Choose an investor from the list to view the conversation."}</p>
                </div>
                <button className="rounded-2xl border border-gray-200 px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-50 transition">Refresh</button>
              </div>
              <div className="flex-1 overflow-y-auto space-y-4 mb-6" style={{ minHeight: 300 }}>
                {selectedInvestor ? (
                  messages.length === 0 ? (
                    <div className="rounded-3xl border border-dashed border-gray-200 bg-[#f8fafc] p-8 text-center text-gray-500">No messages yet. Start the conversation by sending a message.</div>
                  ) : (
                    messages.map((message, index) => {
                      const isStartup = message.sender === "startup" || message.sent_by_startup || message.sender === "you";
                      return (
                        <div key={index} className={`max-w-[80%] rounded-3xl px-5 py-4 ${isStartup ? "ml-auto bg-[#0f3d32] text-white" : "bg-[#f3f4f6] text-gray-900"}`}>
                          <p className="text-sm leading-6">{message.message || message.body || message.content}</p>
                          <p className="mt-2 text-[11px] text-gray-400">{message.created_at ? new Date(message.created_at).toLocaleString() : "Just now"}</p>
                        </div>
                      );
                    })
                  )
                ) : (
                  <div className="rounded-3xl border border-dashed border-gray-200 bg-[#f8fafc] p-10 text-center text-gray-500">Select an investor to start chatting.</div>
                )}
              </div>
              <form onSubmit={handleSend} className="flex gap-3">
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 rounded-3xl border border-gray-200 bg-[#f8fafc] px-5 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                />
                <button type="submit" className="rounded-3xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition">Send</button>
              </form>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
