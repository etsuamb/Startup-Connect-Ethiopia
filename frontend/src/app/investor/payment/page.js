"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Sidebar from "@/components/investor/Sidebar";
import PaymentContractModal from "@/components/payments/PaymentContractModal";
import { createChapaHostedPayment, getInvestorPaymentItems } from "@/lib/investorApi";

function formatCurrency(value, currency = "ETB") {
  const amount = Number(value || 0);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatDate(value) {
  if (!value) return "No date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "No date";
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function initials(name = "") {
  return String(name || "ST")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function statusClass(status = "pending") {
  const normalized = String(status || "pending").toLowerCase();
  if (normalized === "completed") return "bg-emerald-50 text-emerald-700";
  if (normalized === "failed") return "bg-red-50 text-red-700";
  return "bg-amber-50 text-amber-700";
}

export default function InvestmentPayments() {
  const [payments, setPayments] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const currency = "ETB";
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState("");
  const [showContract, setShowContract] = useState(false);
  const [contractAccepted, setContractAccepted] = useState(false);

  useEffect(() => {
    let ignore = false;

    async function loadPayments() {
      try {
        setLoading(true);
        setError("");
        const data = await getInvestorPaymentItems();
        const items = Array.isArray(data.payments) ? data.payments : [];
        if (!ignore) {
          setPayments(items);
          setContractAccepted(false);
          setShowContract(false);
          setSelectedId(items.find((item) => item.payment_status !== "completed")?.investment_request_id || items[0]?.investment_request_id || null);
        }
      } catch (err) {
        if (!ignore) setError(err.message || "Unable to load payment items.");
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
    () => payments.find((item) => item.investment_request_id === selectedId) || null,
    [payments, selectedId],
  );

  const platformFee = selected ? Number(selected.requested_amount || 0) * 0.02 : 0;
  const total = selected ? Number(selected.requested_amount || 0) + platformFee : 0;

  async function proceedToCheckout() {
    if (!selected) return;

    try {
      setStarting(true);
      setError("");
      const data = await createChapaHostedPayment({
        offer_id: selected.investment_request_id,
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

  return (
    <div className="flex h-screen bg-[#f8f9fa] font-sans text-gray-900 overflow-hidden">
      <Sidebar />

      <div className="flex-grow flex flex-col overflow-hidden bg-[#f8f9fa]">
        <main className="flex-grow flex flex-col overflow-y-auto pt-24">
          <div className="p-6 lg:p-10 max-w-[1200px] w-full mx-auto flex flex-col min-h-full">
            <div className="mb-8">
              <h1 className="text-[32px] font-bold text-[#0a4d3c] tracking-tight mb-2">Investment Payments</h1>
              <p className="text-gray-500 text-[15px]">Select an accepted funding offer and continue through Chapa checkout.</p>
            </div>

            {error ? (
              <div className="mb-6 rounded-xl border border-red-100 bg-red-50 px-5 py-4 text-sm font-semibold text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col lg:flex-row gap-8 mb-8 flex-grow">
              <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex-grow flex flex-col">
                <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                  <h2 className="text-2xl font-bold text-[#0a4d3c]">Accepted Offers</h2>
                  <span className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs font-bold text-gray-700">
                    Chapa checkout: ETB
                  </span>
                </div>

                {loading ? (
                  <div className="p-10 text-center text-gray-500 font-semibold">Loading payable offers...</div>
                ) : payments.length ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead className="bg-gray-50 border-b border-gray-100">
                        <tr className="text-[10px] font-bold text-gray-500 tracking-wider uppercase">
                          <th className="px-6 py-4">Startup</th>
                          <th className="px-6 py-4">Project</th>
                          <th className="px-6 py-4">Amount</th>
                          <th className="px-6 py-4">Payment</th>
                          <th className="px-6 py-4">Accepted</th>
                          <th className="px-6 py-4" />
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {payments.map((item) => {
                          const isSelected = item.investment_request_id === selectedId;
                          const paymentStatus = item.payment_status || "pending";
                          return (
                            <tr
                              key={item.investment_request_id}
                              onClick={() => {
                                setSelectedId(item.investment_request_id);
                                setContractAccepted(false);
                                setShowContract(false);
                              }}
                              className={`hover:bg-gray-50 transition cursor-pointer ${isSelected ? "bg-green-50/40" : ""}`}
                            >
                              <td className="px-6 py-5">
                                <div className="flex items-center gap-4">
                                  <div className="w-9 h-9 rounded-lg bg-green-50 text-[#0a4d3c] flex items-center justify-center text-xs font-black">
                                    {initials(item.startup_name)}
                                  </div>
                                  <div>
                                    <p className="text-[13px] font-bold text-gray-900">{item.startup_name}</p>
                                    <p className="text-xs text-gray-500">{item.industry || "Industry not set"}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5 text-[13px] text-gray-500">{item.project_title || "Startup project"}</td>
                              <td className="px-6 py-5 text-[13px] font-bold text-[#0a4d3c]">{formatCurrency(item.requested_amount, currency)}</td>
                              <td className="px-6 py-5">
                                <span className={`px-2.5 py-1 text-[11px] font-bold rounded-full ${statusClass(paymentStatus)}`}>
                                  {paymentStatus}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-[13px] text-gray-500">{formatDate(item.created_at)}</td>
                              <td className="px-6 py-5 text-right">
                                <div className={`w-5 h-5 rounded-md border ${isSelected ? "bg-[#0a4d3c] border-[#0a4d3c] text-white" : "border-gray-300"} flex items-center justify-center ml-auto shadow-sm`}>
                                  {isSelected && <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="p-10 text-center">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">No accepted offers ready for payment</h2>
                    <p className="text-sm text-gray-500 mb-5">Accept an offer first, then return here to pay through Chapa.</p>
                    <Link href="/investor/offers" className="inline-flex px-5 py-2.5 bg-[#0a4d3c] text-white text-xs font-bold rounded-lg hover:bg-[#07382b] transition">
                      View Offers
                    </Link>
                  </div>
                )}
              </div>

              <div className="w-full lg:w-[340px] shrink-0 flex flex-col gap-6">
                <div className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm">
                  <h3 className="text-[22px] font-bold text-[#0a4d3c] leading-tight mb-8">Payment Summary</h3>

                  {selected ? (
                    <>
                      <div className="flex items-center gap-4 mb-8">
                        <div className="w-14 h-14 rounded-xl bg-[#0a4d3c] text-white flex items-center justify-center font-black">
                          {initials(selected.startup_name)}
                        </div>
                        <div>
                          <h4 className="text-[15px] font-bold text-gray-900 leading-snug">{selected.startup_name}</h4>
                          <p className="text-xs text-gray-500 mt-1">{selected.business_stage || "Accepted offer"}</p>
                        </div>
                      </div>

                      <div className="space-y-5 mb-8 text-[13px]">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Investment Amount</span>
                          <span className="font-bold text-gray-900">{formatCurrency(selected.requested_amount, currency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Platform Fee (2%)</span>
                          <span className="font-bold text-gray-900">{formatCurrency(platformFee, currency)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Provider</span>
                          <span className="font-bold text-gray-900">Chapa</span>
                        </div>
                      </div>

                      <div className="border-t border-gray-100 pt-6 flex justify-between items-end">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-tight">Total Amount<br />Due</p>
                        <div className="text-right">
                          <p className="text-[26px] font-bold text-[#0a4d3c] mb-1">{formatCurrency(total, currency)}</p>
                          <p className="text-[10px] text-gray-400">Redirects to Chapa checkout</p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <p className="text-sm text-gray-500">Choose an accepted offer to see payment details.</p>
                  )}
                </div>

                <div className="bg-[#f0fcf5] border border-[#d1f4e0] rounded-2xl p-6 shadow-sm flex items-start gap-3">
                  <div className="mt-0.5 shrink-0 text-[#0a4d3c]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <p className="text-[11px] text-[#0a4d3c] leading-relaxed font-medium">
                    You will be redirected to Chapa. StartupConnect verifies the transaction after Chapa returns you to the app.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <div className="bg-white border-t border-gray-200 py-4 px-6 lg:px-10 flex justify-between items-center shrink-0 z-20">
          <Link href="/investor/offers" className="px-6 py-2.5 bg-white border border-gray-300 text-gray-600 font-bold text-sm rounded-lg hover:bg-gray-50 flex items-center gap-2 transition">
            Back to Offers
          </Link>
          <button
            type="button"
            onClick={handleStartCheckout}
            disabled={!selected || starting || selected.payment_status === "completed"}
            className="px-8 py-3 bg-[#0a4d3c] text-white font-bold text-sm rounded-xl hover:bg-[#07382b] shadow-md flex items-center gap-2 transition disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {starting ? "Opening Chapa..." : selected?.payment_status === "completed" ? "Already Paid" : "Pay with Chapa"}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        </div>
      </div>
      <PaymentContractModal
        open={showContract}
        agreed={contractAccepted}
        onAgreedChange={setContractAccepted}
        onClose={() => setShowContract(false)}
        onConfirm={handleContractConfirm}
        starting={starting}
        title="Investment Payment Agreement"
        payerLabel="Investor"
        payeeLabel="Startup"
        payer="Current investor account"
        payee={selected?.startup_name || "Startup"}
        subject={selected?.project_title || "Investment payment"}
        amount={selected?.requested_amount || 0}
        platformFee={platformFee}
        total={total}
        currency={currency}
      />
    </div>
  );
}
