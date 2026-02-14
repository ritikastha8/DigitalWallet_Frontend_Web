"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";

import { handleCreateNotification } from "@/lib/actions/admin/notification-action";
import { NotificationData, NotificationSchema } from "../schema";
import { useRouter } from "next/navigation";

export default function CreateNotificationForm() {


  const [pending, startTransition] = useTransition();
  const router= useRouter();
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NotificationData>({
    resolver: zodResolver(NotificationSchema),
  });




  const onSubmit = async (data: NotificationData) => {
    console.log("Form data:", data); 
    startTransition(async () => {
      try {

        const response = await handleCreateNotification({
  title: data.title,
  messageNotification: data.messageNotification,
});

        if (!response.success) {
          throw new Error(response.message || "Create notification failed");
        }

        toast.success("Notification created successfully");
        reset();
        router.push("/admin/notifications"); 
      } catch (error: any) {
        toast.error(error.message || "Create notification failed");
      }
    });
  };

  return (
    <div>           
      <div className="p-4 flex items-center justify-between">
        <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Create Notification
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

    {/* Message */}
      {/* <input
        type="text"
        placeholder="Message"
        {...register("messageNotification")}
        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
      /> */}
      <textarea
  placeholder="Message"
  {...register("messageNotification")}
  className="w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 py-2 text-sm outline-none focus:border-[#D07522] resize-none overflow-hidden"
  rows={1} // start with 1 row
  onInput={(e) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // reset height
    target.style.height = target.scrollHeight + "px"; // expand height based on content
  }}
/>

      
      {errors.messageNotification && <p className="text-red-600 text-sm">{errors.messageNotification.message}</p>}
     


    
      <button
        type="submit"
        disabled={pending || isSubmitting}
        className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
      >
        {pending ? "Creating..." : "Create Notification"}
      </button>
    </form>
    </div>
    </div>
  );
}
