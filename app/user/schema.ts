import { z } from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const updateUserSchema = z.object({
    name: z.string().min(2, { message: "Minimum 2 characters" }),
    mobileNumber:  z
        .string()
        .regex(/^\d{10}$/, { message: "Mobile number must be exactly 10 digits" })
        ,
    imageUrl: z
        .instanceof(File)
        .optional()
        .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
            message: "Max file size is 5MB",
        })
        .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
            message: "Only .jpg, .jpeg, .png and .webp formats are supported",
        }),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
