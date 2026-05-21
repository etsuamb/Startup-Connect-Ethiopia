import Link from "next/link";
import Image from "next/image";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-20 w-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight text-[#115b4c]">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-xl text-gray-900">StartupConnect</span> <span className="font-medium text-gray-500 text-xs tracking-widest uppercase ml-1">Portal</span></div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          <Link href="/dashboard" className="text-gray-400 hover:text-gray-600 transition">Dashboard</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600 transition">Projects</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600 transition">Funding</Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center gap-5 text-gray-500">
          <button className="hover:text-[#167b66] transition relative">
            <div className="absolute 0 right-0.5 w-2 h-2 bg-[#d97736] rounded-full border-2 border-white"></div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <button className="hover:text-[#167b66] transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
          </button>
          <div className="relative w-8 h-8 rounded-full border border-[#167b66] overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center p-0.5">
            <div className="w-full h-full bg-[#115b4c] rounded-full text-white flex items-center justify-center text-[10px] font-bold">AF</div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-6">
        
        {/* Banner Section */}
        <div className="relative w-full h-64 md:h-72 bg-[#122b3b] rounded-t-2xl overflow-hidden shadow-sm flex items-end">
          {/* Abstract bg graphics */}
          <div className="absolute inset-0 z-0 overflow-hidden">
             <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-[#22475d] rounded-full blur-[100px] opacity-30"></div>
             <div className="absolute right-1/4 top-1/2 w-4 h-48 bg-white/10 transform rotate-45 blur-[1px]"></div>
             <div className="absolute right-[30%] top-1/4 w-4 h-64 bg-white/10 transform rotate-45 blur-[1px]"></div>
             <div className="absolute right-[45%] top-[-10%] w-24 h-24 bg-white/20 rounded-full blur-[2px]"></div>
          </div>

          <div className="relative z-10 w-full px-8 pb-8 flex justify-between items-end">
            <div className="flex items-end gap-6">
              {/* Floating Logo */}
              <div className="w-24 h-24 bg-white rounded-xl shadow-lg border-2 border-white flex flex-col items-center justify-center -mb-2 z-20 overflow-hidden relative">
                <span className="text-xl font-black text-[#115b4c] leading-none mb-1">Agri</span>
                <span className="text-xl font-black text-[#115b4c] leading-none">Flow</span>
              </div>
              
              <div className="pb-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-3xl font-bold text-white tracking-tight">AgriFlow Ethiopia</h1>
                  <div className="bg-[#38bdf8] text-white w-5 h-5 rounded-full flex items-center justify-center relative shadow-[0_0_10px_rgba(56,189,248,0.5)]">
                    <svg className="w-3 h-3 relative z-10" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                </div>
                <p className="text-gray-300 text-sm max-w-xl font-medium">Revolutionizing supply chains for smallholder coffee farmers.</p>
              </div>
            </div>

            <button className="hidden md:flex items-center gap-2 bg-[#ffffff15] hover:bg-[#ffffff25] border border-white/20 text-white px-5 py-2.5 rounded-lg text-sm font-bold transition backdrop-blur-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Content Layout */}
        <div className="grid md:grid-cols-12 gap-6 mt-6">
          
          {/* Main Column */}
          <div className="md:col-span-8 flex flex-col gap-8">
            
            {/* Quick Metrics */}
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Sector</span>
                <span className="text-sm font-bold text-[#115b4c]">Agri-Tech</span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Stage</span>
                <span className="text-sm font-bold text-[#115b4c]">Seed Round</span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Location</span>
                <span className="text-sm font-bold text-[#115b4c]">Addis Ababa</span>
              </div>
              <div className="bg-[#f8f9fa] rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1.5">Team</span>
                <span className="text-sm font-bold text-[#115b4c]">5-10 Members</span>
              </div>
            </div>

            {/* Profile Completion Bar */}
            <div className="bg-white rounded-xl py-6 px-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-bold text-gray-800">Profile Completeness</span>
                <span className="text-sm font-bold text-[#115b4c]">85%</span>
              </div>
              <div className="w-full bg-[#f0f3f5] rounded-full h-2">
                <div className="bg-[#115b4c] h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-6 border-b border-gray-100">
              <button className="text-sm font-bold text-[#115b4c] border-b-[3px] border-[#115b4c] pb-3 px-1">Overview</button>
              <button className="text-sm font-bold text-gray-400 hover:text-gray-600 border-b-[3px] border-transparent pb-3 px-1 transition relative">Team</button>
              <button className="text-sm font-bold text-gray-400 hover:text-gray-600 border-b-[3px] border-transparent pb-3 px-1 transition relative">Documents</button>
            </div>

            {/* Solution Info Cards */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Problem */}
              <div className="bg-[#f8f9fa] rounded-2xl p-6 border border-gray-100 shadow-[0_2px_10px_rgba(0,0,0,0.015)] border-t-4 border-t-[#d97736]">
                <div className="flex items-center gap-2 mb-4 text-[#8b4513]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                  <h3 className="font-bold">Problem Statement</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Ethiopian coffee farmers lose up to <span className="font-bold text-[#d15041]">30%</span> of their harvest value due to inefficient logistics, lack of storage transparency, and predatory middle-men.
                </p>
              </div>

              {/* Solution */}
              <div className="bg-[#eef5f4] rounded-2xl p-6 border border-[#cce8e2] shadow-[0_2px_10px_rgba(0,0,0,0.015)] border-t-4 border-t-[#167b66]">
                <div className="flex items-center gap-2 mb-4 text-[#0f5c4a]">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                  <h3 className="font-bold">The Solution</h3>
                </div>
                <p className="text-sm text-[#2b7866] leading-relaxed font-medium">
                  A digital ecosystem providing end-to-end traceability and smart warehouse management, connecting farmers directly to global exporters via blockchain-backed data.
                </p>
              </div>
            </div>

            {/* Traction Row */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Business Model</h4>
                <p className="text-xs font-medium text-gray-800 leading-relaxed bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 h-full">
                  5% commission on marketplace transactions.
                </p>
              </div>
              <div>
                <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Target Market</h4>
                <p className="text-xs font-medium text-gray-800 leading-relaxed bg-[#f8f9fa] p-4 rounded-xl border border-gray-100 h-full">
                  Over 500 coffee cooperatives in Ethiopia.
                </p>
              </div>
              <div>
                <h4 className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-2">Traction</h4>
                <div className="bg-[#fcf8f2] p-4 rounded-xl border border-[#feedd8] h-full flex flex-col justify-center">
                  <div className="flex items-center gap-1.5 mb-1 text-[#115b4c]">
                    <span className="text-lg font-bold">12 Co-ops</span>
                    <svg className="w-4 h-4 text-[#d97736]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-wide font-medium">Onboarded as of Q3 2023</p>
                </div>
              </div>
            </div>

            {/* Documents Section */}
            <div>
              <h3 className="text-lg font-bold text-[#115b4c] mb-4">Compliance Documents</h3>
              <div className="flex flex-col gap-3">
                {/* File 1 */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-[#167b66] transition group cursor-pointer">
                  <div className="bg-[#f0f3f5] text-gray-500 p-2.5 rounded-lg group-hover:bg-[#e8f3f1] group-hover:text-[#167b66] transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#115b4c] transition">Trade License</h4>
                    <span className="text-[10px] text-gray-400 tracking-wide font-medium">Last updated: Oct 12, 2023</span>
                  </div>
                </div>
                
                {/* File 2 */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 shadow-sm hover:border-[#167b66] transition group cursor-pointer">
                  <div className="bg-[#f0f3f5] text-gray-500 p-2.5 rounded-lg group-hover:bg-[#e8f3f1] group-hover:text-[#167b66] transition">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#115b4c] transition">TIN Certificate</h4>
                    <span className="text-[10px] text-gray-400 tracking-wide font-medium">Last updated: Oct 12, 2023</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 flex flex-col gap-6 pt-4 md:pt-0">
            
            {/* Investment Goal */}
            <div className="bg-[#0f5c4a] rounded-[24px] p-8 shadow-xl text-center relative overflow-hidden text-white flex flex-col items-center">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#217360] rounded-bl-full opacity-30 z-0 pointer-events-none"></div>
               <div className="relative z-10 w-full flex flex-col items-center">
                 <div className="flex items-center justify-center gap-2 mb-6">
                   <svg className="w-5 h-5 text-[#87c5b7]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   <span className="text-[10px] font-bold tracking-widest uppercase text-[#87c5b7]">Investment Goal</span>
                 </div>
                 
                 <h2 className="text-4xl font-extrabold font-serif mb-2">$250,000</h2>
                 <p className="text-xs font-medium opacity-80 mb-8">Target Amount for Expansion</p>
                 
                 <button className="w-full py-4 bg-white text-[#0f5c4a] font-bold rounded-xl shadow-lg hover:bg-gray-50 transition w-full text-[15px] mb-6">
                   Inquire Now
                 </button>
                 
                 <div className="flex items-center gap-2 text-[9px] font-bold tracking-widest uppercase text-[#87c5b7]">
                   <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                   Verified Investment Opportunity
                 </div>
               </div>
            </div>

            {/* Contact Info */}
            <div className="bg-[#f8f9fa] rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-6">
                 <div className="w-1.5 h-1.5 bg-[#8b4513] rounded-full"></div>
                 <h3 className="font-bold text-[#115b4c] text-sm">Contact AgriFlow</h3>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-4">
                  <div className="text-[#167b66] mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Email</h4>
                    <Link href="#" className="text-xs font-bold text-[#115b4c] hover:underline">contact@agriflow.et</Link>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="text-[#167b66] mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Phone</h4>
                    <p className="text-xs font-bold text-gray-900">+251 911 234 567</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="text-[#167b66] mt-0.5"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg></div>
                  <div>
                    <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Website</h4>
                    <Link href="#" className="text-xs font-bold text-[#115b4c] hover:underline">www.agriflow.et</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Small Alert Pill */}
            <div className="bg-[#fef0db] px-4 py-3 rounded-xl flex items-center gap-3 border border-[#feedd8]">
              <div className="w-2.5 h-2.5 bg-[#8b4513] rounded-full"></div>
              <span className="text-xs font-bold text-[#8b4513]">3 Investors viewed this today</span>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
