"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/investor/Sidebar";

export default function InvestorDiscover() {
   const [viewMode, setViewMode] = useState("grid");

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
                     placeholder="Search startups, founders, or industries..."
                     className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition"
                  />
               </div>

               <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                     <button className="text-gray-400 hover:text-gray-600 transition relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                     </button>
                     <button className="text-gray-400 hover:text-gray-600 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                     </button>
                  </div>

                  <div className="w-px h-6 bg-gray-200"></div>

                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                        <img src="https://i.pravatar.cc/150?img=12" alt="Abebe Kebede" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 leading-tight">Abebe Kebede</span>
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Senior Partner</span>
                     </div>
                  </div>
               </div>
            </header>

            {/* Dashboard Content Scrollable */}
            <main className="flex-grow overflow-y-auto p-10 bg-white">
               <div className="max-w-[1200px] mx-auto flex flex-col min-h-full">

                  {/* Top Title Section */}
                  <div className="flex justify-between items-end mb-8">
                     <div>
                        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Browse Startups</h1>
                        <p className="text-gray-500 text-[15px]">Discover high-potential investment opportunities in Ethiopia.</p>
                     </div>
                     <div className="flex items-center bg-gray-50 rounded-lg p-1 border border-gray-200">
                        <button
                           onClick={() => setViewMode('grid')}
                           className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition ${viewMode === 'grid' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                           Grid
                        </button>
                        <button
                           onClick={() => setViewMode('list')}
                           className={`px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2 transition ${viewMode === 'list' ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                           List
                        </button>
                     </div>
                  </div>

                  {/* Filters Box */}
                  <div className="bg-white border border-gray-200 rounded-xl p-6 mb-10 flex flex-wrap lg:flex-nowrap gap-6 items-end shadow-sm">

                     <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-gray-700 mb-2">Industry</label>
                        <div className="relative">
                           <select className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0a4d3c]/20 focus:border-[#0a4d3c]">
                              <option>All Industries</option>
                              <option>Agritech</option>
                              <option>Fintech</option>
                              <option>Healthtech</option>
                           </select>
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-gray-700 mb-2">Stage</label>
                        <div className="relative">
                           <select className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0a4d3c]/20 focus:border-[#0a4d3c]">
                              <option>All Stages</option>
                              <option>Pre-seed</option>
                              <option>Seed</option>
                              <option>Series A</option>
                           </select>
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                           </div>
                        </div>
                     </div>

                     <div className="flex-1 min-w-[200px]">
                        <label className="block text-xs font-bold text-gray-700 mb-2">Location</label>
                        <div className="relative">
                           <select className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-[#0a4d3c]/20 focus:border-[#0a4d3c]">
                              <option>All Locations</option>
                              <option>Addis Ababa</option>
                              <option>Hawassa</option>
                              <option>Bahir Dar</option>
                              <option>Dire Dawa</option>
                           </select>
                           <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                           </div>
                        </div>
                     </div>

                     <div className="w-full lg:w-auto">
                        <button className="w-full lg:w-auto px-8 py-3 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition flex items-center justify-center gap-2 shadow-sm">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                           Apply Filters
                        </button>
                     </div>
                  </div>

                  {/* Grid of Startups */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                     {[
                        { name: 'GreenFarm Ethiopia', sector: 'AGRITECH', stage: 'SEED', loc: 'ADDIS ABABA', desc: 'Smart hydroponic systems designed for urban agricultural scalability across', funding: '$450,000', icon: 'leaf', bgClass: 'bg-green-900', href: '/investor/discover/greenfarm' },
                        { name: 'BirrFlow', sector: 'FINTECH', stage: 'SERIES A', loc: 'ADDIS ABABA', desc: 'Unified digital payment gateway for Ethiopian merchants to accept', funding: '$1,200,000', icon: 'wallet', bgClass: 'bg-[#103040]', href: '/investor/discover/birrflow' },
                        { name: 'HealTech Ethio', sector: 'HEALTHTECH', stage: 'PRE-SEED', loc: 'HAWASSA', desc: 'Telemedicine platform connecting rural Ethiopian communities with specialized', funding: '$150,000', icon: 'medical', bgClass: 'bg-[#e5e7eb]', href: '/investor/discover/healtech' },
                        { name: 'LogiPost', sector: 'LOGISTICS', stage: 'SEED', loc: 'ADDIS ABABA', desc: 'Last-mile delivery optimization using AI to navigate unmapped urban areas in', funding: '$300,000', icon: 'truck', bgClass: 'bg-[#4a5568]', href: '/investor/discover/logipost' },
                        { name: 'EduSmart Ethiopia', sector: 'EDTECH', stage: 'PRE-SEED', loc: 'BAHIR DAR', desc: 'Offline-first digital learning content for primary schools in regions with limited', funding: '$200,000', icon: 'edu', bgClass: 'bg-[#8d6e63]', href: '/investor/discover/edusmart' },
                        { name: 'SolarGrid Ethio', sector: 'ENERGY', stage: 'SEED', loc: 'DIRE DAWA', desc: 'Pay-as-you-go solar home systems for off-grid households utilizing mobile', funding: '$500,000', icon: 'sun', bgClass: 'bg-[#5c8a8a]', href: '/investor/discover/solargrid' },
                     ].map((startup, i) => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition flex flex-col group">
                           {/* Image Placeholder area */}
                           <div className={`h-40 ${startup.bgClass} relative flex items-center justify-center overflow-hidden`}>
                              <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                              {/* Abstract background representations */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                              {/* White floating icon card */}
                              <div className="absolute left-6 -bottom-5 w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center z-10 border border-gray-100 group-hover:scale-110 transition-transform">
                                 {startup.icon === 'leaf' && <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24"><path d="M17 5.98c-3.14.88-5.43 3.71-5.96 7.02H9.6L8 15h1.76c-.34 2.11-1.28 4.01-2.6 5.5l1.41 1.41c1.55-1.74 2.65-3.95 3.12-6.37L12 15h1.22c.16-3.83 1.83-7.25 4.54-9.52.28-.24.71-.05.71.32v8.28c0 1.1-.9 2-2 2h-4v2h4c2.21 0 4-1.79 4-4V5.28c0-.77-.92-1.15-1.47-.7z" /></svg>}
                                 {startup.icon === 'wallet' && <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21 7.28V5c0-1.1-.9-2-2-2H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-2.28A2 2 0 0022 15V9a2 2 0 00-1-1.72zM20 9v6h-7V9h7zM5 19V5h14v2h-6c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h6v2H5z" /><circle cx="16" cy="12" r="1.5" /></svg>}
                                 {startup.icon === 'medical' && <svg className="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 24 24"><path d="M20 6h-4V4c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zM10 4h4v2h-4V4zm6 11h-3v3h-2v-3H8v-2h3v-3h2v3h3v2z" /></svg>}
                                 {startup.icon === 'truck' && <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 24 24"><path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" /></svg>}
                                 {startup.icon === 'edu' && <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 24 24"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" /></svg>}
                                 {startup.icon === 'sun' && <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 24 24"><path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" /></svg>}
                              </div>
                           </div>

                           {/* Card Content */}
                           <div className="p-6 pt-10 flex-grow flex flex-col">
                              <h3 className="text-xl font-bold text-gray-900 mb-3">{startup.name}</h3>

                              <div className="flex flex-wrap gap-2 mb-4">
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">{startup.sector}</span>
                                 <span className="px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold rounded uppercase">{startup.stage}</span>
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">{startup.loc}</span>
                              </div>

                              <p className="text-sm text-gray-500 mb-6 flex-grow leading-relaxed">
                                 {startup.desc}...
                              </p>

                              <div className="flex justify-between items-end mb-6">
                                 <p className="text-xs font-medium text-gray-400">Funding Needed</p>
                                 <p className="text-2xl font-bold text-[#0a4d3c]">{startup.funding}</p>
                              </div>

                              <Link href="/investor/discover/profile" className="w-full py-3 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition flex justify-center items-center gap-2">
                                 View Profile
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                              </Link>
                           </div>
                        </div>
                     ))}
                  </div>

                  {/* Pagination */}
                  <div className="flex justify-between items-center py-6 border-t border-gray-200 mt-auto">
                     <p className="text-sm text-gray-500 font-medium">Showing 6 of 124 startups</p>

                     <div className="flex gap-2">
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#0a4d3c] text-white font-bold shadow-sm">
                           1
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-bold">
                           2
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition font-bold">
                           3
                        </button>
                        <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                        </button>
                     </div>
                  </div>

               </div>
            </main>
         </div>

      </div>
   );
}
