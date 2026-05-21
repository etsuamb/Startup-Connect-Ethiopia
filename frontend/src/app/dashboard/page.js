import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 pb-20">
      {/* Header */}
      <header className="py-4 px-6 md:px-12 flex justify-between items-center bg-white sticky top-0 z-20 w-full shadow-[0_2px_10px_rgba(0,0,0,0.02)]">
        {/* Logo */}
        <Link href="/" className="font-bold text-xl tracking-tight text-[#167b66]">
          <div className="flex items-center gap-2"><img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" /><span className="font-bold text-xl text-gray-900">StartupConnect</span></div>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-bold">
          <Link href="#" className="text-[#167b66] relative">
            Dashboard
            <div className="absolute -bottom-5 left-0 w-full h-[2px] bg-[#167b66]"></div>
          </Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600 transition">Projects</Link>
          <Link href="#" className="text-gray-400 hover:text-gray-600 transition">Funding</Link>
        </nav>
        
        {/* User Actions */}
        <div className="flex items-center gap-5 text-gray-500">
          <button className="hover:text-[#167b66] transition relative">
             {/* Notification dot */}
            <div className="absolute 0 right-0.5 w-2 h-2 bg-[#d97736] rounded-full border-2 border-white"></div>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
          </button>
          <button className="hover:text-[#167b66] transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          </button>
          <Link href="/profile" className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden cursor-pointer bg-gray-100 flex items-center justify-center">
            {/* Avatar Placeholder */}
            <svg className="w-5 h-5 text-[#167b66]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
          </Link>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 mt-8">
        
        {/* Search Bar */}
        <div className="relative max-w-xl mx-auto mb-10">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input 
            type="text" 
            placeholder="Search startups, investors, or documents..." 
            className="w-full pl-10 pr-4 py-3 bg-[#f3f6f8] border-none rounded-xl focus:outline-none focus:ring-2 focus:ring-[#167b66] transition text-sm text-gray-800 placeholder-gray-400 font-medium"
          />
        </div>

        {/* Welcome Banner */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="flex gap-3 mb-4">
              <span className="bg-[#e6effc] text-[#3b82f6] px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">Early Revenue</span>
              <span className="bg-[#fef0db] text-[#d97736] px-3 py-1 rounded-full text-[10px] font-extrabold flex items-center gap-1.5 border border-[#feedd8]">
                <div className="w-1.5 h-1.5 bg-[#d97736] rounded-full"></div>
                Live Round
              </span>
            </div>
            <h1 className="text-3xl font-extrabold text-[#115b4c] mb-2 font-serif">Welcome back, Abebe.</h1>
            <p className="text-gray-500 font-medium">Your startup dashboard is up to date. You have 3 new investor matches.</p>
          </div>
          <button className="px-6 py-3 bg-[#0f5c4a] hover:bg-[#0c4a3b] text-white font-bold rounded-lg shadow-sm transition text-sm whitespace-nowrap">
            Post Progress Update
          </button>
        </div>

        {/* 4 Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          
          {/* Card 1 */}
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-4">
            <div className="w-10 h-10 bg-[#f0f8f7] rounded-lg flex items-center justify-center text-[#167b66] shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Verification</h4>
              <p className="font-bold text-[#115b4c] text-sm">Verified</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Tier 2 Provider Status</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-4">
             <div className="w-10 h-10 bg-[#feedd8] rounded-lg flex items-center justify-center text-[#d97736] shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Active Project</h4>
              <p className="font-bold text-[#115b4c] text-sm">Agri-Tech Pilot</p>
              <p className="text-[10px] text-gray-400 mt-0.5">68% Completion</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-4">
             <div className="w-10 h-10 bg-[#e8f3f1] rounded-lg flex items-center justify-center text-[#167b66] shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Funding Status</h4>
              <p className="font-bold text-[#115b4c] text-sm">Seed Stage</p>
              <p className="text-[10px] text-gray-400 mt-0.5">$250k Goal</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white rounded-xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-50 flex items-center gap-4">
             <div className="w-10 h-10 bg-[#f3f4f6] rounded-lg flex items-center justify-center text-gray-500 shrink-0">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path></svg>
            </div>
            <div>
              <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Mentorship</h4>
              <p className="font-bold text-[#115b4c] text-sm">Sara Tekle</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Active Mentee Team</p>
            </div>
          </div>

        </div>

        {/* Dashboard Grid Data */}
        <div className="grid md:grid-cols-3 gap-6">
          
          {/* Left Column (Main Data) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            
            {/* Profile Completion Box */}
            <div className="bg-[#f0f8f7] border border-[#cce8e2] rounded-[20px] p-8 flex items-center justify-between">
              <div className="max-w-xs">
                <h2 className="text-xl font-bold text-[#115b4c] mb-2 font-serif">Complete your Profile</h2>
                <p className="text-sm text-gray-600 mb-6 font-medium">Profiles with 100% completion are 4x more likely to secure investor meetings.</p>
                <div className="w-full bg-white rounded-full h-2 mb-1.5">
                  <div className="bg-[#115b4c] h-2 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <span className="text-[10px] font-bold text-[#115b4c] tracking-widest uppercase">82% Completed</span>
              </div>
              
              {/* Circular Progress */}
              <div className="relative w-28 h-28 shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                  {/* Background Circle */}
                  <path className="text-white" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  {/* Progress Circle */}
                  <path className="text-[#115b4c]" strokeDasharray="82, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#115b4c]">82%</span>
                </div>
              </div>
            </div>

            {/* Split List View: Recommended Investors & Mentors */}
            <div className="grid sm:grid-cols-2 gap-6">
              
              {/* Recommended Investors */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-bold text-[#115b4c]">Recommended<br/>Investors</h3>
                  <Link href="#" className="text-[10px] font-bold text-[#167b66] uppercase hover:underline">View<br/>All</Link>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Item 1 */}
                  <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#0f172a] rounded-lg border border-gray-200 shrink-0 flex items-center justify-center overflow-hidden">
                         <div className="w-4 h-4 text-[#38bdf8]">
                           {/* Decorative logo representation */}
                           <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 22h20L12 2z"/></svg>
                         </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#115b4c]">Abyssinia Capital</h4>
                        <p className="text-[10px] text-gray-400">FinTech • Series A</p>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-[#d97736] transition p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </button>
                  </div>
                  
                  {/* Item 2 */}
                  <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#38bdf8] rounded-lg border border-[#bae6fd] shrink-0 flex items-center justify-center overflow-hidden">
                         <div className="w-4 h-4 text-white">
                           {/* Decorative logo representation */}
                           <svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
                         </div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#115b4c]">Sheba Ventures</h4>
                        <p className="text-[10px] text-gray-400">Agri-Tech • Seed</p>
                      </div>
                    </div>
                    <button className="text-gray-300 hover:text-[#d97736] transition p-1">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mentors for You */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="font-bold text-[#115b4c]">Mentors for You</h3>
                  <Link href="#" className="text-[10px] font-bold text-[#167b66] uppercase hover:underline mb-1">View All</Link>
                </div>
                
                <div className="flex flex-col gap-3">
                  {/* Mentor 1 */}
                  <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                        {/* Placeholder face */}
                        <div className="w-full h-full bg-[#115b4c] text-white flex items-center justify-center font-bold text-xs">EG</div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#115b4c]">Dr. Eleni Gebre</h4>
                        <p className="text-[10px] text-gray-400">Scale-Up Strategy</p>
                      </div>
                    </div>
                    <button className="w-6 h-6 rounded bg-[#f3f6f8] text-[#167b66] hover:bg-[#e8f3f1] font-bold text-lg flex items-center justify-center transition">
                      +
                    </button>
                  </div>

                  {/* Mentor 2 */}
                  <div className="bg-white border border-gray-100 rounded-xl p-3 flex justify-between items-center shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                        {/* Placeholder face */}
                        <div className="w-full h-full bg-gray-400 text-white flex items-center justify-center font-bold text-xs">DS</div>
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-[#115b4c]">Dawit Solomon</h4>
                        <p className="text-[10px] text-gray-400">International Trade</p>
                      </div>
                    </div>
                    <button className="w-6 h-6 rounded bg-[#f3f6f8] text-[#167b66] hover:bg-[#e8f3f1] font-bold text-lg flex items-center justify-center transition">
                      +
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Tabs & Messages Area */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm mt-2">
              <div className="flex gap-6 border-b border-gray-100 mb-6">
                <button className="text-sm font-bold text-[#167b66] border-b-2 border-[#167b66] pb-3 px-1">Recent Messages</button>
                <button className="text-sm font-bold text-gray-400 hover:text-gray-600 border-b-2 border-transparent pb-3 px-1 transition">Payment Updates</button>
                <button className="text-sm font-bold text-gray-400 hover:text-gray-600 border-b-2 border-transparent pb-3 px-1 transition">Feedback</button>
              </div>
              
              <div className="flex flex-col gap-6">
                {/* Message 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
                    <div className="w-full h-full bg-[#1e293b] text-white flex items-center justify-center font-bold text-xs">SB</div>
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold text-[#115b4c]">Samuel Bekele</h4>
                      <span className="text-[10px] text-gray-400">12:45 AM</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">The due diligence documents for the Q3 report look great. I have a...</p>
                  </div>
                </div>

                {/* Message 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#bae6fd] text-[#0369a1] font-bold shrink-0 flex items-center justify-center text-xs">
                    SN
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="text-xs font-bold text-[#115b4c]">System Notification</h4>
                      <span className="text-[10px] text-gray-400">Yesterday</span>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-1">Your document "Company_Registration_2023.pdf" has been...</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column (Sidebars) */}
          <div className="flex flex-col gap-6">
            
            {/* Quick Actions */}
            <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm">
              <h3 className="font-bold text-[#115b4c] mb-5">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-[#f8f9fa] hover:bg-[#f3f6f8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition aspect-square border border-gray-50 text-center">
                  <svg className="w-6 h-6 text-[#167b66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                  <span className="text-xs font-bold text-[#115b4c]">Create Project</span>
                </button>
                <button className="bg-[#f8f9fa] hover:bg-[#f3f6f8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition aspect-square border border-gray-50 text-center">
                  <svg className="w-6 h-6 text-[#167b66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                  <span className="text-xs font-bold text-[#115b4c]">Upload Docs</span>
                </button>
                <button className="bg-[#f8f9fa] hover:bg-[#f3f6f8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition aspect-square border border-gray-50 text-center">
                  <svg className="w-6 h-6 text-[#167b66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span className="text-xs font-bold text-[#115b4c]">Apply Funding</span>
                </button>
                <button className="bg-[#f8f9fa] hover:bg-[#f3f6f8] rounded-xl p-4 flex flex-col items-center justify-center gap-2 transition aspect-square border border-gray-50 text-center">
                  <svg className="w-6 h-6 text-[#167b66]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                  <span className="text-xs font-bold text-[#115b4c]">Find Mentor</span>
                </button>
              </div>
            </div>

            {/* Upcoming Widget */}
            <div className="bg-[#0f5c4a] rounded-[20px] p-6 shadow-lg text-white">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Upcoming</h3>
                <svg className="w-5 h-5 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </div>
              
              <div className="flex flex-col gap-5">
                {/* Event 1 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2b7866] rounded-xl shrink-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Oct</span>
                    <span className="text-lg font-bold leading-none">24</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5">Investor Pitch Day</h4>
                    <p className="text-[11px] opacity-70">14:00 • Hyatt Regency</p>
                  </div>
                </div>
                
                {/* Event 2 */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#2b7866] rounded-xl shrink-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Oct</span>
                    <span className="text-lg font-bold leading-none">26</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold mb-0.5">Mentor Session</h4>
                    <p className="text-[11px] opacity-70">09:00 • Virtual (Zoom)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="bg-[#f0f3f5] rounded-[20px] p-6">
              <div className="flex items-center gap-2 mb-4 text-[#d97736]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                <h3 className="font-bold text-[#115b4c] text-sm">Recent Feedback</h3>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-4">
                <p className="text-xs text-gray-600 leading-relaxed italic">
                  "The financial model looks solid, but I would suggest more focus on the last-mile delivery cost in regional hubs."
                </p>
              </div>
              <div className="flex items-center gap-2 pl-2">
                <div className="w-6 h-6 rounded-full bg-gray-300 overflow-hidden">
                  {/* Small Avatar */}
                  <div className="w-full h-full bg-[#115b4c] text-white flex items-center justify-center text-[8px]">YM</div>
                </div>
                <span className="text-[10px] font-bold text-[#115b4c]">Yohannes M. - Mentor</span>
              </div>
            </div>

          </div>

        </div>
      </main>
    </div>
  );
}
