import { handleGetOneUser } from "@/lib/actions/admin/user-action";
import Link from "next/link";
import Image from "next/image";

export default async function Page({
    params
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const response = await handleGetOneUser(id);
    if (!response.success) {
        throw new Error(response.message || 'Failed to load user');
    }

    return (
        <div>
            <Link href="/admin/users" className="text-[#D07522] hover:underline">&lt; Back</Link>
            <Link href={`/admin/users/${id}/edit`} className="text-green-600 hover:underline ml-4">Edit User</Link>

             <div className="p-4 flex items-center justify-between mt-6 mb-4">
                <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>User Detail</h1>
            </div>


               

            <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 ">

  {/* Profile Picture row */}
  <div className="flex items-center gap-4">
    <strong className="text-lg">Profile Picture:</strong>
    {response.data.imageUrl ? (
      <Image
        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageUrl}`}
        width={80}      // make image bigger
        height={80}     // make image bigger
        className="rounded-full object-cover"
        alt="User"
      />
    ) : (
      <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
        {response.data.name.charAt(0).toUpperCase()}
      </div>
    )}
  </div>

  {/* Name */}
  <p className="text-lg">
    <strong className="mr-2">Name:</strong> {response.data.name}
  </p>

  {/* Mobile Number */}
  <p className="text-lg">
    <strong className="mr-2">Mobile Number:</strong> {response.data.mobileNumber}
  </p>

  {/* Email */}
  <p className="text-lg">
    <strong className="mr-2">Email:</strong> {response.data.email}
  </p>

  {/* Role */}
  <p className="text-lg">
    <strong className="mr-2">Role:</strong> {response.data.role}
  </p>

</div>



        </div>
    );
}