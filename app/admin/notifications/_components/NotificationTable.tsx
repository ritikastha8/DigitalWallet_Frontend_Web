"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-toastify";
import DeleteModal from "@/app/_components/DeleteModal";
import { FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";
import { handleDeleteNotification } from "@/lib/actions/admin/notification-action";

const NotificationTable = ({ notifications, pagination, search }: { notifications: any[], pagination: any, search?: string }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSearchChange = () => {
    router.push(`/admin/notifications?page=1&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''));
  };

  const onDelete = async () => {
    try {
      await handleDeleteNotification(deleteId!);
      toast.success("Notification deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete notification");
    } finally {
      setDeleteId(null);
    }
  };

  const makePagination = (): React.ReactElement[] => {
    const pages: React.ReactElement[] = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2;

    const prevHref = `/admin/notifications?page=${currentPage - 1}&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : '');
    pages.push(
      <button
        key="prev"
        disabled={currentPage === 1}
        onClick={() => router.push(prevHref)}
        className={`px-3 py-1 border rounded-md ${currentPage === 1 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-orange-400 hover:bg-orange-100'}`}
      >
        Previous
      </button>
    );

    let startPage = Math.max(1, currentPage - delta);
    let endPage = Math.min(totalPages, currentPage + delta);

    if (startPage > 1) {
      pages.push(
        <button key={1} onClick={() => router.push(`/admin/notifications?page=1&size=${pagination.size}`)} className="px-3 py-1 border rounded-md bg-white text-orange-400 hover:bg-orange-100">1</button>
      );
      if (startPage > 2) pages.push(<span key="ellipsis1" className="px-2">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      const href = `/admin/notifications?page=${i}&size=${pagination.size}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
      pages.push(
        <button key={i} onClick={() => router.push(href)}
          className={`px-3 py-1 border rounded-md ${i === currentPage ? 'bg-orange-400 text-white' : 'bg-white text-orange-400 hover:bg-orange-100'}`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) pages.push(<span key="ellipsis2" className="px-2">...</span>);
      pages.push(
        <button key={totalPages} onClick={() => router.push(`/admin/notifications?page=${totalPages}&size=${pagination.size}`)} className="px-3 py-1 border rounded-md bg-white text-orange-500 hover:bg-orange-100">{totalPages}</button>
      );
    }

    const nextHref = `/admin/notifications?page=${currentPage + 1}&size=${pagination.size}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
    pages.push(
      <button key="next" disabled={currentPage === totalPages} onClick={() => router.push(nextHref)}
        className={`px-3 py-1 border rounded-md ${currentPage === totalPages ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-orange-400 hover:bg-orange-100'}`}
      >
        Next
      </button>
    );

    return pages;
  };

  return (


    
    <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
      {/* Manage Notifications Title */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Manage Notifications
        </h1>

      </div>

      {/* Delete Modal */}
      {/* <DeleteModal
        isOpen={deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={onDelete}
        title="Delete Confirmation"
        description="Are you sure you want to delete this notification? This action cannot be undone."
      /> */}

      <DeleteModal
                isOpen={deleteId !== null}
              onClose={() => setDeleteId(null)}
                 onConfirm={onDelete}
              title="Delete Confirmation"
                description="Are you sure you want to delete this item? This action cannot be undone."
            />


      {/* Search */}
      <div className="p-4 flex items-center border-b border-gray-200 gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchChange()}
            placeholder="Search by notification title"
            className="pl-10 pr-4 py-2 w-full border rounded-md border-gray-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 font-inter font-medium text-gray-700"
          />
        </div>
        <button onClick={handleSearchChange} className="px-4 py-2 bg-[#D07522] text-white rounded-md hover:bg-orange-400 font-inter font-medium">
          Search
        </button>
      </div>

      {/* Table */}
      <table className="w-full table-auto border-collapse">
        <thead className="bg-gray-100 text-gray-500 text-lg font-inter font-semibold  ">
          <tr>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Message</th>
            <th className="px-4 py-3 text-left">Action</th>

          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {notifications.map(notification => (
            <tr key={notification._id} className="hover:bg-gray-50 font-inter font-medium text-gray-700">
             
              <td className="px-4 py-2">{notification.title}</td>
              <td className="px-4 py-2">{notification.messageNotification}</td>
              <td className="px-4 py-2 flex items-center gap-4">
                {/* View */}
                      {/* <Link href={`/admin/users/${user._id}`} className="text-green-500 hover:underline">View</Link>
// // //                                 <Link href={`/admin/users/${user._id}/edit`} className="text-blue-500 ml-4 hover:underline">Edit</Link> */}
                {/* <div className="flex flex-col items-center gap-1">
                  <FiEye className="text-grey text-lg" />
                  <span className="text-green-600 text-xs">View</span>
                </div> */}
                {/* Edit */}
                {/* <div className="flex flex-col items-center gap-1">
                  <FiEdit className="text-grey-100 text-lg" />
                  <span className="text-blue-700 text-xs">Edit</span>
                </div> */}

                 {/* View */}
                 <Link href={`/admin/notifications/${notification._id}`} className="flex flex-col items-center gap-1">
                 <FiEye className="text-gray-500 text-lg" />
                 <span className="text-green-600 text-xs">View</span>
                 </Link>
                 {/* Edit */}
                 <Link href={`/admin/notifications/${notification._id}/edit`} className="flex flex-col items-center gap-1">
                 <FiEdit className="text-gray-500 text-lg" />
                 <span className="text-blue-500 text-xs">Edit</span>
                 </Link>
                {/* Delete */}
                <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setDeleteId(notification._id)}>
                  <FiTrash2 className="text-gray-500 text-lg" />
                  <span className="text-red-500 text-xs">Delete</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
       {/* Pagination */}
      {pagination?.totalPages > 1 && (
        <div className="p-4 flex justify-between items-center border-t border-gray-200">
          <div className="text-sm text-gray-700 font-inter font-medium">
            Page {pagination.page} of {pagination.totalPages}
          </div>
          <div className="flex flex-wrap gap-2">{makePagination()}</div>
        </div>
      )}
    </div>
  );
};

export default NotificationTable;
