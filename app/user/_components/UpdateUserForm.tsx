"use client";

import { useAuth } from "@/context/AuthContext";

import { useEffect, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // 🔹 for redirect/back

import { UpdateUserData, updateUserSchema } from "../schema";
import { handleUpdateProfile } from "@/lib/actions/users/auth-action";
import Link from "next/link";

export default function UpdateUserForm({ user }: { user: any }) {
  // const [isPending,startTransition] = useTransition();
  const router = useRouter(); // next/router hook
    const { setUser,checkAuth } = useAuth();
     const form =  useForm<UpdateUserData>({
  resolver: zodResolver(updateUserSchema),
  defaultValues: {
    name: "",
    mobileNumber: "",
  },
});
  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = form;
    // useForm<UpdateUserData>({
    //   resolver: zodResolver(updateUserSchema),
    //   values: {
    //     name: user?.name || "",
    //     mobileNumber: user?.mobileNumber || "",
    //   },
    // });
 

useEffect(() => {
  if (user) {
    form.reset({
      name: user.name,
      mobileNumber: user.mobileNumber,
    });
  }
}, [user]);


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

//   const onSubmit = async (data: UpdateUserData) => {
//     setError(null);
//     startTransition(async () => {
//       try {
//       const formData = new FormData();
//       formData.append('name', data.name);
//       formData.append('mobileNumber', data.mobileNumber);

//       if (data.profilePhoto) formData.append('profilePhoto', data.profilePhoto);

//       const response = await handleUpdateProfile(formData);
//       if (!response.success) throw new Error(response.message || "Update profile failed");
//       setUser(response.data.user); //  Update user context with new data
//       handleDismissImage();
//       toast.success("Profile updated successfully");
     
//       // Update user context with new data
//       setUser(response.data.user);    
//       // router.push("/user/dashboard");
      
      

//     } catch (err: any) {
//       toast.error(err.message || "Profile update failed");
//       setError(err.message || "Profile update failed");
//     }
//   });
// }
const onSubmit = async (data: UpdateUserData) => {
  setError(null);

  try {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.mobileNumber !== undefined) {
      formData.append("mobileNumber", data.mobileNumber);
    }

    if (data.profilePhoto) {
      formData.append("profilePhoto", data.profilePhoto);
    }

    const response = await handleUpdateProfile(formData);

    if (!response.success) {
      throw new Error(response.message || "Update profile failed");
    }
    setUser(response.data.user);
    await checkAuth();
    handleDismissImage();
    toast.success("Profile updated successfully");
    // router.push("user/dashboard");
   
    
    // toast.success("Profile updated successfully");

    // optional but recommended
    // router.refresh();

  } catch (err: any) {
    toast.error(err.message || "Profile update failed");
    setError(err.message || "Profile update failed");
  }
};

  return (
    // <div>
    //    <li><Link href="/user/dashboard" className="text-[#D07522] hover:underline">Back</Link></li>
    //   <h1 className="text-2xl font-bold mb-4 flex items-center gap-4">
    //     {/* Back button */}
        
       
    //     Profile Page
    //   </h1>

    //   <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
    //     {error && <p className="text-sm text-red-600">{error}</p>}

    //     {/* Profile Image */}
    //     <div className="mb-4">
    //       <Controller
    //         name="profilePhoto"
    //         control={control}
    //         render={({ field: { onChange } }) => (
    //           <div className="flex flex-col items-center gap-2">
    //             <div className="relative w-24 h-24">
    //               {previewImage ? (
    //                 <>
    //                   <img
    //                     src={previewImage}
    //                     alt="Profile Preview"
    //                     className="w-24 h-24 rounded-full object-cover"
    //                   />
    //                   <button
    //                     type="button"
    //                     onClick={() => handleDismissImage(onChange)}
    //                     className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
    //                   >
    //                     ✕
    //                   </button>
    //                 </>
    //               ) : profileImageUrl ? (
    //                 <Image
    //                   src={profileImageUrl}
    //                   alt={user.name}
    //                   width={96}
    //                   height={96}
    //                   className="w-24 h-24 rounded-full object-cover"
    //                 />
    //               ) : (
    //                 <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
    //                   {user.name.charAt(0).toUpperCase()}
    //                 </div>
    //               )}
    //             </div>
    //             <input
    //               ref={fileInputRef}
    //               type="file"
    //               onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
    //               accept=".jpg,.jpeg,.png,.webp"
    //               className="mt-1"
    //             />
    //             {errors.profilePhoto && (
    //               <p className="text-sm text-red-600">{errors.profilePhoto.message}</p>
    //             )}
    //           </div>
    //         )}
    //       />
    //     </div>

    //     {/* Name */}
    //     <div>
    //       <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
    //       <input
    //         id="name"
    //         type="text"
    //         {...register("name")}
    //         className="w-full border border-gray-300 rounded px-3 py-2"
    //       />
    //       {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
    //     </div>

    //     {/* Mobile Number */}
    //     <div>
    //       <label className="block text-sm font-medium mb-1" htmlFor="mobileNumber">Mobile Number</label>
    //       <input
    //         id="mobileNumber"
    //         type="text"
    //         {...register("mobileNumber")}
    //         className="w-full border border-gray-300 rounded px-3 py-2"
    //       />
    //       {errors.mobileNumber && <p className="text-sm text-red-600">{errors.mobileNumber.message}</p>}
    //     </div>

    //     {/* Submit Button */}
    //     <button
    //       type="submit"
    //       disabled={isSubmitting}
    //       className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
    //     >
    //       {isSubmitting ? 'Updating...' : 'Update Profile'}
    //     </button>
    //   </form>
    // </div>
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
  <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
    {/* Back Link */}
    <div className="mb-6">
      <Link href="/user/dashboard" className="text-[#D07522] hover:underline font-medium">
        &larr; Back
      </Link>
    </div>

    <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Profile Page</h1>

    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-sm text-red-600 text-center">{error}</p>}

      {/* Profile Image */}
      <Controller
        name="profilePhoto"
        control={control}
        render={({ field: { onChange } }) => (
          <div className="flex flex-col items-center gap-3">
            <div className="relative w-28 h-28">
              {previewImage ? (
                <>
                  <img
                    src={previewImage}
                    alt="Profile Preview"
                    className="w-28 h-28 rounded-full object-cover border-2 border-[#D07522]"
                  />
                  <button
                    type="button"
                    onClick={() => handleDismissImage(onChange)}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600 shadow"
                  >
                    ✕
                  </button>
                </>
              ) : profileImageUrl ? (
                <Image
                  src={profileImageUrl}
                  alt={user.name}
                  width={112}
                  height={112}
                  className="w-28 h-28 rounded-full object-cover border-2 border-[#D07522]"
                />
              ) : (
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-[#F4AE6F] text-4xl font-bold text-white border-2 border-[#D07522]">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
              accept=".jpg,.jpeg,.png,.webp"
              className="text-sm text-gray-500 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
            />
            {errors.profilePhoto && (
              <p className="text-sm text-red-600">{errors.profilePhoto.message}</p>
            )}
          </div>
        )}
      />

      {/* Name */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      {/* Mobile Number */}
      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700" htmlFor="mobileNumber">
          Mobile Number
        </label>
        <input
          id="mobileNumber"
          type="text"
          {...register("mobileNumber")}
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
        />
        {errors.mobileNumber && (
          <p className="text-sm text-red-600 mt-1">{errors.mobileNumber.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#D07522] text-white font-medium rounded-xl shadow hover:bg-[#b0631a] disabled:opacity-50 transition-colors"
      >
        {isSubmitting ? "Updating..." : "Update Profile"}
      </button>
    </form>
  </div>
</div>

  );
}
