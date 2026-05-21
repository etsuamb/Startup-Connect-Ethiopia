"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/startup/Sidebar";
import { getStartupProfile, updateStartupProfile } from "@/lib/startupApi";

export default function StartupSettingsPage() {
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [startupName, setStartupName] = useState("");
  const [industry, setIndustry] = useState("");
  const [stage, setStage] = useState("");
  const [description, setDescription] = useState("");
  const [foundedYear, setFoundedYear] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [fundingNeeded, setFundingNeeded] = useState("");
  const [pitchDeck, setPitchDeck] = useState(null);
  const [businessPlan, setBusinessPlan] = useState(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const data = await getStartupProfile();
        setStartup(data.startup || data);
        setStartupName(data.startup?.startup_name || data.startup_name || "");
        setIndustry(data.startup?.industry || data.industry || "");
        setStage(data.startup?.business_stage || data.business_stage || "");
        setDescription(data.startup?.description || data.description || "");
        setFoundedYear(data.startup?.founded_year || data.founded_year || "");
        setTeamSize(data.startup?.team_size || data.team_size || "");
        setLocation(data.startup?.location || data.location || "");
        setWebsite(data.startup?.website || data.website || "");
        setFundingNeeded(data.startup?.funding_needed || data.funding_needed || "");
      } catch (err) {
        setError(err.message || "Unable to load startup profile.");
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    if (!startupName.trim()) {
      setError("Startup name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("startup_name", startupName);
    formData.append("industry", industry);
    formData.append("business_stage", stage);
    formData.append("description", description);
    formData.append("founded_year", foundedYear);
    formData.append("team_size", teamSize);
    formData.append("location", location);
    formData.append("website", website);
    formData.append("funding_needed", fundingNeeded);
    if (pitchDeck) formData.append("pitch_deck", pitchDeck);
    if (businessPlan) formData.append("business_plan", businessPlan);

    setSaving(true);
    try {
      await updateStartupProfile(formData);
      setSuccess("Startup profile updated successfully.");
    } catch (err) {
      setError(err.message || "Unable to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <header className="px-8 py-6 bg-white border-b border-gray-100 sticky top-0 z-10">
          <h1 className="text-3xl font-bold text-gray-900">Startup Settings</h1>
          <p className="text-sm text-gray-500 mt-1">Update your startup profile, pitch deck, and business details.</p>
        </header>

        <div className="px-4 sm:px-10 py-8 w-full max-w-[1200px] mx-auto pb-24">
          {error && <div className="mb-6 rounded-3xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}
          {success && <div className="mb-6 rounded-3xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">{success}</div>}
          {loading ? (
            <div className="rounded-[30px] border border-gray-100 bg-white p-10 shadow-sm text-center text-gray-500">Loading settings…</div>
          ) : (
            <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.5fr_0.8fr]">
              <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Startup Name</label>
                  <input
                    value={startupName}
                    onChange={(e) => setStartupName(e.target.value)}
                    placeholder="Your startup name"
                    className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Industry</label>
                    <input
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="Agritech, Fintech, Health"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Business Stage</label>
                    <input
                      value={stage}
                      onChange={(e) => setStage(e.target.value)}
                      placeholder="Prototype, Seed, Growth"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    placeholder="Briefly describe your startup, product, and market fit."
                    className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                  />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Founded Year</label>
                    <input
                      value={foundedYear}
                      onChange={(e) => setFoundedYear(e.target.value)}
                      placeholder="2024"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Team Size</label>
                    <input
                      value={teamSize}
                      onChange={(e) => setTeamSize(e.target.value)}
                      placeholder="10"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Location</label>
                    <input
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Addis Ababa, Ethiopia"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">Website</label>
                    <input
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder="https://example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Funding Needed (USD)</label>
                  <input
                    value={fundingNeeded}
                    onChange={(e) => setFundingNeeded(e.target.value)}
                    placeholder="50000"
                    className="w-full rounded-2xl border border-gray-200 bg-[#f8fafc] px-4 py-3 text-sm outline-none focus:border-[#0f3d32] focus:ring-2 focus:ring-[#0f3d32]/20"
                  />
                </div>
              </div>

              <div className="rounded-[30px] border border-gray-100 bg-white p-8 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Files</h2>
                  <p className="text-sm text-gray-500 mt-2">Upload your latest pitch deck and business plan.</p>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Pitch Deck</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setPitchDeck(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">Business Plan</label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setBusinessPlan(e.target.files?.[0] || null)}
                    className="w-full text-sm text-gray-700"
                  />
                </div>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-2xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white hover:bg-[#0a2921] transition disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {saving ? "Saving…" : "Save Settings"}
                </button>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
