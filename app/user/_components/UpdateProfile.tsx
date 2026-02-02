// // "use client";
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import { Controller, useForm } from "react-hook-form";
// // import { useState, useRef } from "react";
// // import Image from "next/image";
// // import { toast } from "react-toastify";
// // import { handleUpdateProfile } from "@/lib/actions/auth-action";

// // import { UpdateUserData, updateUserSchema } from "../schema";

// // export default function UpdateUserForm({ user }: { user: any }) {
// //   const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
// //     useForm<UpdateUserData>({
// //       resolver: zodResolver(updateUserSchema),
// //       values: {
// //         name: user?.name || "",
// //         mobileNumber: user?.mobileNumber || "",
// //       },
// //     });

// //   const [error, setError] = useState<string | null>(null);
// //   const [previewImage, setPreviewImage] = useState<string | null>(null);
// //   const fileInputRef = useRef<HTMLInputElement>(null);

// //   const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
// //     if (file) {
// //       const reader = new FileReader();
// //       reader.onloadend = () => setPreviewImage(reader.result as string);
// //       reader.readAsDataURL(file);
// //     } else {
// //       setPreviewImage(null);
// //     }
// //     onChange(file);
// //   };

// //   const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
// //     setPreviewImage(null);
// //     onChange?.(undefined);
// //     if (fileInputRef.current) fileInputRef.current.value = '';
// //   };

// //   const onSubmit = async (data: UpdateUserData) => {
// //     setError(null);
// //     try {
// //       const formData = new FormData();
// //       formData.append('name', data.name);
// //       formData.append('mobileNumber', data.mobileNumber);
// //       if (data.imageUrl) formData.append('image', data.imageUrl);

// //       const response = await handleUpdateProfile(formData);
// //       if (!response.success) throw new Error(response.message || "Update profile failed");

// //       handleDismissImage();
// //       toast.success("Profile updated successfully");
// //     } catch (err: any) {
// //       toast.error(err.message || "Profile update failed");
// //       setError(err.message || "Profile update failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
// //       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
// //         {error && <p className="text-sm text-red-600">{error}</p>}

// // {/* Profile Image Display */}
// // <div className="mb-4">
// //   <Controller
// //     name="imageUrl"
// //     control={control}
// //     render={({ field: { onChange } }) => (

// //       <div className="flex flex-col items-center gap-2">
// //         <div className="relative w-24 h-24">
// //           {previewImage ? (
// //             <>
// //               <img
// //                 src={previewImage}
// //                 alt="Profile Preview"
// //                 className="w-24 h-24 rounded-full object-cover"
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => handleDismissImage(onChange)}
// //                 className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
// //               >
// //                 ✕
// //               </button>
// //             </>
// //           ) : user?.imageUrl ? (
// //             <Image
// //               src={
// //                 process.env.NEXT_PUBLIC_API_BASE_URL +
// //                 (user.imageUrl.startsWith('/') ? user.imageUrl : '/' + user.imageUrl)
// //               }
// //               alt={user.name}
// //               width={96}
// //               height={96}
// //               className="w-24 h-24 rounded-full object-cover"
// //             />
// //           ) : (
// //             <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
// //               {user.name?.charAt(0).toUpperCase() || "U"}
// //             </div>
// //           )}
// //         </div>

// //         {/* File input to update avatar */}
// //         <input
// //           ref={fileInputRef}
// //           type="file"
// //           onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
// //           accept=".jpg,.jpeg,.png,.webp"
// //           className="mt-1"
// //         />
// //         {errors.imageUrl && (
// //           <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
// //         )}
// //       </div>
// //     )}
// //   />
// // </div>




// //   {/* {user.image ? (
// //                   <Image
// //                     src={user.image}
// //                     alt={user.name}
// //                     width={32}
// //                     height={32}
// //                     className="rounded-full"
// //                   />
// //                 ) : (
// //                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
// //                     {user.name.charAt(0).toUpperCase()}
// //                   </div>
// //                 )} */}

        

