"use client";

import { useState } from "react";
import { loadMoney } from "@/lib/api/user/wallet";

export default function LoadMoneyPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const res = await loadMoney({
        mobileNumber,
        amount: Number(amount),
        remarks,
      });

      setSuccess(`Wallet balance: NPR ${res.data.balance}`);
      setAmount("");
      setRemarks("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-20 flex flex-col items-center p-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-[#D07522]">
          Load Money
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <input
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          />

          <input
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          />

          <input
            placeholder="Remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          />

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button className="w-full bg-[#D07522] text-white py-2 rounded-lg">
            {loading ? "Loading..." : "PROCEED"}
          </button>
        </form>
      </div>
    </div>
  );
}
