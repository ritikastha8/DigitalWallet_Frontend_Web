"use client";

import { getUserNotifications } from "@/lib/api/user/notification";
import Link from "next/link";
import { useEffect, useState } from "react";


export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const res = await getUserNotifications(1,20); // first page, 20 per page
        if (res.success) {
          setNotifications(res.data.notifications);
        } else {
          setError(res.message || "Failed to fetch notifications");
        }
      } catch (err: any) {
        setError(err.message || "Failed to fetch notifications");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) return <p className="p-4">Loading notifications...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
      <div className="mt-4">
            <Link href="/user/dashboard" className="text-[#D07522] hover:underline text-lg p-8"> Back to Homepage</Link>
    <div className="max-w-5xl mx-auto p-6 mt-4 "> <h1 className="text-4xl font-semibold mb-4  text-[#d07522] " style={{ fontFamily: 'Nunito Sans' }}>Your Notifications</h1>
    <div className="p-6 max-w-5xl mx-auto border bg-gray-100 mt-8">
      
      
      {notifications.length === 0 ? (
        <p>No notifications available</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li key={n._id} className="p-4 rounded-lg shadow-md bg-gradient-to-r from-orange-200 to-orange-0"
>
  <h2 className="font-bold text-lg">
    {n.title}
  </h2>
  <p className="text-gray-700">
    {n.messageNotification}
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
