import Link from "next/link";

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Events</h1>
        <p className="text-lg text-slate-600 mb-8">
          Discover upcoming startup forums, mentorship workshops, and investor
          networking events.
        </p>
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">Startup Pitch Night</h2>
            <p className="text-slate-600">
              Meet founders, investors, and mentors in a focused pitch and
              review session.
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">
              Mentorship Roundtable
            </h2>
            <p className="text-slate-600">
              A live workshop for founders seeking market-fit guidance and
              growth planning.
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
