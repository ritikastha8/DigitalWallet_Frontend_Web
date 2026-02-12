"use client";
import { getUserLandingPages } from "@/lib/api/user/landingpage";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function LandingPageUser() {
  const [landingPages, setLandingPages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLandingPages = async () => {
      try {
        const res = await getUserLandingPages(1, 20);
        if (res.success) {
          setLandingPages(res.data.landingPages || []);
        } else {
          setError(res.message || "Failed to fetch landing pages");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch landing pages");
      } finally {
        setLoading(false);
      }
    };

    fetchLandingPages();
  }, []);

  if (loading) return <p className="p-6">Loading landing pages...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="pb-10">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-6 p-8 ">
    {landingPages.map((n) => (
    <div
      key={n._id}
      className="bg-white border p-4 rounded"
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
  );
}
