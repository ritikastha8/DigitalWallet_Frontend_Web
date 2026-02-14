"use client";

import { useState } from "react";
import { sendMoney } from "@/lib/api/user/wallet";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";

export default function SendMoneyPage() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!mobileNumber || !amount) {
      setError("Mobile number and amount are required.");
      setSuccess(null);
      return;
    }

    if (mobileNumber.length !== 10) {
      setError("Mobile number should be 10 digits.");
      setSuccess(null);
      return;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0.");
      setSuccess(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await sendMoney({
        toMobileNumber: mobileNumber,
        amount: Number(amount),
        remarks,
      });
 
      toast.success(
        `Sent NPR ${res.data.amount} to ${res.data.to} successfully! Your new wallet balance is NPR ${res.data.balance}.`, 
        {autoClose:1500}
      );

      
      setMobileNumber("");
      setAmount("");
      setRemarks("");
      setTimeout(() => {
        router.push("/user/dashboard");
      }, 400);

    } catch (err: any) {
      setError(err.message || "Something went wrong while sending money.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-20 flex flex-col items-center p-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl">
        <h1 className="text-4xl font-semibold text-[#D07522]" style={{ fontFamily: "Nunito Sans" }}>Send Money</h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <input
            placeholder="Mobile Number"
            value={mobileNumber}
            maxLength={10}
            onChange={(e) =>
              setMobileNumber(e.target.value.replace(/\D/g, ""))
            }
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

          <button
            type="submit"
            className="w-full bg-[#D07522] text-white py-2 rounded-lg"
          >
            {loading ? "Sending..." : "PROCEED"}
          </button>
        </form>
      </div>
    </div>
  );
}
