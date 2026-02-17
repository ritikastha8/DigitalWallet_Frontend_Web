"use client";
import { getUserTermsConditions } from "@/lib/api/user/termscondition";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function TermsConditionsPage() {
  const [termsConditions, setTermsConditions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTermsConditions = async () => {
      setLoading(true);
      try {
        const res = await getUserTermsConditions(1,20); // first page, 20 per page
        if (res.success) {
          setTermsConditions(res.data.termsConditions || []);
        } else {
          setError(res.message || "Failed to fetch terms conditions");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch terms conditions");
      } finally {
        setLoading(false);
      }
    };

    fetchTermsConditions();
  }, []);

  if (loading) return <p className="p-4">Loading terms condition...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
      <div>
            {/* <Link href="/user/dashboard" className="text-[#D07522] hover:underline text-xl p-4 inline-block ">&lt; Back</Link> */}
    <div className="max-w-5xl mx-auto p-2 text-center"> <h1 className="text-4xl font-semibold mb-4 text-[#d07522] mt-10" style={{ fontFamily: 'Nunito Sans' }}>Terms & Condition</h1></div>
    <div className="px-4 md:px-8 py-6">
    <p className="text-gray-600 text-base leading-relaxed max-w-4xl mx-auto mb-6">
    <span className="font-bold block mb-2 text-xl">
      WELCOME TO NOVACASH!
    </span>
    <span className="font-medium block mb-2 text-l text-gray-500">
    By installing and registering in the NovaCash mobile app, you (“Customer”)
    agree to be legally bound by these Terms and Conditions (“Terms”), which
    govern your use of the services provided by NovaCash Limited, a company
    incorporated under the laws of Nepal and licensed to operate as a Payment
    Service Provider (PSP), having its registered office at [Your Address]
    (hereinafter referred to as “NovaCash” or “NovaCash Wallet”).
    </span>
    </p>

    <div className="p-6 max-w-4xl mx-auto border bg-gray-100 mt-8">
      
      
      {termsConditions.length === 0 ? (
        <p>No terms conditions available</p>
      ) : (
        <ul className="space-y-6">
          {termsConditions.map((n) => (
            // <li key={n._id} className="border p-4 rounded-md shadow-sm bg-white bg-[#f2994a]">
            <li key={n._id} className="p-6 rounded-lg shadow-md bg-white">
  <h2 className="font-bold text-lg">
    {n.title}
  </h2>
  <p className="text-gray-700 text-lg">
    {n.description}
  </p>
</li>
            
          ))}
        </ul>
      )}
    </div>
    </div>
    </div>
  );
}
