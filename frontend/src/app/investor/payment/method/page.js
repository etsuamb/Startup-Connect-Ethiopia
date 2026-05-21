"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function PaymentMethod() {
  const [selectedMethod, setSelectedMethod] = useState('telebirr');

  const methods = [
    { id: 'telebirr', name: 'Telebirr', desc: 'Fast & Secure Mobile Pay', icon: 'wallet' },
    { id: 'cbe', name: 'CBE Birr', desc: 'Commercial Bank of Ethiopia', icon: 'bank' },
    { id: 'mpesa', name: 'M-Pesa', desc: 'Safaricom Mobile Money', icon: 'phone' },
    { id: 'bank', name: 'Bank Transfer', desc: 'SWIFT / International Transfer', icon: 'transfer' },
  ];

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="relative w-full max-w-[400px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search startup..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-6 text-gray-500">
            <button className="hover:text-gray-800 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="hover:text-gray-800 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <div className="w-px h-6 bg-gray-200"></div>
            <div className="flex items-center gap-3">
               <img src="https://i.pravatar.cc/150?img=11" alt="Abebe Kebede" className="w-9 h-9 rounded-full object-cover border border-gray-200" />
               <div className="flex flex-col">
                  <span className="text-[13px] font-bold text-gray-900 leading-tight">Abebe Kebede</span>
                  <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">LEAD INVESTOR</span>
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto bg-white">
           <div className="p-10 max-w-[1200px] w-full mx-auto flex flex-col min-h-full">
             
             {/* Progress Bar centered */}
             <div className="flex justify-center mb-16">
               <div className="flex items-center">
                 <div className="flex items-center gap-3 pr-8 relative">
                   <div className="w-7 h-7 rounded-full bg-[#d1f4e0] text-[#0a4d3c] flex items-center justify-center shadow-sm">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <span className="text-[13px] font-bold text-[#0a4d3c]">1. Select Startup</span>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-[#d1f4e0] -mr-4"></div>
                 </div>
                 <div className="flex items-center gap-3 px-8 relative">
                   <div className="w-7 h-7 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center text-xs font-bold shadow-sm">2</div>
                   <span className="text-[13px] font-bold text-gray-900">2. Payment Method</span>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-gray-200 -mr-4"></div>
                 </div>
                 <div className="flex items-center gap-3 pl-8">
                   <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">3</div>
                   <span className="text-[13px] font-bold text-gray-400">3. Completed</span>
                 </div>
               </div>
             </div>

             {/* Title */}
             <div className="mb-12">
                <h1 className="text-[32px] font-bold text-[#0a3a2e] tracking-tight mb-2">Investment Payments</h1>
                <p className="text-gray-500 text-[15px]">Choose a payment method to complete your investment.</p>
             </div>

             {/* Main Two Columns */}
             <div className="flex flex-col lg:flex-row gap-10 flex-grow">
                
                {/* Left Column */}
                <div className="bg-white border border-gray-100 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.02)] p-10 flex-grow">
                   <h2 className="text-[22px] font-bold text-gray-900 mb-8">Choose Payment Method</h2>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {methods.map((method) => (
                         <div 
                           key={method.id} 
                           onClick={() => setSelectedMethod(method.id)}
                           className={`p-6 rounded-2xl border-2 transition cursor-pointer flex items-center justify-between ${
                             selectedMethod === method.id 
                             ? 'border-[#0a4d3c] bg-[#f0fcf5]/50' 
                             : 'border-gray-100 hover:border-gray-200 bg-white'
                           }`}
                         >
                            <div className="flex items-center gap-5">
                               <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                                 selectedMethod === method.id ? 'bg-[#0a4d3c] text-white shadow-md' : 'bg-gray-50 text-gray-400'
                               }`}>
                                  {method.icon === 'wallet' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>}
                                  {method.icon === 'bank' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"></path></svg>}
                                  {method.icon === 'phone' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>}
                                  {method.icon === 'transfer' && <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>}
                               </div>
                               <div>
                                  <h3 className={`text-[15px] font-bold mb-0.5 ${selectedMethod === method.id ? 'text-[#0a4d3c]' : 'text-gray-700'}`}>{method.name}</h3>
                                  <p className="text-[11px] text-gray-400 font-medium">{method.desc}</p>
                               </div>
                            </div>
                            <div className={`w-[22px] h-[22px] rounded-full border-2 flex items-center justify-center shrink-0 ${
                              selectedMethod === method.id ? 'border-[#0a4d3c]' : 'border-gray-200'
                            }`}>
                               {selectedMethod === method.id && <div className="w-[10px] h-[10px] rounded-full bg-[#0a4d3c]"></div>}
                            </div>
                         </div>
                      ))}
                   </div>
                </div>

                {/* Right Column */}
                <div className="w-full lg:w-[380px] shrink-0">
                   <div className="bg-[#0a3a2e] rounded-3xl p-8 shadow-xl text-white relative overflow-hidden">
                      {/* Subtle background glow */}
                      <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-5 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none"></div>
                      
                      <h3 className="text-[22px] font-bold mb-10 relative z-10 text-white/90 tracking-wide">Payment Summary</h3>
                      
                      <div className="mb-10 relative z-10">
                         <p className="text-[9px] font-bold text-[#4ade80] uppercase tracking-widest mb-3">INVESTMENT ENTITY</p>
                         <div className="flex items-center gap-4 bg-[#0d4738] rounded-2xl p-4 shadow-inner">
                            <div className="w-11 h-11 bg-[#105641] rounded-xl flex items-center justify-center text-[#4ade80] shadow-sm">
                               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>
                            </div>
                            <span className="font-bold text-[17px] tracking-tight">GreenFarm Ethiopia</span>
                         </div>
                      </div>

                      <div className="space-y-6 mb-10 text-sm relative z-10">
                         <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Amount</span>
                            <span className="font-bold text-[19px] tracking-tight">$50,000.00</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Method</span>
                            <span className="font-semibold text-[15px]">{methods.find(m => m.id === selectedMethod)?.name}</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Status</span>
                            <span className="px-3 py-1 bg-[#0d4738] border border-white/10 text-white/90 text-[9px] font-bold rounded-md uppercase tracking-widest">READY TO PAY</span>
                         </div>
                         <div className="flex justify-between items-center">
                            <span className="text-white/60 font-medium">Date</span>
                            <span className="font-semibold text-[15px]">Oct 30, 2023</span>
                         </div>
                      </div>

                      <div className="bg-[#0d4738] rounded-2xl p-5 relative z-10 border border-white/5 shadow-inner">
                         <p className="text-[11px] text-white/70 leading-relaxed font-medium">
                            "Your investment helps scale sustainable agricultural practices across the Oromia region."
                         </p>
                      </div>
                   </div>
                </div>
             </div>

           </div>
        </main>

        {/* Bottom Fixed Bar */}
        <div className="bg-white border-t border-gray-100 py-5 px-12 flex justify-between items-center shrink-0 z-20">
           <Link href="/investor/payment" className="px-6 py-2.5 bg-white border border-gray-200 text-gray-600 font-bold text-[13px] rounded-xl hover:bg-gray-50 flex items-center gap-2 transition shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
              Back
           </Link>
           <Link href="/investor/payment/review" className="px-8 py-3 bg-[#0a3a2e] text-white font-bold text-[13px] rounded-xl hover:bg-[#072a21] shadow-lg shadow-[#0a3a2e]/20 flex items-center gap-2 transition">
              Continue to Review
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
           </Link>
        </div>

      </div>

    </div>
  );
}
