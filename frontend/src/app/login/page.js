import Link from "next/link";
import LoginForm from "./LoginForm";

export default function Login() {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-sans text-gray-900 flex items-center justify-center py-12">
      {/* Centered Content Area */}
      <div className="w-full max-w-xl flex flex-col justify-center px-6 sm:px-12 relative z-10">
        
        <div className="w-full mx-auto">
          
          {/* Header Text */}
          <div className="mb-8 pl-2">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Startup Login</h1>
              Access your founder dashboard to manage your project, connect with investors, and track your progress.
          </div>

          <LoginForm />

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-2 mb-6 pl-2">
            <div className="bg-[#e8f3f1] text-[#0f5c4a] px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 border border-[#cce8e2]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Secure Login
            </div>
            <div className="bg-[#e8f3f1] text-[#0f5c4a] px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 border border-[#cce8e2]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 00-.515.774l-1.5 10a1 1 0 001.211 1.107l7-2.625 7 2.625a1 1 0 001.211-1.107l-1.5-10a1 1 0 00-.515-.774l-7-3zM10 12l-4.5 1.688L6.87 5.068 10 3.725l3.13 1.343 1.37 8.62L10 12z"></path></svg>
              Verified Investor Platform
            </div>
            <div className="bg-[#e8f3f1] text-[#0f5c4a] px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 border border-[#cce8e2]">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              Admin-Approved Access
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-[#f0f3f5] rounded-xl p-4 flex items-start gap-3 mb-10 border border-gray-100">
            <div className="text-[#0f5c4a] mt-0.5">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed font-medium">
              Only verified and approved investors can access the investor dashboard. Applications are reviewed by our institutional audit team within 48 hours.
            </p>
          </div>

          {/* Footer Text */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-[9px] font-bold text-gray-400 uppercase tracking-widest pl-2">
            <span>&copy; 2024 STARTUPCONNECT ETHIOPIA</span>
            <Link href="#" className="hover:text-gray-600 transition">Privacy Policy</Link>
            <Link href="#" className="hover:text-gray-600 transition">Terms of Service</Link>
            <Link href="#" className="hover:text-gray-600 transition">Security Architecture</Link>
          </div>

        </div>

      </div>



    </div>
  );
}
