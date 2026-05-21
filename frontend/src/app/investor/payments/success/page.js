"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function PaymentSuccess() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-white overflow-hidden relative">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-50 w-full z-20 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#0f3d32] tracking-tight">Payment Result</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Review your investment payment status and next steps</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#07261f] border-2 border-white shadow-sm flex items-center justify-center text-white font-bold text-xs uppercase overflow-hidden">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
               </div>
               <p className="text-xs font-black text-gray-900 leading-none">Institutional | abisay</p>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-12 bg-[#f8fafc]/50">
          <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12">
            
            {/* Left Column: Success Message */}
            <div className="flex-grow">
               <div className="bg-white rounded-[40px] p-16 border border-gray-100 shadow-sm text-center flex flex-col items-center">
                  
                  <div className="w-20 h-20 bg-[#eef6f3] text-[#16a34a] rounded-[28px] flex items-center justify-center mb-8 shadow-xl shadow-[#16a34a]/10 border border-[#dcebe6]">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path></svg>
                  </div>

                  <div className="space-y-3 mb-12">
                     <h2 className="text-4xl font-black text-[#0f3d32] tracking-tighter">Payment Successful</h2>
                     <p className="text-gray-500 font-medium max-w-md mx-auto leading-relaxed">Your investment payment has been completed successfully. The startup has been notified and your receipt is ready.</p>
                  </div>

                  {/* Transaction Detail Card */}
                  <div className="w-full max-w-xl bg-gray-50 rounded-3xl p-10 text-left border border-gray-100 space-y-8">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-200 pb-4">Transaction Details</p>
                     
                     <div className="grid grid-cols-2 gap-y-8">
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Startup</p>
                           <p className="text-sm font-black text-[#0f3d32]">Gebeya Inc.</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                           <span className="px-2 py-0.5 bg-[#eef6f3] text-[#16a34a] rounded text-[8px] font-black uppercase tracking-widest border border-[#dcebe6]">Successful</span>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Amount</p>
                           <p className="text-xl font-black text-[#0f3d32] tracking-tight">$1,202,400.00</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                           <p className="text-sm font-black text-gray-700 uppercase tracking-widest">telebirr Business</p>
                        </div>
                        <div>
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Transaction ID</p>
                           <p className="text-xs font-bold text-gray-500">TRX-PR56-AFR-2024</p>
                        </div>
                        <div className="text-right">
                           <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Date</p>
                           <p className="text-xs font-bold text-gray-500">October 24, 2024</p>
                        </div>
                     </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 mt-12 w-full max-w-xl">
                     <button className="flex-grow py-5 bg-[#0f3d32] hover:bg-[#0a2921] text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition shadow-xl shadow-[#0f3d32]/20 flex items-center justify-center gap-3 group">
                        <svg className="w-5 h-5 text-white/50 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                        Download Receipt
                     </button>
                     <Link href="/investor/portfolio" className="flex-grow py-5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl text-[11px] font-black uppercase tracking-widest transition flex items-center justify-center gap-3 group">
                        <svg className="w-5 h-5 text-gray-400 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        View Portfolio
                     </Link>
                  </div>

                  <div className="flex gap-8 mt-10">
                     <Link href="/investor/payments" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0f3d32] transition">Return to Payments</Link>
                     <Link href="/investor/messages" className="text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0f3d32] transition">Message Founder</Link>
                  </div>
               </div>
            </div>

            {/* Right Column: Next Steps & Context */}
            <div className="w-full lg:w-[400px] shrink-0 space-y-10">
               
               {/* Next Steps */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                  <h3 className="text-xl font-black text-[#0f3d32] tracking-tight uppercase border-b border-gray-50 pb-6">Next Steps</h3>
                  <div className="space-y-8">
                     {[
                       { label: 'Update Portfolio', desc: 'Your ownership certificate will be auto-generated.', status: 'completed' },
                       { label: 'Notify Founder', desc: 'An automated confirmation was sent to Gebeya Inc.', status: 'completed' },
                       { label: 'Download Receipt', desc: 'Keep a physical copy for your tax records.', status: 'pending' }
                     ].map((step, i) => (
                       <div key={i} className="flex gap-4">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${step.status === 'completed' ? 'bg-[#16a34a] text-white' : 'border-2 border-gray-100 text-gray-200'}`}>
                             <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <div>
                             <h4 className="text-xs font-black text-gray-800 tracking-tight">{step.label}</h4>
                             <p className="text-[10px] text-gray-400 font-medium leading-relaxed mt-1">{step.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>

               {/* Startup Summary Card */}
               <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group">
                  <div className="h-24 bg-gray-50 relative overflow-hidden">
                     <div className="absolute inset-0 bg-[#0f3d32]/5"></div>
                     <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:scale-110 transition duration-1000">
                        <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"></path></svg>
                     </div>
                     <div className="absolute -bottom-6 left-10 w-12 h-12 bg-white rounded-xl shadow-lg border border-gray-50 flex items-center justify-center text-[#0f3d32] text-xs font-black uppercase">G</div>
                  </div>
                  <div className="p-10 pt-10 space-y-6">
                     <div>
                        <div className="flex items-center justify-between mb-2">
                           <h4 className="text-base font-black text-[#0f3d32] tracking-tight">Gebeya Inc.</h4>
                           <span className="px-2 py-0.5 bg-[#eef6f3] text-[#136150] rounded text-[8px] font-black uppercase tracking-widest border border-[#dcebe6]">Verified</span>
                        </div>
                        <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest leading-none">FinTech, Talent Marketplace</p>
                     </div>
                     <div className="p-5 bg-indigo-50 border border-indigo-100 rounded-2xl flex items-center gap-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Verified Institutional Opportunity</span>
                     </div>
                     <p className="text-xs text-gray-500 font-medium leading-relaxed">Pan-African tech talent marketplace connecting vetted African tech professionals with global companies.</p>
                     <button className="w-full py-4 bg-white border-2 border-gray-100 hover:border-[#0f3d32] hover:text-[#0f3d32] text-gray-400 rounded-2xl text-[10px] font-black uppercase tracking-widest transition">
                        View Company Profile
                     </button>
                  </div>
               </div>

               {/* Support & Help */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-8">
                  <h3 className="text-lg font-black text-[#0f3d32] tracking-tight uppercase">Support & Help</h3>
                  <div className="space-y-6">
                     <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 group transition">
                        <div className="flex items-center gap-4">
                           <div className="text-gray-400 group-hover:text-[#0f3d32] transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></div>
                           <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">Contact Support</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                     </button>
                     <button className="w-full flex items-center justify-between p-5 bg-gray-50 rounded-2xl hover:bg-gray-100 group transition">
                        <div className="flex items-center gap-4">
                           <div className="text-gray-400 group-hover:text-[#0f3d32] transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg></div>
                           <span className="text-[11px] font-black text-gray-600 uppercase tracking-widest">View Payment Policy</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7"></path></svg>
                     </button>
                  </div>
               </div>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
