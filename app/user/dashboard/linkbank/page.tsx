"use client";

import { useState } from "react";
import Link from "next/link";
import { linkBank } from "@/lib/api/user/wallet";
import { useRouter } from "next/navigation";

export default function LinkBankPage() {
  const router = useRouter();
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bankName || !accountNumber) {
      setError("Bank name and account number are required.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await linkBank({ bankName, accountNumber });

      router.push("/user/dashboard/linkloginbank");
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
          Link Bank Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Bank Name */}
          <div className="mt-10">
            <label className="block text-[#D07522] font-medium mb-2">
              Bank Name
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-[#D07522] font-medium mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) =>
                setAccountNumber(e.target.value.replace(/\D/g, ""))
              }
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            disabled={loading}
            className="w-full mt-6 bg-[#D07522] text-white py-2 rounded-lg"
          >
            {loading ? "Linking..." : "CONTINUE"}
          </button>
        </form>
      </div>
    </div>
  );
}
