"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function StartupProfile() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Main Content Scrollable */}
        <main className="flex-grow overflow-y-auto p-10 bg-white">
           <div className="max-w-[1000px] mx-auto flex flex-col min-h-full">
             
             {/* Header Section */}
             <div className="flex justify-between items-end mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-[#0a4d3c] tracking-tight mb-2">Startup Profile</h1>
                  <p className="text-gray-500 text-sm">Detailed insights into GreenFarm Ethiopia's growth and operations.</p>
               </div>
               <div className="flex items-center gap-3">
                  <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
                     EXPORT PDF
                  </button>
                  <button className="px-5 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition shadow-sm">
                     SHARE ACCESS
                  </button>
               </div>
             </div>

             {/* Content Grid */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Column (Main Info) */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                   
                   {/* Header Card */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex items-start gap-6">
                      <div className="w-24 h-24 bg-[#3d7a5b] rounded-2xl flex flex-col items-center justify-center shrink-0 shadow-inner">
                         <svg className="w-8 h-8 text-green-300 mb-1" fill="currentColor" viewBox="0 0 24 24"><path d="M17 5.98c-3.14.88-5.43 3.71-5.96 7.02H9.6L8 15h1.76c-.34 2.11-1.28 4.01-2.6 5.5l1.41 1.41c1.55-1.74 2.65-3.95 3.12-6.37L12 15h1.22c.16-3.83 1.83-7.25 4.54-9.52.28-.24.71-.05.71.32v8.28c0 1.1-.9 2-2 2h-4v2h4c2.21 0 4-1.79 4-4V5.28c0-.77-.92-1.15-1.47-.7z"/></svg>
                         <span className="text-white text-[10px] font-bold tracking-widest">GreenFarm</span>
                      </div>
                      <div className="flex-grow pt-1">
                         <div className="flex items-center gap-3 mb-2">
                            <h2 className="text-2xl font-bold text-gray-900">GreenFarm Ethiopia</h2>
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-[9px] font-black rounded uppercase tracking-wider">VERIFIED</span>
                         </div>
                         <div className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-4">
                            <span>AgriTech</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span>Series A</span>
                            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                            <span className="flex items-center gap-1">
                               <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                               Addis Ababa, ET
                            </span>
                         </div>
                         <p className="text-sm text-gray-600 leading-relaxed">
                            Revolutionizing Ethiopian agriculture by providing smallholder farmers with AI-driven crop monitoring and direct-to-market...
                         </p>
                      </div>
                   </div>

                   {/* Traction Summary */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-sm font-bold text-[#0a4d3c] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            Traction Summary
                         </h3>
                         <button className="text-gray-400 hover:text-gray-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"></path></svg>
                         </button>
                      </div>

                      <div className="grid grid-cols-3 divide-x divide-gray-100">
                         <div className="text-center px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">USER GROWTH</p>
                            <p className="text-3xl font-bold text-[#0a4d3c] mb-1">25%</p>
                            <p className="text-xs text-gray-500 font-medium">Month over Month</p>
                         </div>
                         <div className="text-center px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">REVENUE</p>
                            <p className="text-3xl font-bold text-[#0a4d3c] mb-1">$150k</p>
                            <p className="text-xs text-gray-500 font-medium">Current ARR</p>
                         </div>
                         <div className="text-center px-4">
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">IMPACT</p>
                            <p className="text-3xl font-bold text-[#0a4d3c] mb-1">500+</p>
                            <p className="text-xs text-gray-500 font-medium">Active Farmers</p>
                         </div>
                      </div>
                   </div>

                   {/* Investment Documents */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex justify-between items-center mb-6">
                         <h3 className="text-sm font-bold text-[#0a4d3c] flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"></path></svg>
                            Investment Documents
                         </h3>
                      </div>

                      <div className="space-y-4">
                         {[
                            { name: 'Pitch Deck Q3 2023', updated: 'Updated 2 days ago • 4.2 MB', iconColor: 'text-red-500' },
                            { name: 'Business Plan & Roadmap', updated: 'Updated 1 month ago • 2.1 MB', iconColor: 'text-red-500' },
                            { name: 'Financial Summary (Projections)', updated: 'Updated 1 week ago • 1.5 MB', iconColor: 'text-yellow-600' }
                         ].map((doc, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 cursor-pointer group">
                               <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100 ${doc.iconColor}`}>
                                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                                  </div>
                                  <div>
                                     <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                                     <p className="text-[10px] text-gray-500 font-medium">{doc.updated}</p>
                                  </div>
                               </div>
                               <button className="text-[#0a4d3c] opacity-0 group-hover:opacity-100 transition bg-green-50 p-2 rounded-lg hover:bg-green-100">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                               </button>
                            </div>
                         ))}
                      </div>
                   </div>

                </div>

                {/* Right Column (Side Info) */}
                <div className="flex flex-col gap-6">
                   
                   {/* Funding Goal */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">FUNDING GOAL: $2.5M</p>
                      
                      <div className="flex justify-between items-end mb-2">
                         <h3 className="text-3xl font-bold text-[#0a4d3c]">$1.12M</h3>
                         <span className="text-xs font-bold text-gray-600 mb-1">45% Raised</span>
                      </div>
                      
                      <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6">
                         <div className="h-full bg-[#0a4d3c] rounded-full w-[45%]"></div>
                      </div>

                      <button className="w-full py-3.5 bg-[#0a4d3c] text-white text-xs font-bold rounded-xl hover:bg-[#07382b] transition shadow-sm">
                         SEND OFFER
                      </button>
                   </div>

                   {/* Leadership Team */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-[#0a4d3c] flex items-center gap-2 mb-6">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                         Leadership Team
                      </h3>

                      <div className="space-y-4">
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <img src="https://i.pravatar.cc/150?img=11" alt="Dawit Bekele" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                               <div>
                                  <p className="text-sm font-bold text-gray-900">Dawit Bekele</p>
                                  <p className="text-[10px] text-gray-500 font-medium">CEO & Co-Founder</p>
                               </div>
                            </div>
                            <button className="text-gray-400 hover:text-[#0a4d3c] transition">
                               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </button>
                         </div>
                         <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <img src="https://i.pravatar.cc/150?img=5" alt="Sara Tekle" className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
                               <div>
                                  <p className="text-sm font-bold text-gray-900">Sara Tekle</p>
                                  <p className="text-[10px] text-gray-500 font-medium">CTO</p>
                               </div>
                            </div>
                            <button className="text-gray-400 hover:text-[#0a4d3c] transition">
                               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                            </button>
                         </div>
                      </div>
                   </div>

                   {/* Quick Actions */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
                      <h3 className="text-sm font-bold text-[#0a4d3c] flex items-center gap-2 mb-6">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                         Quick Actions
                      </h3>

                      <div className="space-y-3">
                         <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2 shadow-sm">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            MESSAGE STARTUP
                         </button>
                         <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2 shadow-sm">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            SCHEDULE MEETING
                         </button>
                         <button className="w-full py-3 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-50 transition flex justify-center items-center gap-2 shadow-sm">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path></svg>
                            GIVE FEEDBACK
                         </button>
                      </div>
                   </div>

                </div>
             </div>

           </div>
        </main>
      </div>

    </div>
  );
}
