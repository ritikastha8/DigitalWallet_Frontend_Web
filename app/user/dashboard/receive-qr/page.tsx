"use client";

import { useEffect, useState } from "react";
import { getReceiveQr } from "@/lib/api/user/wallet";
import Link from "next/link";

export default function ReceiveQrPage() {
  const [payload, setPayload] = useState<{
    payload?: string;
    mobileNumber?: string;
    name?: string;
    amount?: number | null;
    qrImageBase64?: string;
  } | null>(null);
  const [suggestedAmount, setSuggestedAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchQr = async (amount?: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getReceiveQr(amount);
      if (res.success && res.data) {
        setPayload(res.data);
      } else {
        setError(res.message || "Failed to load QR");
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to load QR");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQr();
  }, []);

  const handleApplyAmount = (e: React.FormEvent) => {
    e.preventDefault();
    const num = suggestedAmount.trim() ? Number(suggestedAmount) : undefined;
    if (num !== undefined && (isNaN(num) || num <= 0)) {
      setError("Enter a valid amount");
      return;
    }
    fetchQr(num);
  };

  if (loading && !payload) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
        <p className="text-gray-500">Loading your receive QR...</p>
      </div>
    );
  }

  if (error && !payload) {
    return (
      <div className="flex flex-col items-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          type="button"
          onClick={() => fetchQr()}
          className="px-4 py-2 rounded-lg bg-[#D07522] text-white text-sm font-medium"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-20 flex flex-col items-center p-8">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1
          className="text-3xl font-semibold text-[#D07522] mb-2 text-center"
          style={{ fontFamily: "Nunito Sans" }}
        >
          Receive money
        </h1>
        <p className="text-gray-600 text-sm text-center mb-6">
          Scan to pay {payload?.name ?? ""} ({payload?.mobileNumber ?? ""})
        </p>

        {payload?.qrImageBase64 ? (
          <div className="flex justify-center mb-6">
            <img
              src={payload.qrImageBase64}
              alt="Receive money QR code"
              className="w-64 h-64 object-contain border border-gray-200 rounded-lg"
            />
          </div>
        ) : (
          <div className="flex justify-center mb-6 w-64 h-64 mx-auto border border-gray-200 rounded-lg items-center">
            <span className="text-gray-400 text-sm">No QR available</span>
          </div>
        )}

        {payload?.amount != null && payload.amount > 0 && (
          <p className="text-center text-gray-700 font-medium mb-4">
            Suggested amount: NPR {payload.amount}
          </p>
        )}

        <form onSubmit={handleApplyAmount} className="space-y-3 mb-6">
          <label className="block text-sm font-medium text-gray-900">
            Suggested amount (optional)
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              inputMode="numeric"
              placeholder="e.g. 100"
              value={suggestedAmount}
              onChange={(e) => setSuggestedAmount(e.target.value.replace(/\D/g, ""))}
              className="h-10 flex-1 rounded-md border border-gray-300 px-3 text-sm text-black outline-none focus:border-[#D07522]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-[#D07522] text-white text-sm font-medium whitespace-nowrap"
            >
              Update QR
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-xs">
          Share this QR so others can send you money.
        </p>
      </div>
    </div>
  );
}
