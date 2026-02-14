"use client";

import { useState } from "react";
import { topup } from "@/lib/api/user/wallet";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function WalletTopUpPage() {
  const [mobile, setMobile] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!mobile || !/^\d{10}$/.test(mobile)) {
      setError("Enter a valid 10-digit mobile number.");
      setSuccess(null);
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Enter a valid amount greater than 0.");
      setSuccess(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await topup({
        toMobileNumber: mobile,
        amount: Number(amount),
        remarks,
      });

      toast.success(
        `Wallet topup successful! Amount: ${res.data.amount}, New balance: ${res.data.balance}, Remarks: ${res.data.remarks}`, 
        {autoClose:1500}
      );


      setMobile("");
      setAmount("");
      setRemarks("");

       setTimeout(() => {
        router.push("/user/dashboard");
      }, 400);
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-20 flex flex-col items-center p-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
         <h1 className="text-4xl font-semibold text-[#D07522]" style={{ fontFamily: "Nunito Sans" }}>
          Wallet Top-Up
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
        
          <div>
            <label htmlFor="mobile" className="block text-[#D07522] font-medium mb-2">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              placeholder="Enter mobile number"
              maxLength={10}
              value={mobile}
              onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
            />
          </div>

        
          <div>
            <label htmlFor="amount" className="block text-[#D07522] font-medium mb-2">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/\D/g, ""))}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
            />
          </div>

        
          <div>
            <label htmlFor="remarks" className="block text-[#D07522] font-medium mb-2">
              Remarks
            </label>
            <input
              type="text"
              id="remarks"
              placeholder="Enter remarks"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
            />
          </div>

          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-4 bg-[#D07522] text-white font-semibold py-2 rounded-lg hover:bg-[#c6681d] transition-colors ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Processing..." : "PROCEED"}
          </button>
        </form>
      </div>
    </div>
  );
}
