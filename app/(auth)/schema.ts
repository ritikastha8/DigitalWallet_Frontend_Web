import { z } from "zod";

export const loginSchema = z.object({
  mobileNumber: z
    .string()
    .min(10, "Mobile number must be at least 10 digits")
    .regex(/^[0-9]+$/, "Only numbers are allowed"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, "Enter your full name"),
    mobileNumber: z
      .string()
      .min(10, "Mobile number must be at least 10 digits")
      .regex(/^[0-9]+$/, "Only numbers are allowed"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
