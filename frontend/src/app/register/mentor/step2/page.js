import Link from "next/link";
import MentorStep2Form from "@/components/register/MentorStep2Form";

export default function MentorRegistrationStep2() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] font-sans text-gray-900 flex flex-col lg:flex-row">
      <div className="hidden lg:flex w-[40%] bg-[#061e16] relative overflow-hidden flex-col justify-between py-12 px-12">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#061e16]"></div>
          <div className="absolute top-[-10%] left-[10%] w-[150%] h-[30px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
          <div className="absolute top-[10%] left-[10%] w-[150%] h-[40px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
          <div className="absolute top-[30%] left-[0%] w-[150%] h-[20px] bg-[#008f64] opacity-30 transform -rotate-[55deg] blur-[2px]"></div>
          <div className="absolute top-[50%] left-[-10%] w-[150%] h-[60px] bg-[#008f64] opacity-20 transform -rotate-[55deg] blur-[4px]"></div>
          <div className="absolute top-[70%] left-[-20%] w-[150%] h-[25px] bg-[#008f64] opacity-40 transform -rotate-[55deg] blur-[2px]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#061e16]/60 via-transparent to-[#061e16]/90"></div>
        </div>

        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-2 mb-14">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-lg text-white tracking-tight">StartupConnect</span>
          </Link>
          <h1 className="text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
            Share your experience. Help founders accelerate with proven guidance.
          </h1>
          <p className="text-[#10b981] text-sm leading-relaxed max-w-sm font-medium">
            Tell us about your mentorship experience and the sectors you are best placed to support.
          </p>
        </div>

        <div className="relative z-10">
          <p className="text-[#8ba39e] text-[10px] font-medium tracking-widest uppercase opacity-50">
            &copy; 2024 StartupConnect Ethiopia. All rights reserved.
          </p>
        </div>
      </div>

      <div className="w-full lg:w-[60%] flex flex-col pt-10 pb-8 px-4 md:px-10 overflow-y-auto">
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-6">
            <Link href="/register/mentor" className="text-[#167b66] hover:text-[#0f5c4a] transition text-sm font-bold">
              Back to mentor account
            </Link>
            <span className="text-sm text-gray-400">/ Mentor profile</span>
          </div>

          <div className="bg-white rounded-3xl shadow-[0_16px_40px_rgba(15,61,50,0.08)] border border-gray-100 p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-widest font-bold text-[#0f3d32] opacity-70">Step 2 of 4</p>
              <h1 className="text-3xl font-extrabold text-[#115b4c] mt-4 mb-2">Mentor experience & availability</h1>
              <p className="text-sm text-gray-500">Add context that helps us connect you with the right founders and opportunities.</p>
            </div>

            <MentorStep2Form />
          </div>
        </div>
      </div>
    </div>
  );
}
