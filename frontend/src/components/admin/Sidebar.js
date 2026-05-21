"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearSession } from "@/lib/authStorage";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout(e) {
    e.preventDefault();
    clearSession();
    router.push("/login");
  }

  const primaryLinks = [
    { 
      name: "Dashboard", 
      href: "/admin/dashboard", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path> 
    },
    { 
      name: "Users", 
      href: "/admin/users", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path> 
    },
    { 
      name: "Directory", 
      href: "/admin/startups", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path> 
    },
    { 
      name: "Reports", 
      href: "/admin/reports", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path> 
    },
    { 
      name: "Settings", 
      href: "/admin/settings", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path> 
    }
  ];

  const bottomLinks = [
    { 
      name: "Support", 
      href: "/admin/support", 
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path> 
    },
    { 
      name: "Log Out", 
      href: "/login",
      onClick: handleLogout,
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path> 
    }
  ];

  return (
    <aside className="hidden md:flex flex-col w-[260px] bg-[#061e16] border-r border-[#0f3d32] shrink-0 sticky top-0 h-screen overflow-y-auto relative">
      {/* Abstract Green Light Beams / Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[#061e16]"></div>
        <div className="absolute top-[-10%] left-[10%] w-[150%] h-[30px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
        <div className="absolute top-[10%] left-[10%] w-[150%] h-[40px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
        <div className="absolute top-[30%] left-[0%] w-[150%] h-[20px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
        <div className="absolute top-[50%] left-[-10%] w-[150%] h-[60px] bg-[#008f64] opacity-20 transform -rotate-[55deg] blur-[4px]"></div>
        <div className="absolute top-[70%] left-[-20%] w-[150%] h-[25px] bg-[#008f64] opacity-40 transform -rotate-[55deg] blur-[2px]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#061e16]/60 via-transparent to-[#061e16]/90"></div>
      </div>

      {/* Logo */}
      <div className="p-6 pb-2 relative z-10">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex flex-col">
             <span className="font-bold text-white text-lg tracking-tight leading-tight">Admin Central</span>
             <span className="text-[9px] font-bold text-[#10b981] uppercase tracking-widest leading-tight">Platform Management</span>
          </div>
        </Link>
      </div>

      {/* Primary Nav */}
      <div className="px-4 py-4 flex flex-col gap-1 mt-6 relative z-10">
        {primaryLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== "/admin/dashboard" && pathname?.startsWith(link.href));
          return (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition relative overflow-hidden group ${
                isActive 
                  ? "bg-[#0f3d32] text-white" 
                  : "text-[#8ba39e] hover:text-white hover:bg-[#0a2921]"
              }`}
            >
              <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {link.icon}
              </svg>
              {link.name}
              {isActive && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#10b981] rounded-l-full"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Bottom Area: System and User */}
      <div className="mt-auto pt-4 px-4 pb-6 relative z-10">
        <div className="flex flex-col gap-1 pt-4 border-[#0f3d32]">
          {bottomLinks.map((link) => {
            const isActive = pathname === link.href || pathname?.startsWith(link.href);
            const className = `flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-xs transition relative overflow-hidden group ${
              isActive 
                ? "bg-[#0f3d32] text-white" 
                : "text-[#8ba39e] hover:text-white hover:bg-[#0a2921]"
            }`;
            if (link.onClick) {
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={link.onClick}
                  className={className}
                >
                  <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {link.icon}
                  </svg>
                  {link.name}
                </a>
              );
            }
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={className}
              >
                <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {link.icon}
                </svg>
                {link.name}
                {isActive && (
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#10b981] rounded-l-full"></div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
