"use client";
import Link from "next/link";
import Sidebar from "@/components/investor/Sidebar";

export default function FundingRequests() {
  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-100 z-10 shrink-0">
          <div className="relative w-full max-w-[500px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search funding requests..." 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm outline-none focus:border-[#0a4d3c]/30 focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-5">
             <button className="px-5 py-2 bg-[#0a4d3c] text-white text-sm font-bold rounded-lg hover:bg-[#07382b] transition shadow-sm">
                Create Request
             </button>
             <div className="flex items-center gap-3">
               <button className="text-gray-400 hover:text-gray-600 transition relative">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
               </button>
             </div>
             
             <div className="w-px h-6 bg-gray-200"></div>

             <div className="flex items-center gap-3 cursor-pointer">
               <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
                 <img src="https://i.pravatar.cc/150?img=12" alt="Profile" className="w-full h-full object-cover" />
               </div>
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-grow flex flex-col overflow-y-auto bg-[#f8f9fa] relative">
           <div className="p-10 max-w-[1200px] mx-auto flex flex-col w-full flex-grow">
             
             {/* Title & Actions */}
             <div className="flex justify-between items-end mb-8">
               <div>
                  <h1 className="text-3xl font-bold text-gray-900 tracking-tight mb-2">Funding Requests</h1>
                  <p className="text-gray-500 text-[15px]">Review and manage incoming investment proposals from the Ethiopian ecosystem.</p>
               </div>
               <div className="flex items-center gap-3">
                  <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path></svg>
                     Filter
                  </button>
                  <button className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-700 hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
                     <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"></path></svg>
                     Sort
                  </button>
               </div>
             </div>

             {/* List of Requests */}
             <div className="flex flex-col gap-5 mb-12">
                {[
                   { name: 'EcoEnergy Solutions', badge: 'SERIES A', badgeColor: 'bg-green-100 text-green-700', project: 'Solar Grid Expansion', desc: 'Scaling modular solar units to 50 rural communities in the Oromia region, providing electricity to over 10,000 households.', date: 'Oct 12, 2023', status: 'Pending Review', statusColor: 'text-yellow-600', amount: '$250,000', icon: 'leaf' },
                   { name: 'AgroTech Hub', badge: 'SEED', badgeColor: 'bg-orange-100 text-orange-700', project: 'Smart Irrigation Platform', desc: 'IoT-enabled moisture sensors and automated water delivery systems for small-scale teff farmers to increase yield by 30%.', date: 'Oct 14, 2023', status: 'Pending Review', statusColor: 'text-yellow-600', amount: '$120,000', icon: 'tractor' },
                   { name: 'HealthTrack Ethiopia', badge: 'SERIES B', badgeColor: 'bg-green-100 text-green-700', project: 'Telemedicine Network Expansion', desc: 'Integrating 200 new health clinics into our digital platform for remote diagnostic consultation and electronic health records.', date: 'Oct 08, 2023', status: 'Documents Verified', statusColor: 'text-green-600', amount: '$850,000', icon: 'med' },
                   { name: 'LogiEthio', badge: 'SEED+', badgeColor: 'bg-orange-100 text-orange-700', project: 'Last-Mile Delivery Optimization', desc: 'AI-driven routing software to reduce fuel consumption by 25% for urban delivery fleets in Addis Ababa.', date: 'Oct 05, 2023', status: 'Pending Review', statusColor: 'text-yellow-600', amount: '$175,000', icon: 'truck' }
                ].map((req, i) => (
                   <div key={i} className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition">
                      <div className="flex items-start gap-6">
                         <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center shrink-0">
                            {req.icon === 'leaf' && <svg className="w-6 h-6 text-[#0a4d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z"></path></svg>}
                            {req.icon === 'tractor' && <svg className="w-6 h-6 text-[#0a4d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v3M9 18c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zm8 0c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1z"></path></svg>}
                            {req.icon === 'med' && <svg className="w-6 h-6 text-[#0a4d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
                            {req.icon === 'truck' && <svg className="w-6 h-6 text-[#0a4d3c]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>}
                         </div>
                         <div className="flex flex-col">
                            <div className="flex items-center gap-3 mb-1">
                               <h3 className="text-[17px] font-bold text-gray-900">{req.name}</h3>
                               <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${req.badgeColor}`}>{req.badge}</span>
                            </div>
                            <h4 className="text-[13px] font-bold text-[#0a4d3c] mb-2">{req.project}</h4>
                            <p className="text-[13px] text-gray-500 mb-4 max-w-2xl">{req.desc}</p>
                            <div className="flex items-center gap-4 text-[11px] font-semibold">
                               <span className="flex items-center gap-1.5 text-gray-400">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                  Submitted {req.date}
                               </span>
                               <span className={`flex items-center gap-1.5 ${req.statusColor}`}>
                                  {req.status === 'Pending Review' ? (
                                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  ) : (
                                     <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                  )}
                                  {req.status}
                               </span>
                            </div>
                         </div>
                      </div>
                      <div className="flex flex-col items-end shrink-0 pl-6 md:border-l border-gray-100">
                         <p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mb-1">REQUESTED AMOUNT</p>
                         <p className="text-2xl font-bold text-gray-900 mb-6">{req.amount}</p>
                         <div className="flex items-center gap-2">
                            <button className="px-4 py-2 border border-red-200 bg-red-50 text-red-600 text-xs font-bold rounded-lg hover:bg-red-100 transition">Decline</button>
                            <button className="px-4 py-2 border border-gray-200 text-gray-600 text-xs font-bold rounded-lg hover:bg-gray-50 transition">Negotiate</button>
                            <button className="px-4 py-2 bg-[#0a4d3c] text-white text-xs font-bold rounded-lg hover:bg-[#07382b] transition">Accept</button>
                         </div>
                      </div>
                   </div>
                ))}
             </div>

             {/* Bottom Stats */}
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                 <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">ACTIVE PIPELINES</p>
                    <div className="flex justify-between items-end">
                       <p className="text-3xl font-bold text-gray-900">24</p>
                       <p className="text-xs font-bold text-green-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 10l7-7m0 0l7 7m-7-7v18"></path></svg>
                          12%
                       </p>
                    </div>
                 </div>
                 <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">CAPITAL DEPLOYED</p>
                    <div className="flex justify-between items-end">
                       <p className="text-3xl font-bold text-gray-900">$4.2M</p>
                       <p className="text-xs font-bold text-gray-400">YTD</p>
                    </div>
                 </div>
                 <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">AVG. DEAL SIZE</p>
                    <div className="flex justify-between items-end">
                       <p className="text-3xl font-bold text-gray-900">$215k</p>
                       <p className="text-xs font-bold text-gray-400">Global Avg.</p>
                    </div>
                 </div>
                 <div className="bg-white border border-gray-100 p-6 rounded-xl shadow-sm flex flex-col justify-between">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">REVIEW SPEED</p>
                    <div className="flex justify-between items-end">
                       <p className="text-3xl font-bold text-gray-900">4.2d</p>
                       <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                          -0.5d
                       </p>
                    </div>
                 </div>
             </div>

           </div>
           
           {/* Footer */}
           <footer className="mt-auto border-t border-gray-200 py-6 px-10 flex flex-col md:flex-row justify-between items-center text-[11px] text-gray-500 font-medium bg-white shrink-0">
             <div className="flex gap-6 mb-4 md:mb-0">
                <Link href="#" className="hover:text-gray-900 transition">Privacy Policy</Link>
                <Link href="#" className="hover:text-gray-900 transition">Investor Agreement</Link>
                <Link href="#" className="hover:text-gray-900 transition">Help Center</Link>
             </div>
             <div className="flex items-center gap-2 mb-4 md:mb-0">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
                System Status: Fully Operational
             </div>
             <div>
                © 2023 EthioVentures Investor Portal. All Rights Reserved.
             </div>
           </footer>

           {/* FAB */}
           <button className="fixed bottom-10 right-10 w-14 h-14 bg-[#0a4d3c] text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition transform z-50">
             <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
           </button>
        </main>
      </div>

    </div>
  );
}
