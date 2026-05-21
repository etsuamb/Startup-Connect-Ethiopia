"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function FeedbackPage() {
  const [ratings, setRatings] = useState({
    overall: 4,
    pitch: 3,
    team: 5,
    business: 4
  });

  const renderStars = (rating, key) => {
    return (
      <div className="flex gap-1.5 mt-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRatings({...ratings, [key]: star})}
            className={`transition ${star <= rating ? 'text-[#8a611c]' : 'text-gray-300'}`}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
          </button>
        ))}
      </div>
    );
  };

  const recentFeedback = [
    { id: 1, name: 'GreenFarm Ethiopia', score: '4.5', time: '2 days ago', text: 'Strong vertical integration plan, but needs more clarity on the supply chain risk mitigation for the Highlands...' },
    { id: 2, name: 'SolarTrack Addis', score: '3.8', time: '1 week ago', text: "Impressive hardware efficiency. I'm concerned about the initial unit cost and the long-term maintenance..." },
    { id: 3, name: 'CoffeeChain', score: '4.2', time: '2 weeks ago', text: 'Blockchain implementation is solid. The user interface for smallholder farmers needs significant...' }
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Global Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="relative w-full max-w-[440px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search startups or metrics..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <button className="hover:text-gray-900 transition flex items-center gap-2 text-[14px] font-medium">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
               Support
            </button>
            <button className="hover:text-gray-900 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="hover:opacity-80 transition ml-2">
               <div className="w-9 h-9 rounded-full bg-[#0a3a2e] flex items-center justify-center text-white border-2 border-transparent">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </div>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto bg-white">
           <div className="p-10 max-w-[1200px] w-full mx-auto flex flex-col">
             
             {/* Title Section */}
             <div className="mb-10">
                <h1 className="text-[34px] font-bold text-gray-900 tracking-tight mb-3">Provide Startup Feedback</h1>
                <p className="text-gray-500 text-[15px] max-w-3xl">Your insights help Ethiopian entrepreneurs refine their ventures and improve alignment with capital requirements.</p>
             </div>

             <div className="flex flex-col lg:flex-row gap-10 items-start">
                
                {/* Left Form Card */}
                <div className="flex-grow w-full bg-white border border-gray-200 rounded-[20px] p-8 shadow-sm">
                   
                   {/* Select Startup */}
                   <div className="mb-8">
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">SELECT STARTUP</label>
                      <div className="relative">
                         <select className="w-full appearance-none bg-[#f8f9fa] border border-gray-200 text-gray-700 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]">
                            <option value="">Select a startup to review</option>
                            <option value="greenfarm">GreenFarm Ethiopia</option>
                            <option value="solar">SolarTrack Addis</option>
                            <option value="coffee">CoffeeChain</option>
                         </select>
                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                         </div>
                      </div>
                   </div>

                   {/* Ratings Grid */}
                   <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
                      <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">OVERALL RATING</label>
                         {renderStars(ratings.overall, 'overall')}
                      </div>
                      <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">PITCH QUALITY</label>
                         {renderStars(ratings.pitch, 'pitch')}
                      </div>
                      <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">TEAM STRENGTH</label>
                         {renderStars(ratings.team, 'team')}
                      </div>
                      <div className="bg-[#f8f9fa] rounded-xl p-5 border border-transparent">
                         <label className="block text-[11px] font-bold text-gray-900 uppercase tracking-widest">BUSINESS POTENTIAL</label>
                         {renderStars(ratings.business, 'business')}
                      </div>
                   </div>

                   {/* Comments */}
                   <div className="mb-8">
                      <label className="block text-[10px] font-bold text-gray-900 uppercase tracking-widest mb-3">COMMENTS & ADVICE</label>
                      <textarea 
                         rows="5"
                         placeholder="Provide constructive feedback for the founders..."
                         className="w-full bg-[#f8f9fa] border border-gray-200 text-gray-700 py-4 px-5 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px] resize-none"
                      ></textarea>
                   </div>

                   {/* Submit Button */}
                   <button className="w-full py-4 bg-[#0a3a2e] hover:bg-[#072a21] text-white font-bold text-[14px] rounded-xl transition shadow-md">
                      Submit Feedback
                   </button>
                </div>

                {/* Right Column - Recent Feedback */}
                <div className="w-full lg:w-[400px] shrink-0 flex flex-col gap-5">
                   
                   <div className="flex justify-between items-center mb-1">
                      <h2 className="text-[22px] font-bold text-gray-900">Recent Feedback</h2>
                      <button className="px-4 py-1.5 bg-[#a3792c] hover:bg-[#8f6925] text-white text-[11px] font-bold rounded-full transition shadow-sm">
                         View All
                      </button>
                   </div>

                   {/* Cards */}
                   {recentFeedback.map((fb) => (
                      <div key={fb.id} className="bg-white border border-gray-200 rounded-[16px] p-5 shadow-sm hover:shadow-md transition cursor-pointer">
                         <div className="flex justify-between items-start mb-1">
                            <h3 className="font-bold text-[15px] text-gray-900">{fb.name}</h3>
                            <div className="flex items-center gap-1 px-2 py-0.5 bg-[#fae8c8] text-[#8a611c] rounded-md text-[11px] font-bold">
                               {fb.score}
                               <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>
                            </div>
                         </div>
                         <div className="text-[11px] text-gray-400 font-medium mb-3">{fb.time}</div>
                         <p className="text-[13px] text-gray-600 leading-relaxed line-clamp-2">
                            {fb.text}
                         </p>
                      </div>
                   ))}

                   {/* Insight Card */}
                   <div className="bg-[#052e20] rounded-[20px] p-8 text-white relative overflow-hidden mt-2 shadow-lg">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-[0.03] rounded-bl-[100px] pointer-events-none"></div>
                      <div className="text-[#10704c] text-5xl font-serif leading-none mb-2">"</div>
                      <p className="text-[14px] text-white/90 leading-relaxed font-medium mb-6 relative z-10 pr-2">
                         Direct feedback is the most valuable currency in our ecosystem. You're not just investing money, you're investing wisdom.
                      </p>
                      <div className="text-[10px] font-bold text-[#4ade80] uppercase tracking-widest relative z-10">
                         ADVISORY BOARD INSIGHT
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
