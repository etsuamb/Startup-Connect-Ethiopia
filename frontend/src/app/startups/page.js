import Image from "next/image";
import Link from "next/link";

export default function BrowseStartups() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-[#f8fafc]">
      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group cursor-pointer">
              <img src="/logo.png" alt="StartupConnect Logo" className="w-10 h-10 object-contain" />
              <div className="flex flex-col -gap-1">
                <span className="font-bold text-xl text-gray-900 tracking-tight leading-tight">StartupConnect</span>
                <span className="text-sm text-primary tracking-wide leading-tight">Ethiopia</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            <Link href="/" className="text-gray-500 hover:text-primary transition-colors">Home</Link>
            <Link href="/about" className="text-gray-500 hover:text-primary transition-colors">About</Link>
            <Link href="/startups" className="text-primary transition-colors border-b-2 border-primary pb-1">Browse Startups</Link>
            <Link href="/contact" className="text-gray-500 hover:text-primary transition-colors">Contact</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-4 py-2 border border-primary text-primary rounded-md">Login</Link>
            <Link href="#" className="text-sm font-medium text-white bg-primary hover:bg-primary-dark transition-colors px-4 py-2 rounded-md shadow-sm">Sign Up</Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Title Section */}
        <section className="pt-16 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Browse Startups
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover innovative Ethiopian startups across different industries and stages.
          </p>
        </section>

        {/* Filters Section */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-10">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
                <input 
                  type="text" 
                  placeholder="Search startups by name or keyword..." 
                  className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-600 appearance-none">
                  <option value="">All Industries</option>
                  <option value="agritech">AgriTech</option>
                  <option value="fintech">FinTech</option>
                  <option value="edtech">EdTech</option>
                  <option value="healthtech">HealthTech</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                <select className="w-full px-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white text-gray-600 appearance-none">
                  <option value="">All Stages</option>
                  <option value="idea">Idea</option>
                  <option value="pre-seed">Pre-Seed</option>
                  <option value="seed">Seed</option>
                  <option value="early-growth">Early Growth</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-medium text-gray-700">Active Filters:</span>
              <span className="text-sm text-gray-500 italic">None</span>
            </div>
          </div>
        </section>

        {/* Startups Grid */}
        <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-16">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Startup Card 1 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Farm/Agriculture</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">EthioFarm Tech</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Smart farming solutions for Ethiopian farmers.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-green-50 text-primary text-xs font-semibold rounded-md border border-green-100">AgriTech</span>
                  <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-md border border-orange-100">Seed</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Addis Ababa
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>

            {/* Startup Card 2 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Laptop/Finance</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">EthioPay</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Digital payment ecosystem for Ethiopian businesses.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-md border border-blue-100">FinTech</span>
                  <span className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-md border border-orange-100">Pre-Seed</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Addis Ababa
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>

            {/* Startup Card 3 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Student/Learning</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">LearnEthiopia</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Online learning platform for Ethiopian students.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-purple-50 text-purple-600 text-xs font-semibold rounded-md border border-purple-100">EdTech</span>
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-semibold rounded-md border border-yellow-100">Pre-Seed</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Bahir Dar
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>

            {/* Startup Card 4 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Healthcare professional</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">HealthConnect</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Telemedicine platform for rural communities.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-red-50 text-red-600 text-xs font-semibold rounded-md border border-red-100">Health</span>
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-semibold rounded-md border border-yellow-100">Pre-Seed</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Addis Ababa
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>

            {/* Startup Card 5 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Technology devices</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">EthioTech Solutions</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Custom software development for local businesses.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-md border border-teal-100">Technology</span>
                  <span className="px-2 py-1 bg-green-50 text-primary text-xs font-semibold rounded-md border border-green-100">Growth</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Addis Ababa
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>

            {/* Startup Card 6 */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col hover:shadow-md transition">
              <div className="h-48 bg-gray-200 w-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">Image: Coffee beans/export</div>
              </div>
              <div className="p-6 flex flex-col flex-grow items-center text-center">
                <h3 className="text-xl font-bold mb-2 self-start text-left w-full">EliteCoffee Direct</h3>
                <p className="text-sm text-gray-600 mb-4 flex-grow self-start text-left w-full">Direct-to-consumer Ethiopian coffee platform.</p>
                <div className="flex gap-2 w-full mb-4">
                  <span className="px-2 py-1 bg-green-50 text-primary text-xs font-semibold rounded-md border border-green-100">AgriTech</span>
                  <span className="px-2 py-1 bg-yellow-50 text-yellow-600 text-xs font-semibold rounded-md border border-yellow-100">Seed</span>
                </div>
                <div className="flex items-center w-full text-xs text-gray-500 mb-6">
                  <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  Jimma
                </div>
                <button className="px-6 py-2 border border-gray-200 text-primary font-medium rounded hover:bg-green-50 transition w-full max-w-[200px]">View Details</button>
              </div>
            </div>
            
          </div>
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center items-center gap-2">
            <button className="w-10 h-10 flex items-center justify-center bg-primary text-white rounded-md font-medium">1</button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md font-medium transition">2</button>
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md font-medium transition">3</button>
            <span className="px-2 text-gray-400">...</span>
            <button className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded-md font-medium transition">5</button>
          </div>
        </section>

        {/* Call to Action Banner */}
        <section className="py-20 bg-[#167b66] text-center px-4">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            <h2 className="text-3xl font-bold text-white mb-4">Have a startup idea?</h2>
            <p className="text-green-50 mb-8 text-lg opacity-90 max-w-xl">Showcase it to investors and mentors across Ethiopia.</p>
            <button className="px-8 py-3 bg-white text-primary font-bold rounded-md hover:bg-gray-100 transition shadow-lg w-auto">Create Startup Profile</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-gray-800">
          <div className="col-span-1">
            <h3 className="text-white text-xl font-bold mb-4">StartupConnect Ethiopia</h3>
            <p className="text-sm text-gray-400 mb-6">Connecting innovators with investors and mentors across Ethiopia.</p>
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
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About</Link></li>
              <li><Link href="/startups" className="hover:text-white transition">Browse Startups</Link></li>
              <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">For Users</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Join as Startup</Link></li>
              <li><Link href="#" className="hover:text-white transition">Join as Investor</Link></li>
              <li><Link href="#" className="hover:text-white transition">Join as Mentor</Link></li>
              <li><Link href="#" className="hover:text-white transition">Success Stories</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="hover:text-white transition">Blog</Link></li>
              <li><Link href="#" className="hover:text-white transition">Events</Link></li>
              <li><Link href="#" className="hover:text-white transition">FAQ</Link></li>
              <li><Link href="#" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="#" className="hover:text-white transition">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} StartupConnect Ethiopia. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
