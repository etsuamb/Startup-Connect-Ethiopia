"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/investor/Sidebar";

export default function InvestorDashboard() {
   return (
      <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">

         {/* Sidebar */}
         <Sidebar />

         {/* Main Content Area */}
         <div className="flex-grow flex flex-col overflow-hidden">

            {/* Header */}
            <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 z-10 shrink-0">
               <div className="relative w-full max-w-[400px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <input
                     type="text"
                     placeholder="Search startups, sectors, or founders..."
                     className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition"
                  />
               </div>

               <div className="flex items-center gap-5">
                  <div className="flex items-center gap-3">
                     <button className="text-gray-400 hover:text-gray-600 transition relative">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
                     </button>
                     <button className="text-gray-400 hover:text-gray-600 transition">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                     </button>
                  </div>

                  <div className="w-px h-6 bg-gray-200"></div>

                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center shrink-0">
                        <img src="https://i.pravatar.cc/150?img=11" alt="Abebe Tekle" className="w-full h-full object-cover" />
                     </div>
                     <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-900 leading-tight">Abebe Tekle</span>
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wider">Angel Investor</span>
                     </div>
                  </div>
               </div>
            </header>

            {/* Dashboard Content Scrollable */}
            <main className="flex-grow overflow-y-auto p-8">

               {/* Top Title Section */}
               {/* <div className="flex justify-between items-end mb-8">
             <div>
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-1">Investor Dashboard</h1>
                <p className="text-gray-500 text-sm">Welcome back, Abebe. Here's a summary of your ecosystem activity.</p>
             </div>
             <div className="flex gap-3">
                <button className="px-5 py-2.5 bg-[#0a4d3c] hover:bg-[#07382b] text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition shadow-sm">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                   Browse Startups
                </button>
                <button className="px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-lg flex items-center gap-2 transition shadow-sm">
                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                   View Portfolio
                </button>
             </div>
           </div> */}

               {/* 4 Stats Cards */}
               <div className="grid grid-cols-4 gap-6 mb-10">
                  {/* Card 1 */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-full bg-[#f0fcf5] flex items-center justify-center text-[#22c55e]">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <span className="px-2 py-1 bg-[#dcfce7] text-[#166534] text-xs font-bold rounded-full">+12.4%</span>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">TOTAL INVESTMENTS</p>
                        <h3 className="text-3xl font-bold text-gray-900">$2.4M</h3>
                     </div>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                        </div>
                        <span className="px-2 py-1 bg-[#ccfbf1] text-[#115e59] text-xs font-bold rounded-full">8 Active</span>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">ACTIVE STARTUPS</p>
                        <h3 className="text-3xl font-bold text-gray-900">12</h3>
                     </div>
                  </div>

                  {/* Card 3 */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-500">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                        </div>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">PENDING REQUESTS</p>
                        <h3 className="text-3xl font-bold text-gray-900">05</h3>
                     </div>
                  </div>

                  {/* Card 4 */}
                  <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col justify-between">
                     <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500">
                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        </div>
                     </div>
                     <div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">UPCOMING MEETINGS</p>
                        <h3 className="text-3xl font-bold text-gray-900">03</h3>
                     </div>
                  </div>
               </div>

               {/* Main Middle Section */}
               <div className="flex gap-8 mb-10">

                  {/* Recommended Startups */}
                  <div className="flex-[2] flex flex-col">
                     <div className="flex justify-between items-center mb-5">
                        <h2 className="text-xl font-bold text-gray-900">Recommended Startups</h2>
                        <button className="text-sm font-bold text-[#0a4d3c] hover:underline">View Recommendations</button>
                     </div>
                     <div className="flex gap-5">

                        {/* EcoFlow Tech */}
                        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                           {/* Abstract green background header area representing the image */}
                           <div className="h-32 bg-[#0d3328] relative overflow-hidden flex items-center justify-center">
                              {/* Pattern/Gradient to simulate the image */}
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-green-500/10 to-transparent"></div>
                              <div className="absolute left-4 bottom-4 flex items-center gap-2 text-white font-bold">
                                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-green-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                 </div>
                                 EcoFlow Tech
                              </div>
                           </div>
                           <div className="p-5 flex-grow flex flex-col">
                              <div className="flex gap-2 mb-3">
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">AGRITECH</span>
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">SEED</span>
                              </div>
                              <p className="text-sm text-gray-600 flex-grow mb-6">Optimizing irrigation using AI-powered IoT sensors for small-scale Ethiopian...</p>
                              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                 <p className="text-sm text-gray-500">Seeking: <span className="font-bold text-gray-900">$250k</span></p>
                                 <button className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:text-[#0a4d3c] transition">
                                    Analyze
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                 </button>
                              </div>
                           </div>
                        </div>

                        {/* BirrWay Pay */}
                        <div className="flex-1 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden flex flex-col">
                           {/* Abstract green background header area representing the image */}
                           <div className="h-32 bg-[#092a2a] relative overflow-hidden flex items-center justify-center">
                              {/* Pattern/Gradient to simulate the image */}
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-teal-500/20 via-[#092a2a] to-[#092a2a]"></div>
                              <div className="absolute left-4 bottom-4 flex items-center gap-2 text-white font-bold z-10">
                                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-teal-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                 </div>
                                 BirrWay Pay
                              </div>
                           </div>
                           <div className="p-5 flex-grow flex flex-col">
                              <div className="flex gap-2 mb-3">
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">FINTECH</span>
                                 <span className="px-2 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold rounded uppercase">SERIES A</span>
                              </div>
                              <p className="text-sm text-gray-600 flex-grow mb-6">The next generation of cross-border payment APIs for East African...</p>
                              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                 <p className="text-sm text-gray-500">Seeking: <span className="font-bold text-gray-900">$1.2M</span></p>
                                 <button className="text-sm font-bold text-gray-900 flex items-center gap-1 hover:text-[#0a4d3c] transition">
                                    Analyze
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                 </button>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>

                  {/* Right Column: Funding Requests + Portfolio Insights */}
                  <div className="flex-[1] flex flex-col min-w-[300px]">

                     {/* Funding Requests */}
                     <div className="mb-6">
                        <div className="flex justify-between items-center mb-5">
                           <h2 className="text-xl font-bold text-gray-900">Funding Requests</h2>
                           <button className="text-sm font-bold text-[#0a4d3c] hover:underline">View All</button>
                        </div>
                        <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">

                           <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">SM</div>
                                 <div>
                                    <h4 className="text-sm font-bold text-gray-900">Shega Media</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">REQUESTED 2H AGO</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-sm font-bold text-[#0a4d3c]">$150k</div>
                                 <div className="text-[10px] text-gray-400">Bridge Round</div>
                              </div>
                           </div>

                           <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">HY</div>
                                 <div>
                                    <h4 className="text-sm font-bold text-gray-900">Hulogram Yacht</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">REQUESTED 5H AGO</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-sm font-bold text-[#0a4d3c]">$500k</div>
                                 <div className="text-[10px] text-gray-400">Pre-Seed</div>
                              </div>
                           </div>

                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600">LF</div>
                                 <div>
                                    <h4 className="text-sm font-bold text-gray-900">Lomi Fashion</h4>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">REQUESTED YESTERDAY</p>
                                 </div>
                              </div>
                              <div className="text-right">
                                 <div className="text-sm font-bold text-[#0a4d3c]">$75k</div>
                                 <div className="text-[10px] text-gray-400">Equity</div>
                              </div>
                           </div>

                        </div>
                     </div>

                     {/* Portfolio Insights */}
                     <div className="bg-[#092a2a] rounded-xl shadow-sm p-6 text-white flex-grow flex flex-col justify-center relative overflow-hidden">
                        <div className="relative z-10">
                           <h3 className="text-lg font-bold mb-2">Portfolio Insights</h3>
                           <p className="text-sm text-gray-300 mb-6 leading-relaxed">Your portfolio growth has exceeded the benchmark by 4.2% this quarter.</p>

                           <div className="space-y-4">
                              <div>
                                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                    <span>AGRITECH</span>
                                    <span>42%</span>
                                 </div>
                                 <div className="w-full bg-[#114545] rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '42%' }}></div>
                                 </div>
                              </div>
                              <div>
                                 <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mb-1.5">
                                    <span>FINTECH</span>
                                    <span>35%</span>
                                 </div>
                                 <div className="w-full bg-[#114545] rounded-full h-1.5">
                                    <div className="bg-emerald-400 h-1.5 rounded-full" style={{ width: '35%' }}></div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

               {/* Upcoming Meetings Row */}
               <div>
                  <div className="flex items-center gap-4 mb-5">
                     <h2 className="text-xl font-bold text-gray-900">Upcoming Meetings</h2>
                     <span className="px-3 py-1 bg-[#0a4d3c] text-white text-[10px] font-bold rounded-full">Today & Tomorrow</span>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden mb-10">

                     <div className="grid grid-cols-4 px-6 py-4 border-b border-gray-100 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <div className="col-span-1">STARTUP / CONTACT</div>
                        <div className="col-span-1">SUBJECT</div>
                        <div className="col-span-1">TIME</div>
                        <div className="col-span-1 text-right">TYPE</div>
                     </div>

                     <div className="divide-y divide-gray-100">
                        {/* Meeting 1 */}
                        <div className="grid grid-cols-4 items-center px-6 py-4 hover:bg-gray-50 transition">
                           <div className="col-span-1 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">EF</div>
                              <div className="min-w-0">
                                 <h4 className="text-sm font-bold text-gray-900 truncate">EcoFlow Tech</h4>
                                 <p className="text-xs text-gray-500 truncate">Kaleb Mulugeta</p>
                              </div>
                           </div>
                           <div className="col-span-1 text-sm font-semibold text-gray-700 truncate pr-4">Due Diligence Review</div>
                           <div className="col-span-1 text-sm text-gray-500 truncate pr-4">Today, 2:30 PM</div>
                           <div className="col-span-1 flex justify-between items-center">
                              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-bold rounded-full uppercase tracking-wider">Virtual</span>
                              <button className="text-gray-400 hover:text-gray-600">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                              </button>
                           </div>
                        </div>

                        {/* Meeting 2 */}
                        <div className="grid grid-cols-4 items-center px-6 py-4 hover:bg-gray-50 transition">
                           <div className="col-span-1 flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">BW</div>
                              <div className="min-w-0">
                                 <h4 className="text-sm font-bold text-gray-900 truncate">BirrWay Pay</h4>
                                 <p className="text-xs text-gray-500 truncate">Saba Kebede</p>
                              </div>
                           </div>
                           <div className="col-span-1 text-sm font-semibold text-gray-700 truncate pr-4">Investor Pitch - Series A</div>
                           <div className="col-span-1 text-sm text-gray-500 truncate pr-4">Tomorrow, 10:00 AM</div>
                           <div className="col-span-1 flex justify-between items-center">
                              <span className="px-3 py-1 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-full uppercase tracking-wider">In-Person</span>
                              <button className="text-gray-400 hover:text-gray-600">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                              </button>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>

            </main>
         </div>

         {/* Floating Add Button */}
         <button className="fixed bottom-8 right-8 w-14 h-14 bg-[#0a4d3c] text-white rounded-full shadow-xl flex items-center justify-center hover:bg-[#07382b] hover:scale-105 transition-all z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
         </button>

      </div>
   );
}
