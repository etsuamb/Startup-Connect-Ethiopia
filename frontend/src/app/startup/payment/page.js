"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/startup/Sidebar";
import StartupTopBar from "@/components/startup/StartupTopBar";
import PaymentContractModal from "@/components/payments/PaymentContractModal";
import { createMentorshipChapaPayment, getMentorshipPaymentItems } from "@/lib/startupApi";

function formatCurrency(value, currency = "ETB") {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "No date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function statusClass(status = "pending") {
  const normalized = String(status || "pending").toLowerCase();
  if (normalized === "completed") return "bg-emerald-50 text-emerald-700 border-emerald-100";
  if (normalized === "failed") return "bg-red-50 text-red-700 border-red-100";
  return "bg-amber-50 text-amber-700 border-amber-100";
}

function SectionCard({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-gray-100 bg-white p-6 sm:p-8 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export default function StartupMentorshipPaymentsPage() {
  const [payments, setPayments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [showContract, setShowContract] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);
  const currency = "ETB";

  useEffect(() => {
    let ignore = false;

    async function loadPayments() {
      try {
        setLoading(true);
        setError("");
        const data = await getMentorshipPaymentItems();
        const items = Array.isArray(data.payments) ? data.payments : [];
        if (!ignore) {
          setPayments(items);
          setContractAccepted(false);
          setShowContract(false);
          setSelectedId(
            items.find((item) => item.payment_status !== "completed")?.mentorship_request_id ||
              items[0]?.mentorship_request_id ||
              null,
          );
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Unable to load mentorship payments.");
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    loadPayments();
    return () => {
      ignore = true;
    };
  }, []);

  const selected = useMemo(
    () => payments.find((item) => item.mentorship_request_id === selectedId) || null,
    [payments, selectedId],
  );

  const platformFee = selected ? Number(selected.payable_amount || 0) * 0.02 : 0;
  const total = selected ? Number(selected.payable_amount || 0) + platformFee : 0;

  async function proceedToCheckout() {
    if (!selected) return;

    try {
      setStarting(true);
      setError("");
      const data = await createMentorshipChapaPayment({
        mentorship_request_id: selected.mentorship_request_id,
        payment_contract_accepted: true,
        payment_contract_version: "startupconnect-payment-v1",
      });
      if (!data.form_action || !data.form_fields) {
        throw new Error("Chapa hosted checkout details were not returned.");
      }

      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.form_action;
      form.style.display = "none";

      Object.entries(data.form_fields).forEach(([name, value]) => {
        if (value === undefined || value === null || value === "") return;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = String(value);
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (err) {
      setError(err.message || "Unable to start Chapa checkout.");
      setStarting(false);
    }
  }

  function handleStartCheckout() {
    if (!selected) return;
    setShowContract(true);
  }

  function handleContractConfirm() {
    if (!contractAccepted) return;
    proceedToCheckout();
  }

  const completedPayments = payments.filter((p) => p.payment_status === "completed");
  const pendingPayments = payments.filter((p) => p.payment_status !== "completed");

  return (
    <div className="min-h-screen bg-[#f6f8f9] font-sans text-gray-900 flex">
      <Sidebar />
      <main className="flex-grow flex flex-col overflow-y-auto">
        <StartupTopBar searchPlaceholder="Search payments..." />

        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-8 pb-24">
          <div className="mb-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0f3d32]">Startup · Payments</p>
            <h1 className="mt-2 text-3xl font-black tracking-tight text-gray-900">Pay your mentor</h1>
            <p className="mt-1.5 text-sm text-gray-500 max-w-2xl">
              Pay accepted mentorship offers securely through Chapa. Investment funding is handled by investors separately.
            </p>
          </div>

          {error && (
            <div className="mb-6 rounded-2xl border border-red-200 bg-red-50 p-4 flex items-center gap-3">
               <svg className="w-5 h-5 text-red-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-semibold text-red-800">{error}</span>
            </div>
          )}

          <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
            <div className="space-y-6">
                <SectionCard className="!p-0 overflow-hidden">
                  <div className="border-b border-gray-100 px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">Accepted Mentorship Offers</h2>
                        <p className="text-sm text-gray-500 mt-1">Select an offer below to view details and proceed to payment.</p>
                    </div>
                    <span className="shrink-0 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 text-xs font-bold inline-flex items-center gap-1.5 w-fit">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        Chapa Secured
                    </span>
                  </div>

                  {loading ? (
                    <div className="p-12 text-center">
                        <div className="w-10 h-10 rounded-full border-2 border-[#0f3d32] border-t-transparent animate-spin mx-auto mb-4" />
                        <p className="text-sm font-semibold text-gray-500">Loading payable offers...</p>
                    </div>
                  ) : pendingPayments.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-center mx-auto mb-5 text-gray-400">
                          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">No pending payments</h3>
                      <p className="text-sm text-gray-500 max-w-sm mx-auto">
                        You don&apos;t have any pending mentorship payments. Accept a mentor proposal first to pay.
                      </p>
                      <Link href="/startup/offers" className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b2f26]">
                        View offers
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {pendingPayments.map((item) => {
                        const isSelected = item.mentorship_request_id === selectedId;
                        return (
                          <button
                            key={item.mentorship_request_id}
                            type="button"
                            onClick={() => {
                              setSelectedId(item.mentorship_request_id);
                              setContractAccepted(false);
                              setShowContract(false);
                            }}
                            className={`w-full px-6 sm:px-8 py-5 text-left transition-colors relative group ${isSelected ? "bg-[#f8fafc]" : "hover:bg-gray-50"}`}
                          >
                            {isSelected && <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#0f3d32] rounded-r-full" />}
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-emerald-50 text-emerald-700 font-bold items-center justify-center border border-emerald-100 shrink-0">
                                   {item.mentor_name?.charAt(0) || "M"}
                                </div>
                                <div>
                                  <p className="font-bold text-gray-900 text-base">{item.mentor_name || "Mentor"}</p>
                                  <p className="mt-0.5 text-sm text-gray-600 font-medium">{item.subject || "Mentorship session"}</p>
                                  <p className="mt-1.5 text-xs text-gray-400 font-medium flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    Accepted {formatDate(item.created_at)}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-xl font-black text-[#0f3d32] tracking-tight">{formatCurrency(item.payable_amount, currency)}</p>
                                <span className={`mt-2 inline-block rounded-lg px-2.5 py-1 border text-[10px] font-bold uppercase tracking-wider ${statusClass(item.payment_status)}`}>
                                  {item.payment_status || "pending"}
                                </span>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </SectionCard>

                {completedPayments.length > 0 && (
                    <SectionCard className="!p-0 overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                        <div className="border-b border-gray-100 px-6 sm:px-8 py-5 bg-gray-50/50">
                            <h2 className="text-sm font-bold text-gray-900">Payment History</h2>
                        </div>
                        <div className="divide-y divide-gray-100">
                          {completedPayments.map((item) => (
                              <div key={item.mentorship_request_id} className="px-6 sm:px-8 py-4 flex items-center justify-between gap-4 bg-white">
                                  <div className="flex items-center gap-3">
                                     <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center text-xs shrink-0">
                                         {item.mentor_name?.charAt(0) || "M"}
                                     </div>
                                     <div>
                                         <p className="font-bold text-gray-900 text-sm">{item.mentor_name}</p>
                                         <p className="text-xs text-gray-500 mt-0.5">{formatDate(item.created_at)}</p>
                                     </div>
                                  </div>
                                  <div className="text-right">
                                      <p className="text-sm font-bold text-gray-900">{formatCurrency(item.payable_amount, currency)}</p>
                                      <span className="text-[10px] font-bold text-emerald-600 mt-0.5 block">Paid</span>
                                  </div>
                              </div>
                          ))}
                        </div>
                    </SectionCard>
                )}
            </div>

            <aside>
              <SectionCard className="sticky top-28 border-2 border-gray-100 shadow-md">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                   <div className="w-10 h-10 rounded-xl bg-[#0f3d32] flex items-center justify-center text-white shrink-0">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                   </div>
                   <div>
                       <h3 className="text-lg font-bold text-gray-900">Payment Summary</h3>
                       <p className="text-xs text-gray-500">Secure checkout</p>
                   </div>
                </div>

                {selected ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Mentor</span>
                      <span className="font-bold text-gray-900 text-right">{selected.mentor_name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 font-medium">Session type</span>
                      <span className="font-bold text-gray-900 text-right max-w-[150px] truncate" title={selected.subject}>{selected.subject || "Standard"}</span>
                    </div>
                    
                    <div className="pt-4 border-t border-dashed border-gray-200 space-y-4">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Session fee</span>
                          <span className="font-bold text-gray-900">{formatCurrency(selected.payable_amount, currency)}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-500 font-medium">Platform fee (2%)</span>
                          <span className="font-bold text-gray-900">{formatCurrency(platformFee, currency)}</span>
                        </div>
                    </div>

                    <div className="border-t-2 border-gray-100 pt-4 mt-2 flex justify-between items-end">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Total amount</span>
                      <span className="text-3xl font-black text-[#0f3d32] tracking-tight">{formatCurrency(total, currency)}</span>
                    </div>

                    <button
                      type="button"
                      onClick={handleStartCheckout}
                      disabled={starting || selected?.payment_status === "completed"}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#0f3d32] px-6 py-4 text-sm font-bold text-white shadow-sm transition hover:bg-[#0b2f26] hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {starting ? (
                          <><span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> Opening Chapa...</>
                      ) : selected?.payment_status === "completed" ? (
                          <><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" /></svg> Already Paid</>
                      ) : (
                          <>Pay with Chapa <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg></>
                      )}
                    </button>
                    
                    <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400 font-medium">
                        <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Secured by Chapa Escrow
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-gray-500">
                    <svg className="w-12 h-12 mx-auto text-gray-200 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-sm font-medium">Select a pending mentorship offer to view checkout details.</p>
                  </div>
                )}
              </SectionCard>
            </aside>
          </div>
        </div>
      </main>
      <PaymentContractModal
        open={showContract}
        agreed={contractAccepted}
        onAgreedChange={setContractAccepted}
        onClose={() => setShowContract(false)}
        onConfirm={handleContractConfirm}
        starting={starting}
        title="Mentorship Payment Agreement"
        payerLabel="Startup"
        payeeLabel="Mentor"
        payer="My Startup"
        payee={selected?.mentor_name || "Mentor"}
        subject={selected?.subject || "Mentorship payment"}
        amount={selected?.payable_amount || 0}
        platformFee={platformFee}
        total={total}
        currency={currency}
      />
    </div>
  );
}
