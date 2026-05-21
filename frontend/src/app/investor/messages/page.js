"use client";
import Link from "next/link";
import { useState } from "react";
import Sidebar from "@/components/investor/Sidebar";

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(1);

  const inbox = [
    { 
      id: 1, 
      name: 'GreenFarm Ethiopia', 
      time: '2m ago', 
      snippet: "We've updated the Q3 projections as requested.", 
      avatar: 'https://images.unsplash.com/photo-1592982537447-6b28ed4102ba?auto=format&fit=crop&q=80&w=150&h=150',
      unread: true
    },
    { 
      id: 2, 
      name: 'SolarTrack Addis', 
      time: '10:30 AM', 
      snippet: 'Can we confirm the meeting for tomorrow?', 
      avatar: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e9e9?auto=format&fit=crop&q=80&w=150&h=150',
      unread: false
    },
    { 
      id: 3, 
      name: 'Habesha Logistics', 
      time: 'Yesterday', 
      snippet: 'The fleet expansion document is attached below.', 
      avatar: 'https://images.unsplash.com/photo-1586528116311-ad8ed7c862bc?auto=format&fit=crop&q=80&w=150&h=150',
      unread: false
    },
    { 
      id: 4, 
      name: 'EthioTech Solutions', 
      time: 'Mon', 
      snippet: 'Thank you for the feedback on our MVP.', 
      initials: 'ET',
      color: 'bg-[#fce5ba] text-[#9a6a16]',
      unread: false
    }
  ];

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
      
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        
        {/* Global Header */}
        <header className="flex justify-between items-center px-8 py-4 bg-white border-b border-gray-200 z-10 shrink-0 h-[72px]">
          <div className="relative w-full max-w-[480px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
            <input 
              type="text" 
              placeholder="Search investor portal..." 
              className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] outline-none focus:border-[#0a4d3c]/30 focus:bg-white focus:ring-2 focus:ring-[#0a4d3c]/10 transition" 
            />
          </div>

          <div className="flex items-center gap-5 text-gray-500">
            <button className="hover:text-gray-800 transition relative">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
            </button>
            <button className="hover:text-gray-800 transition">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </button>
          </div>
        </header>

        {/* Messages Split View */}
        <div className="flex flex-grow overflow-hidden">
           
           {/* Inbox List (Left Column) */}
           <div className="w-[340px] shrink-0 border-r border-gray-200 flex flex-col bg-white">
              <div className="p-4 border-b border-gray-100">
                 <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                       <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input 
                       type="text" 
                       placeholder="Search conversations..." 
                       className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-transparent rounded-xl text-[13px] outline-none focus:bg-gray-100 transition" 
                    />
                 </div>
              </div>

              <div className="flex-grow overflow-y-auto">
                 {inbox.map((chat) => (
                    <div 
                      key={chat.id} 
                      onClick={() => setActiveChat(chat.id)}
                      className={`p-4 border-b border-gray-50 cursor-pointer flex gap-4 transition relative ${
                         activeChat === chat.id ? 'bg-[#e8fbf0]' : 'hover:bg-gray-50'
                      }`}
                    >
                       {activeChat === chat.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0a4d3c]"></div>}
                       
                       <div className="relative shrink-0">
                          {chat.avatar ? (
                             <img src={chat.avatar} alt={chat.name} className="w-12 h-12 rounded-full object-cover border border-gray-200" />
                          ) : (
                             <div className={`w-12 h-12 rounded-full flex items-center justify-center text-[13px] font-bold ${chat.color}`}>
                                {chat.initials}
                             </div>
                          )}
                       </div>
                       
                       <div className="flex-grow min-w-0 pr-1">
                          <div className="flex justify-between items-baseline mb-1">
                             <h4 className={`text-[15px] truncate ${activeChat === chat.id ? 'font-bold text-gray-900' : 'font-semibold text-gray-800'}`}>
                                {chat.name}
                             </h4>
                             <span className={`text-[10px] shrink-0 font-bold ${activeChat === chat.id || chat.unread ? 'text-[#0a4d3c]' : 'text-gray-400'}`}>
                                {chat.time}
                             </span>
                          </div>
                          <p className={`text-[13px] truncate ${activeChat === chat.id ? 'text-[#0a4d3c] font-medium' : 'text-gray-500'}`}>
                             {chat.snippet}
                          </p>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Chat View (Right Column) */}
           <div className="flex-grow flex flex-col bg-white overflow-hidden relative">
              
              {/* Chat Header */}
              <div className="h-[76px] px-8 border-b border-gray-200 flex justify-between items-center shrink-0">
                 <div className="flex items-center gap-4">
                    <img src={inbox[0].avatar} alt="GreenFarm Ethiopia" className="w-11 h-11 rounded-full object-cover border border-gray-200" />
                    <div>
                       <h2 className="text-lg font-bold text-gray-900 leading-tight">GreenFarm Ethiopia</h2>
                       <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0a4d3c]">
                          <span className="w-2 h-2 rounded-full bg-[#0a4d3c]"></span>
                          Online
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition shadow-sm">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                       Send Offer
                    </button>
                    <button className="px-5 py-2 bg-white border border-gray-300 rounded-lg text-[13px] font-bold text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition shadow-sm">
                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                       Schedule Meeting
                    </button>
                 </div>
              </div>

              {/* Chat History */}
              <div className="flex-grow overflow-y-auto p-8 flex flex-col">
                 <div className="flex justify-center mb-8">
                    <span className="px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold tracking-widest uppercase rounded-full">Today</span>
                 </div>

                 {/* Message 1: Incoming */}
                 <div className="flex items-end gap-3 mb-6 max-w-[80%]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="bg-[#f0f2f5] px-5 py-4 rounded-2xl rounded-bl-sm relative group">
                       <p className="text-[14px] text-gray-800 leading-relaxed mb-3">
                          Hello Dawit, hope you're having a productive morning. I've just uploaded the updated Q3 projections that we discussed during the last call.
                       </p>
                       <div className="text-[10px] text-gray-400 font-medium text-right">10:42 AM</div>
                    </div>
                 </div>

                 {/* Message 2: Outgoing */}
                 <div className="flex flex-col items-end mb-6 w-full">
                    <div className="flex items-end gap-3 max-w-[80%] justify-end">
                       <div className="bg-[#0a4d3c] px-5 py-4 rounded-2xl rounded-br-sm relative shadow-md">
                          <p className="text-[14px] text-white leading-relaxed mb-3">
                             Received, thank you. I'll take a look at these over lunch. Did you manage to include the breakdown for the regional expansion costs?
                          </p>
                          <div className="text-[10px] text-[#86e2b6] font-medium text-right">10:45 AM</div>
                       </div>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-1 mr-1">Read</span>
                 </div>

                 {/* Message 3: Incoming */}
                 <div className="flex items-end gap-3 mb-6 max-w-[80%]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="bg-[#f0f2f5] px-5 py-4 rounded-2xl rounded-bl-sm relative group">
                       <p className="text-[14px] text-gray-800 leading-relaxed mb-3">
                          Yes, it's on page 4 of the PDF. We've optimized the logistics part to reduce initial overhead by 12%.
                       </p>
                       <div className="text-[10px] text-gray-400 font-medium text-right">10:48 AM</div>
                    </div>
                 </div>

                 {/* Message 4: Incoming Attachment */}
                 <div className="flex items-end gap-3 mb-6 max-w-[80%]">
                    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=150&h=150" alt="Avatar" className="w-8 h-8 rounded-full object-cover shrink-0" />
                    <div className="bg-[#f0f2f5] p-3 rounded-2xl rounded-bl-sm w-[340px]">
                       
                       <div className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-4 mb-2 cursor-pointer hover:shadow-sm transition">
                          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-6 4h6m-6-8h.01"></path></svg>
                          </div>
                          <div className="flex-grow min-w-0">
                             <h5 className="text-[13px] font-bold text-gray-900 truncate mb-0.5">Q3_Projections_v2.pdf</h5>
                             <p className="text-[11px] text-gray-400">2.4 MB</p>
                          </div>
                          <div className="shrink-0 text-gray-400 hover:text-gray-700">
                             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                          </div>
                       </div>
                       
                       <div className="text-[10px] text-gray-400 font-medium text-right pr-2">10:48 AM</div>
                    </div>
                 </div>

              </div>

              {/* Message Input Area */}
              <div className="p-6 bg-white border-t border-gray-200 shrink-0 flex items-center gap-4">
                 <button className="text-gray-400 hover:text-gray-600 transition shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                 </button>
                 <button className="text-gray-400 hover:text-gray-600 transition shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                 </button>
                 
                 <div className="flex-grow">
                    <input 
                       type="text" 
                       placeholder="Type your message here..." 
                       className="w-full px-5 py-3.5 bg-white border border-gray-300 rounded-xl text-[14px] outline-none focus:border-[#0a4d3c]/50 focus:ring-4 focus:ring-[#0a4d3c]/10 transition shadow-sm"
                    />
                 </div>

                 <button className="px-6 py-3.5 bg-[#0a3a2e] text-white font-bold text-[14px] rounded-xl hover:bg-[#072a21] shadow-md flex items-center justify-center gap-2 transition shrink-0">
                    Send
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                 </button>
              </div>

           </div>
        </div>
      </div>
    </div>
  );
}
