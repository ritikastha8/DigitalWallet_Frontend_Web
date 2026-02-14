"use client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useState, useTransition } from "react";
import { toast } from "react-toastify";
import { NotificationData, NotificationSchema } from "../schema";
import { handleUpdateNotification } from "@/lib/actions/admin/notification-action";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function UpdateNotificationForm(
    { notification }: { notification: any }
) {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm<Partial<NotificationData>>({
        resolver: zodResolver(NotificationSchema.partial()),
        defaultValues: {
            title: notification.title || '',
            messageNotification: notification.messageNotification || '',
        }
    });
    const [error, setError] = useState<string | null>(null);


    const onSubmit = async (data: Partial<NotificationData>) => {
        setError(null);
        startTransition(async () => {
            try {
            
             
                const response = await handleUpdateNotification(notification._id, {
          title: data.title || '',
          messageNotification: data.messageNotification || '',
        });

                if (!response.success) {
                    throw new Error(response.message || 'Update notifications failed');
                }
                reset();
                router.push("/admin/notifications"); 
                
                toast.success('Notification Updated successfully');

            } catch (error: Error | any) {
                toast.error(error.message || 'Update Notification failed');
                setError(error.message || 'Update Notification failed');
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
        <h1 className="font-sans text-gray-600 font-semibold text-4xl" style={{ fontFamily: 'Nunito Sans' }}>
          Update Notification 
        </h1>

      </div>
      <div className="mt-6 border border-gray-200 rounded-lg overflow-hidden bg-white">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-6">
           

           
                <div className="space-y-1">
                    <label className="text-sm font-medium" htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        // className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-foreground/40"
                        className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 text-sm outline-none focus:border-[#D07522]"
                        {...register("title")}
                    />
                    {errors.title?.message && (
                        <p className="text-xs text-red-600">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-1">
  <label className="text-sm font-medium" htmlFor="messageNotification">Message Notification</label>
  <textarea
    id="describe"
    {...register("messageNotification")}
    placeholder="Enter Notification description"
    className="w-full h-auto min-h-[72px] max-h-40 rounded-md border border-black/10 bg-background px-3 py-2 text-sm outline-none focus:border-[#D07522] overflow-y-auto resize-none"
  />
  {errors.messageNotification?.message && (
    <p className="text-xs text-red-600">{errors.messageNotification.message}</p>
  )}
</div>
            
           

            

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-[#D07522] text-white hover:bg-orange-400 disabled:opacity-50 ]"
            >
                {isSubmitting || pending ? "Updating account..." : "Update Notification"}
            </button>
        </form>
        </div>
        </div>
    );
}