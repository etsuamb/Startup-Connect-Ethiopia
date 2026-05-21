"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function Offers() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-[#f8f9fa]">
        
        {/* Header */}
        <header className="flex justify-between items-center px-10 py-5 bg-[#f8f9fa] z-10 shrink-0">
          <div className="text-lg font-bold text-[#0a4d3c]">
            Investor Portal
          </div>

          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-gray-800 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border border-[#f8f9fa]"></span>
            </button>
            <button className="hover:text-gray-800 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto">
           <div className="p-8 max-w-[1100px] w-full mx-auto">
             
             {/* Title */}
             <div className="mb-8">
                <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2">Investment Offers</h1>
                <p className="text-gray-500 text-[15px]">Manage and track your submitted investment proposals.</p>
             </div>

             {/* Filters & Search */}
             <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex p-1 bg-white border border-gray-200 rounded-lg shadow-sm">
                   <button className="px-5 py-1.5 bg-[#0a4d3c] text-white text-xs font-bold rounded-md shadow-sm">Pending</button>
                   <button className="px-5 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-bold rounded-md transition">Accepted</button>
                   <button className="px-5 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-bold rounded-md transition">Negotiating</button>
                   <button className="px-5 py-1.5 text-gray-500 hover:text-gray-900 text-xs font-bold rounded-md transition">Cancelled</button>
                </div>
                <div className="relative w-full md:w-64">
                   <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                   </div>
                   <input type="text" placeholder="Filter startups..." className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition shadow-sm" />
                </div>
             </div>

             {/* Table */}
             <div className="bg-white border border-gray-200 rounded-xl shadow-sm mb-8 overflow-hidden">
                <table className="w-full text-left border-collapse">
                   <thead>
                      <tr className="border-b border-gray-200 text-[11px] font-bold text-gray-500 tracking-wider">
                         <th className="px-6 py-4">Startup Name</th>
                         <th className="px-6 py-4">Investment Amount</th>
                         <th className="px-6 py-4">Date Sent</th>
                         <th className="px-6 py-4">Status</th>
                         <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                      {[
                         { id: 1, name: 'GreenFarm Ethiopia', type: 'Agritech • Series A', avatar: 'GF', color: 'bg-green-100 text-green-700', amount: '$450,000', date: 'Oct 24, 2023', status: 'Pending' },
                         { id: 2, name: 'Gebeya Pay', type: 'Fintech • Seed', avatar: 'GP', color: 'bg-blue-100 text-blue-700', amount: '$250,000', date: 'Oct 20, 2023', status: 'Pending' },
                         { id: 3, name: 'AgroTech Hub', type: 'Marketplace • Seed+', avatar: 'AH', color: 'bg-orange-100 text-orange-700', amount: '$120,000', date: 'Oct 15, 2023', status: 'Pending' },
                      ].map((offer) => (
                         <tr key={offer.id} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                               <div className="flex items-center gap-4">
                                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-[13px] font-bold ${offer.color}`}>
                                     {offer.avatar}
                                  </div>
                                  <div>
                                     <p className="text-sm font-bold text-gray-900">{offer.name}</p>
                                     <p className="text-xs text-gray-500">{offer.type}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{offer.amount}</td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-600">{offer.date}</td>
                            <td className="px-6 py-4">
                               <span className="px-3 py-1 bg-[#fdeec8] text-[#9a6a16] text-[11px] font-bold rounded-full">{offer.status}</span>
                            </td>
                            <td className="px-6 py-4 text-right">
                               <button className="px-4 py-2 border border-red-200 text-red-600 bg-white text-xs font-bold rounded-lg hover:bg-red-50 transition shadow-sm">
                                  Cancel Offer
                               </button>
                            </td>
                         </tr>
                      ))}
                   </tbody>
                </table>
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center bg-white">
                   <p className="text-sm text-gray-500 font-medium">Showing 3 of 12 pending offers</p>
                   <div className="flex items-center gap-2">
                      <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-400 flex items-center justify-center hover:bg-gray-50 transition">
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                      </button>
                      <button className="w-7 h-7 rounded-lg border border-gray-200 bg-white text-gray-600 flex items-center justify-center hover:bg-gray-50 transition shadow-sm">
                         <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                      </button>
                   </div>
                </div>
             </div>

             {/* Bottom Cards */}
             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Pipeline Health */}
                <div className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm lg:col-span-2">
                   <h3 className="text-[17px] font-bold text-gray-900 mb-8 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-[#d1f4e0] flex items-center justify-center text-[#0a4d3c]">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                      </div>
                      Pipeline Health
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">TOTAL COMMITTED</p>
                         <p className="text-3xl font-bold text-gray-900 mb-3">$820,000</p>
                         <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div className="w-[60%] h-full bg-[#0a4d3c] rounded-full"></div>
                         </div>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">CONVERSION RATE</p>
                         <p className="text-3xl font-bold text-gray-900 mb-2">12.4%</p>
                         <p className="text-xs font-bold text-[#8a5d12] flex items-center gap-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                            +2.1%
                         </p>
                      </div>
                      <div>
                         <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">AVERAGE DEAL SIZE</p>
                         <p className="text-3xl font-bold text-gray-900 mb-2">$273k</p>
                         <p className="text-[11px] font-medium text-gray-500">per investment</p>
                      </div>
                   </div>
                </div>

                {/* New Proposal CTA */}
                <div className="bg-[#0a3a2e] rounded-xl p-8 shadow-md flex flex-col justify-center text-white relative overflow-hidden lg:col-span-1">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-5 rounded-full -mr-10 -mt-10"></div>
                   <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full -ml-8 -mb-8"></div>
                   <div className="relative z-10">
                      <h3 className="text-[22px] font-bold mb-3 tracking-tight">New Proposal?</h3>
                      <p className="text-green-50 text-[13px] opacity-80 leading-relaxed mb-8">
                         Instantly generate a new investment termsheet for a high-potential startup.
                      </p>
                      <Link href="/investor/offers/new" className="w-full py-3.5 bg-white text-[#0a3a2e] text-sm font-bold rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                         Create New Offer
                      </Link>
                   </div>
                </div>
             </div>

           </div>
        </main>
      </div>

    </div>
  );
}
