"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { LandingPageData,LandingPageSchema } from "../schema";
import { handleCreateLandingPage } from "@/lib/actions/admin/landingpage-action";
import { useRouter } from "next/navigation";

export default function CreateLandingPageForm() {
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LandingPageData>({
    resolver: zodResolver(LandingPageSchema),
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

  const onSubmit = async (data: LandingPageData) => {
    console.log("Form data:", data); 
    startTransition(async () => {
      try {
        const formData = new FormData();

        formData.append("heading", data.heading);
        formData.append("describe", data.describe);

        if (data.imageLandpage) {
          formData.append("imageLandpage", data.imageLandpage);
        }

        const response = await handleCreateLandingPage(formData);

        if (!response.success) {
          throw new Error(response.message || "Create landing page failed");
        }

        toast.success("Landing Page created successfully");
        reset();
        handleDismissImage();
        router.push("/admin/landingpages"); 
      } catch (error: any) {
        toast.error(error.message || "Create landing page failed");
      }
    });
  };

  return (
        <div>           
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Create Landing Page
        </h1>

      </div>
      {/*Box wrapper*/}
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">

      {/* Image */}
      {/* <div className="mb-4">
        {previewImage ? (
          <div className="relative w-24 h-24">
            <img
              src={previewImage}
              alt="Preview"
              className="w-36 h-36 rounded-lg object-cover"
            />
            <Controller
              name="imageLandpage"
              control={control}
              render={({ field: { onChange } }) => (
                <button
                  type="button"
                  onClick={() => handleDismissImage(onChange)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-lg w-6 h-6"
                >
                  ✕
                </button>
              )}
            />
          </div>
        ) : (
          <div className="w-36 h-36 bg-gray-300 rounded-lg flex items-center justify-center">
            No Image
          </div>
        )}
      </div> */}
      <div className="flex items-center gap-4 mb-4">
  {/* Image Preview */}
  <div className="relative w-36 h-36">
    {previewImage ? (
      <img
        src={previewImage}
        alt="Preview"
        className="w-36 h-36 rounded-lg object-cover"
      />
    ) : (
      <div className="w-36 h-36 bg-gray-300 rounded-lg flex items-center justify-center">
        No Image
      </div>
    )}

    {/* Dismiss button */}
    {previewImage && (
      <Controller
        name="imageLandpage"
        control={control}
        render={({ field: { onChange } }) => (
          <button
            type="button"
            onClick={() => handleDismissImage(onChange)}
            className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
          >
            ✕
          </button>
        )}
      />
    )}
  </div>

 
</div>


     
      <Controller
                 name="imageLandpage"
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
      {errors.imageLandpage && (
        <p className="text-sm text-red-600">{errors.imageLandpage.message}</p>
      )}

      {/* Name */}
      <input
        type="text"
        placeholder="Heading"
        {...register("heading")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.heading && <p className="text-red-600 text-sm">{errors.heading.message}</p>}

       {/* Name */}
      {/* <input
        type="text"
        placeholder="Description"
        {...register("describe")}
        className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
      /> */}
        <textarea
  placeholder="Description"
  {...register("describe")}
  className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-[#D07522] resize-none overflow-hidden"
  rows={1} // start with 1 row
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // reset height
    target.style.height = target.scrollHeight + "px"; // expand height based on content
  }}
/>
      {errors.describe && <p className="text-red-600 text-sm">{errors.describe.message}</p>}


      
      

   
      <button
        type="submit"
        disabled={pending || isSubmitting}
        className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
      >
        {pending ? "Creating..." : "Create Landing Page"}
      </button>
    </form>
    </div>
    </div>
  );
}
