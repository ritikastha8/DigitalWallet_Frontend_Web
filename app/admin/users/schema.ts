// import z from "zod";

// const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

// export const UserSchema = z.object({
//     email: z.email({ message: "Enter a valid email" }),
//     password: z.string().min(6, { message: "Minimum 6 characters" }),
//     confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
//     firstName: z.string().optional(),
//     lastName: z.string().optional(),
//     username: z.string().min(3, { message: "Username must be at least 3 characters" }),
//     image: z
//         .instanceof(File)
//         .optional()
//         .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
//             message: "Max file size is 5MB",
//         })
//         .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
//             message: "Only .jpg, .jpeg, .png and .webp formats are supported",
//         }),
// }).refine((v) => v.password === v.confirmPassword, {
//     path: ["confirmPassword"],
//     message: "Passwords do not match",
// });

// export type UserData = z.infer<typeof UserSchema>;

// export const UserEditSchema = UserSchema.partial()
// export type UserEditData = z.infer<typeof UserEditSchema>;

import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const UserSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  mobileNumber: z
    .string()
    .length(10, "Mobile number must be exactly 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
      password: z.string().min(6, { message: "Minimum 6 characters" }),
    confirmPassword: z.string().min(6, { message: "Minimum 6 characters" }),
  image: z
    .instanceof(File)
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png formats are supported",
    }),
});

export type UserData = z.infer<typeof UserSchema>;

// ✏️ Edit user (partial update)
export const UserEditSchema = UserSchema.partial();
export type UserEditData = z.infer<typeof UserEditSchema>;
