"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { sendMoney } from "@/lib/api/user/wallet";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";

function PayForm() {
  const searchParams = useSearchParams();
  const [mobileNumber, setMobileNumber] = useState("");
  const [receiverName, setReceiverName] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const mobile = searchParams.get("mobile") ?? "";
    const name = searchParams.get("name") ?? "";
    const amt = searchParams.get("amount") ?? "";
    setMobileNumber(mobile);
    setReceiverName(decodeURIComponent(name));
    setAmount(amt);
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobileNumber || !amount) {
      setError("Mobile number and amount are required.");
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Mobile number should be 10 digits.");
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await sendMoney({
        toMobileNumber: mobileNumber,
        amount: Number(amount),
        remarks: remarks || undefined,
      });

      toast.success(
        `Sent NPR ${res.data?.amount ?? amount} successfully! Your new wallet balance is NPR ${res.data?.balance ?? ""}.`,
        { autoClose: 2000 }
      );

      setAmount("");
      setRemarks("");
      setTimeout(() => {
        window.location.href = "/user/dashboard";
      }, 500);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send money.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h1 className="text-2xl font-semibold text-[#D07522] mb-1 text-center">
          Pay / Send money
        </h1>
        {receiverName && (
          <p className="text-gray-600 text-sm text-center mb-6">
            Sending to {receiverName}
            {mobileNumber && ` (${mobileNumber})`}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Receiver mobile
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="10-digit mobile number"
              value={mobileNumber}
              maxLength={10}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-black outline-none focus:border-[#D07522]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Amount (NPR)
            </label>
            <input
              type="text"
              inputMode="numeric"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-black outline-none focus:border-[#D07522]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1">
              Remarks (optional)
            </label>
            <input
              type="text"
              placeholder="Remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm text-black outline-none focus:border-[#D07522]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D07522] text-white py-3 rounded-lg font-medium disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send money"}
          </button>
        </form>

        <p className="text-center mt-4">
          <Link href="/user/dashboard" className="text-sm text-[#D07522] hover:underline">
            Back to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function PayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      }
    >
      <PayForm />
    </Suspense>
  );
}
