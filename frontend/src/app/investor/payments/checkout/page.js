"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function InvestmentCheckout() {
  const [method, setMethod] = useState("telebirr");

  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-white overflow-hidden relative">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-50 w-full z-20 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#0f3d32] tracking-tight">Complete Investment Payment</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Finalize your investment securely using an available payment method</p>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-xs font-black text-gray-400 uppercase tracking-widest hover:text-gray-900 transition mr-4">Support</button>
            <button className="text-gray-400 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-black text-gray-900 leading-none">Institutional | abisay</p>
               </div>
               <div className="w-10 h-10 rounded-full bg-[#07261f] border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs uppercase overflow-hidden">
                  A
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-12 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-10">
            
            {/* Left Column */}
            <div className="flex-grow space-y-10">
               
               {/* Startup Info Card */}
               <div className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex items-center gap-6">
                     <div className="w-16 h-16 bg-[#eef6f3] rounded-2xl flex items-center justify-center text-[#136150] shrink-0 border border-[#dcebe6]">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                           <h2 className="text-2xl font-black text-[#0f3d32] tracking-tight">Gebeya Inc.</h2>
                           <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">#SERIESA</span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Series A • Agri Tech • Addis Ababa, ET</p>
                     </div>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">TOTAL CHARGE</p>
                     <p className="text-4xl font-black text-[#0f3d32] tracking-tighter">$1,200,000</p>
                  </div>
               </div>

               {/* Metrics Snapshot */}
               <div className="grid grid-cols-3 gap-6">
                  {[
                    { label: 'Equity Offered', value: '5.0%' },
                    { label: 'Valuation (Post)', value: '$24.0M' },
                    { label: 'Instrument', value: 'SAFE' }
                  ].map((m, i) => (
                    <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col gap-1">
                       <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{m.label}</p>
                       <p className="text-lg font-black text-gray-800">{m.value}</p>
                    </div>
                  ))}
               </div>

               {/* Payment Method Selector */}
               <div className="space-y-6">
                  <div className="flex items-center gap-3">
                     <svg className="w-5 h-5 text-[#0f3d32]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                     <h3 className="text-lg font-black text-[#0f3d32] tracking-tight">Select Payment Method</h3>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                     {[
                       { id: 'telebirr', name: 'telebirr', icon: 'smartphone' },
                       { id: 'cbe', name: 'CBE Birr', icon: 'bank' },
                       { id: 'mpesa', name: 'M-PESA', icon: 'mobile' },
                       { id: 'transfer', name: 'Bank Transfer', icon: 'building' }
                     ].map((item) => (
                       <button 
                         key={item.id} 
                         onClick={() => setMethod(item.id)}
                         className={`p-6 rounded-2xl border flex flex-col items-center gap-4 transition group ${method === item.id ? 'border-[#0f3d32] bg-[#eef6f3]/30 shadow-md ring-2 ring-[#0f3d32]/10' : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'}`}
                       >
                          <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${method === item.id ? 'bg-[#0f3d32] text-white shadow-lg' : 'bg-gray-50 text-gray-400 group-hover:text-gray-600'}`}>
                             <div className="w-6 h-6 bg-current opacity-20 rounded"></div>
                          </div>
                          <span className={`text-[11px] font-black uppercase tracking-widest ${method === item.id ? 'text-[#0f3d32]' : 'text-gray-400 group-hover:text-gray-600'}`}>{item.name}</span>
                       </button>
                     ))}
                  </div>

                  {/* Method Content (Telebirr) */}
                  <div className="bg-white rounded-[32px] p-12 border border-gray-100 shadow-sm text-center space-y-10">
                     <div className="space-y-4 max-w-md mx-auto">
                        <h4 className="text-2xl font-black text-[#0f3d32] tracking-tight">Pay with {method}</h4>
                        <p className="text-sm text-gray-500 font-medium leading-relaxed">Enter your {method} registered phone number to receive a payment prompt.</p>
                     </div>

                     <div className="max-w-md mx-auto space-y-8">
                        <div className="space-y-2 text-left">
                           <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Phone Number</label>
                           <div className="relative group">
                              <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">+251</div>
                              <input 
                                type="text" 
                                placeholder="911 234 567" 
                                className="w-full pl-20 pr-6 py-5 bg-[#f8fafc] border border-gray-100 rounded-[28px] text-lg font-black text-gray-800 outline-none focus:ring-2 focus:ring-[#0f3d32]/10 transition shadow-inner" 
                              />
                           </div>
                        </div>

                        <Link 
                          href="/investor/payments/success" 
                          className="w-full py-5 bg-[#0f3d32] hover:bg-[#0a2921] text-white rounded-[28px] text-sm font-black uppercase tracking-widest transition shadow-xl shadow-[#0f3d32]/20 flex items-center justify-center gap-3 group"
                        >
                           <svg className="w-5 h-5 text-white/50 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                           Proceed to Payment
                        </Link>
                        
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center justify-center gap-2">
                           <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1-3.5h-2V7h2v6z"/></svg>
                           Processing BY ETB-ALLIANZ GATEWAY
                        </p>
                     </div>
                  </div>
               </div>

            </div>

            {/* Right Column: Payment Summary */}
            <div className="w-full lg:w-[400px] shrink-0 space-y-8">
               
               {/* Status Card */}
               <div className="bg-[#eef6f3] rounded-3xl p-6 border border-[#dcebe6] flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#16a34a] text-white rounded-xl flex items-center justify-center shadow-lg">
                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                  </div>
                  <div>
                     <p className="text-[9px] font-black text-[#136150] uppercase tracking-widest">STATUS</p>
                     <p className="text-sm font-black text-[#0f3d32]">Ready to Pay</p>
                  </div>
               </div>

               {/* Payment Summary */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                  <h3 className="text-xl font-black text-[#0f3d32] tracking-tight uppercase border-b border-gray-50 pb-6">Payment Summary</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                        <span>Principal Investment</span>
                        <span className="text-gray-900">$1,200,000.00</span>
                     </div>
                     <div className="flex justify-between items-center text-xs font-bold text-gray-500">
                        <span>Platform Transaction Fee (0.2%)</span>
                        <span className="text-gray-900">$2,400.00</span>
                     </div>
                     <div className="flex justify-between items-center text-[10px] font-black text-[#16a34a] uppercase tracking-widest">
                        <span>Escrow Management</span>
                        <span>FREE</span>
                     </div>
                     <div className="pt-6 border-t border-gray-100 flex justify-between items-center">
                        <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">TOTAL PAYABLE</span>
                        <span className="text-2xl font-black text-[#0f3d32] tracking-tighter">$1,202,400.00</span>
                     </div>
                  </div>
               </div>

               {/* Security & Trust */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-8">
                  <div className="flex items-center gap-3 text-[10px] font-black text-[#16a34a] uppercase tracking-widest">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                     Security & Trust
                  </div>
                  <div className="space-y-6">
                     <div className="flex gap-4">
                        <div className="w-5 h-5 text-gray-300 shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 3.07L3 7c0 5.148 2.214 9.774 5.765 13.041a1.996 1.996 0 002.47 0C14.786 16.774 17 12.148 17 7l-.382-.986z"></path></svg></div>
                        <div>
                           <h4 className="text-xs font-black text-gray-800 tracking-tight">End-to-End Encryption</h4>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-1">Your payment information is never stored on our servers.</p>
                        </div>
                     </div>
                     <div className="flex gap-4">
                        <div className="w-5 h-5 text-gray-300 shrink-0"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg></div>
                        <div>
                           <h4 className="text-xs font-black text-gray-800 tracking-tight">Escrow Protection</h4>
                           <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-1">Funds are held in neutral bank escrow until clarity.</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Quick Help */}
               <div className="bg-gray-50 rounded-[40px] p-8 border border-gray-100 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-gray-400 border border-gray-100"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                     <h4 className="text-xs font-black text-gray-700 tracking-tight">Quick Help</h4>
                  </div>
                  <p className="text-[10px] text-gray-400 font-medium leading-relaxed">Payments over $100k require two-factor authentication via your primary institution.</p>
                  <button className="text-[10px] font-black text-[#0f3d32] uppercase tracking-widest hover:underline text-left">Read Payment Policy</button>
               </div>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
