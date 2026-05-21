"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function PaymentsDashboard() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex h-screen overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-full bg-white overflow-hidden relative">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-6 bg-white border-b border-gray-50 w-full z-20 shrink-0">
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-[#0f3d32] tracking-tight">Payments</h1>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Manage your investment capital, transactions, and tax documents</p>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-72">
              <input type="text" placeholder="Search transactions, startups, or IDs..." className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-none rounded-xl text-xs font-medium outline-none focus:ring-1 focus:ring-gray-100" />
              <svg className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <button className="text-gray-400 hover:text-gray-900"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></button>
            <div className="flex items-center gap-3 pl-6 border-l border-gray-100">
               <div className="text-right">
                  <p className="text-xs font-black text-gray-900 leading-none">Alazar Girma</p>
                  <p className="text-[9px] font-bold text-[#16a34a] uppercase tracking-widest mt-1">Personal Investor</p>
               </div>
               <div className="w-10 h-10 rounded-xl bg-gray-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-700 flex items-center justify-center text-white font-bold text-xs uppercase">AG</div>
               </div>
            </div>
          </div>
        </header>

        {/* Scrollable Body */}
        <div className="flex-grow overflow-y-auto p-12 bg-[#f8fafc]/50">
          <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-12">
            
            {/* Left Content */}
            <div className="flex-grow space-y-12">
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                 {[
                   { label: 'Pending Payments', value: '3', color: 'text-amber-600', bg: 'bg-amber-50', icon: 'clock' },
                   { label: 'Completed', value: '28', color: 'text-[#16a34a]', bg: 'bg-[#eef6f3]', icon: 'check' },
                   { label: 'Failed Payments', value: '1', color: 'text-red-600', bg: 'bg-red-50', icon: 'x' },
                   { label: 'Total Invested', value: '$12.4M', color: 'text-[#0f3d32]', bg: 'bg-gray-100', icon: 'money' }
                 ].map((stat, i) => (
                   <div key={i} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm flex flex-col gap-4">
                      <div className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center shadow-sm`}>
                         <div className="w-5 h-5 bg-current opacity-20 rounded"></div>
                      </div>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{stat.label}</p>
                      <h4 className={`text-2xl font-black ${stat.color} tracking-tight`}>{stat.value}</h4>
                   </div>
                 ))}
              </div>

              {/* Transactions Table Section */}
              <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                 <div className="px-10 py-8 flex justify-between items-center border-b border-gray-50">
                    <div className="flex gap-4">
                       <button className="px-5 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-gray-500 hover:bg-gray-100 transition">Filters</button>
                       <button className="px-5 py-2.5 bg-[#eef6f3] text-[#136150] rounded-xl text-[10px] font-black uppercase tracking-widest">All Time</button>
                       <button className="px-5 py-2.5 text-gray-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-gray-600 transition">Equity</button>
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-[#0f3d32] transition">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                       Export CSV
                    </button>
                 </div>

                 <div className="overflow-x-auto">
                    <table className="w-full text-left">
                       <thead>
                          <tr className="bg-gray-50/50 text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-50">
                             <th className="px-10 py-5">Transaction ID</th>
                             <th className="px-10 py-5">Startup Name</th>
                             <th className="px-10 py-5 text-right">Amount</th>
                             <th className="px-10 py-5 text-center">Status</th>
                             <th className="px-10 py-5 text-right">Date</th>
                       </tr>
                       </thead>
                       <tbody className="divide-y divide-gray-50">
                          {[
                            { id: '#TRX-342910', name: 'Gebeya Inc.', amount: '$250,000', status: 'Completed', date: 'Oct 24, 2024', color: 'bg-[#16a34a]', textColor: 'text-[#16a34a]' },
                            { id: '#TRX-382014', name: 'Chapa Pay', amount: '$480,000', status: 'Pending', date: 'Oct 20, 2024', color: 'bg-amber-500', textColor: 'text-amber-600' },
                            { id: '#TRX-310212', name: 'EthioAgri Hub', amount: '$120,000', status: 'Processing', date: 'Oct 18, 2024', color: 'bg-indigo-500', textColor: 'text-indigo-600' },
                            { id: '#TRX-391010', name: 'Kericho Gold', amount: '$85,000', status: 'Failed', date: 'Oct 10, 2024', color: 'bg-red-500', textColor: 'text-red-600' }
                          ].map((trx, i) => (
                            <tr key={i} className="hover:bg-gray-50 transition group cursor-pointer">
                               <td className="px-10 py-6 text-xs font-bold text-gray-400">{trx.id}</td>
                               <td className="px-10 py-6">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 bg-[#07261f] rounded-lg flex items-center justify-center text-white text-[10px] font-black uppercase shadow-sm">
                                        {trx.name[0]}
                                     </div>
                                     <span className="text-sm font-black text-[#0f3d32]">{trx.name}</span>
                                  </div>
                               </td>
                               <td className="px-10 py-6 text-right text-sm font-black text-gray-800">{trx.amount}</td>
                               <td className="px-10 py-6 text-center">
                                  <span className={`px-3 py-1 rounded-full ${trx.textColor} bg-white border border-gray-100 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-1.5 w-fit mx-auto`}>
                                     <div className={`w-1.5 h-1.5 ${trx.color} rounded-full`}></div>
                                     {trx.status}
                                  </span>
                               </td>
                               <td className="px-10 py-6 text-right text-xs font-bold text-gray-400">{trx.date}</td>
                            </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>
              </div>

            </div>

            {/* Right Column */}
            <div className="w-full lg:w-[380px] shrink-0 space-y-10">
               
               {/* Monthly Summary */}
               <div className="bg-white rounded-[40px] p-10 border border-gray-100 shadow-sm space-y-10">
                  <h3 className="text-lg font-black text-[#0f3d32] tracking-tight uppercase">Monthly Summary</h3>
                  <div className="space-y-6">
                     <div className="flex justify-between items-center">
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Total Paid This Month</p>
                        <p className="text-2xl font-black text-[#0f3d32]">$850,000</p>
                     </div>
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                           <span className="text-gray-400">Capital Deployed</span>
                           <span className="text-[#16a34a]">82%</span>
                        </div>
                        <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                           <div className="h-full bg-[#16a34a] rounded-full" style={{ width: '82%' }}></div>
                        </div>
                     </div>
                     <div className="flex justify-between items-center py-4 border-t border-gray-50">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Transaction Fees</span>
                        <span className="text-xs font-bold text-gray-800">$2,400.00</span>
                     </div>
                  </div>
                  <button className="w-full py-4 bg-gray-50 hover:bg-gray-100 text-[#0f3d32] rounded-2xl text-[10px] font-black uppercase tracking-widest transition">
                     Detailed Analytics
                  </button>
               </div>

               {/* Urgent Alerts */}
               <div className="space-y-4">
                  <div className="p-6 bg-red-50 border border-red-100 rounded-3xl flex gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shrink-0 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xs font-black text-red-700 uppercase tracking-widest">Failed Payment</h4>
                        <p className="text-[11px] text-red-600/70 font-medium leading-relaxed">The transfer for Kericho Gold (Seed B) was rejected by the correspondent bank.</p>
                        <button className="text-[10px] font-black text-red-700 uppercase tracking-widest hover:underline mt-2">Retry Now</button>
                     </div>
                  </div>
                  <div className="p-6 bg-amber-50 border border-amber-100 rounded-3xl flex gap-4">
                     <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shrink-0 shadow-sm">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.952 11.952 0 01-9.618 3.07L3 7c0 5.148 2.214 9.774 5.765 13.041a1.996 1.996 0 002.47 0C14.786 16.774 17 12.148 17 7l-.382-.986z"></path></svg>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-xs font-black text-amber-700 uppercase tracking-widest">Compliance Review</h4>
                        <p className="text-[11px] text-amber-600/70 font-medium leading-relaxed">3 transactions are awaiting final AML clearance from the central bank.</p>
                     </div>
                  </div>
               </div>

               {/* Quick Actions Grid */}
               <div className="bg-[#07261f] rounded-[40px] p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">
                     {[
                       { label: 'Summary', icon: 'grid' },
                       { label: 'Add Funds', icon: 'plus' },
                       { label: 'Invoices', icon: 'file' },
                       { label: 'Tax Forms', icon: 'tax' }
                     ].map((action, i) => (
                       <button key={i} className="flex flex-col items-center justify-center gap-3 p-6 bg-white/5 hover:bg-white/10 rounded-3xl transition border border-white/5 group">
                          <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition transform">
                             <div className="w-4 h-4 bg-current opacity-20 rounded"></div>
                          </div>
                          <span className="text-[9px] font-black text-white/50 uppercase tracking-widest group-hover:text-white transition">{action.label}</span>
                       </button>
                     ))}
                  </div>
               </div>

               {/* Banner */}
               <div className="bg-gradient-to-br from-gray-800 to-black rounded-[40px] p-10 relative overflow-hidden group cursor-pointer border border-white/5 shadow-xl">
                  <div className="relative z-10 space-y-4">
                     <h4 className="text-sm font-black text-white tracking-tight">Invest in the Future</h4>
                     <p className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Q3 INVESTOR REPORT AVAILABLE</p>
                  </div>
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 transform group-hover:scale-125 transition duration-1000">
                     <svg className="w-full h-full text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                  </div>
               </div>

            </div>

          </div>
        </div>

      </main>

    </div>
  );
}
