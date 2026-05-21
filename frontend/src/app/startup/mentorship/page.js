"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/startup/Sidebar";
import { getMentorRecommendations, createMentorshipRequest } from "@/lib/startupApi";

export default function StartupMentorshipPage() {
  const [mentors, setMentors] = useState([]);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    async function loadMentors() {
      try {
        const data = await getMentorRecommendations();
        setMentors(data.recommendations || []);
      } catch (err) {
        setError(err.message || "Unable to load mentors.");
      } finally {
        setLoading(false);
      }
    }
    loadMentors();
  }, []);

  async function handleRequest(event) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (!selectedMentor) {
      setError("Please select a mentor to request.");
      return;
    }
    if (!subject.trim() || !message.trim()) {
      setError("Subject and message are required.");
      return;
    }

    setSending(true);
    try {
      await createMentorshipRequest({
        mentor_id: selectedMentor.mentor_id || selectedMentor.id,
        subject,
        message,
      });
      setSuccess("Mentorship request sent successfully.");
      setSubject("");
      setMessage("");
    } catch (err) {
      setError(err.message || "Unable to send mentorship request.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f9fafb] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">Mentorship</h1>
          <p className="text-sm text-gray-500 mt-1">Connect with recommended mentors and send a request quickly.</p>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1200px] mx-auto pb-24 grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <section className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recommended mentors</h2>
                <p className="text-sm text-gray-500">Choose a mentor to help refine your startup strategy.</p>
              </div>
            </div>
            {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
            {loading ? (
              <p className="text-gray-500">Loading mentors…</p>
            ) : mentors.length === 0 ? (
              <p className="text-sm text-gray-500">No mentors available right now.</p>
            ) : (
              <div className="space-y-4">
                {mentors.slice(0, 8).map((item) => {
                  const mentor = item.mentor || item;
                  return (
                    <button
                      key={mentor.mentor_id || mentor.id || JSON.stringify(mentor)}
                      onClick={() => setSelectedMentor(mentor)}
                      className={`w-full rounded-3xl border px-4 py-4 text-left transition ${selectedMentor?.mentor_id === mentor.mentor_id ? "border-[#0f3d32] bg-[#ecfdf3]" : "border-gray-200 bg-white hover:border-gray-300"}`}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{mentor.first_name || "Mentor"} {mentor.last_name || ""}</h3>
                          <p className="text-sm text-gray-500 mt-1">{mentor.expertise || mentor.industry || "Trusted advisor"}</p>
                        </div>
                        <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Score {Math.round(item.score || 0)}%</span>
                      </div>
                      {item.reason && <p className="mt-3 text-sm text-gray-600">{item.reason}</p>}
                    </button>
                  );
                })}
              </div>
            )}
          </section>

          <section className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Request mentorship</h2>
            <p className="text-sm text-gray-500 mb-6">Send a personalized message to your chosen mentor.</p>
            <div className="rounded-3xl bg-[#f8fafc] p-5 mb-6">
              <p className="text-sm text-gray-500">Selected mentor: <span className="font-semibold text-gray-900">{selectedMentor ? `${selectedMentor.first_name || "Mentor"} ${selectedMentor.last_name || ""}`.trim() : "None"}</span></p>
            </div>
            <form onSubmit={handleRequest} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Request Subject</label>
                <input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Mentorship on market launch strategy"
                  className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={6}
                  placeholder="Write a short message explaining what you need help with."
                  className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                />
              </div>
              <button
                type="submit"
                disabled={sending}
                className="inline-flex items-center justify-center rounded-2xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition disabled:cursor-not-allowed disabled:opacity-70"
              >
                {sending ? "Sending…" : "Send Request"}
              </button>
              {success && <p className="text-sm text-green-700">{success}</p>}
            </form>
          </section>
        </div>
      </main>
    </div>
  );
}
