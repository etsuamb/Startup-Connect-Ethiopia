import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-6">Terms of Service</h1>
        <p className="text-lg text-slate-600 mb-8">
          These terms govern your use of StartupConnect Ethiopia. By
          registering, you agree to our guidelines and responsibilities.
        </p>
        <div className="space-y-6 text-slate-700 leading-relaxed">
          <p>
            Use the platform honestly and provide accurate information during
            sign-up.
          </p>
          <p>
            All users are responsible for maintaining the confidentiality of
            their account credentials.
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
