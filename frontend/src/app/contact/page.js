"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [openFaq, setOpenFaq] = useState({});

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api-backend/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, role, subject, message }),
      });
      if (!res.ok) throw new Error(await res.text());
      setStatus("sent");
      setName("");
      setEmail("");
      setRole("");
      setSubject("");
      setMessage("");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  const toggleFaq = (key) => setOpenFaq((s) => ({ ...s, [key]: !s[key] }));
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group cursor-pointer"
            >
              <img
                src="/logo.png"
                alt="StartupConnect Logo"
                className="w-10 h-10 object-contain"
              />
              <div className="flex flex-col -gap-1">
                <span className="font-bold text-xl text-gray-900 tracking-tight leading-tight">
                  StartupConnect
                </span>
                <span className="text-sm text-primary tracking-wide leading-tight">
                  Ethiopia
                </span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link
              href="/"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              About
            </Link>
            <Link
              href="/startups"
              className="text-gray-500 hover:text-primary transition-colors"
            >
              Browse Startups
            </Link>
            <Link
              href="/contact"
              className="text-primary transition-colors border-b-2 border-primary pb-1"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2 border border-primary text-primary rounded-md"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-md shadow-sm"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow bg-[#fcfcfc]">
        {/* Title Section */}
        <section className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            We are here to support startups, investors, and mentors. Reach out
            with any questions or feedback.
          </p>
        </section>

        {/* Contact Form & Info */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column: Form */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Send us a message
              </h2>
              <p className="text-gray-500 text-sm mb-8">
                Fill out the form below and our team will get back to you as
                soon as possible.
              </p>

              <form
                className="flex flex-col gap-5 flex-grow"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 bg-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 bg-opacity-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Role
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 bg-opacity-50 appearance-none text-gray-600"
                  >
                    <option value="" disabled>
                      Choose role
                    </option>
                    <option value="startup">Startup</option>
                    <option value="investor">Investor</option>
                    <option value="mentor">Mentor</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    type="text"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 bg-opacity-50"
                  />
                </div>
                <div className="flex-grow flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-gray-50 bg-opacity-50 flex-grow resize-none"
                  ></textarea>
                </div>
                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-[#117663] text-white font-medium rounded-md hover:bg-primary-dark transition w-auto inline-block shadow-sm"
                  >
                    {status === "sending" ? "Sending..." : "Send Message"}
                  </button>
                </div>
                {status === "sent" && (
                  <div className="text-sm text-green-600">
                    Message sent. Thank you!
                  </div>
                )}
                {status === "error" && (
                  <div className="text-sm text-red-600">
                    Failed to send. Try again later.
                  </div>
                )}
              </form>
            </div>

            {/* Right Column: Information */}
            <div className="bg-white p-10 rounded-xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition">
              <h2 className="text-2xl font-bold mb-3 text-gray-900">
                Contact Information
              </h2>
              <p className="text-gray-500 text-sm mb-10">
                You can also reach us through the following channels:
              </p>

              <div className="flex flex-col gap-8 flex-grow">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 text-primary rounded-md flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Email</h3>
                    <p className="text-primary text-sm font-medium cursor-pointer hover:underline">
                      support@startupconnect.et
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 text-primary rounded-md flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600 text-sm">+251 900 000 000</p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 text-primary rounded-md flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Office Location
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Addis Ababa, Ethiopia
                    </p>
                  </div>
                </div>

                {/* Office Hours */}
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-green-50 text-primary rounded-md flex-shrink-0">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">
                      Office Hours
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Monday - Friday, 9:00 AM - 5:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {[
              {
                key: "register",
                question: "How do I register as a startup?",
                answer:
                  "Click the Register button in the header or footer, choose 'Startup', and complete the profile steps. We review and approve listings as soon as possible.",
              },
              {
                key: "verified",
                question: "How are startups verified?",
                answer:
                  "Startups are verified by our team based on submitted profile details, supporting documents, and eligibility checks before being made visible to investors and mentors.",
              },
              {
                key: "contact",
                question: "How can I contact an investor or mentor?",
                answer:
                  "Once you are registered, you can browse startup, investor, and mentor profiles and use the platform messaging feature to connect directly.",
              },
            ].map((item) => (
              <div
                key={item.key}
                className="bg-white border border-gray-100 rounded-lg shadow-sm"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(item.key)}
                  className="w-full flex items-center justify-between gap-4 p-6 text-left hover:border-gray-200 transition"
                >
                  <span className="font-medium text-gray-900">
                    {item.question}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      openFaq[item.key] ? "rotate-45" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                </button>
                {openFaq[item.key] && (
                  <div className="px-6 pb-6 text-sm text-gray-600">
                    {item.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-20 bg-[#167b66] text-center px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-8">
              Join StartupConnect Ethiopia and grow your network.
            </h2>
            <Link
              href="/register"
              className="px-8 py-3 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition shadow-lg inline-block"
            >
              Create an Account
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#111827] text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">
              StartupConnect Ethiopia
            </h3>
            <p className="text-sm text-gray-400 mb-6">
              Connecting innovators with investors and mentors across Ethiopia.
            </p>
            <div className="flex gap-4">
              {/* Social icons */}
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <span className="text-xs">FB</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <span className="text-xs">TW</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 cursor-pointer transition">
                <span className="text-xs">IN</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Startup
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Investor
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Mentor
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white transition">
                  Browse Startups
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Startup
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Investor
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition">
                  Join as Mentor
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white transition">
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  href="/terms-of-service"
                  className="hover:text-white transition"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>
            &copy; {new Date().getFullYear()} StartupConnect Ethiopia. All
            rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
