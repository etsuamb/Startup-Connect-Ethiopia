"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/investor/Sidebar";
import { verifyChapaPayment } from "@/lib/investorApi";

function formatCurrency(value, currency = "ETB") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

function PaymentCompletedContent() {
  const searchParams = useSearchParams();
  const txRef = searchParams.get("tx_ref") || searchParams.get("trx_ref");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(Boolean(txRef));
  const [error, setError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function verifyPayment() {
      if (!txRef) {
        setError("No Chapa transaction reference was provided.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");
        const data = await verifyChapaPayment(txRef);
        if (!ignore) setResult(data);
      } catch (err) {
        if (!ignore) setError(err.message || "Unable to verify payment.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    verifyPayment();
    return () => {
      ignore = true;
    };
  }, [txRef]);

  const payment = result?.payment;
  const isCompleted = payment?.status === "completed";
  const statusCopy = useMemo(() => {
    if (loading) return { title: "Verifying Payment", body: "Please wait while StartupConnect confirms your Chapa transaction." };
    if (isCompleted) return { title: "Payment Completed Successfully", body: "Your Chapa payment has been verified and recorded." };
    if (payment) return { title: "Payment Still Pending", body: "Chapa has not marked this transaction as successful yet. You can refresh this page after completing payment." };
    return { title: "Payment Verification Needed", body: error || "We could not find a payment record for this transaction reference." };
  }, [error, isCompleted, loading, payment]);

  return (
    <div className="flex h-screen bg-white font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex-grow flex flex-col overflow-hidden bg-white">
        <main className="flex-grow flex flex-col overflow-y-auto pt-24">
          <div className="p-6 lg:p-10 max-w-[900px] w-full mx-auto flex flex-col min-h-full">
            <div className="mb-10">
              <h1 className="text-[32px] font-bold text-[#0a4d3c] tracking-tight mb-2">Investment Payments</h1>
              <p className="text-gray-500 text-[15px]">Chapa transaction verification result.</p>
            </div>

            <div className="bg-[#f9fafa] border border-gray-200 rounded-[32px] p-8 lg:p-10 mb-12 flex flex-col items-center max-w-[640px] mx-auto w-full">
              <div className={`w-16 h-16 rounded-full ${isCompleted ? "bg-[#0a4d3c]" : "bg-amber-500"} text-white flex items-center justify-center mb-6 shadow-md`}>
                {loading ? (
                  <svg className="w-8 h-8 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                ) : (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isCompleted ? "M9 12l2 2 4-4" : "M12 8v4m0 4h.01"} />
                  </svg>
                )}
              </div>

              <h2 className="text-[22px] font-bold text-gray-900 mb-2 text-center">{statusCopy.title}</h2>
              <p className="text-[13px] text-gray-500 mb-8 text-center">{statusCopy.body}</p>

              <div className="bg-white rounded-2xl w-full p-8 shadow-sm mb-8 border border-gray-100">
                <div className="space-y-6 text-[13px]">
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-gray-500">Transaction Reference</span>
                    <span className="px-2.5 py-1 bg-gray-100 text-gray-600 text-[11px] font-bold rounded break-all text-right">{txRef || "Not provided"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Amount</span>
                    <span className="font-bold text-[22px] text-gray-900">{formatCurrency(payment?.amount, payment?.currency || "ETB")}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Payment method</span>
                    <span className="font-bold text-gray-900">Chapa</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Status</span>
                    <span className={`px-3 py-1 ${isCompleted ? "bg-[#e8fbf0] text-[#0a4d3c]" : "bg-amber-50 text-amber-700"} text-[11px] font-bold rounded-full`}>
                      {payment?.status || (loading ? "verifying" : "not found")}
                    </span>
                  </div>
                </div>
              </div>

              {error ? (
                <div className="w-full mb-8 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="px-6 py-2.5 bg-[#0a4d3c] text-white font-bold text-[13px] rounded-lg hover:bg-[#07382b] flex items-center justify-center gap-2 transition shadow-sm w-full sm:w-auto"
                >
                  Refresh Status
                </button>
                <Link href="/investor/payment" className="px-6 py-2.5 bg-[#f7f9f8] border border-gray-300 text-gray-700 font-bold text-[13px] rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2 transition w-full sm:w-auto shadow-sm">
                  Back to Payments
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function PaymentCompleted() {
  return (
    <Suspense fallback={null}>
      <PaymentCompletedContent />
    </Suspense>
  );
}
