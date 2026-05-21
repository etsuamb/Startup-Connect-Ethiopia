"use client";
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from "@/components/startup/Sidebar";

export default function ApplyPage() {
  const [formData, setFormData] = useState({
    project: "GreenTech Solutions - Phase 1",
    amount: "",
    useOfFunds: "",
    milestones: "",
    message: ""
  });

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex">
      
      {/* Sidebar (Same as Discover/Dashboard) */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col overflow-y-auto relative bg-[#f8fafc]">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center px-8 py-5 bg-white border-b border-gray-100 w-full z-10 sticky top-0">
          <div className="relative w-full max-w-[400px] hidden sm:block">
             <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
             </div>
             <input type="text" placeholder="Search..." className="w-full pl-11 pr-4 py-2.5 bg-[#f8fafc] border-none rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#0f3d32]/20 transition" />
          </div>

          <div className="flex items-center gap-6 ml-auto">
             <button className="text-gray-400 hover:text-gray-600 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <div className="absolute top-0 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full border-2 border-white"></div>
             </button>
             <button className="text-gray-400 hover:text-gray-600 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
             </button>
             
             <div className="flex items-center gap-3 border-l border-gray-200 pl-6">
                <div className="hidden sm:flex flex-col items-end">
                  <span className="text-xs font-bold text-gray-900">Abebe Bikila</span>
                  <span className="text-[10px] text-gray-400 font-medium">Founder, GreenTech</span>
                </div>
                <div className="w-9 h-9 rounded-full bg-[#1e293b] text-white overflow-hidden shrink-0 flex items-center justify-center font-bold text-xs shadow-sm border border-gray-200">
                  AB
                </div>
             </div>
          </div>
        </header>

        {/* Page Header */}
        <div className="px-8 pt-8 pb-4">
          <h1 className="text-2xl font-bold text-[#0f3d32] mb-1">Apply for Investment</h1>
          <p className="text-xs text-gray-400 font-medium tracking-tight">Submit your funding request to the selected investor.</p>
        </div>

        <div className="px-8 pb-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column - Form */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Selected Investor Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#eaf4f1] rounded-xl flex items-center justify-center text-[#0f3d32] shrink-0 border border-gray-50">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m4 0h1m-5 10h1m4 0h1m-5-4h1m4 0h1"></path></svg>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-0.5">
                    <h3 className="text-sm font-bold text-gray-900">EthioVenture Capital</h3>
                    <span className="bg-[#f0fdf4] text-[#16a34a] text-[8px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded">Active</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-400 text-[10px] font-medium tracking-tight">
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path></svg>Addis Ababa, ET</span>
                    <span className="flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>Range: $50k - $250k</span>
                  </div>
                </div>
              </div>
              <button className="text-[10px] font-bold text-gray-400 border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition">Change Investor</button>
            </div>

            {/* Application Form */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <svg className="w-4 h-4 text-[#0f3d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                <h2 className="text-sm font-bold text-gray-900 tracking-tight">Application Form</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Select Startup Project</label>
                  <select className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none appearance-none">
                    <option>GreenTech Solutions - Phase 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Funding Amount Requested ($)</label>
                  <input type="text" placeholder="e.g. 150,000" className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Use of Funds</label>
                <textarea rows="3" placeholder="Describe how the investment will be utilized..." className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Expected Milestones</label>
                <textarea rows="3" placeholder="What key goals will be achieved with this funding?" className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Message to Investor</label>
                <textarea rows="3" placeholder="Personal note or introduction to the investor..." className="w-full bg-[#f8fafc] border border-gray-100 rounded-xl px-4 py-3 text-xs font-medium focus:ring-2 focus:ring-[#0f3d32]/10 outline-none resize-none"></textarea>
              </div>
            </div>

            {/* Attached Documents */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <svg className="w-4 h-4 text-[#0f3d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                <h2 className="text-sm font-bold text-gray-900 tracking-tight">Attached Documents</h2>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  { label: "Pitch Deck", file: "GreenTech_Pitch_v2.pdf", status: "Uploaded" },
                  { label: "Business Plan", file: "2024_Strategic_Plan.docx", status: "Uploaded" },
                  { label: "Financial Document", desc: "Required for review", status: "Upload" },
                  { label: "Demo Video", desc: "Optional", status: "Missing" }
                ].map((doc, idx) => (
                  <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${doc.status === 'Uploaded' ? 'border-gray-50 bg-[#f8fafc]' : 'border-dashed border-gray-200'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${doc.status === 'Uploaded' ? 'bg-[#eaf4f1] text-[#0f3d32]' : 'bg-gray-50 text-gray-300'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                      </div>
                      <div>
                        <h4 className="text-[11px] font-bold text-gray-900 leading-tight">{doc.label}</h4>
                        <p className="text-[10px] text-gray-400 font-medium tracking-tight">{doc.file || doc.desc}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {doc.status === 'Uploaded' && <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest flex items-center gap-1"><div className="w-1 h-1 bg-green-500 rounded-full"></div>{doc.status}</span>}
                      {doc.status !== 'Uploaded' && <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">{doc.status}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-3 text-red-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <p className="text-[10px] font-bold tracking-tight">Please upload required documents before submitting</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="bg-white border border-gray-200 text-gray-600 px-8 py-3 rounded-xl text-xs font-bold hover:bg-gray-50 transition shadow-sm">Save Draft</button>
                <button className="bg-[#0f3d32] text-white px-8 py-3 rounded-xl text-xs font-bold hover:bg-[#0a2921] transition shadow-lg">Submit Application</button>
              </div>
            </div>

          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-4 flex flex-col gap-6 sticky top-24">
            
            {/* Application Summary Card */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 tracking-tight mb-6">Application Summary</h3>
              
              <div className="flex flex-col gap-5">
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Startup Name</p>
                  <p className="text-xs font-bold text-gray-700">GreenTech Solutions</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Project</p>
                  <p className="text-xs font-bold text-gray-700">Waste-to-Energy Initiative</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Industry</p>
                  <p className="text-xs font-bold text-gray-700">Renewable Energy</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">Requested Amount</p>
                  <p className="text-xs font-bold text-gray-700">$150,000</p>
                </div>
                <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                  <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Status</p>
                  <span className="bg-gray-100 text-gray-500 text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded">Draft</span>
                </div>
              </div>
            </div>

            {/* Pro-Tip Box */}
            <div className="bg-[#eaf4f1] rounded-2xl p-5 border border-[#0f3d32]/5 flex gap-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shrink-0 shadow-sm text-[#0f3d32]">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
              </div>
              <p className="text-[10px] text-[#0f3d32] font-bold leading-relaxed">
                Pro-Tip: Complete applications with demo videos have a 40% higher chance of receiving investor interest in the first week.
              </p>
            </div>

          </div>

        </div>
      </main>

    </div>
  );
}
