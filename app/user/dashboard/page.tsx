// // export default function Page() {
// //     return (
// //         <div>
// //             Welcome Back
// //         </div>
// //     );
// // }
export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-20">
      {/* Empty section as per design */}
    </div>
  );
}

// // import { handleGetOneLandingPage } from "@/lib/actions/admin/landingpage-action";
// import Link from "next/link";
// import Image from "next/image";
// import { handleGetOneLandingPageforUser } from "@/lib/actions/users/landingpage-action";
// // import { handleGetOneLandingPageforUser } from "@/lib/actions/users/landingpage-action";

// export default async function HomePage({
//     params
// }: {
//     params: Promise<{ id: string }>;
// }) {
//     const { id } = await params;
//     const response = await handleGetOneLandingPageforUser(id);
//     if (!response.success) {
//         throw new Error(response.message || 'Failed to load landing page');
//     }

//     return (
//         <div>
           

//              <div className="p-4 flex items-center justify-between mt-6 mb-4">
//                 <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>Landing Page Detail</h1>
//             </div>



                
                
  

//                 {/* Add more LandingPage details as needed */}
    

//             {/* <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 "> */}

//   {/* LandingPage Picture row */}
//   {/* <div className="flex items-center gap-4"> */}
//     {/* <strong className="text-gray-700 text-lg">Landing Page Picture:</strong> */}
//     {/* {response.data.imageLandpageurl ? (
//       <Image
//         src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageLandpageurl}`}
//         width={100}      // make image bigger
//         height={100}     // make image bigger
//         className="rounded-md object-cover"
//         alt="LandingPageImg"
//       />
//     ) : (
//     <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
//         <span className="text-gray-600 text-sm">N/A</span>
//     </div>
//     )}
//   </div> */}

//   {/* <div className="border border-gray-300 rounded-lg p-6 flex gap-6 items-start w-200"> */}

//   {/* LEFT: Image */}
//   {/* <div className="w-[180px] h-[180px] flex-shrink-0">
//     {response.data.imageLandpageurl ? (
//       <Image
//         src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageLandpageurl}`}
//         width={180}
//         height={180}
//         className="rounded-lg object-cover w-full h-full"
//         alt="LandingPageImg"
//       />
//     ) : (
//       <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
//         <span className="text-gray-600">N/A</span>
//       </div>
//     )}
//   </div> */}

//   {/* RIGHT: Text content */}
//   {/* <div className="flex flex-col gap-3">
//     <h2 className="text-2xl font-semibold text-gray-700"><span className="font-bold mr-2 text-gray-900">Heading:</span>
//       {response.data.heading}
//     </h2>

//     <p className="text-gray-600 text-base leading-relaxed"><strong className="mr-2">Description:</strong>
//       {response.data.describe}
//     </p>
//   </div>

// </div> */}


//   {/* Name */}
//   {/* <p className="text-gray-700 text-lg">
//     <strong className="mr-2">Heading:</strong> {response.data.heading}
//   </p> */}

//    {/* Name */}
//   {/* <p className="text-gray-700 text-lg">
//     <strong className="mr-2">Description:</strong> {response.data.describe}
//   </p> */}

// {/* </div> */}


// <div className="border border-gray-300 rounded-lg p-6 space-y-2 w-200 ">

//   {/* Profile Picture row */}
//   <div className="flex items-center gap-4">
//     <strong className="text-gray-700 text-lg">Landing Page Picture:</strong>
//     {response.data.imageLandpageurl ? (
//       <Image
//         src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${response.data.imageLandpageurl}`}
//         width={100}      // make image bigger
//         height={100}     // make image bigger
//         className="rounded-lg object-cover"
//         alt="User"
//       />
//     ) : (
//       <div className="w-full h-full bg-gray-300 rounded-lg flex items-center justify-center">
//         <span className="text-gray-600">N/A</span>
//       </div>
//     )}
//   </div>

//    {/* Heading */}
//   <p className="text-gray-700 text-lg">
//     <strong className="mr-2">Heading:</strong> {response.data.heading}
//   </p>

//    {/* Description */}
//   <p className="text-gray-700 text-lg">
//     <strong className="mr-2">Description:</strong> {response.data.describe}
//   </p>

// </div>



//         </div>
//     );
// }