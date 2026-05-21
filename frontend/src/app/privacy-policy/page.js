import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
        <p className="text-lg text-slate-600 mb-8">
          StartupConnect Ethiopia respects your privacy. This policy explains
          how we collect, use, and protect user data.
        </p>
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            We collect only the minimum information needed to provide the
            service and keep your data secure.
          </p>
          <p>
            We do not share your personal information with parties outside the
            platform without your consent.
          </p>
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
