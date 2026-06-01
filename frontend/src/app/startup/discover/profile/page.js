import Link from "next/link";
import Image from "next/image";
import Sidebar from "@/components/startup/Sidebar";
import StartupProfileMenu from "@/components/startup/StartupProfileMenu";

export default function InvestorProfile() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-y-auto relative">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100 w-full z-10 sticky top-0">
          {/* Search */}
          <div className="relative w-full max-w-[400px] hidden sm:block">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
             <input type="text" placeholder="Search investors, startups..." className="w-full pl-11 pr-4 py-2.5 bg-[#f8fafc] border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0f3d32]/20 transition" />
          </div>

          <div className="flex items-center gap-6 ml-auto">
             <button className="text-gray-400 hover:text-gray-600 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <div className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></div>
             </button>
             <button className="text-gray-400 hover:text-gray-600 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </button>
             
             <StartupProfileMenu />
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8">
          
          {/* Back Link */}
          <Link href="/startup/discover" className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-gray-600 mb-6 transition">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Discover
          </Link>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column (8 units) */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {/* Profile Header Card */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="w-20 h-20 bg-[#0f3d32] rounded-xl flex items-center justify-center text-white shrink-0 shadow-sm overflow-hidden">
                  <svg className="w-10 h-10 text-[#64ffda]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 21a9 9 0 100-18 9 9 0 000 18z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v8m-4-4h8"></path></svg>
                </div>
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-1.5">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">EthioVenture Capital</h1>
                    <span className="bg-[#f0fdf4] text-[#16a34a] text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded">Active</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-gray-400 text-xs font-medium mb-4">
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      Addis Ababa, Ethiopia
                    </div>
                    <div className="flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h1m4 0h1m-5-4h1m4 0h1"></path></svg>
                      Venture Capital
                    </div>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed max-w-2xl font-medium">
                    Early-stage investment firm supporting Ethiopian startups with high growth potential. We focus on bridging the funding gap for local innovators in tech-enabled sectors.
                  </p>
                </div>
                <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
                  <Link href="/startup/discover/apply" className="bg-[#0f3d32] text-white px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-[#0a2921] transition shadow-sm text-center flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                    Apply for Investment
                  </Link>
                  <button className="border border-[#0f3d32] text-[#0f3d32] px-6 py-2.5 rounded-lg text-xs font-bold hover:bg-gray-50 transition text-center flex items-center justify-center gap-2">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                    Message Investor
                  </button>
                </div>
              </div>

              {/* Investor Overview Section */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Investor Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Organization Name</p>
                    <p className="text-sm font-bold text-gray-700">EthioVenture Capital</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Investor Type</p>
                    <p className="text-sm font-bold text-gray-700">Venture Capital</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Primary Focus</p>
                    <p className="text-sm font-bold text-gray-700">Local Tech Ecosystem</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">HQ Location</p>
                    <p className="text-sm font-bold text-gray-700">Addis Ababa, ET</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Active Since</p>
                    <p className="text-sm font-bold text-gray-700">January 2019</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Startups Funded</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-700">14 Companies</p>
                      <span className="bg-[#f0fdf4] text-[#16a34a] text-[9px] font-bold px-2 py-0.5 rounded-full">+2 this year</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment Details Section */}
              <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest mb-6">Investment Details</h2>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 pb-8 border-b border-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-[#eaf4f1] rounded-lg flex items-center justify-center text-[#0f3d32]">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Ticket Range</p>
                      <p className="text-sm font-bold text-gray-700">$50,000 - $250,000 per startup</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 text-right">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Funding Type</p>
                    <p className="text-sm font-bold text-gray-700">Equity / Convertibles</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Preferred Stage</p>
                    <p className="text-xs font-bold text-gray-900">MVP / Early Stage</p>
                  </div>
                  <div className="bg-[#f8fafc] rounded-xl p-5 border border-gray-50">
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Avg Response</p>
                    <p className="text-xs font-bold text-gray-900">3-5 Business Days</p>
                  </div>
                </div>

                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-3">Target Industries</p>
                  <div className="flex flex-wrap gap-2">
                    {["AgroTech", "FinTech", "Energy", "+2 others"].map((tag, idx) => (
                      <span key={idx} className={`text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg border ${idx === 3 ? 'text-gray-400 border-gray-100' : 'text-[#0f3d32] bg-[#eaf4f1] border-transparent'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column (4 units) */}
            <div className="lg:col-span-4 flex flex-col gap-8 sticky top-24">
              
              {/* Startup Match Card */}
              <div className="bg-white rounded-2xl border border-[#0f3d32]/10 p-6 shadow-sm relative overflow-hidden">
                {/* Accent border at top */}
                <div className="absolute top-0 left-0 w-full h-1 bg-[#0f3d32]"></div>
                
                <div className="flex items-center gap-2 mb-4">
                  <svg className="w-4 h-4 text-[#0f3d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                  <h3 className="text-sm font-bold text-gray-900">Startup Match</h3>
                </div>
                
                <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                  Based on your current startup profile, EthioVenture is a strong candidate for your seed round.
                </p>

                <div className="flex flex-col gap-3 mb-8">
                  {[
                    { label: "Industry (FinTech)", match: true },
                    { label: "Funding range match", match: true },
                    { label: "Early Stage focus", match: true },
                    { label: "Location (Remote vs local HQ)", match: false },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-xs font-medium">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${item.match ? 'bg-[#f0fdf4] text-[#16a34a]' : 'bg-gray-50 text-gray-300'}`}>
                        {item.match ? (
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                        ) : (
                          <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
                        )}
                      </div>
                      <span className={item.match ? 'text-gray-700' : 'text-gray-400'}>{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-gray-50 text-center">
                  <div className="text-[10px] font-bold text-[#0f3d32] uppercase tracking-[0.2em] mb-1">92% Match Score</div>
                  <div className="w-full bg-gray-50 rounded-full h-1 overflow-hidden">
                    <div className="bg-[#0f3d32] h-full rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
              </div>

              {/* Portfolio Section */}
              <div>
                <div className="flex justify-between items-center mb-4 px-2">
                  <h3 className="text-sm font-bold text-gray-900">Portfolio</h3>
                  <Link href="#" className="text-[10px] font-bold text-[#0f3d32] uppercase tracking-widest hover:underline">View All</Link>
                </div>
                <div className="flex flex-col gap-4">
                  {[
                    { name: "GreenLeaf Agri", tags: "AgriTech • Seed", desc: "Supply chain platform connecting 5,000+ local farmers to urban markets.", color: "bg-[#0f3d32]" },
                    { name: "Zena Pay", tags: "FinTech • MVP", desc: "Enabling cross-border payments for Ethiopian freelancers and digital nomads.", color: "bg-[#1e293b]" }
                  ].map((startup, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:border-[#0f3d32]/20 transition group">
                      <div className="flex items-center gap-3 mb-3">
                        <div className={`w-8 h-8 ${startup.color} rounded-lg flex items-center justify-center shrink-0`}>
                          <div className="w-4 h-4 bg-white/20 rounded-full"></div>
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-gray-900">{startup.name}</h4>
                          <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{startup.tags}</p>
                        </div>
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium leading-relaxed">
                        {startup.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>

    </div>
  );
}
