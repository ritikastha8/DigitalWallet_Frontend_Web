// export default async function Page({
//     params
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const { id } = await params;
//     return (
//         <div>
//             User Detail Page: {id}
//         </div>
//     );
// }

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
                <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>User Detail</h1>
            </div>




            {/* <div className="border border-gray-300 rounded-lg p-4"> */}

                {/* <p><strong> Profile Picture:</strong>  {response.data.imageUrl ? (
                                   <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageUrl}`} width={40} height={40} className="rounded-full" alt="User" />
                                 ) : (
                                   <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">N/A</div>
                                 )}</p> */}

                {/* <p className="flex items-center gap-2">
                    <strong className="text-gray-500">Profile Picture:</strong>
                    {response.data.imageUrl ? (
                        <Image
                        src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageUrl}`}
                        width={40}
                        height={40}
                        className="rounded-full"
                        alt="User"
                        />
                    ) : ( */}

                    {/* // <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">
                    //     N/A
                    //     </div> */}

                     {/* <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#F4AE6F] text-2xl font-bold text-white">
                      {response.data.name.charAt(0).toUpperCase()}
                    </div>
                    )}
                    </p> */}
                
                
                {/* <p><strong> Name:</strong> {response.data.name}</p>
                <p><strong>Mobile Number:</strong> {response.data.mobileNumber}</p>
                <p><strong>Email:</strong> {response.data.email}</p>
                <p><strong>Role:</strong> {response.data.role}</p> */}
                {/* <p className="text-gray-500">
  <strong className="text-gray-500">Name:</strong> {response.data.name}
</p>

<p className="text-gray-500">
  <strong className="text-gray-500">Mobile Number:</strong> {response.data.mobileNumber}
</p>

<p className="text-gray-500">
  <strong className="text-gray-500">Email:</strong> {response.data.email}
</p>

<p className="text-gray-500">
  <strong className="text-gray-500">Role:</strong> {response.data.role}
</p> */}

                {/* Add more user details as needed */}
            {/* </div> */}

            <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 ">

  {/* Profile Picture row */}
  <div className="flex items-center gap-4">
    <strong className="text-gray-700 text-lg">Profile Picture:</strong>
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
  <p className="text-gray-700 text-lg">
    <strong className="mr-2">Name:</strong> {response.data.name}
  </p>

  {/* Mobile Number */}
  <p className="text-gray-700 text-lg">
    <strong className="mr-2">Mobile Number:</strong> {response.data.mobileNumber}
  </p>

  {/* Email */}
  <p className="text-gray-700 text-lg">
    <strong className="mr-2">Email:</strong> {response.data.email}
  </p>

  {/* Role */}
  <p className="text-gray-700 text-lg">
    <strong className="mr-2">Role:</strong> {response.data.role}
  </p>

</div>



        </div>
    );
}