"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "@/lib/api/axios";
import { API } from "@/lib/api/endpoints";

export default function PlusButtonPage() {
  const [loading, setLoading] = useState(true);
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const checkBank = async () => {
      try {
        const res = await axios.get(API.USER.WALLET.INFO);
        // setIsLinked(res.data?.linked === true);
        setIsLinked(res.data?.wallet?.bank?.linked === true);
      } catch (err) {
        console.error("Failed to check bank link status");
        setIsLinked(false);
      } finally {
        setLoading(false);
      }
    };

    checkBank();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <p className="text-gray-500">Checking bank status...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-20 flex flex-col items-center p-12">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-2xl min-h-[500px]">
        <h1
          className="text-4xl font-semibold text-[#D07522]"
          style={{ fontFamily: "Nunito Sans" }}
        >
          Load Money
        </h1>

        <div className={`flex justify-center mt-16 ${isLinked ? "flex-col gap-6 items-center" : ""}`}>
          {isLinked && (
            <Link href="/user/dashboard/linkloginbank" className="w-full max-w-sm">
              <div className="w-full flex flex-col items-center justify-center p-6 border-2 border-[#D07522] rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-orange-50">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#D07522] text-white mb-3">
                  <span className="text-2xl font-medium">+</span>
                </div>
                <p className="font-semibold text-black mb-1 text-center">
                  Load money
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Login to your bank and load money into your wallet
                </p>
              </div>
            </Link>
          )}
          <Link href="/user/dashboard/linkbank" className={isLinked ? "w-full max-w-sm" : "w-full max-w-sm"}>
            <div className="w-full flex flex-col items-center justify-center p-6 border border-gray-200 rounded-lg cursor-pointer hover:shadow-md transition-shadow bg-gray-100">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-white mb-3">
                <span className="text-4xl font-medium text-[#D07522]">+</span>
              </div>
              <p className="font-semibold text-black mb-1 text-center">
                Link bank account
              </p>
              <p className="text-sm text-gray-500 text-center">
                Get connected to bank account for easiest way to load money instantly
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

