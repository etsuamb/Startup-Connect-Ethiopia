"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/investor/Sidebar";
import {
  getInvestorRatings,
  getInvestorMentorRatings,
  getInvestorStartups,
  submitInvestorRating,
} from "@/lib/investorApi";

const DEFAULT_RATINGS = {
  overall: 4,
  pitch: 4,
  team: 4,
  business: 4,
};

function formatDate(value) {
  if (!value) return "Just now";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Just now";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function mentorDisplayName(rating) {
  const first = rating?.mentor_first_name || "";
  const last = rating?.mentor_last_name || "";
  const full = `${first} ${last}`.trim();
  return full || rating?.mentor_headline || "Mentor";
}

function ReadOnlyStars({ rating }) {
  const value = Math.max(0, Math.min(5, Number(rating) || 0));
  return (
    <div className="flex gap-0.5" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= value ? "text-[#8a611c]" : "text-gray-200"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingContent() {
  const searchParams = useSearchParams();
  const startupIdFromUrl = searchParams.get("startupId") || "";
  const [startups, setStartups] = useState([]);
  const [selectedStartupId, setSelectedStartupId] = useState(startupIdFromUrl);
  const [ratings, setRatings] = useState(DEFAULT_RATINGS);
  const [comment, setComment] = useState("");
  const [recentRatings, setRecentRatings] = useState([]);
  const [mentorRatings, setMentorRatings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadRatingData() {
      try {
        setLoading(true);
        setError("");
        const [startupData, ratingData, mentorRatingData] = await Promise.all([
          getInvestorStartups({ limit: 100 }),
          getInvestorRatings({ limit: 10 }),
          getInvestorMentorRatings({ limit: 30 }),
        ]);
        if (ignore) return;
        const loadedStartups = Array.isArray(startupData.startups) ? startupData.startups : [];
        setStartups(loadedStartups);
        setRecentRatings(Array.isArray(ratingData.ratings) ? ratingData.ratings : []);
        setMentorRatings(Array.isArray(mentorRatingData.ratings) ? mentorRatingData.ratings : []);
        if (!startupIdFromUrl && loadedStartups.length) {
          setSelectedStartupId(String(loadedStartups[0].startup_id));
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Failed to load rating data.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadRatingData();
    return () => {
      ignore = true;
    };
  }, [startupIdFromUrl]);

  const averageRating = useMemo(() => {
    const values = Object.values(ratings).map(Number);
    return Math.round(values.reduce((sum, value) => sum + value, 0) / values.length);
  }, [ratings]);

  const renderStars = (rating, key) => (
    <div className="flex gap-1.5 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRatings((current) => ({ ...current, [key]: star }))}
          className={`transition ${star <= rating ? "text-[#8a611c]" : "text-gray-300"}`}
          aria-label={`${key} rating ${star}`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedStartupId) {
      setError("Select a startup before submitting a rating.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setSuccess("");
      await submitInvestorRating(selectedStartupId, {
        rating: averageRating,
        ratings,
        comment,
      });
      const ratingData = await getInvestorRatings({ limit: 10 });
      setRecentRatings(Array.isArray(ratingData.ratings) ? ratingData.ratings : []);
      setRatings(DEFAULT_RATINGS);
      setComment("");
      if (!startupIdFromUrl) {
        setSelectedStartupId(startups.length ? String(startups[0].startup_id) : "");
      }
      setSuccess("Rating submitted successfully.");
    } catch (err) {
      setError(err.message || "Failed to submit rating.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        <main className="flex-grow flex flex-col overflow-y-auto bg-white">
          <div className="p-10 pt-24 max-w-[1200px] w-full mx-auto flex flex-col">
            <div className="mb-10">
              <h1 className="text-[34px] font-bold text-gray-900 tracking-tight mb-3">Startup Rating</h1>
              <p className="text-gray-500 text-[15px] max-w-3xl">Rate Ethiopian startups across key investment criteria and leave clear guidance for founders.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <form onSubmit={handleSubmit} className="flex-grow w-full bg-white border border-gray-200 rounded-[20px] p-8 shadow-sm">
                {error ? (
                  <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </div>
                ) : null}
                {success ? (
                  <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
                    {success}
                  </div>
                ) : null}

                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">SELECT STARTUP</label>
                  <div className="relative">
                    <select
                      value={selectedStartupId}
                      onChange={(event) => setSelectedStartupId(event.target.value)}
                      disabled={loading}
                      className="w-full appearance-none bg-[#f8f9fa] border border-gray-200 text-gray-700 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px] disabled:text-gray-400"
                    >
                      <option value="">{loading ? "Loading startups..." : "Select a startup to rate"}</option>
                      {startups.map((startup) => (
                        <option key={startup.startup_id} value={startup.startup_id}>
                          {startup.startup_name}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                  <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">OVERALL RATING</label>
                    {renderStars(ratings.overall, "overall")}
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">PITCH QUALITY</label>
                    {renderStars(ratings.pitch, "pitch")}
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">TEAM STRENGTH</label>
                    {renderStars(ratings.team, "team")}
                  </div>
                  <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                    <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">BUSINESS POTENTIAL</label>
                    {renderStars(ratings.business, "business")}
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">RATING NOTES & ADVICE</label>
                  <textarea
                    rows="5"
                    value={comment}
                    onChange={(event) => setComment(event.target.value)}
                    placeholder="Add notes that explain your rating for the founders..."
                    className="w-full bg-[#f8f9fa] border border-gray-200 text-gray-700 py-4 px-5 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={saving || loading || !selectedStartupId}
                  className="w-full py-4 bg-[#0a3a2e] hover:bg-[#072a21] text-white font-bold text-[14px] rounded-xl transition shadow-md disabled:bg-gray-300 disabled:shadow-none disabled:cursor-not-allowed"
                >
                  {saving ? "Submitting..." : `Submit Rating (${averageRating}/5)`}
                </button>
              </form>

              <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-5">
                <div className="flex justify-between items-center mb-1">
                  <h2 className="text-[22px] font-bold text-gray-900">Recent Ratings</h2>
                  <span className="px-3 py-1.5 bg-[#fae8c8] text-[#8a611c] text-[11px] font-bold rounded-full">
                    {recentRatings.length}
                  </span>
                </div>

                {recentRatings.length ? recentRatings.map((rating) => (
                  <div key={rating.investor_feedback_id} className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-1 gap-3">
                      <h3 className="font-bold text-[15px] text-gray-900">{rating.startup_name}</h3>
                      <div className="flex items-center gap-1 px-2 py-0.5 bg-[#fae8c8] text-[#8a611c] rounded-md text-[11px] font-bold shrink-0">
                        {rating.rating}
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      </div>
                    </div>
                    <div className="text-[11px] text-gray-400 font-medium mb-3">{formatDate(rating.created_at)}</div>
                    <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                      {rating.comment || "No notes added for this rating."}
                    </p>
                  </div>
                )) : (
                  <div className="bg-white border border-gray-200 rounded-[16px] p-6 text-sm text-gray-500 shadow-sm">
                    No ratings submitted yet.
                  </div>
                )}

                <div className="bg-[#052e20] rounded-[20px] p-8 text-white relative overflow-hidden mt-2 shadow-lg">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-[0.03] rounded-bl-[100px] pointer-events-none" />
                  <div className="text-[#10704c] text-5xl font-serif leading-none mb-2">&quot;</div>
                  <p className="text-[14px] text-white/90 leading-relaxed font-medium mb-6 relative z-10 pr-2">
                    Ratings help founders understand where their startup is strongest and where investors need more confidence.
                  </p>
                  <div className="text-[10px] font-bold text-[#4ade80] uppercase tracking-widest relative z-10">
                    RATING INSIGHT
                  </div>
                </div>
              </div>
            </div>

            <section className="mt-14 pt-10 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-[26px] font-bold text-gray-900 tracking-tight">Mentor ratings from startups</h2>
                  <p className="text-gray-500 text-[15px] max-w-3xl mt-2">
                    When founders rate mentors after mentorship, those reviews appear here with the rating, feedback, mentor name, and which startup submitted it.
                  </p>
                </div>
                <span className="px-3 py-1.5 bg-[#eaf4f1] text-[#0f3d32] text-[11px] font-bold rounded-full shrink-0 self-start">
                  {mentorRatings.length} review{mentorRatings.length !== 1 ? "s" : ""}
                </span>
              </div>

              {loading ? (
                <p className="text-sm text-gray-500">Loading mentor ratings…</p>
              ) : mentorRatings.length ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {mentorRatings.map((item) => (
                    <article
                      key={item.review_id}
                      className="bg-white border border-gray-200 rounded-[16px] p-6 shadow-sm hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start gap-4 mb-4">
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-[#0f3d32] mb-1">Mentor rated</p>
                          <h3 className="font-bold text-[16px] text-gray-900 truncate">{mentorDisplayName(item)}</h3>
                          {item.mentor_headline ? (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{item.mentor_headline}</p>
                          ) : null}
                        </div>
                        <div className="shrink-0 text-right">
                          <ReadOnlyStars rating={item.rating} />
                          <p className="text-[11px] font-bold text-[#8a611c] mt-1">{item.rating}/5</p>
                        </div>
                      </div>

                      <div className="rounded-xl bg-[#f8f9fa] border border-gray-100 px-4 py-3 mb-4">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-1">Rated by startup</p>
                        <p className="text-sm font-bold text-gray-900">{item.startup_name || "Startup"}</p>
                        {item.startup_industry ? (
                          <p className="text-xs text-gray-500 mt-0.5">{item.startup_industry}</p>
                        ) : null}
                      </div>

                      <p className="text-[13px] text-gray-600 leading-relaxed">
                        {item.comment?.trim() || "No written feedback provided."}
                      </p>
                      <p className="text-[11px] text-gray-400 font-medium mt-4">{formatDate(item.created_at)}</p>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="bg-white border border-gray-200 rounded-[16px] p-8 text-sm text-gray-500 shadow-sm">
                  No startup mentor ratings yet. Ratings will show here after founders submit mentor reviews.
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function RatingPage() {
  return (
    <Suspense fallback={<p className="p-8 text-gray-500">Loading...</p>}>
      <RatingContent />
    </Suspense>
  );
}
