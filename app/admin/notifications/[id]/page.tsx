import { handleGetOneNotification } from "@/lib/actions/admin/notification-action";
import Link from "next/link";
export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await handleGetOneNotification(id);
    if (!response.success) {
        throw new Error(response.message || 'Failed to load notification');
    }

    return (
        <div>
            <Link href="/admin/notifications" className="text-[#D07522] hover:underline">&lt; Back</Link>
            <Link href={`/admin/notifications/${id}/edit`} className="text-green-600 hover:underline ml-4">Edit Notification</Link>
             <div className="p-4 flex items-center justify-between mt-6 mb-4">
                <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>Notification Detail</h1>
            </div>
               <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 ">
                <p><strong> Title:</strong> {response.data.title}</p>
                <p><strong>Message:</strong> {response.data.messageNotification}</p>
                {/* Add more notification details as needed */}
            </div>
        </div>
    );
}
