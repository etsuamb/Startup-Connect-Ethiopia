"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function PaymentReview() {
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
           <div className="p-10 max-w-[900px] w-full mx-auto flex flex-col min-h-full">
             
             {/* Progress Bar centered */}
             <div className="flex justify-center mb-16">
               <div className="flex items-center">
                 <div className="flex items-center gap-3 pr-8 relative">
                   <div className="w-7 h-7 rounded-full bg-[#d1f4e0] text-[#0a4d3c] flex items-center justify-center shadow-sm">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <span className="text-[13px] font-bold text-[#0a4d3c]">Review</span>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-[#d1f4e0] -mr-4"></div>
                 </div>
                 <div className="flex items-center gap-3 px-8 relative">
                   <div className="w-7 h-7 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center text-xs font-bold shadow-sm">2</div>
                   <span className="text-[13px] font-bold text-gray-900">Authorize</span>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-px bg-gray-200 -mr-4"></div>
                 </div>
                 <div className="flex items-center gap-3 pl-8">
                   <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-400 flex items-center justify-center text-xs font-bold">3</div>
                   <span className="text-[13px] font-bold text-gray-400">Completed</span>
                 </div>
               </div>
             </div>

             {/* Title */}
             <div className="mb-10 text-center">
                <h1 className="text-[32px] font-bold text-[#0a4d3c] tracking-tight mb-2">Review & Authorize</h1>
                <p className="text-gray-500 text-[15px]">Please review the details of your investment before authorizing.</p>
             </div>

             {/* Main Card */}
             <div className="bg-[#f9fafa] border border-gray-200 rounded-[32px] p-10 flex flex-col items-center max-w-[640px] mx-auto w-full">
                
                {/* Inner Data Card */}
                <div className="bg-white rounded-2xl w-full p-8 shadow-sm mb-8 border border-gray-100">
                   <div className="space-y-6 text-[13px]">
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Investment Entity</span>
                         <span className="font-bold text-gray-900">GreenFarm Ethiopia</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Amount to pay</span>
                         <span className="font-bold text-[22px] text-gray-900">$50,000.00</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Payment method</span>
                         <span className="font-bold text-gray-900 flex items-center gap-2">
                            <span className="text-[#a16b17]">
                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                            </span>
                            Telebirr
                         </span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Processing Fee</span>
                         <span className="font-bold text-gray-900">$1,000.00</span>
                      </div>
                      <div className="pt-5 mt-2 border-t border-gray-100 flex justify-between items-center">
                         <span className="text-gray-900 font-bold uppercase tracking-wider text-[11px]">Total Amount Due</span>
                         <span className="font-bold text-[26px] text-[#0a4d3c]">$51,000.00</span>
                      </div>
                   </div>
                </div>

                {/* Info Note */}
                <div className="w-full bg-[#e8fbf0] text-[#0a4d3c] p-5 rounded-2xl text-[12px] leading-relaxed flex items-start gap-4 mb-8">
                   <svg className="w-6 h-6 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                   By proceeding, you agree to the terms and conditions of the StartupConnect investment protocol. You will be asked to authorize the transaction via your selected payment provider in the next step.
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                   <Link href="/investor/payment/method" className="px-8 py-3.5 bg-white border border-gray-300 text-gray-700 font-bold text-[13px] rounded-xl hover:bg-gray-50 flex items-center justify-center gap-2 transition w-full sm:w-auto shadow-sm">
                      Back
                   </Link>
                   <Link href="/investor/payment/completed" className="px-8 py-3.5 bg-[#0a4d3c] text-white font-bold text-[13px] rounded-xl hover:bg-[#07382b] flex items-center justify-center gap-2 transition shadow-sm w-full sm:w-auto">
                      Authorize Payment
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                   </Link>
                </div>
             </div>

           </div>
        </main>
      </div>
    </div>
  );
}
