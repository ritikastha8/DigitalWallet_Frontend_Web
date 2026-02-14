"use client";
import { getTransactions } from "@/lib/api/user/wallet";
import { useEffect, useState } from "react";

interface Transaction {
  _id: string;
  // type: "Load Money" | "Send Money" | "Topup";
  type: string;
  mobileNumber: string;
  toMobileNumber?: string;
  amount: number;
  remarks: string;
  createdAt: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getTransactions();
        if (data.success) setTransactions(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">Loading transactions...</p>
      </div>
    );

  if (transactions.length === 0)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500 text-lg">No transactions yet.</p>
      </div>
    );

  return (
    // <div className="p-10 bg-gray-50 min-h-screen">
     <div className="max-w-7xl mx-auto px-6 mt-10">
    {/* <div className="pb-10"></div> */}
      <h1 className="text-4xl font-semibold text-[#D07522] mb-6 " style={{ fontFamily: "Nunito Sans" }}>My Transactions</h1>
      <div className="p-6 max-w-7xl mx-auto bg-gray-100 mt-8 rounded-lg">
    

       {transactions.map((tx) => {

  const type = tx.type.toLowerCase();

  // Map backend type to label and color
  const TYPE_MAP: Record<string, { label: string; color: string }> = {
    "send money": { label: "Send Money", color: "bg-orange-300" },
    "topup": { label: "Topup", color: "bg-green-400" },
    "load money": { label: "Load Money", color: "bg-blue-400" },
  };

  const { label, color } = TYPE_MAP[type] || { label: tx.type, color: "bg-gray-400" };

  return (
    <div
      key={tx._id}
      className="bg-white p-4 rounded-lg shadow hover:shadow-md transition space-y-3 mb-4"
    >
      {/* TOP: Type */}
      <span className={`inline-block w-fit px-2 py-1 rounded text-white font-semibold text-m ${color}`}>
        {label}
      </span>

      {/* MIDDLE: Numbers */}
      <div className="text-gray-700 font-medium text-m space-y-1">
        <p>From: {tx.mobileNumber}</p>
        {tx.toMobileNumber && <p>To: {tx.toMobileNumber}</p>}
      </div>

      {/* BOTTOM: Balance & Date */}
      <div className="flex justify-between items-center text-sm">
        <span className="text-[#D07522]">
          <span className="font-medium text-m">Balance - </span>
          <span className="font-semibold">NPR {tx.amount.toFixed(2)}</span>
        </span>
        <span className="text-gray-400">
          {new Date(tx.createdAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
})}
 
      </div>
    </div>

  );
}


