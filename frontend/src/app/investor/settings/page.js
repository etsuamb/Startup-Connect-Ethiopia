"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function SettingsPage() {
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Global Header */}
        <header className="flex justify-between items-center px-10 py-4 bg-white border-b border-gray-100 z-10 shrink-0 h-[72px]">
          <div className="relative w-full max-w-[440px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search startups, documents..." 
              className="w-full pl-9 pr-4 py-2.5 bg-[#f8f9fa] border border-transparent rounded-xl text-[13px] outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-6 text-gray-600">
            <span className="text-[13px] font-bold text-gray-800">Investor Settings</span>
            <button className="hover:text-gray-900 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <button className="hover:text-gray-900 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-8 h-8 rounded-full object-cover border border-gray-200 ml-1 cursor-pointer" />
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto bg-[#f8f9fa] relative">
           <div className="p-10 max-w-[900px] w-full mx-auto flex flex-col pb-32 z-10 relative">
             
             {/* Title Section */}
             <div className="mb-8">
                <h1 className="text-[32px] font-bold text-[#091a15] tracking-tight mb-2">Settings</h1>
                <p className="text-gray-500 text-[14px]">Manage your account details, investment preferences, and security settings.</p>
             </div>

             <div className="flex flex-col gap-6">
                
                {/* Profile Settings Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                   <div className="flex items-center gap-3 mb-8">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                      <h2 className="text-xl font-bold text-gray-900">Profile Settings</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">FULL NAME</label>
                         <input type="text" defaultValue="Abebe Bikila" className="w-full bg-white border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]" />
                      </div>
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">EMAIL ADDRESS</label>
                         <input type="email" defaultValue="abebe.bikila@ethioventure.com" className="w-full bg-white border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]" />
                      </div>
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">PHONE NUMBER</label>
                         <input type="text" defaultValue="+251 911 234 567" className="w-full bg-white border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]" />
                      </div>
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">INVESTOR TYPE</label>
                         <div className="relative">
                            <select className="w-full appearance-none bg-white border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]">
                               <option>Venture Capitalist</option>
                               <option>Angel Investor</option>
                               <option>Syndicate Lead</option>
                               <option>Institutional Fund</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Investment Preferences Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                   <div className="flex items-center gap-3 mb-8">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                      <h2 className="text-xl font-bold text-gray-900">Investment Preferences</h2>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">PREFERRED INDUSTRY</label>
                         <input type="text" defaultValue="FinTech, Agritech, E-commerce" className="w-full bg-[#fbfcfc] border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]" />
                      </div>
                      <div>
                         <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">PREFERRED STARTUP STAGE</label>
                         <div className="relative">
                            <select className="w-full appearance-none bg-[#fbfcfc] border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]">
                               <option>Series A</option>
                               <option>Seed</option>
                               <option>Pre-Seed</option>
                               <option>Series B+</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                         </div>
                      </div>
                   </div>
                   
                   <div>
                      <label className="block text-[10px] font-bold text-gray-700 uppercase tracking-widest mb-2">PREFERRED LOCATION</label>
                      <input type="text" defaultValue="Addis Ababa, Ethiopia; East Africa Region" className="w-full bg-[#fbfcfc] border border-gray-200 text-gray-800 py-3.5 px-4 rounded-xl outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition text-[14px]" />
                   </div>
                </div>

                {/* Security Card */}
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                   <div className="flex items-center gap-3 mb-8">
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                      <h2 className="text-xl font-bold text-gray-900">Security</h2>
                   </div>
                   
                   <div className="flex flex-col gap-8">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 pb-8">
                         <div>
                            <h3 className="text-[14px] font-bold text-gray-900 mb-1">Password</h3>
                            <p className="text-[13px] text-gray-500">Last changed 3 months ago</p>
                         </div>
                         <button className="px-5 py-2.5 bg-white border border-gray-300 rounded-xl text-[13px] font-bold text-gray-800 hover:bg-gray-50 transition whitespace-nowrap">
                            Change password
                         </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                         <div>
                            <h3 className="text-[14px] font-bold text-gray-900 mb-1">Two-factor Authentication</h3>
                            <p className="text-[13px] text-gray-500">Add an extra layer of security to your account.</p>
                         </div>
                         
                         {/* Toggle Switch */}
                         <div 
                           className={`w-[42px] h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${twoFactorAuth ? 'bg-[#0a3a2e]' : 'bg-gray-300'}`}
                           onClick={() => setTwoFactorAuth(!twoFactorAuth)}
                         >
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${twoFactorAuth ? 'translate-x-[18px]' : ''}`}></div>
                         </div>
                      </div>
                   </div>
                </div>

             </div>

             {/* Save Button */}
             <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 bg-[#0a3a2e] text-white font-bold text-[14px] rounded-xl hover:bg-[#072a21] shadow-md flex items-center gap-2 transition">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"></path></svg>
                   Save Changes
                </button>
             </div>

           </div>
           
           {/* Bottom Watermark / Badge */}
           <div className="absolute bottom-10 left-0 right-0 flex flex-col items-center justify-center pointer-events-none opacity-[0.15]">
              <svg className="w-16 h-16 text-gray-400 mb-2" fill="currentColor" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM12 12a3 3 0 110-6 3 3 0 010 6zm-4 4a4 4 0 018 0v1H8v-1z"></path></svg>
              <span className="text-[12px] font-bold text-gray-500 uppercase tracking-widest">Verified Investor Status</span>
           </div>
           
        </main>

      </div>
    </div>
  );
}
