"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import { handleUpdateLandingPage } from "@/lib/actions/admin/landingpage-action";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { LandingPageData, LandingPageSchema } from "../schema";
export default function UpdateLandingPageForm(
    { landingpage }: { landingpage: any }
) {
    const normalizedLandingPage = landingpage?._doc ?? landingpage;
    const router = useRouter();
    const landingPageId =
        typeof normalizedLandingPage?._id === "string"
            ? normalizedLandingPage._id
            : normalizedLandingPage?._id?.$oid || normalizedLandingPage?._id?.toString?.();

    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<Partial<LandingPageData>>({
        resolver: zodResolver(LandingPageSchema.partial()),
        defaultValues: {
            heading: normalizedLandingPage.heading || '',
            describe: normalizedLandingPage.describe || '',
            imageLandpage: undefined
        }
    });

    useEffect(() => {
        reset({
            heading: normalizedLandingPage?.heading || "",
            describe: normalizedLandingPage?.describe || "",
            imageLandpage: undefined,
        });
    }, [normalizedLandingPage, reset]);

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

    const onSubmit = async (data: Partial<LandingPageData>) => {
        setError(null);
        startTransition(async () => {
            try {
                const formData = new FormData();
                if (data.heading) {
                    formData.append('heading', data.heading);
                }
                if (data.describe) {
                    formData.append('describe', data.describe);
                }
                if (data.imageLandpage) {
                    formData.append('imageLandpage', data.imageLandpage);
                }
                if (!landingPageId || landingPageId === "[object Object]") {
                    throw new Error("Invalid landing page id");
                }
                const response = await handleUpdateLandingPage(landingPageId, formData);

                if (!response.success) {
                    throw new Error(response.message || 'Update profile failed');
                }
                reset();
                handleDismissImage();
                toast.success('Landing page Updated successfully');
                router.push("/admin/landingpages");

            } catch (error: Error | any) {
                toast.error(error.message || 'Update landing page failed');
                setError(error.message || 'Update Landing page failed');
            }
        });

    };
    console.log(errors);
    return (
        <div>

        <div className="mb-4">
            <Link href="/admin/landingpages" className="text-[#D07522] hover:underline">&lt; Back</Link>
        </div>    
         {/* Update LandingPages Title */}
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Update Landing Page 
        </h1>

      </div>
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
            {/* Profile Image Display */}
            <div className="mb-4 flex items-center gap-4">
                {previewImage ? (
                    <div className="relative w-24 h-24">
                        <img
                            src={previewImage}
                            alt="Landing Page Image Preview"
                            className="w-24 h-24 rounded-lg object-cover"
                        />
                        <Controller
                            name="imageLandpage"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <button
                                    type="button"
                                    onClick={() => handleDismissImage(onChange)}
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-lg w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                                >
                                    ✕
                                </button>
                            )}
                        />
                    </div>
                ) :

                    (
                        normalizedLandingPage.imageLandpageurl ? (
                            <div className="relative w-24 h-24">
                                <Image
                                    src={normalizedLandingPage.imageLandpageurl}
                                    alt="Landing Page Image"
                                    className="w-24 h-24 rounded-lg object-cover"
                                    width={96}
                                    height={96}
                                />
                               
                            </div>
                        ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                            <span className="text-gray-600 text-sm">N/A</span>
                        </div>
                        )
                    )}

            </div>
            {/* Profile Image Input */}
            <div className="mb-4">
                
                {/* <Controller
                    name="imageLandpage"
                    control={control}
                    render={({ field: { onChange } }) => (
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={(e) => handleImageChange(e.target.files?.[0], onChange)}
                            accept=".jpg,.jpeg,.png,.webp"
                        />
                    )}
                /> */}
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
                {errors.imageLandpage && <p className="text-sm text-red-600">{errors.imageLandpage.message}</p>}
            </div>


                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="heading">Heading</label>
                    <input
                        id="heading"
                        type="text"
                        // className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
                        {...register("heading")}
                        placeholder="Enter Landing Page heading"
                    />
                    {errors.heading?.message && (
                        <p className="text-xs text-red-600">{errors.heading.message}</p>
                    )}
                </div>

                <div className="space-y-1">
  <label className="text-sm font-medium" htmlFor="describe">Description</label>
  <textarea
    id="describe"
    {...register("describe")}
    placeholder="Enter Landing Page description"
    className="w-full h-auto min-h-[72px] max-h-40 rounded-md border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:border-[#D07522] overflow-y-auto resize-none"
  />
  {errors.describe?.message && (
    <p className="text-xs text-red-600">{errors.describe.message}</p>
  )}
</div>



                
            




            

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
            >
                {isSubmitting || pending ? "Updating account..." : "Update account"}
            </button>


            {/* <Link href="/admin/landingpages/" className="text-[#D07522] font-semibold hover:underline">
                    Create Landing Page
                </Link> */}
        </form>
        </div>
        </div>
    );
}
