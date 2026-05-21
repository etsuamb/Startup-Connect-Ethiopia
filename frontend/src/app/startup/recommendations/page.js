"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/startup/Sidebar";
import { getInvestorRecommendations, getMentorRecommendations } from "@/lib/startupApi";

export default function StartupRecommendationsPage() {
  const [investorRecommendations, setInvestorRecommendations] = useState([]);
  const [mentorRecommendations, setMentorRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        const [investorData, mentorData] = await Promise.all([
          getInvestorRecommendations(),
          getMentorRecommendations(),
        ]);
        setInvestorRecommendations(investorData.recommendations || []);
        setMentorRecommendations(mentorData.recommendations || []);
      } catch (err) {
        setError(err.message || "Unable to load recommendations.");
      } finally {
        setLoading(false);
      }
    }

    loadRecommendations();
  }, []);

  return (
    <div className="min-h-screen bg-[#eef4f2] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">Recommended Matches</h1>
          <p className="text-sm text-gray-500 mt-1">Investor and mentor recommendations curated for your startup.</p>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1200px] mx-auto pb-24">
          {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {loading ? (
            <div className="rounded-[30px] border border-gray-100 bg-white p-10 shadow-sm text-center text-gray-500">Loading recommendations…</div>
          ) : (
            <div className="grid gap-10">
              <section className="rounded-[30px] bg-white border border-gray-100 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Investors for you</h2>
                {investorRecommendations.length === 0 ? (
                  <p className="text-sm text-gray-500">No investor recommendations available yet.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {investorRecommendations.map((item) => {
                      const investor = item.investor || item;
                      return (
                        <div key={investor.investor_id || investor.id || JSON.stringify(investor)} className="rounded-3xl border border-gray-200 p-5 hover:shadow-sm transition">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{investor.organization_name || `${investor.first_name || ""} ${investor.last_name || ""}`.trim() || "Investor"}</h3>
                              <p className="text-sm text-gray-500 mt-2">{investor.industry || investor.sector || "Early stage investor"}</p>
                            </div>
                            <span className="rounded-full bg-[#eef6ff] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#2563eb]">{Math.round(item.score || 0)}%</span>
                          </div>
                          {item.reason && <p className="mt-4 text-sm text-gray-600">{item.reason}</p>}
                          <div className="mt-5 flex flex-wrap gap-2">
                            <button className="rounded-full border border-[#0f3d32] px-4 py-2 text-xs font-bold text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition">Contact</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>

              <section className="rounded-[30px] bg-white border border-gray-100 p-8 shadow-sm">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Mentors for you</h2>
                {mentorRecommendations.length === 0 ? (
                  <p className="text-sm text-gray-500">No mentor recommendations available yet.</p>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {mentorRecommendations.map((item) => {
                      const mentor = item.mentor || item;
                      return (
                        <div key={mentor.mentor_id || mentor.id || JSON.stringify(mentor)} className="rounded-3xl border border-gray-200 p-5 hover:shadow-sm transition">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <h3 className="text-lg font-semibold text-gray-900">{mentor.first_name || "Mentor"} {mentor.last_name || ""}</h3>
                              <p className="text-sm text-gray-500 mt-2">{mentor.expertise || mentor.industry || "Startup advisor"}</p>
                            </div>
                            <span className="rounded-full bg-[#ecfdf5] px-3 py-1 text-xs font-bold uppercase tracking-widest text-[#16a34a]">{Math.round(item.score || 0)}%</span>
                          </div>
                          {item.reason && <p className="mt-4 text-sm text-gray-600">{item.reason}</p>}
                          <div className="mt-5">
                            <button className="rounded-full border border-[#0f3d32] px-4 py-2 text-xs font-bold text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition">Request Mentor</button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
