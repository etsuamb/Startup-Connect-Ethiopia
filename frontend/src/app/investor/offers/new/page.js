"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function SendFundingOffer() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-[#f8f9fa]">
        
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="text-sm font-medium">
            <Link href="/investor/offers" className="text-gray-400 hover:text-gray-600">Offers</Link>
            <span className="text-gray-300 mx-2">›</span>
            <span className="text-[#0a4d3c] font-bold">Send Funding Offer</span>
          </div>

          <div className="flex items-center gap-5">
             <div className="relative w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input 
                  type="text" 
                  placeholder="Search startups or data..." 
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-xs outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
                />
             </div>
             <div className="flex items-center gap-3">
               <button className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               </button>
               <button className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </button>
             </div>
             <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0 border border-gray-100">
               <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto">
           <div className="p-10 max-w-[900px] w-full mx-auto">
             
             {/* Title */}
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Send Funding Offer</h1>
                <p className="text-gray-500 text-[15px]">Review the startup summary and formalize your investment proposal.</p>
             </div>

             {/* Startup Summary Card */}
             <div className="bg-[#f8f9fa] border border-gray-200 rounded-2xl p-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-[#0a4d3c] rounded-xl flex flex-col items-center justify-center shrink-0 shadow-inner">
                     <svg className="w-6 h-6 text-green-300 mb-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 5.98c-3.14.88-5.43 3.71-5.96 7.02H9.6L8 15h1.76c-.34 2.11-1.28 4.01-2.6 5.5l1.41 1.41c1.55-1.74 2.65-3.95 3.12-6.37L12 15h1.22c.16-3.83 1.83-7.25 4.54-9.52.28-.24.71-.05.71.32v8.28c0 1.1-.9 2-2 2h-4v2h4c2.21 0 4-1.79 4-4V5.28c0-.77-.92-1.15-1.47-.7z"/></svg>
                     <span className="text-white text-[8px] font-bold tracking-widest">GreenFarm</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-bold text-gray-900 mb-1.5">GreenFarm Ethiopia</h3>
                     <div className="flex items-center gap-3">
                        <span className="px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-[9px] font-bold rounded uppercase tracking-wider shadow-sm">AGRITECH</span>
                        <span className="flex items-center gap-1 text-[11px] font-medium text-gray-400">
                           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                           Addis Ababa, ET
                        </span>
                     </div>
                  </div>
                </div>
                
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex gap-8 shadow-sm shrink-0">
                   <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">FUNDING NEED</p>
                      <p className="text-xl font-bold text-gray-900">$450,000</p>
                   </div>
                   <div className="w-px h-auto bg-gray-100"></div>
                   <div>
                      <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">VALUATION CAP</p>
                      <p className="text-xl font-bold text-gray-900">$3.2M</p>
                   </div>
                </div>
             </div>

             {/* Offer Form */}
             <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                     <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">INVESTMENT AMOUNT (USD)</label>
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">$</div>
                        <input type="text" defaultValue="450000" className="w-full pl-8 pr-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition outline-none" />
                     </div>
                     <p className="text-[10px] text-gray-400 mt-2">Recommended based on current funding request.</p>
                  </div>
                  <div>
                     <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">INVESTMENT TERMS (EQUITY %)</label>
                     <div className="relative">
                        <input type="text" defaultValue="12.5" className="w-full pl-4 pr-8 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-gray-900 font-medium focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition outline-none" />
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-gray-400 font-bold">%</div>
                     </div>
                     <p className="text-[10px] text-gray-400 mt-2">Target equity stake in exchange for capital.</p>
                  </div>
                </div>

                <div className="mb-6">
                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">CONDITIONS & PRECEDENTS</label>
                   <input type="text" placeholder="e.g. Board seat, quarterly reporting, tech audit..." className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition outline-none" />
                </div>

                <div className="mb-10">
                   <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">OFFER NOTES / MESSAGE TO FOUNDER</label>
                   <textarea rows="4" placeholder="Describe the strategic value you bring beyond capital..." className="w-full px-4 py-3.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition outline-none resize-none"></textarea>
                </div>

                <div className="flex justify-end items-center gap-4 border-t border-gray-100 pt-8">
                   <button className="px-6 py-3 text-sm font-bold text-gray-600 hover:text-gray-900 transition">Cancel</button>
                   <button className="px-8 py-3 bg-[#0a4d3c] text-white text-sm font-bold rounded-xl hover:bg-[#07382b] transition shadow-md">Send Offer</button>
                </div>
             </div>

             {/* Information Cards */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-[#d1f4e0] rounded-2xl p-6 border border-[#b2e6c8] shadow-sm">
                  <h4 className="text-[13px] font-bold text-[#0a4d3c] flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"></path></svg>
                    Legal Context
                  </h4>
                  <p className="text-[11px] text-[#0a4d3c]/80 leading-relaxed font-medium">
                    This offer is non-binding until a formal Term Sheet is executed by both parties. standard jurisdiction of Ethiopia applies.
                  </p>
                </div>

                <div className="bg-[#fce5ba] rounded-2xl p-6 border border-[#f3d195] shadow-sm">
                  <h4 className="text-[13px] font-bold text-[#8a5d12] flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Express Processing
                  </h4>
                  <p className="text-[11px] text-[#8a5d12]/80 leading-relaxed font-medium">
                    Startups usually respond within 3-5 business days. You will be notified immediately of any updates.
                  </p>
                </div>

                <div className="bg-[#e5e7eb] rounded-2xl p-6 border border-[#d1d5db] shadow-sm">
                  <h4 className="text-[13px] font-bold text-gray-800 flex items-center gap-2 mb-3">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                    Secure Message
                  </h4>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    Your data and financial terms are encrypted and shared only with the startup's executive board.
                  </p>
                </div>
             </div>

           </div>
        </main>
      </div>

    </div>
  );
}
