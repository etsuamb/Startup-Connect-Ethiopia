"use client";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/investor/Sidebar";
import { clearDraft, formatSavedTime, getDraftSavedAt, loadDraft, saveDraft } from "@/lib/formDraft";

const DRAFT_KEY = "investor_gebeya_offer";

export default function SendFundingOffer() {
  const [offerAmount, setOfferAmount] = useState("");
  const [equity, setEquity] = useState("");
  const [investmentType, setInvestmentType] = useState("Equity Investment");
  const [conditions, setConditions] = useState("");
  const [deadline, setDeadline] = useState("");
  const [notes, setNotes] = useState("");
  const [showDraftNotice, setShowDraftNotice] = useState(false);
  const [draftSavedAt, setDraftSavedAt] = useState(null);

  const impliedValuation = offerAmount && equity ? (parseFloat(offerAmount) / (parseFloat(equity) / 100)).toLocaleString() : "—";

  const draftData = useMemo(() => ({
    offerAmount,
    equity,
    investmentType,
    conditions,
    deadline,
    notes,
  }), [conditions, deadline, equity, investmentType, notes, offerAmount]);

  useEffect(() => {
    const savedDraft = loadDraft(DRAFT_KEY);
    if (!savedDraft) return;
    // Restoring local offer fields is the purpose of this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOfferAmount(savedDraft.offerAmount || "");
    setEquity(savedDraft.equity || "");
    setInvestmentType(savedDraft.investmentType || "Equity Investment");
    setConditions(savedDraft.conditions || "");
    setDeadline(savedDraft.deadline || "");
    setNotes(savedDraft.notes || "");
    const savedAt = getDraftSavedAt(DRAFT_KEY);
    setDraftSavedAt(formatSavedTime(savedAt));
    setShowDraftNotice(true);
    const timer = setTimeout(() => setShowDraftNotice(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const hasDraftContent = useCallback((data = draftData) => {
    return Object.entries(data).some(([key, value]) => {
      if (key === "investmentType") return false;
      return String(value || "").trim();
    });
  }, [draftData]);

  const handleSaveDraft = useCallback((showNotice = true) => {
    saveDraft(DRAFT_KEY, draftData);
    const savedAt = getDraftSavedAt(DRAFT_KEY);
    setDraftSavedAt(formatSavedTime(savedAt));
    if (showNotice) {
      setShowDraftNotice(true);
      setTimeout(() => setShowDraftNotice(false), 2000);
    }
  }, [draftData]);

  useEffect(() => {
    if (!hasDraftContent()) return;
    const timer = setTimeout(() => handleSaveDraft(false), 900);
    return () => clearTimeout(timer);
  }, [handleSaveDraft, hasDraftContent]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-white overflow-hidden relative">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-50 w-full z-20 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#0f3d32] tracking-tight">Send Funding Offer</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Prepare an investment proposal and submit terms to the startup</p>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-gray-400 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <button className="text-gray-400 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg></button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-black text-gray-900 leading-none">Marcus Thonier</p>
                  <p className="text-[9px] font-bold text-[#16a34a] uppercase tracking-widest mt-1">Commercial Lead Partner</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-amber-100 border-2 border-white shadow-sm flex items-center justify-center text-amber-700 font-bold text-xs uppercase overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white">MT</div>
               </div>
            </div>
          </div>
        </header>

        {/* Form Body */}
        <div className="flex-grow overflow-y-auto p-12 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
            
            {/* Left: Offer Form */}
            <div className="flex-grow space-y-10">
              
              {/* Startup Summary Bar */}
              <div className="bg-white rounded-3xl p-8 border-l-4 border-[#0f3d32] shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-[#07261f] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg">
                       <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                    </div>
                    <div>
                       <div className="flex items-center gap-2">
                          <h2 className="text-2xl font-black text-[#0f3d32] tracking-tight">Gebeya Inc.</h2>
                          <span className="px-2 py-0.5 bg-[#eef6f3] text-[#136150] rounded text-[8px] font-black uppercase tracking-widest border border-[#dcebe6]">Verified</span>
                       </div>
                       <div className="flex gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">
                          <span>Talent</span>
                          <span>|</span>
                          <span>Series A</span>
                          <span>|</span>
                          <span>Addis Ababa, Ethiopia</span>
                       </div>
                    </div>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">INVESTMENT ASK</p>
                    <p className="text-4xl font-black text-[#0f3d32] tracking-tighter">$1,200,000</p>
                    <p className="text-[9px] text-[#16a34a] font-bold mt-1 uppercase tracking-widest">You are preparing an offer for this startup</p>
                 </div>
              </div>

              {/* Form Content */}
              <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm space-y-12">
                 
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#eef6f3] rounded-xl flex items-center justify-center text-[#136150]">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    </div>
                    <h3 className="text-2xl font-black text-[#0f3d32] tracking-tight">Offer Details</h3>
                 </div>

                 <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Offer Amount (USD)</label>
                       <input 
                         type="number" 
                         value={offerAmount}
                         onChange={(e) => setOfferAmount(e.target.value)}
                         placeholder="$ 0.00" 
                         className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-2xl text-base font-black text-gray-800 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition" 
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Investment Type</label>
                       <div className="relative">
                          <select 
                            value={investmentType}
                            onChange={(e) => setInvestmentType(e.target.value)}
                            className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 appearance-none transition"
                          >
                             <option>Equity Investment</option>
                             <option>SAFE</option>
                             <option>Convertible Note</option>
                             <option>Debt Financing</option>
                          </select>
                          <svg className="w-5 h-5 absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"></path></svg>
                       </div>
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Proposed Equity %</label>
                       <input 
                         type="number" 
                         value={equity}
                         onChange={(e) => setEquity(e.target.value)}
                         placeholder="e.g. 5.5" 
                         className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-2xl text-base font-black text-gray-800 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition" 
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Valuation (Post-Money)</label>
                       <div className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-base font-black text-gray-400 italic">
                          $ {impliedValuation}
                       </div>
                       <p className="text-[9px] font-bold text-gray-400 ml-1 italic">Calculated from proposed equity stake</p>
                    </div>

                    <div className="md:col-span-2 space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Milestone-based Conditions</label>
                       <textarea 
                         rows="4" 
                         value={conditions}
                         onChange={(e) => setConditions(e.target.value)}
                         placeholder="Outline specific growth or product milestones required for tranches..." 
                         className="w-full px-6 py-5 bg-[#f8fafc] border border-gray-100 rounded-[28px] text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition resize-none leading-relaxed"
                       ></textarea>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Expected Response Deadline</label>
                       <input 
                         type="date" 
                         value={deadline}
                         onChange={(e) => setDeadline(e.target.value)}
                         className="w-full px-6 py-4 bg-[#f8fafc] border border-gray-100 rounded-2xl text-sm font-bold text-gray-700 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition" 
                       />
                    </div>

                    <div className="md:col-span-2 space-y-3">
                       <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Notes to Founder</label>
                       <textarea 
                         rows="4" 
                         value={notes}
                         onChange={(e) => setNotes(e.target.value)}
                         placeholder="Personal message to the executive team regarding your interest and vision..." 
                         className="w-full px-6 py-5 bg-[#f8fafc] border border-gray-100 rounded-[28px] text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition resize-none leading-relaxed"
                       ></textarea>
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-gray-50">
                    <Link href="/investor/discover/gebeya" className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition">Cancel</Link>
                    <div className="flex gap-4 w-full md:w-auto">
                       <button type="button" onClick={() => handleSaveDraft(true)} className="flex-grow md:px-10 py-4 bg-gray-50 text-gray-600 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-100 transition">
                         {showDraftNotice ? "Draft Saved" : draftSavedAt ? `Saved ${draftSavedAt}` : "Save as Draft"}
                       </button>
                        <Link 
                          href="/investor/payments/checkout" 
                          onClick={() => clearDraft(DRAFT_KEY)}
                          className="flex-grow md:px-12 py-4 bg-[#0f3d32] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-[#0a2921] transition shadow-xl shadow-[#0f3d32]/20 border border-[#0f3d32] text-center"
                        >
                          Send Offer
                        </Link>
                    </div>
                 </div>
              </div>

            </div>

            {/* Right: Summary Widgets */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-10">
              
              {/* Offer Summary Card */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm relative overflow-hidden">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-lg font-black text-[#0f3d32] tracking-tight uppercase">Offer Summary</h3>
                    <div className="text-gray-300"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                 </div>

                 <div className="space-y-6">
                    <div className="flex justify-between items-center pb-4 border-b border-gray-50">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Investment</span>
                       <span className="text-sm font-black text-gray-800">{offerAmount ? `$ ${parseFloat(offerAmount).toLocaleString()}` : "—"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Equity stake</span>
                       <span className="text-sm font-black text-gray-800">{equity ? `${equity}%` : "—"}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Implied Valuation</span>
                       <span className="text-lg font-black text-[#0f3d32]">{impliedValuation !== "—" ? `$ ${impliedValuation}` : "—"}</span>
                    </div>
                 </div>

                 <div className="mt-10 p-5 rounded-2xl bg-gray-50 text-[11px] text-gray-500 leading-relaxed font-medium">
                    Values will update dynamically as you fill out the form. Final legal documents will be generated upon mutual acceptance.
                 </div>
              </div>

              {/* Startup Snapshot */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                 <h3 className="text-lg font-black text-[#0f3d32] tracking-tight uppercase">Startup Snapshot</h3>
                 <div className="space-y-8">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Current ARR</p>
                          <p className="text-sm font-black text-gray-800">$420k <span className="text-[#16a34a] text-[10px] font-bold">+12% MoM</span></p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Team Size</p>
                          <p className="text-sm font-black text-gray-800">14 Full-time</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg></div>
                       <div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Data Room</p>
                          <p className="text-sm font-black text-gray-800">18 Files Verified</p>
                       </div>
                    </div>
                 </div>
              </div>

              {/* Investment Protections */}
              <div className="bg-[#07261f] rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
                 <div className="relative z-10 space-y-6">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#16a34a] uppercase tracking-[0.3em]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 3.07L3 7c0 5.148 2.214 9.774 5.765 13.041a1.996 1.996 0 002.47 0C14.786 16.774 17 12.148 17 7l-.382-.986z"></path></svg>
                       Investment Protections
                    </div>
                    <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                       By submitting this offer, you confirm that you have reviewed the necessary financial disclosures. This is a non-binding term sheet until a formal Share Purchase Agreement (SPA) is signed by both parties.
                    </p>
                    <button className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest hover:underline">Review Terms of Engagement</button>
                 </div>
                 <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:scale-110 transition duration-1000">
                    <svg className="w-32 h-32 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                 </div>
              </div>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
