"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function InvestmentPayments() {
  const startups = [
    { id: 1, name: 'GreenFarm Ethiopia', industry: 'Agritech', amount: '$50,000', status: 'Pending', statusColor: 'bg-[#fce5ba] text-[#9a6a16]', date: 'Oct 30, 2023', icon: 'tractor', selected: true },
    { id: 2, name: 'SolarTrac Addis', industry: 'Energy', amount: '$12,500', status: 'Pending', statusColor: 'bg-[#fce5ba] text-[#9a6a16]', date: 'Nov 5, 2023', icon: 'lightning', selected: false },
    { id: 3, name: 'Habesha Logistics', industry: 'Logistics', amount: '$25,000', status: 'Overdue', statusColor: 'bg-[#fcdede] text-[#c92a2a]', date: 'Oct 15, 2023', icon: 'truck', selected: false },
    { id: 4, name: 'EduLinc Ethiopia', industry: 'EdTech', amount: '$15,000', status: 'Pending', statusColor: 'bg-[#fce5ba] text-[#9a6a16]', date: 'Nov 12, 2023', icon: 'edu', selected: false }
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-[#f8f9fa]">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-[#f8f9fa] z-10 shrink-0 border-b border-gray-100">
          <div className="relative w-full max-w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search startup..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 border border-transparent rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-gray-800 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#f8f9fa]"></span>
            </button>
            <button className="hover:text-gray-800 transition">
               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto">
           <div className="p-10 max-w-[1200px] w-full mx-auto flex flex-col min-h-full">
             
             {/* Title */}
             <div className="mb-10">
                <h1 className="text-[32px] font-bold text-[#0a4d3c] tracking-tight mb-2">Investment Payments</h1>
                <p className="text-gray-500 text-[15px]">Select the startup you want to pay.</p>
             </div>

             {/* Progress Bar */}
             <div className="flex items-center gap-6 mb-12">
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center text-sm font-bold shadow-sm">1</div>
                 <span className="text-[13px] font-bold text-[#0a4d3c]">Select Startup</span>
               </div>
               <div className="h-px bg-gray-300 w-24"></div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold">2</div>
                 <span className="text-[13px] font-bold text-gray-500">Payment Method</span>
               </div>
               <div className="h-px bg-gray-300 w-24"></div>
               <div className="flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-sm font-bold">3</div>
                 <span className="text-[13px] font-bold text-gray-500">Completed</span>
               </div>
             </div>

             {/* Main Two Columns */}
             <div className="flex flex-col lg:flex-row gap-8 mb-8 flex-grow">
                
                {/* Left Column - Select Startup Table */}
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-grow flex flex-col">
                   <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                      <h2 className="text-2xl font-bold text-[#0a4d3c]">Select Startup</h2>
                      <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer hover:bg-gray-200 transition">
                         Payment Status: All
                         <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                   </div>
                   <div className="overflow-x-auto">
                      <table className="w-full text-left">
                         <thead className="bg-gray-50 border-b border-gray-100">
                            <tr className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                               <th className="px-6 py-4">STARTUP NAME</th>
                               <th className="px-6 py-4">INDUSTRY</th>
                               <th className="px-6 py-4">AMOUNT</th>
                               <th className="px-6 py-4">STATUS</th>
                               <th className="px-6 py-4">DUE DATE</th>
                               <th className="px-6 py-4"></th>
                            </tr>
                         </thead>
                         <tbody className="divide-y divide-gray-100">
                            {startups.map((s, i) => (
                               <tr key={i} className={`hover:bg-gray-50 transition cursor-pointer ${s.selected ? 'bg-green-50/20' : ''}`}>
                                  <td className="px-6 py-5">
                                     <div className="flex items-center gap-4">
                                        <div className={`w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-[#0a4d3c]`}>
                                           {s.icon === 'tractor' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v3M9 18c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm8 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"></path></svg>}
                                           {s.icon === 'lightning' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                                           {s.icon === 'truck' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>}
                                           {s.icon === 'edu' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path></svg>}
                                        </div>
                                        <span className="text-[13px] font-bold text-gray-900 leading-snug w-[70px] block">
                                           {s.name}
                                        </span>
                                     </div>
                                  </td>
                                  <td className="px-6 py-5 text-[13px] text-gray-500">{s.industry}</td>
                                  <td className="px-6 py-5 text-[13px] font-bold text-[#0a4d3c]">{s.amount}</td>
                                  <td className="px-6 py-5">
                                     <span className={`px-2.5 py-1 ${s.statusColor} text-[11px] font-bold rounded-full`}>{s.status}</span>
                                  </td>
                                  <td className="px-6 py-5 text-[13px] text-gray-500 leading-snug w-[60px]">
                                     {s.date}
                                  </td>
                                  <td className="px-6 py-5 text-right">
                                     <div className={`w-5 h-5 rounded-md border ${s.selected ? 'bg-[#0a4d3c] border-[#0a4d3c] text-white' : 'border-gray-300'} flex items-center justify-center ml-auto shadow-sm`}>
                                        {s.selected && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>}
                                     </div>
                                  </td>
                               </tr>
                            ))}
                         </tbody>
                      </table>
                   </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-6">
                   
                   {/* Summary Card */}
                   <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
                      <h3 className="text-[22px] font-bold text-[#0a4d3c] leading-tight mb-8">Selected Startup<br/>Summary</h3>
                      
                      <div className="flex items-center gap-4 mb-8">
                         <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-gray-100 shadow-sm">
                            <img src="https://images.unsplash.com/photo-1592982537447-6b28ed4102ba?auto=format&fit=crop&q=80&w=200&h=200" alt="GreenFarm" className="w-full h-full object-cover" />
                         </div>
                         <div>
                            <h4 className="text-[15px] font-bold text-gray-900 leading-snug">GreenFarm<br/>Ethiopia</h4>
                            <p className="text-xs text-gray-500 mt-1">Agritech sector</p>
                         </div>
                      </div>

                      <div className="space-y-5 mb-8 text-[13px]">
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">Investment Amount</span>
                            <span className="font-bold text-gray-900">$50,000.00</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">Payment Status</span>
                            <span className="px-2 py-0.5 bg-[#fce5ba] text-[#9a6a16] text-[10px] font-bold rounded uppercase tracking-wider">PENDING</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">Due Date</span>
                            <span className="font-bold text-gray-900">Oct 30, 2023</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-gray-500">Service Fee (2%)</span>
                            <span className="font-bold text-gray-900">$1,000.00</span>
                         </div>
                      </div>

                      <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                         <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 leading-tight">TOTAL AMOUNT<br/>DUE</p>
                         </div>
                         <div className="text-right">
                            <p className="text-[26px] font-bold text-[#0a4d3c] mb-1">$51,000.00</p>
                            <p className="text-[10px] text-gray-400">Includes processing fees</p>
                         </div>
                      </div>
                   </div>

                   {/* Info Card */}
                   <div className="bg-[#f0fcf5] border border-[#d1f4e0] rounded-2xl p-6 shadow-sm flex items-start gap-3">
                      <div className="mt-0.5 shrink-0 text-[#0a4d3c]">
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </div>
                      <p className="text-[11px] text-[#0a4d3c] leading-relaxed font-medium">
                         Payments are processed securely via our local and international bank partners. Transaction confirmation will be sent to your registered email.
                      </p>
                   </div>
                </div>

             </div>
           </div>
        </main>
        
        {/* Bottom Fixed Bar */}
        <div className="bg-white border-t border-gray-200 py-4 px-10 flex justify-between items-center shrink-0 z-20">
           <button className="px-6 py-2.5 bg-white border border-gray-300 text-gray-600 font-bold text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back
           </button>
           <Link href="/investor/payment/method" className="px-8 py-3 bg-[#0a4d3c] text-white font-bold text-sm rounded-xl hover:bg-[#07382b] shadow-md flex items-center gap-2 transition">
              Continue to Payment Method
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           </Link>
        </div>
      </div>

    </div>
  );
}
