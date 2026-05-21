"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveRegistrationAccountInfo } from "@/lib/registerAccountStorage";

export default function RegisterAccountInfo() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneTail: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords must match.");
      return;
    }

    const rawPhone = String(formData.phoneTail || "").replace(/\D/g, "");
    if (!(rawPhone.length === 9 || (rawPhone.length === 12 && rawPhone.startsWith("251")))) {
      setError("Enter a valid Ethiopian phone number in the format 9XX XXX XXX.");
      return;
    }

    const phoneNumber = rawPhone.startsWith("251") ? `+${rawPhone}` : `+251${rawPhone}`;

    saveRegistrationAccountInfo({
      first_name: formData.firstName,
      last_name: formData.lastName,
      full_name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      phone_number: phoneNumber,
    });

    router.push("/register/role");
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] font-sans flex flex-col relative">
      
      {/* Header */}
      <header className="absolute top-0 w-full px-6 py-6 flex justify-between items-center z-10">
        <Link href="/">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
            <span className="font-bold text-[#0a4d3c] text-lg tracking-tight">StartupConnect</span>
          </div>
        </Link>
        <div className="flex items-center gap-4">
          <button className="text-[12px] font-bold text-gray-500 hover:text-gray-800 transition hidden sm:block">
            Save as Draft
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#e8fbf0] text-[#0a4d3c] rounded-md border border-[#c2eadd]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Secure Encryption</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-[480px]">
          
          <div className="text-center mb-10">
            <h1 className="text-[28px] font-bold text-gray-900 mb-2 tracking-tight">Create your account</h1>
            <p className="text-[14px] text-gray-500">Enter your details to get started with StartupConnect Ethiopia</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-900 mb-2">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Abebe" 
                    className="w-full px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-bold text-gray-900 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Kebede" 
                    className="w-full px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-900 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="abebe@example.com" 
                  className="w-full px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-900 mb-2">Password</label>
                <input 
                  type="password" 
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters with 1 capital letter, 1 special character (!@#$%^&*), and 1 number"
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                />
                <p className="text-[11px] text-gray-500 mt-1">8+ chars, 1 capital letter, 1 special character, 1 number</p>
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-900 mb-2">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  pattern="(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}"
                  title="Password must be at least 8 characters with 1 capital letter, 1 special character (!@#$%^&*), and 1 number"
                  placeholder="••••••••" 
                  className="w-full px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                />
              </div>

              <div>
                <label className="block text-[12px] font-bold text-gray-900 mb-2">Phone Number</label>
                <div className="flex gap-3">
                  <div className="w-20 px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl flex items-center justify-center text-[14px] text-gray-700">
                    +251
                  </div>
                  <input
                    type="tel"
                    name="phoneTail"
                    value={formData.phoneTail}
                    onChange={handleChange}
                    required
                    placeholder="9XX XXX XXX"
                    className="flex-1 px-4 py-3 bg-[#fafbfc] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0a4d3c] focus:border-transparent transition text-[14px] text-gray-800 placeholder-gray-400"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-2">Enter your phone number in Ethiopian format without the +251 prefix.</p>
              </div>

              {error ? (
                <p className="text-sm text-red-500">{error}</p>
              ) : null}

              <button 
                type="submit" 
                className="w-full py-3.5 bg-[#0a4d3c] hover:bg-[#083b2e] text-white font-bold rounded-xl shadow-sm shadow-[#0a4d3c]/20 transition text-[14px] mt-2"
              >
                Continue
              </button>

            </form>
          </div>

          <p className="text-center text-[13px] text-gray-500 mt-8">
            Already have an account? <Link href="/login" className="font-bold text-[#0a4d3c] hover:underline">Log in</Link>
          </p>

        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-6 flex justify-center mt-auto">
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-[11px] font-medium text-gray-400 uppercase tracking-wider">
          <span className="font-bold text-gray-500 normal-case tracking-normal">StartupConnect Ethiopia</span>
          <Link href="#" className="hover:text-gray-800 transition">Privacy Policy</Link>
          <Link href="#" className="hover:text-gray-800 transition">Terms of Service</Link>
          <Link href="#" className="hover:text-gray-800 transition">Contact Support</Link>
          <span>&copy; {new Date().getFullYear()} StartupConnect Ethiopia. All rights reserved.</span>
        </div>
      </footer>

    </div>
  );
}
