"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/startup/Sidebar";
import { searchInvestors, searchMentors } from "@/lib/startupApi";

export default function StartupDiscoverPage() {
  const [investors, setInvestors] = useState([]);
  const [mentors, setMentors] = useState([]);
  const [investorQuery, setInvestorQuery] = useState("");
  const [mentorQuery, setMentorQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [investorData, mentorData] = await Promise.all([
          searchInvestors({ query: investorQuery }),
          searchMentors({ query: mentorQuery }),
        ]);
        setInvestors(investorData.investors || []);
        setMentors(mentorData.mentors || []);
      } catch (err) {
        setError(err.message || "Unable to load discovery data.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const [investorData, mentorData] = await Promise.all([
        searchInvestors({ query: investorQuery }),
        searchMentors({ query: mentorQuery }),
      ]);
      setInvestors(investorData.investors || []);
      setMentors(mentorData.mentors || []);
    } catch (err) {
      setError(err.message || "Unable to refresh discovery data.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Discover Investors & Mentors</h1>
              <p className="text-sm text-gray-500 mt-1">Find recommended investors and mentors tailored to your startup profile.</p>
            </div>
            <Link href="/startup/recommendations" className="inline-flex items-center rounded-2xl bg-[#0f3d32] px-5 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition">View Recommendations</Link>
          </div>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1200px] mx-auto pb-24">
          <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1.5fr_1fr] mb-8">
            <input
              value={investorQuery}
              onChange={(e) => setInvestorQuery(e.target.value)}
              placeholder="Search investors by focus, location, or name"
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
            />
            <input
              value={mentorQuery}
              onChange={(e) => setMentorQuery(e.target.value)}
              placeholder="Search mentors by expertise or industry"
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
            />
            <button type="submit" className="rounded-2xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition">Search</button>
          </form>

          {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {loading ? (
            <div className="rounded-[30px] border border-gray-100 bg-white p-10 shadow-sm text-center text-gray-500">Loading discovery results…</div>
          ) : (
            <div className="grid gap-10">
              <section className="rounded-[30px] bg-white border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Investors</h2>
                    <p className="text-sm text-gray-500">Top investor matches for your startup.</p>
                  </div>
                  <Link href="/startup/chat" className="text-sm font-bold text-[#0f3d32] hover:text-[#0a2921]">Message investors</Link>
                </div>
                {investors.length === 0 ? (
                  <p className="text-sm text-gray-500">No investors found. Adjust the search terms or try again later.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {investors.slice(0, 6).map((investor) => (
                      <div key={investor.investor_id} className="rounded-3xl border border-gray-200 p-5 hover:shadow-sm transition">
                        <h3 className="text-lg font-semibold text-gray-900">{investor.organization_name || `${investor.first_name || ""} ${investor.last_name || ""}`.trim() || "Investor"}</h3>
                        <p className="text-sm text-gray-500 mt-2">{investor.industry || investor.sector || "Focused on early-stage startups"}</p>
                        <div className="mt-4 text-sm text-gray-600 space-y-1">
                          {investor.location && <p>Location: {investor.location}</p>}
                          {investor.investment_range && <p>Range: {investor.investment_range}</p>}
                          {investor.experience && <p>Experience: {investor.experience}</p>}
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          <Link href="/startup/chat" className="rounded-full border border-[#0f3d32] px-4 py-2 text-xs font-bold text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition">Contact</Link>
                          <Link href="/startup/mentorship" className="rounded-full border border-gray-200 px-4 py-2 text-xs font-bold text-gray-600 hover:bg-gray-100 transition">Mentorship</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </section>

              <section className="rounded-[30px] bg-white border border-gray-100 p-8 shadow-sm">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Mentors</h2>
                    <p className="text-sm text-gray-500">Mentors matched to your product and growth stage.</p>
                  </div>
                  <Link href="/startup/mentorship" className="text-sm font-bold text-[#0f3d32] hover:text-[#0a2921]">Request mentorship</Link>
                </div>
                {mentors.length === 0 ? (
                  <p className="text-sm text-gray-500">No mentors available. Try a broader search or a different experience area.</p>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {mentors.slice(0, 6).map((mentor) => (
                      <div key={mentor.mentor_id} className="rounded-3xl border border-gray-200 p-5 hover:shadow-sm transition">
                        <h3 className="text-lg font-semibold text-gray-900">{mentor.first_name || "Mentor"} {mentor.last_name || ""}</h3>
                        <p className="text-sm text-gray-500 mt-2">{mentor.expertise || mentor.industry || "Experienced founder or advisor"}</p>
                        <div className="mt-4 text-sm text-gray-600 space-y-1">
                          {mentor.location && <p>Location: {mentor.location}</p>}
                          {mentor.company && <p>Company: {mentor.company}</p>}
                          {mentor.mentor_type && <p>Type: {mentor.mentor_type}</p>}
                        </div>
                        <div className="mt-5">
                          <Link href="/startup/mentorship" className="rounded-full border border-[#0f3d32] px-4 py-2 text-xs font-bold text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition">Request Mentor</Link>
                        </div>
                      </div>
                    ))}
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
