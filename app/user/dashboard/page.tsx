"use client";

import { getUserLandingPages } from "@/lib/api/user/landingpage";
import { getWalletInfo } from "@/lib/api/user/wallet";
import { useEffect, useState } from "react";

export default function LandingPageUser() {
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showBalance, setShowBalance] = useState(false);

  const [walletBalance, setWalletBalance] = useState<number | null>(null); 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserLandingPages(1, 20);
        if (res.success) {
          setLandingPages(res.data.landingPages || []);
        } else {
          setError(res.message || "Failed to fetch landing pages");
        }
        const walletRes = await getWalletInfo();
        if (walletRes.success) {
          setWalletBalance(walletRes.data?.balance ?? 0);
        } else {
          setError(walletRes.message || "Failed to fetch wallet balance");
        }

      } catch (err: any) {
        setError(err.message || "Failed to fetch data");
      } finally {
        setLoading(false);
      }

      
    };
    

    fetchData();
  }, []);

  if (loading) return <p className="p-6">Loading landing pages...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-6">
    <div className="pb-10">

       <div
        className="p-6 font-semibold text-lg cursor-pointer select-none w-max"
        onClick={() => setShowBalance(!showBalance)}
        title="Click to reveal balance"
      >
        {/* Wallet balance: NPR {showBalance ? walletBalance : "XXXX"} */}
        <span className="text-black">Wallet balance -  </span>
  <span className="text-gray-500 font-medium text-sm">NPR </span>
  <span className="text-[#D07522] font-medium text-lg">{showBalance ? walletBalance?.toFixed(2) : "XXXX.XX"}</span>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 ">
  {landingPages.map((n) => (
    <div
      key={n._id}
      className="bg-white border rounded p-4"
    >
      {/* INNER GREY CARD */}
      <div className="bg-gray-100 rounded-xl p-4 flex gap-4 items-center">
        {/* Image */}
        {n.imageLandpageurl && (
          <img
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${n.imageLandpageurl}`}
            alt={n.heading}
            className="w-28 h-28 object-cover rounded-lg flex-shrink-0"
          />
        )}

        {/* Text */}
        <div>
          <h2 className="font-semibold text-lg mb-2">
            {n.heading}
          </h2>
          <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
            {n.describe}
          </p>
        </div>
      </div>
    </div>
  ))}
</div>
    </div>
    </div>
  );
}