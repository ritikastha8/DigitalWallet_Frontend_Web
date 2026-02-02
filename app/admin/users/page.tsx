// import Link from "next/link";

// export default function Page() {
//     return (
//         <div>
//             <Link className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
//              href="/admin/users/create">Create User</Link>
//         </div>
//     );
// }

"use client";

import Link from "next/link";
import { Pencil, Trash2, Search } from "lucide-react";

const DUMMY_USERS = [
  { id: "1", name: "Hari Gurung", mobile: "9876543211" },
  { id: "2", name: "Siya Rai", mobile: "9876544328" },
  { id: "3", name: "Orian Shahi", mobile: "9876655464" },
  { id: "4", name: "Jiyo Shrestha", mobile: "9886835765" },
];

export default function AdminUsersPage() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className="text-2xl font-semibold">Manage All Users</h1>

      {/* Card */}
      <div className="rounded-lg border bg-white shadow-sm">
        {/* Card Header */}
        <div className="flex items-center justify-between border-b p-4">
          <h2 className="font-medium">User List</h2>

          {/* Search (UI only) */}
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by user name"
              className="h-9 w-64 rounded-md border pl-9 pr-3 text-sm focus:outline-none"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-gray-600">
              <tr>
                <th className="px-4 py-3">User</th>
                <th className="px-4 py-3">Mobile Number</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {DUMMY_USERS.map((user) => (
                <tr
                  key={user.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3 font-medium">
                    {user.name}
                  </td>
                  <td className="px-4 py-3">{user.mobile}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-4">
                      {/* Edit */}
                      <Link
                        href={`/admin/users/${user.id}/edit`}
                        className="flex items-center gap-1 text-green-600 hover:underline"
                      >
                        <Pencil size={14} />
                        Edit
                      </Link>

                      {/* Delete (dummy) */}
                      <button
                        type="button"
                        className="flex items-center gap-1 text-red-500 hover:underline"
                        onClick={() => alert("Delete clicked (dummy)")}
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Link className="text-blue-500 border border-blue-500 p-2 rounded inline-block"
             href="/admin/users/create">Create User</Link>
    </div>
  );
}
