import { z } from "zod";

export const NotificationSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  messageNotification: z.string().min(10, "Message must be at least 10 characters")



});

export type NotificationData = z.infer<typeof NotificationSchema>;

// Edit notification (partial update)
export const NotificationEditSchema = NotificationSchema.partial();
export type NotificationEditData = z.infer<typeof NotificationEditSchema>;
