import Link from "next/link";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">FAQ</h1>
        <p className="text-lg text-slate-600 mb-8">
          Answers to common questions for startups, investors, and mentors.
        </p>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">
              How do I join StartupConnect?
            </h2>
            <p className="text-slate-600">
              Click Register and choose the role that matches your needs:
              startup, investor, or mentor.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">
              Can I explore startups before signing up?
            </h2>
            <p className="text-slate-600">
              Featured startups are visible on the homepage, but full details
              require an account.
            </p>
          </div>
        </div>
        <div className="mt-10">
          <Link href="/" className="text-primary font-semibold hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
