"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { UserData,UserSchema } from "../schema";
import { handleCreateUser } from "@/lib/actions/admin/user-action";

export default function CreateUserForm() {
  const [pending, startTransition] = useTransition();

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
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("name", data.name);
        formData.append("mobileNumber", data.mobileNumber);
        formData.append("password", data.password);

        if (data.image) {
          formData.append("image", data.image);
        }

        const response = await handleCreateUser(formData);

        if (!response.success) {
          throw new Error(response.message || "Create user failed");
        }

        toast.success("User created successfully");
        reset();
        handleDismissImage();
      } catch (error: any) {
        toast.error(error.message || "Create user failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

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
              name="image"
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
        name="image"
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
      {errors.image && (
        <p className="text-sm text-red-600">{errors.image.message}</p>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Full Name"
        {...register("name")}
        className="h-10 w-full rounded-md border px-3"
      />
      {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}

      {/* Mobile */}
      <input
        type="text"
        inputMode="numeric"
        placeholder="Mobile Number"
        {...register("mobileNumber")}
        className="h-10 w-full rounded-md border px-3"
      />
      {errors.mobileNumber && (
        <p className="text-red-600 text-sm">{errors.mobileNumber.message}</p>
      )}

      {/* Password */}
      <input
        type="password"
        placeholder="Password"
        {...register("password")}
        className="h-10 w-full rounded-md border px-3"
      />
      {errors.password && (
        <p className="text-red-600 text-sm">{errors.password.message}</p>
      )}

      <button
        type="submit"
        disabled={pending || isSubmitting}
        className="h-10 w-full rounded-md bg-black text-white disabled:opacity-50"
      >
        {pending ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
