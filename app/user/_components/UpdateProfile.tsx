"use client";

import { useAuth } from "@/context/AuthContext";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useState, useRef } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation"; // 🔹 for redirect/back

import { UpdateUserData, updateUserSchema } from "../schema";
import { handleUpdateProfile } from "@/lib/actions/users/auth-action";

export default function UpdateUserForm({ user }: { user: any }) {
  const [isPending,startTransition] = useTransition();
  const router = useRouter(); // next/router hook
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
    startTransition(async () => {
      try {
      const formData = new FormData();
      formData.append('name', data.name);
      formData.append('mobileNumber', data.mobileNumber);

      if (data.profilePhoto) formData.append('profilePhoto', data.profilePhoto);

      const response = await handleUpdateProfile(formData);
      if (!response.success) throw new Error(response.message || "Update profile failed");
      setUser(response.data.user); //  Update user context with new data
      handleDismissImage();
      toast.success("Profile updated successfully");

      // Update user context with new data
      setUser(response.data.user);    
      router.push("/user/dashboard");
      
      

    } catch (err: any) {
      toast.error(err.message || "Profile update failed");
      setError(err.message || "Profile update failed");
    }
  });
}

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 flex items-center gap-4">
        {/* Back button */}
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
            name="profilePhoto"
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
                {errors.profilePhoto && (
                  <p className="text-sm text-red-600">{errors.profilePhoto.message}</p>
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
