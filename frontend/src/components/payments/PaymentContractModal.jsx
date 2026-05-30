"use client";

import Link from "next/link";

function formatCurrency(value, currency = "ETB") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value || 0));
}

export default function PaymentContractModal({
  open,
  agreed,
  onAgreedChange,
  onClose,
  onConfirm,
  starting = false,
  title = "Payment Agreement",
  payerLabel = "Payer",
  payeeLabel = "Receiver",
  payer = "",
  payee = "",
  subject = "",
  amount = 0,
  platformFee = 0,
  total = 0,
  currency = "ETB",
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-6">
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        <div className="border-b border-gray-100 px-6 py-5">
          <p className="text-[10px] font-black uppercase tracking-widest text-[#0f3d32]">StartupConnect Contract</p>
          <h2 className="mt-1 text-2xl font-black text-gray-900">{title}</h2>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-bold text-gray-500">{payerLabel}</p>
              <p className="mt-1 text-sm font-black text-gray-900">{payer || "Current account"}</p>
            </div>
            <div className="rounded-xl border border-gray-100 bg-gray-50 p-4">
              <p className="text-xs font-bold text-gray-500">{payeeLabel}</p>
              <p className="mt-1 text-sm font-black text-gray-900">{payee || "Payment receiver"}</p>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-gray-100 p-4">
            <p className="text-xs font-bold text-gray-500">Purpose</p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{subject || "Accepted platform offer"}</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Base amount</span>
                <strong>{formatCurrency(amount, currency)}</strong>
              </div>
              <div className="flex justify-between gap-4">
                <span className="text-gray-500">Platform fee</span>
                <strong>{formatCurrency(platformFee, currency)}</strong>
              </div>
              <div className="flex justify-between gap-4 border-t border-gray-100 pt-2">
                <span className="font-bold text-gray-900">Total authorized</span>
                <strong className="text-[#0f3d32]">{formatCurrency(total, currency)}</strong>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            By continuing, you authorize StartupConnect to create this payment checkout through Chapa, record the transaction result after provider verification, apply the displayed platform fee, and handle escrow, disputes, refunds, and chargebacks under the platform payment policy.
          </div>

          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-xl border border-gray-200 p-4">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(event) => onAgreedChange(event.target.checked)}
              className="mt-1 h-4 w-4 rounded border-gray-300 text-[#0f3d32] focus:ring-[#0f3d32]"
            />
            <span className="text-sm font-semibold leading-6 text-gray-700">
              I have reviewed this payment agreement and agree to the StartupConnect{" "}
              <Link href="/terms-of-service" className="text-[#0f3d32] underline">
                terms of service
              </Link>
              .
            </span>
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            disabled={starting}
            className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-bold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={!agreed || starting}
            className="rounded-xl bg-[#0f3d32] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#0b2f26] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {starting ? "Opening Chapa..." : "Agree and Pay"}
          </button>
        </div>
      </div>
    </div>
  );
}
