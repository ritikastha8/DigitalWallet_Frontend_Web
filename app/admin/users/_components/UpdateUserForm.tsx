"use client";
import { Controller, useForm } from "react-hook-form";
import { UserData, UserEditData, UserEditSchema, UserSchema } from "@/app/admin/users/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleUpdateUser } from "@/lib/actions/admin/user-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
export default function UpdateUserForm(
    { user }: { user: any }
) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    // const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<Partial<UserData>>({
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<UserEditData>({
        resolver: zodResolver(UserEditSchema),
        defaultValues: {
            name: user.name || '',
            mobileNumber:user.mobileNumber || '',
            email: user.email || '',
            profilePhoto: undefined,
            role:user.role || 'user'
        }
    });
    const [error, setError] = useState<string | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (file: File | undefined, onChange: (file: File | undefined) => void) => {
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
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
            fileInputRef.current.value = '';
        }
    };
    const onSubmit = async (data: UserEditData) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                if (data.name) {
                    formData.append('name', data.name);
                }
                if (data.mobileNumber) {
                    formData.append('mobileNumber', data.mobileNumber);
                }
                if (data.email) {
                    formData.append('email', data.email);
                }
                if (data.profilePhoto) {
                    formData.append('profilePhoto', data.profilePhoto);
                }
                 if (data.role) {
                    formData.append('role', data.role);
                }
                const response = await handleUpdateUser(user._id, formData);

                if (!response.success) {
                    throw new Error(response.message || 'Update profile failed');
                }
                reset();
                handleDismissImage();
                toast.success('Profile Updated successfully');
                router.push("/admin/users");

            } catch (error: Error | any) {
                toast.error(error.message || 'Update profile failed');
                setError(error.message || 'Update profile failed');
            }
        });

    };
    console.log(errors);
    return (
        <div>

        <div className="mb-4">
            <Link href="/admin/users" className="text-[#D07522] hover:underline">&lt; Back</Link>
        </div>   

                 {/* Update LandingPages Title */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Update User
        </h1>

      </div>
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white"> 
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Profile Image Display */}
            <div className="mb-4">
                {previewImage ? (
                    <div className="relative w-24 h-24">
                        <img
                            src={previewImage}
                            alt="Profile Image Preview"
                            className="w-24 h-24 rounded-full object-cover"
                        />
                        <Controller
                            name="profilePhoto"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <button
                                    type="button"
                                    onClick={() => handleDismissImage(onChange)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            )}
                        />
                    </div>
                ) :

                    (
                        user.imageUrl ? (
                            <div className="relative w-24 h-24">
                                <Image
                                    src={user.imageUrl}
                                    alt="Profile Image"
                                    className="w-24 h-24 rounded-full object-cover"
                                    width={96}
                                    height={96}
                                />
                               
                            </div>
                        ) : (
                           

                              <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-4xl font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                        )
                    )}

            </div>
            {/* Profile Image Input */}
            <div className="mb-4">
                {/* <label className="block text-sm font-medium mb-1">Profile Image</label> */}
                {/* <Controller
                    name="profilePhoto"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                            accept=".jpg,.jpeg,.png,.webp"
                            // className="text-sm text-gray-500 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                        />
                    )}
                /> */}
                <Controller
                 name="profilePhoto"
                 control={control}
                 render={({ field: { onChange } }) => (
                 <>
                  {/* hidden file input */}
                  <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  className="hidden"
                  onChange={(e) =>
                    handleImageChange(e.target.files?.[0], onChange)
                }
                />
                {/* styled button */}
                <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="h-11 px-6 rounded-full bg-gradient-to-r from-[#D07522] to-[#F4AE6F] text-white font-medium shadow-md hover:opacity-90 active:scale-[0.97] transition-all "
                // className="text-sm text-gray-500 file:border file:border-gray-300 file:rounded-lg file:px-3 file:py-2 file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                >
                    Choose Image
                </button>
                </>
            )}
            />

                {errors.profilePhoto && <p className="text-sm text-red-600">{errors.profilePhoto.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="name">Name</label>
                    <input
                        id="name"
                        type="text"
                        autoComplete="given-name"
                        // className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
                        {...register("name")}
                        placeholder="Jane"
                    />
                    {errors.name?.message && (
                        <p className="text-xs text-red-600">{errors.name.message}</p>
                    )}
                </div>
                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="mobileNumber">Mobile Number</label>
                    <input
                        id="mobileNumber"
                        type="text"
                        autoComplete="numeric"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"

                        {...register("mobileNumber")}
                        placeholder="9876543274"
                    />
                    {errors.mobileNumber?.message && (
                        <p className="text-xs text-red-600">{errors.mobileNumber.message}</p>
                    )}
                </div>
            </div>
             <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="email">Email</label>
                <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"

                    {...register("email")}
                    placeholder="you@example.com"
                />
                {errors.email?.message && (
                    <p className="text-xs text-red-600">{errors.email.message}</p>
                )}
            </div>
            {/* Role Dropdown */}
<div>
  <label className="block text-sm font-medium mb-1" htmlFor="role">Role</label>
  <select
    id="role"
    {...register("role")}
    defaultValue={user.role || "user"} // Pre-fill current role, default to "user"

    className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
    // className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
  >
    <option value="user">User</option>
    <option value="admin">Admin</option>
  </select>
</div>

            </div>

            

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
            >
                {isSubmitting || pending ? "Updating account..." : "Update account"}
            </button>
        </form>
        </div>
        </div>
    );
}