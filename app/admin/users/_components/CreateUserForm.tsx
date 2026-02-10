"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { UserData,UserSchema } from "../schema";
import { handleCreateUser } from "@/lib/actions/admin/user-action";
import { useRouter } from "next/navigation";

export default function CreateUserForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserData>({
    resolver: zodResolver(UserSchema),
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    file: File | undefined,
    onChange: (file: File | undefined) => void
  ) => {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const onSubmit = async (data: UserData) => {
    console.log("Form data:", data); 
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("mobileNumber", data.mobileNumber);
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);

        if (data.profilePhoto) {
          formData.append("profilePhoto", data.profilePhoto);
        }

        const response = await handleCreateUser(formData);

        if (!response.success) {
          throw new Error(response.message || "Create user failed");
        }

        toast.success("User created successfully");
        reset();
        handleDismissImage();
        router.push("/admin/users"); 
      } catch (error: any) {
        toast.error(error.message || "Create user failed");
      }
    });
  };

  return (
          <div>           
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Create User
        </h1>

      </div>
      {/*Box wrapper*/}
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">


    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">

      {/* Image */}
      <div className="mb-4">
        {previewImage ? (
          <div className="relative w-24 h-24">
            <img
              src={previewImage}
              alt="Preview"
              className="w-24 h-24 rounded-full object-cover"
            />
            <Controller
              name="profilePhoto"
              control={control}
              render={({ field: { onChange } }) => (
                <button
                  type="button"
                  onClick={() => handleDismissImage(onChange)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6"
                >
                  ✕
                </button>
              )}
            />
          </div>
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
            No Image
          </div>
        )}
      </div>

      {/* Image Input */}
      <Controller
        name="profilePhoto"
        control={control}
        render={({ field: { onChange } }) => (
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
          />
        )}
      />
      {errors.profilePhoto && (
        <p className="text-sm text-red-600">{errors.profilePhoto.message}</p>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        {...register("name")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

      {/* Mobile */}
      <input
        type="text"
        inputMode="numeric"
        placeholder="Mobile Number"
        {...register("mobileNumber")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.mobileNumber && (
        <p className="text-red-600 text-sm">{errors.mobileNumber.message}</p>
      )}

      
      {/* Email */}
      <input
        type="email"
        inputMode="email"
        placeholder="Email address"
        {...register("email")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.email && (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      )}

      
      

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.password && (
        <p className="text-red-600 text-sm">{errors.password.message}</p>
      )}

      {/* Confirm Password */}
      <div className="space-y-1">
        
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>
      <button
        type="submit"
        disabled={pending || isSubmitting}
        className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
      >
        {pending ? "Creating..." : "Create User"}
      </button>
    </form>
    </div>
    </div>
  );
}
