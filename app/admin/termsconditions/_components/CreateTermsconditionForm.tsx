import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

import { useRouter } from "next/navigation";
import { TermsConditionData, TermsConditionSchema } from "../schema";
import { handleCreateTermsCondition } from "@/lib/actions/admin/termscondition-action";

export default function CreateTermsConditionForm() {


  const [pending, startTransition] = useTransition();
  const router= useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TermsConditionData>({
    resolver: zodResolver(TermsConditionSchema),
  });




  const onSubmit = async (data: TermsConditionData) => {
    console.log("Form data:", data); 
    startTransition(async () => {
      try {
      
        const response = await handleCreateTermsCondition({
  title: data.title,
  description: data.description,
});

        if (!response.success) {
          throw new Error(response.message || "Create terms condition failed");
        }

        toast.success("Terms Condition created successfully");
        reset();
        router.push("/admin/termsconditions"); 
      } catch (error: any) {
        toast.error(error.message || "Create terms condition failed");
      }
    });
  };

  return (
    <div>           
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-[#D07522] font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Create Terms & Condition
        </h1>

      </div>
      {/*Box wrapper*/}
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">

      {/* Title */}
      <input
        type="text"
        placeholder="Title"
        {...register("title")}
        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
      />
      {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}

      <textarea
  placeholder="Message"
  {...register("description")}
  className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-[#D07522] resize-none overflow-hidden"
  rows={1} // start with 1 row
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // reset height
    target.style.height = target.scrollHeight + "px"; // expand height based on content
  }}
/>

      
      {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
     


    
      <button
        type="submit"
        disabled={pending || isSubmitting}
        className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
      >
        {pending ? "Creating..." : "Create TermsCondition"}
      </button>
    </form>
    </div>
    </div>
   
  );
}
