import { handleGetOneTermsCondition } from "@/lib/actions/admin/termscondition-action";
import Link from "next/link";
export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await handleGetOneTermsCondition(id);
    if (!response.success) {
        throw new Error(response.message || 'Failed to load terms condition');
    }

    return (
        <div>
            <Link href="/admin/termsconditions" className="text-[#D07522] hover:underline">&lt; Back</Link>
            <Link href={`/admin/termsconditions/${id}/edit`} className="text-green-600 hover:underline ml-4">Edit Terms Condition</Link>
             <div className="p-4 flex items-center justify-between mt-6 mb-4">
                <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>Terms Condition Detail</h1>
            </div>
               <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 ">
                {/* <p><strong> Title:</strong> {response.data.title}</p> */}
                <p className="text-lg">
                    <strong className="mr-2">Title:</strong> {response.data.title}
                </p>
                <p className="text-lg">
                    <strong className="mr-2">Description:</strong> {response.data.description}
                </p>
                {/* <p><strong>Description:</strong> {response.data.description}</p> */}
                {/* Add more TermsCondition details as needed */}
            </div>
        </div>
    );
}