// //         {/* Profile Image Display
// // <div className="mb-4">
// //   {previewImage ? (
// //     // When user selects a new image to preview
// //     <div className="relative w-24 h-24">
// //       <img
// //         src={previewImage}
// //         alt="Profile Image Preview"
// //         className="w-24 h-24 rounded-full object-cover"
// //       />
// //       <Controller
// //         name="imageUrl"
// //         control={control}
// //         render={({ field: { onChange } }) => (
// //           <button
// //             type="button"
// //             onClick={() => handleDismissImage(onChange)}
// //             className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
// //           >
// //             ✕
// //           </button>
// //         )}
// //       />
// //     </div>
// //   ) : user?.imageUrl ? (
// //     // If user has an image URL, use it
// //     <Image
// //       src={
// //         process.env.NEXT_PUBLIC_API_BASE_URL +
// //         (user.imageUrl.startsWith('/') ? user.imageUrl : '/' + user.imageUrl)
// //       }
// //       alt="Profile Image"
// //       width={100}
// //       height={100}
// //       className="w-24 h-24 rounded-full object-cover"
// //     />
// //   ) : (
// //     // If no image, show the first letter of name
// //     <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
// //       <span className="text-gray-600 text-xl font-semibold">
// //         {user.name.charAt(0).toUpperCase()}
// //       </span>
// //     </div>
// //   )}
// // </div> */}


// //         {/* Profile Image Input */}
// //         <div className="mb-4">
// //           <label className="block text-sm font-medium mb-1">Profile Image</label>
// //           <Controller
// //             name="imageUrl"
// //             control={control}
// //             render={({ field: { onChange } }) => (
// //               <input
// //                 ref={fileInputRef}
// //                 type="file"
// //                 onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
// //                 accept=".jpg,.jpeg,.png,.webp"
// //               />
// //             )}
// //           />
// //           {errors.imageUrl && <p className="text-sm text-red-600">{errors.imageUrl.message}</p>}
// //         </div>

// //         {/* Name */}
// //         <div>
// //           <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
// //           <input
// //             id="name"
// //             type="text"
// //             {...register("name")}
// //             className="w-full border border-gray-300 rounded px-3 py-2"
// //           />
// //           {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
// //         </div>

// //         {/* Mobile Number */}
// //         <div>
// //           <label className="block text-sm font-medium mb-1" htmlFor="mobileNumber">Mobile Number</label>
// //           <input
// //             id="mobileNumber"
// //             type="text"
// //             {...register("mobileNumber")}
// //             className="w-full border border-gray-300 rounded px-3 py-2"
// //           />
// //           {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>}
// //         </div>

// //         {/* Submit Button */}
// //         <button
// //           type="submit"
// //           disabled={isSubmitting}
// //           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
// //         >
// //           {isSubmitting ? 'Updating...' : 'Update Profile'}
// //         </button>
// //       </form>
// //     </div>
// //   );
// // }

// "use client";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Controller, useForm } from "react-hook-form";
// import { useState, useRef } from "react";
// import Image from "next/image";
// import { toast } from "react-toastify";
// import { handleUpdateProfile } from "@/lib/actions/auth-action";
// import { UpdateUserData, updateUserSchema } from "../schema";

// export default function UpdateUserForm({ user }: { user: any }) {
//   const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
//     useForm<UpdateUserData>({
//       resolver: zodResolver(updateUserSchema),
//       values: {
//         name: user?.name || "",
//         mobileNumber: user?.mobileNumber || "",
//       },
//     });

//   const [error, setError] = useState<string | null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Construct full profile image URL
//   const profileImageUrl = user?.imageUrl
//     ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`
//     : null;

//   const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewImage(reader.result as string);
//       reader.readAsDataURL(file);
//     } else {
//       setPreviewImage(null);
//     }
//     onChange(file);
//   };

//   const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
//     setPreviewImage(null);
//     onChange?.(undefined);
//     if (fileInputRef.current) fileInputRef.current.value = '';
//   };

//   const onSubmit = async (data: UpdateUserData) => {
//   setError(null);
//   try {
//     const formData = new FormData();
//     formData.append('name', data.name);
//     formData.append('mobileNumber', data.mobileNumber);

//     // <-- IMPORTANT: backend expects profilePhoto
//     // if (data.imageUrl instanceof File) {
//     //   formData.append('profilePhoto', data.imageUrl);
//     // }

//     // const response = await handleUpdateProfile(formData); // calls server action
//     // if (!response.success) throw new Error(response.message || "Update profile failed");

//     // handleDismissImage();
//     // toast.success("Profile updated successfully");
//     if (data.imageUrl) {
//                 formData.append('profilePhoto', data.imageUrl);
//             }
//             const response = await handleUpdateProfile(formData);
            
//             if (!response.success) {
//                 throw new Error(response.message || 'Update profile failed');
//             }

//             handleDismissImage();
//             toast.success('Profile updated successfully');
//   } catch (err: any) {
//     toast.error(err.message || "Profile update failed");
//     setError(err.message || "Profile update failed");
//   }
// };


