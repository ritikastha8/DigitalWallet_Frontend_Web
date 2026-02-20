"use client";

import { useState } from "react";
import { loginBank } from "@/lib/api/user/wallet";
import { useRouter } from "next/navigation";
import { FiEye,FiEyeOff } from "react-icons/fi";

export default function LinkLoginPage() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mobileNumber || !password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await loginBank({ mobileNumber, password });

      router.push("/user/dashboard/loadmoney");
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
          Login - Bank
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 mt-10">
          <input
            placeholder="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ""))}
            maxLength={10}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          />

          <div className="relative">
          <input
            type={showPassword ? "text":"password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          />
          <span
              className="absolute right-3 top-2.5 text-gray-500 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
            </span>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button className="w-full bg-[#D07522] text-white py-2 rounded-lg">
            {loading ? "Verifying..." : "CONTINUE"}
          </button>
        </form>
      </div>
    </div>
  );
}
