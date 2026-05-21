"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function AIRecommendations() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search startups or investors..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-5">
             <div className="flex items-center gap-3">
               <button className="text-gray-400 hover:text-gray-600 transition relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               </button>
               <button className="text-gray-400 hover:text-gray-600 transition">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               </button>
             </div>
             
             <div className="w-px h-6 bg-gray-200"></div>

             <div className="flex items-center gap-3 cursor-pointer">
               <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                 <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow overflow-y-auto p-10 bg-white">
           <div className="max-w-[1200px] mx-auto flex flex-col min-h-full">
             
             {/* Top Title Section */}
             <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">AI Recommendations</h1>
                <p className="text-gray-500 text-[15px]">Startups recommended based on your investment interests.</p>
             </div>

             {/* Grid of Recommendations */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                
                {/* Card 1: GreenLeaf Systems (Wide) */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row lg:col-span-2">
                  <div className="w-full md:w-[280px] h-48 md:h-auto bg-[#0a2921] relative flex items-center justify-center shrink-0">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                     <div className="w-40 h-40 rounded-full border border-green-500/30 flex items-center justify-center relative shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                        <div className="w-28 h-28 rounded-full border border-green-400/50 flex flex-col items-center justify-center text-green-400 font-bold text-center bg-[#0a2921]/50 backdrop-blur-sm z-10">
                           <span className="text-xl tracking-widest opacity-80">AGRITECH</span>
                           <span className="text-[10px] tracking-[0.2em] mt-1 opacity-60">SAFE WORK</span>
                        </div>
                     </div>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase tracking-wider">AGRITECH</span>
                        <span className="px-3 py-1 bg-gray-900 text-white text-[10px] font-bold rounded-full flex items-center gap-1 shadow-sm">
                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                           98% MATCH
                        </span>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-3">GreenLeaf Systems</h3>
                     <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                        "Aligned with your interest in sustainable agriculture and scalable IoT solutions in East Africa."
                     </p>
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">FUNDING NEEDED</p>
                           <p className="text-2xl font-bold text-gray-900">$450,000</p>
                        </div>
                        <Link href="/investor/discover/profile" className="px-6 py-2.5 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition flex items-center gap-2 shadow-sm">
                           View Profile
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                        </Link>
                     </div>
                  </div>
                </div>

                {/* Card 2: EthioPay Hub (Narrow) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col lg:col-span-1">
                   <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-orange-100 text-orange-800 text-[10px] font-bold rounded uppercase tracking-wider">FINTECH</span>
                      <span className="text-xs font-bold text-gray-900">94% Match</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">EthioPay Hub</h3>
                   <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                      Strategic match for your portfolio focus on mobile payment infrastructure and cross-border remittance optimization.
                   </p>
                   <div className="flex justify-between items-end mb-4">
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Funding</p>
                         <p className="text-lg font-bold text-gray-900">$1,200,000</p>
                      </div>
                      <svg className="w-5 h-5 text-green-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                   </div>
                   <Link href="/investor/discover/profile" className="w-full py-2.5 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition shadow-sm text-center">
                      View Profile
                   </Link>
                </div>

                {/* Card 3: Amana Health (Narrow) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col lg:col-span-1">
                   <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">HEALTHTECH</span>
                      <span className="text-xs font-bold text-gray-900">89% Match</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">Amana Health</h3>
                   <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                      Matches your historical preference for early-stage B2B healthcare software with strong regional traction.
                   </p>
                   <div className="flex justify-between items-end mb-4">
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Funding</p>
                         <p className="text-lg font-bold text-gray-900">$280,000</p>
                      </div>
                      <svg className="w-5 h-5 text-green-500 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                   </div>
                   <Link href="/investor/discover/profile" className="w-full py-2.5 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition shadow-sm text-center">
                      View Profile
                   </Link>
                </div>

                {/* Card 4: Solara Energy (Wide) */}
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col md:flex-row lg:col-span-2">
                  <div className="w-full md:w-[280px] h-48 md:h-auto bg-[#0a1f29] relative flex items-center justify-center shrink-0">
                     <div className="w-32 h-32 rounded-full border border-cyan-500/30 flex items-center justify-center relative shadow-[0_0_40px_rgba(6,182,212,0.3)]">
                        <div className="w-20 h-20 rounded-full border border-cyan-400/50 flex items-center justify-center text-cyan-400 font-bold text-xs bg-cyan-900/30 backdrop-blur-sm z-10">
                           CLEAN
                        </div>
                     </div>
                     <span className="absolute bottom-4 text-[10px] text-cyan-500/50 uppercase tracking-[0.2em]">Safe for work</span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                     <div className="flex justify-between items-start mb-2">
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase tracking-wider">CLEANTECH</span>
                        <span className="text-xs font-bold text-gray-900 flex items-center gap-1">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                           86% Match
                        </span>
                     </div>
                     <h3 className="text-2xl font-bold text-gray-900 mb-3">Solara Energy</h3>
                     <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                        Innovative off-grid energy solutions that align with your ESG mandates and commitment to rural electrification in the Horn of Africa.
                     </p>
                     <div className="flex justify-between items-end">
                        <div>
                           <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">REQUIRED</p>
                           <p className="text-xl font-bold text-gray-900">$600,000</p>
                        </div>
                        <Link href="/investor/discover/profile" className="px-8 py-2.5 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition flex items-center gap-2 shadow-sm">
                           View Profile
                        </Link>
                     </div>
                  </div>
                </div>

                {/* Card 5: SwiftRoute (Narrow) */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm flex flex-col lg:col-span-1">
                   <div className="flex justify-between items-start mb-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-[10px] font-bold rounded uppercase tracking-wider">LOGISTICS</span>
                      <span className="text-xs font-bold text-gray-900">82% Match</span>
                   </div>
                   <h3 className="text-xl font-bold text-gray-900 mb-3">SwiftRoute</h3>
                   <p className="text-sm text-gray-600 mb-6 flex-grow leading-relaxed">
                      Matches your interest in last-mile delivery efficiency for growing urban...
                   </p>
                   <div className="flex justify-between items-end mb-4">
                      <div>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Funding</p>
                         <p className="text-lg font-bold text-gray-900">$150,000</p>
                      </div>
                   </div>
                   <Link href="/investor/discover/profile" className="w-full py-2.5 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition shadow-sm text-center">
                      View Profile
                   </Link>
                </div>

             </div>

             {/* Bottom CTA Banner */}
             <div className="bg-[#0a2921] rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div className="text-white max-w-xl">
                   <h2 className="text-2xl font-bold mb-2">Want more tailored insights?</h2>
                   <p className="text-green-50 text-sm opacity-80 leading-relaxed">
                      Update your investment preferences to refine our AI recommendation engine for better results.
                   </p>
                </div>
                <button className="px-8 py-3.5 bg-white text-[#0a2921] text-sm font-bold rounded-xl hover:bg-gray-100 transition shadow-sm whitespace-nowrap">
                   Update Interests
                </button>
             </div>

           </div>
        </main>
      </div>

    </div>
  );
}
