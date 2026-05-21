"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function PaymentCompleted() {
  const transactions = [
    { id: 1, name: 'GreenFarm Ethiopia', amount: '$50,000.00', method: 'Telebirr', status: 'Completed', date: 'Oct 28, 2026', icon: 'tractor' },
    { id: 2, name: 'EthioPower Solutions', amount: '$125,000.00', method: 'Bank Transfer', status: 'Completed', date: 'Sep 15, 2026', icon: 'lightning' },
    { id: 3, name: 'Addis Logistics Hub', amount: '$75,000.00', method: 'CBE Birr', status: 'Completed', date: 'Aug 02, 2026', icon: 'truck' },
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
      
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

          <div className="flex items-center gap-5 text-gray-500">
            <button className="hover:text-gray-800 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <button className="hover:text-gray-800 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
            <button className="hover:text-gray-800 transition">
               <div className="w-8 h-8 rounded-full border border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
               </div>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto">
           <div className="p-10 max-w-[900px] w-full mx-auto flex flex-col min-h-full">
             
             {/* Title */}
             <div className="mb-10">
                <h1 className="text-[32px] font-bold text-[#0a4d3c] tracking-tight mb-2">Investment Payments</h1>
                <p className="text-gray-500 text-[15px]">Your investment payment has been completed successfully.</p>
             </div>

             {/* Progress Bar */}
             <div className="flex justify-center mb-12">
               <div className="relative flex items-center w-full max-w-[600px] justify-between">
                 {/* Line behind */}
                 <div className="absolute left-10 right-10 top-3.5 h-[2px] bg-[#0a4d3c] -z-10"></div>
                 
                 <div className="flex flex-col items-center gap-2 bg-white px-2">
                   <div className="w-7 h-7 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center shadow-sm">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <span className="text-[11px] font-bold text-[#0a4d3c]">Review</span>
                 </div>

                 <div className="flex flex-col items-center gap-2 bg-white px-2">
                   <div className="w-7 h-7 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center shadow-sm">
                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                   </div>
                   <span className="text-[11px] font-bold text-[#0a4d3c]">Authorize</span>
                 </div>

                 <div className="flex flex-col items-center gap-2 bg-white px-2">
                   <div className="relative flex items-center justify-center">
                      <div className="absolute w-10 h-10 rounded-full border border-[#0a4d3c]"></div>
                      <div className="w-7 h-7 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center shadow-sm relative z-10">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                   </div>
                   <span className="text-[11px] font-bold text-[#0a4d3c] mt-0.5">Completed</span>
                 </div>
               </div>
             </div>

             {/* Main Card */}
             <div className="bg-[#f9fafa] border border-gray-200 rounded-[32px] p-10 mb-12 flex flex-col items-center max-w-[640px] mx-auto w-full">
                <div className="w-16 h-16 rounded-full bg-[#0a4d3c] text-white flex items-center justify-center mb-6 shadow-md relative">
                   <div className="absolute inset-0 bg-[#0a4d3c] opacity-30 blur-xl rounded-full"></div>
                   <svg className="w-8 h-8 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>
                </div>
                
                <h2 className="text-[22px] font-bold text-gray-900 mb-2 text-center">Payment Completed Successfully</h2>
                <p className="text-[13px] text-gray-500 mb-8 text-center">Your investment payment has been processed and recorded.</p>

                {/* Inner Data Card */}
                <div className="bg-white rounded-2xl w-full p-8 shadow-sm mb-8 border border-gray-100">
                   <div className="space-y-6 text-[13px]">
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Startup name</span>
                         <span className="font-bold text-gray-900">GreenFarm Ethiopia</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Amount paid</span>
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
                         <span className="text-gray-500">Transaction ID</span>
                         <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded">TXN-20458</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Date</span>
                         <span className="text-gray-700">Oct 28, 2026</span>
                      </div>
                      <div className="flex justify-between items-center">
                         <span className="text-gray-500">Status</span>
                         <span className="px-3 py-1 bg-[#e8fbf0] text-[#0a4d3c] text-[11px] font-bold rounded-full flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 bg-[#0a4d3c] rounded-full"></span>
                            Completed
                         </span>
                      </div>
                   </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                   <button className="px-6 py-2.5 bg-[#0a4d3c] text-white font-bold text-[13px] rounded-lg hover:bg-[#07382b] flex items-center justify-center gap-2 transition shadow-sm w-full sm:w-auto">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download Receipt
                   </button>
                   <Link href="/investor/payment" className="px-6 py-2.5 bg-[#f7f9f8] border border-gray-300 text-gray-700 font-bold text-[13px] rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 transition w-full sm:w-auto shadow-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                      Back to Payments
                   </Link>
                </div>
             </div>

             {/* Recent Transactions */}
             <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden mb-12">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
                   <h3 className="text-[17px] font-bold text-gray-900">Recent Transactions</h3>
                   <button className="text-[11px] font-bold text-gray-600 hover:text-[#0a4d3c] flex items-center gap-1.5 transition tracking-wider">
                      View All History
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                   </button>
                </div>
                <div className="overflow-x-auto">
                   <table className="w-full text-left bg-white">
                      <thead className="bg-[#f8f9fa] border-b border-gray-100">
                         <tr className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                            <th className="px-6 py-4">STARTUP NAME</th>
                            <th className="px-6 py-4">AMOUNT</th>
                            <th className="px-6 py-4">METHOD</th>
                            <th className="px-6 py-4">STATUS</th>
                            <th className="px-6 py-4">DATE</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                         {transactions.map((t) => (
                            <tr key={t.id} className="hover:bg-gray-50 transition">
                               <td className="px-6 py-5">
                                  <div className="flex items-center gap-4">
                                     <div className={`w-9 h-9 rounded-lg ${t.icon === 'tractor' ? 'bg-[#e8fbf0] text-[#0a4d3c]' : t.icon === 'lightning' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'} flex items-center justify-center`}>
                                        {t.icon === 'tractor' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v3M9 18c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm8 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"></path></svg>}
                                        {t.icon === 'lightning' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>}
                                        {t.icon === 'truck' && <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>}
                                     </div>
                                     <span className="text-[13px] font-bold text-gray-900">{t.name}</span>
                                  </div>
                               </td>
                               <td className="px-6 py-5 text-[13px] font-bold text-gray-900">{t.amount}</td>
                               <td className="px-6 py-5 text-[13px] text-gray-500">{t.method}</td>
                               <td className="px-6 py-5">
                                  <span className="px-3 py-1 bg-[#e8fbf0] text-[#0a4d3c] text-[10px] font-bold rounded-full">{t.status}</span>
                               </td>
                               <td className="px-6 py-5 text-[13px] text-gray-500">{t.date}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
             </div>

           </div>
        </main>

      </div>
    </div>
  );
}