//   return (
//     <div>
//       <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
//       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//         {error && <p className="text-sm text-red-600">{error}</p>}

//         {/* Profile Image Display */}
//         <div className="mb-4">
//           <Controller
//             name="imageUrl"
//             control={control}
//             render={({ field: { onChange } }) => (
//               <div className="flex flex-col items-center gap-2">
//                 <div className="relative w-24 h-24">
//                   {previewImage ? (
//                     <>
//                       <img
//                         src={previewImage}
//                         alt="Profile Preview"
//                         className="w-24 h-24 rounded-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleDismissImage(onChange)}
//                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
//                       >
//                         ✕
//                       </button>
//                     </>
//                   ) : profileImageUrl ? (
//                     <Image
//                       src={profileImageUrl}
//                       alt={user.name}
//                       width={96}
//                       height={96}
//                       className="w-24 h-24 rounded-full object-cover"
//                     />
//                   ) : (
//                     <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                 </div>

//                 {/* File input to update avatar */}
//                 <input
//                   ref={fileInputRef}
//                   type="file"
//                   onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
//                   accept=".jpg,.jpeg,.png,.webp"
//                   className="mt-1"
//                 />
//                 {errors.imageUrl && (
//                   <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
//                 )}
//               </div>
//             )}
//           />
//         </div>

//         {/* Name */}
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
//           <input
//             id="name"
//             type="text"
//             {...register("name")}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
//         </div>

//         {/* Mobile Number */}
//         <div>
//           <label className="block text-sm font-medium mb-1" htmlFor="mobileNumber">Mobile Number</label>
//           <input
//             id="mobileNumber"
//             type="text"
//             {...register("mobileNumber")}
//             className="w-full border border-gray-300 rounded px-3 py-2"
//           />
//           {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>}
//         </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isSubmitting}
//           className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
//         >
//           {isSubmitting ? 'Updating...' : 'Update Profile'}
//         </button>
//       </form>
//     </div>
//   );
// }

"use client";

import { useAuth } from "@/context/AuthContext";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // 🔹 for redirect/back
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { UpdateUserData, updateUserSchema } from "../schema";

export default function UpdateUserForm({ user }: { user: any }) {

  const router = useRouter(); // 🔹 next/router hook
    const { setUser } = useAuth();
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } =
    useForm<UpdateUserData>({
      resolver: zodResolver(updateUserSchema),
      values: {
        name: user?.name || "",
        mobileNumber: user?.mobileNumber || "",
      },
    });

  const [error, setError] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const profileImageUrl = user?.imageUrl
    ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`
    : null;

  const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
    onChange(file);
  };

  const handleDismissImage = (onChange?: (file: File | undefined) => void) => {
    setPreviewImage(null);
    onChange?.(undefined);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const onSubmit = async (data: UpdateUserData) => {
    setError(null);
    try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('mobileNumber', data.mobileNumber);

      if (data.imageUrl) formData.append('profilePhoto', data.imageUrl);

      const response = await handleUpdateProfile(formData);
      if (!response.success) throw new Error(response.message || "Update profile failed");
      setUser(response.data.user); //  Update user context with new data
      handleDismissImage();
      toast.success("Profile updated successfully");

      // 🔹 Update user context with new data
      setUser(response.data);

      // 🔹 Redirect to dashboard after update
      router.push("/user/dashboard");

    } catch (err: any) {
      toast.error(err.message || "Profile update failed");
      setError(err.message || "Profile update failed");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-4">
        {/* 🔹 Back button */}
        <button
          onClick={() => router.push("/user/dashboard")}
          className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
        >
          ← Back
        </button>
        Profile Page
      </h1>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-sm text-red-600">{error}</p>}

        {/* Profile Image */}
        <div className="mb-4">
          <Controller
            name="imageUrl"
            control={control}
            render={({ field: { onChange } }) => (
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-24 h-24">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleDismissImage(onChange)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      >
                        ✕
                      </button>
                    </>
                  ) : profileImageUrl ? (
                    <Image
                      src={profileImageUrl}
                      alt={user.name}
                      width={96}
                      height={96}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                  accept=".jpg,.jpeg,.png,.webp"
                  className="mt-1"
                />
                {errors.imageUrl && (
                  <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
                )}
              </div>
            )}
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
        </div>

        {/* Mobile Number */}
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="mobileNumber">Mobile Number</label>
          <input
            id="mobileNumber"
            type="text"
            {...register("mobileNumber")}
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
}
