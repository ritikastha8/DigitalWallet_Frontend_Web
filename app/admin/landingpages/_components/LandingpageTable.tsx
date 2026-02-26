"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "react-toastify";
import { handleDeleteLandingPage } from "@/lib/actions/admin/landingpage-action";
import DeleteModal from "@/app/_components/DeleteModal";
import { FiEye, FiEdit, FiTrash2, FiSearch } from "react-icons/fi";

const normalizeLandingPage = (lp: any): any => lp?._doc ?? lp;

const getLandingPageId = (lp: any): string | null => {
  const normalized = normalizeLandingPage(lp);
  const rawId = normalized?._id ?? lp?._id;
  if (typeof rawId === "string" && rawId.trim()) return rawId;
  if (rawId && typeof rawId === "object" && typeof rawId.$oid === "string") return rawId.$oid;
  const fromToString = rawId?.toString?.();
  if (fromToString && fromToString !== "[object Object]") return fromToString;
  return null;
};

const getLandingPageKey = (lp: any, index: number): string =>
  getLandingPageId(lp) ?? `landingpage-${index}`;

const LandingPageTable = ({ landingpages, pagination, search }: { landingpages: any[], pagination: any, search?: string }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState(search || '');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleSearchChange = () => {
    router.push(`/admin/landingpages?page=1&size=${pagination.size}` +
      (searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''));
  };

  const onDelete = async () => {
    try {
      await handleDeleteLandingPage(deleteId!);
      toast.success("Landing Page deleted successfully");
    } catch (err: any) {
      toast.error(err.message || "Failed to delete landing page");
    } finally {
      setDeleteId(null);
    }
  };

  const makePagination = (): React.ReactElement[] => {
    const pages: React.ReactElement[] = [];
    const currentPage = pagination.page;
    const totalPages = pagination.totalPages;
    const delta = 2;

    const prevHref = `/admin/landingpages?page=${currentPage - 1}&size=${pagination.size}` +
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
        <button key={1} onClick={() => router.push(`/admin/landingpages?page=1&size=${pagination.size}`)} className="px-3 py-1 border rounded-md bg-white text-orange-400 hover:bg-orange-100">1</button>
      );
      if (startPage > 2) pages.push(<span key="ellipsis1" className="px-2">...</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      const href = `/admin/landingpages?page=${i}&size=${pagination.size}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
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
        <button key={totalPages} onClick={() => router.push(`/admin/landingpages?page=${totalPages}&size=${pagination.size}`)} className="px-3 py-1 border rounded-md bg-white text-orange-500 hover:bg-orange-100">{totalPages}</button>
      );
    }

    const nextHref = `/admin/landingpages?page=${currentPage + 1}&size=${pagination.size}${searchTerm ? `&search=${encodeURIComponent(searchTerm)}` : ''}`;
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
      {/* Manage LandingPages Title */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Manage Landing Pages
        </h1>

      </div>

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
            placeholder="Search by landing page name"
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
            <th className="px-4 py-3 text-left">Loading Page Pic</th>
            <th className="px-4 py-3 text-left">Landing Page</th>
            <th className="px-4 py-3 text-left">Description</th>
            <th className="px-4 py-3 text-left">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 text-gray-700">
          {landingpages.map((landingpage, index) => (
            <tr key={getLandingPageKey(landingpage, index)} className="hover:bg-gray-50 font-inter font-medium text-gray-700">
              <td className="px-4 py-2">
                {normalizeLandingPage(landingpage).imageLandpageurl ? (
                  <Image src={normalizeLandingPage(landingpage).imageLandpageurl} width={60} height={60} className="rounded-md object-cover" alt="Landing Page" />
                ) : (
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">N/A</div>
                )}
              </td>
              <td className="px-4 py-2">{normalizeLandingPage(landingpage).heading || "-"}</td>
              <td className="px-4 py-2">{normalizeLandingPage(landingpage).describe || "-"}</td>
              <td className="px-4 py-2 flex items-center gap-4">
                {(() => {
                  const landingPageId = getLandingPageId(landingpage);
                  if (!landingPageId) {
                    return (
                      <span className="text-xs text-red-500">Invalid ID</span>
                    );
                  }

                  return (
                    <>
                      <Link href={`/admin/landingpages/${landingPageId}`} className="flex flex-col items-center gap-1">
                        <FiEye className="text-gray-500 text-lg" />
                        <span className="text-green-600 text-xs">View</span>
                      </Link>
                      <Link href={`/admin/landingpages/${landingPageId}/edit`} className="flex flex-col items-center gap-1">
                        <FiEdit className="text-gray-500 text-lg" />
                        <span className="text-blue-500 text-xs">Edit</span>
                      </Link>
                      <div className="flex flex-col items-center gap-1 cursor-pointer" onClick={() => setDeleteId(landingPageId)}>
                        <FiTrash2 className="text-gray-500 text-lg" />
                        <span className="text-red-500 text-xs">Delete</span>
                      </div>
                    </>
                  );
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

export default LandingPageTable;
