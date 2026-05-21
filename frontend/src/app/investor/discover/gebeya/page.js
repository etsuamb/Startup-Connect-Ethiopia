"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function StartupProfile() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex h-screen overflow-hidden">
      
      {/* Sidebar (Shared Component Style) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-white overflow-hidden relative">
        
        {/* Profile Header */}
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-50 w-full z-20 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#0f3d32] tracking-tight">Startup Profile</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review startup metrics, traction, and investment readiness</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64">
              <input type="text" placeholder="Search startups..." className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-lg text-xs font-medium border-none outline-none focus:ring-1 focus:ring-gray-200" />
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="text-gray-400 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <Link href="/investor/discover" className="px-5 py-2 bg-[#0f3d32] text-white rounded-lg text-xs font-black uppercase tracking-widest hover:bg-[#0a2921] transition shadow-md">Discover Home</Link>
          </div>
        </header>

        {/* Scrollable Profile Body */}
        <div className="flex-grow overflow-y-auto p-12 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
            
            {/* Left Column: Startup Details */}
            <div className="flex-grow space-y-8">
              
              {/* Main Profile Card */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm">
                 <div className="flex flex-col md:flex-row gap-10">
                    <div className="w-32 h-32 bg-[#07261f] rounded-3xl flex items-center justify-center shrink-0 shadow-xl border border-white/10">
                       <svg className="w-16 h-16 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/></svg>
                    </div>
                    <div className="flex-grow space-y-6">
                       <div className="flex justify-between items-start">
                          <div>
                             <h2 className="text-4xl font-black text-[#0f3d32] tracking-tight flex items-center gap-3">
                                Gebeya Inc. 
                                <svg className="w-6 h-6 text-[#16a34a]" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                             </h2>
                             <p className="text-gray-500 font-medium text-sm mt-1 max-w-xl leading-relaxed">The Pan-African Talent Marketplace connecting global companies with African tech professionals.</p>
                          </div>
                          <div className="text-right">
                             <p className="text-[9px] font-black text-[#16a34a] uppercase tracking-widest mb-1">FUNDING ASK</p>
                             <p className="text-3xl font-black text-[#0f3d32] tracking-tight">$1.2M</p>
                          </div>
                       </div>

                       <div className="flex flex-wrap gap-x-8 gap-y-4 text-xs font-bold text-gray-500">
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg> Talent Marketplace</div>
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Series A</div>
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> Addis Ababa, Ethiopia</div>
                          <div className="flex items-center gap-2"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Last Updated: 2 days ago</div>
                       </div>

                       <div className="flex gap-4 pt-4 border-t border-gray-50">
                          <Link href="/investor/discover/gebeya/offer" className="px-8 py-3 bg-[#0f3d32] text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-[#0a2921] transition shadow-lg shadow-[#0f3d32]/20">Send Offer</Link>
                          <button className="px-8 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl text-[11px] font-black uppercase tracking-widest hover:bg-gray-50 transition">Message Founder</button>
                       </div>
                    </div>
                 </div>

                 <div className="mt-12 pt-8 border-t border-gray-50 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-4 w-full max-w-sm">
                       <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest shrink-0">Profile Completeness</span>
                       <div className="h-1.5 flex-grow bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-[#16a34a] rounded-full" style={{ width: '96%' }}></div>
                       </div>
                       <span className="text-xs font-black text-[#16a34a]">96%</span>
                    </div>
                    <div className="flex gap-6">
                       <button className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-[#0f3d32] transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"></path></svg> Save Startup
                       </button>
                       <button className="flex items-center gap-2 text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-[#0f3d32] transition">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> Schedule Meeting
                       </button>
                    </div>
                 </div>
              </div>

              {/* Investment Overview */}
              <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm space-y-10">
                 <h3 className="text-2xl font-black text-[#0f3d32] tracking-tight">Investment Overview</h3>
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">Our Mission</p>
                    <p className="text-lg text-gray-700 font-medium leading-relaxed italic">"To become the backbone of the African digital economy by empowering the continent's youth with market-relevant skills and connecting them to meaningful employment opportunities globally."</p>
                 </div>
                 <div className="grid md:grid-cols-2 gap-12 pt-4">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">The Problem</p>
                       <p className="text-sm text-gray-500 leading-relaxed font-medium">Lack of visibility and trust in African tech talent, coupled with high friction in cross-border hiring and payment systems for global enterprises.</p>
                    </div>
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-[#16a34a] uppercase tracking-widest">The Solution</p>
                       <p className="text-sm text-gray-500 leading-relaxed font-medium">A multi-layered ecosystem offering talent vetting, continuous upskilling, and a secure platform for contracting and localized payments.</p>
                    </div>
                 </div>
              </div>

              {/* Traction & Metrics */}
              <div className="space-y-6">
                 <h3 className="text-2xl font-black text-[#0f3d32] tracking-tight px-2">Traction & Metrics</h3>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { label: 'Active Talent Pool', value: '15.4k', trend: '+12% MoM', trendUp: true },
                      { label: 'Monthly Revenue', value: '$240k', trend: '+18% YTD', trendUp: true },
                      { label: 'Global Clients', value: '85+', trend: 'Verified Partners', trendUp: true }
                    ].map((metric, i) => (
                      <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4 hover:shadow-md transition">
                         <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{metric.label}</p>
                         <h4 className="text-4xl font-black text-[#0f3d32] tracking-tight">{metric.value}</h4>
                         <div className={`flex items-center gap-1.5 text-[10px] font-black ${metric.trendUp ? 'text-[#16a34a]' : 'text-amber-500'}`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                            {metric.trend}
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Founding Team */}
              <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm">
                 <h3 className="text-2xl font-black text-[#0f3d32] tracking-tight mb-12">Founding Team</h3>
                 <div className="grid md:grid-cols-2 gap-8">
                    {[
                      { name: 'Amadou Daffe', role: 'CEO & Co-founder', exp: ['Ex-Google', 'Ex-Y-Combinator'], img: 'AD' },
                      { name: 'Hiruy Tsegaye', role: 'COO & Partner', exp: ['Operations Lead', 'Fintech Specialist'], img: 'HT' }
                    ].map((member, i) => (
                      <div key={i} className="flex items-center gap-6 p-6 rounded-3xl bg-gray-50 border border-gray-100 group hover:bg-white hover:border-[#16a34a]/30 transition duration-500 cursor-pointer">
                         <div className="w-20 h-20 bg-[#07261f] rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg border border-white/10 group-hover:scale-105 transition transform">
                            {member.img}
                         </div>
                         <div>
                            <h4 className="text-lg font-black text-[#0f3d32] tracking-tight">{member.name}</h4>
                            <p className="text-xs font-bold text-[#16a34a] uppercase tracking-widest mb-3">{member.role}</p>
                            <div className="flex gap-2">
                               {member.exp.map((e, j) => (
                                 <span key={j} className="px-2 py-1 bg-white border border-gray-200 rounded-md text-[9px] font-black text-gray-500 uppercase tracking-widest">{e}</span>
                               ))}
                            </div>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              {/* Due Diligence Room */}
              <div className="bg-white rounded-[40px] p-12 border border-gray-100 shadow-sm relative">
                 <div className="flex justify-between items-center mb-10">
                    <h3 className="text-2xl font-black text-[#0f3d32] tracking-tight">Due Diligence Room</h3>
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#16a34a] uppercase tracking-[0.2em]">
                       <div className="w-2 h-2 bg-[#16a34a] rounded-full animate-pulse"></div>
                       ALS Verified
                    </div>
                 </div>
                 
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { name: 'Pitch Deck 2024', size: '4.2 MB • PDF', color: 'bg-red-50 text-red-500' },
                      { name: 'Business Plan', size: '1.2 MB • DOCX', color: 'bg-blue-50 text-blue-500' },
                      { name: 'Tax Certificate', size: '0.8 MB • PDF', color: 'bg-amber-50 text-amber-500' }
                    ].map((doc, i) => (
                      <div key={i} className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md hover:border-[#16a34a]/30 transition cursor-pointer group">
                         <div className={`w-12 h-12 ${doc.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition transform shadow-sm`}>
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                         </div>
                         <h4 className="text-sm font-black text-gray-800 mb-1">{doc.name}</h4>
                         <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{doc.size}</p>
                      </div>
                    ))}
                 </div>
              </div>

            </div>

            {/* Right Column: Intelligence & Snapshot */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-10">
              
              {/* Match Intelligence */}
              <div className="bg-[#07261f] rounded-[40px] p-10 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-8 opacity-10 text-[#16a34a] scale-150 transform group-hover:rotate-12 transition duration-1000">
                    <svg className="w-32 h-32" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                 </div>
                 <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-2 text-[10px] font-black text-[#16a34a] uppercase tracking-[0.3em]">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                       Match Intelligence
                    </div>
                    <div className="space-y-4">
                       <h3 className="text-5xl font-black text-white tracking-tighter">94% <span className="text-2xl text-[#16a34a]">MATCH</span></h3>
                       <p className="text-xs text-white/70 font-medium leading-relaxed">
                          Based on your recent interest in <span className="text-[#16a34a] font-black underline">FinTech</span> and <span className="text-[#16a34a] font-black underline">Scalable SaaS</span> in emerging markets.
                       </p>
                    </div>
                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-white/50 leading-relaxed italic">
                       "Strong alignment with your mandate for regional scalability and high composite growth metrics."
                    </div>
                 </div>
              </div>

              {/* Investment Snapshot */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                 <h3 className="text-xl font-black text-[#0f3d32] tracking-tight">Investment Snapshot</h3>
                 <div className="space-y-8">
                    {[
                      { label: 'Valuation Cap', value: '$12M Post-Money' },
                      { label: 'Minimum Check', value: '$50k' },
                      { label: 'Industry Tag', value: 'PROFESSIONAL SERVICES', isBadge: true },
                      { label: 'Runway', value: '14 Months', isWarning: true }
                    ].map((item, i) => (
                      <div key={i} className="flex justify-between items-center py-4 border-b border-gray-50 last:border-0">
                         <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{item.label}</span>
                         {item.isBadge ? (
                           <span className="px-2.5 py-1 bg-[#eef6f3] text-[#136150] rounded-md text-[9px] font-black tracking-widest">{item.value}</span>
                         ) : (
                           <span className={`text-sm font-black ${item.isWarning ? 'text-amber-600' : 'text-gray-800'}`}>{item.value}</span>
                         )}
                      </div>
                    ))}
                 </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-[40px] p-8 border border-gray-100 shadow-sm space-y-4">
                 <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-[#eef6f3] group transition">
                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover:text-[#136150]">Request Access to VDR</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#136150]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 </button>
                 <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-[#eef6f3] group transition">
                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover:text-[#136150]">Download Pitch Summary</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#136150]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                 </button>
                 <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-[#eef6f3] group transition text-left">
                    <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest group-hover:text-[#136150]">Flag for investment Com.</span>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-[#136150]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path></svg>
                 </button>
              </div>

              {/* KYB/KYC Status */}
              <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-8">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#eef6f3] rounded-xl flex items-center justify-center text-[#136150]">
                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 3.07L3 7c0 5.148 2.214 9.774 5.765 13.041a1.996 1.996 0 002.47 0C14.786 16.774 17 12.148 17 7l-.382-.986z"></path></svg>
                    </div>
                    <h3 className="text-lg font-black text-[#0f3d32] tracking-tight">KYB/KYC Status</h3>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: 'Entity Registration Verified', status: 'verified' },
                      { label: 'Tax Compliance Valid', status: 'verified' },
                      { label: 'AML Secondary Screening', status: 'pending' }
                    ].map((check, i) => (
                      <div key={i} className="flex items-center gap-4 text-xs font-bold">
                         <div className={`w-5 h-5 rounded-full flex items-center justify-center ${check.status === 'verified' ? 'bg-[#16a34a] text-white' : 'bg-amber-100 text-amber-600'}`}>
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                         </div>
                         <span className={check.status === 'verified' ? 'text-gray-700' : 'text-gray-400'}>{check.label}</span>
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
