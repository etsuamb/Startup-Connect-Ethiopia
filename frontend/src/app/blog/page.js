import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Blog</h1>
        <p className="text-lg text-slate-600 mb-8">
          Stay updated with news, startup stories, and ecosystem insights from
          StartupConnect Ethiopia.
        </p>
        <div className="space-y-6">
          <article className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">
              Building trust in the Ethiopian startup ecosystem
            </h2>
            <p className="text-slate-600">
              Insights on investor matchmaking, startup validation, and scaling
              local innovation.
            </p>
          </article>
          <article className="rounded-3xl border border-slate-200 p-8 shadow-sm hover:shadow-md transition">
            <h2 className="text-2xl font-semibold mb-3">
              Why founders should showcase their progress
            </h2>
            <p className="text-slate-600">
              How strong founder narratives help connect startups with mentors
              and capital.
            </p>
          </article>
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
