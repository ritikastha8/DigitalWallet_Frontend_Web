"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import Link from "next/link";

export default function LoginForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
    });

    const [pending, startTransition] = useTransition();

    const onSubmit = (data: LoginData) => {
        startTransition(async () => {
            console.log("Login data", data);
            await new Promise(r => setTimeout(r, 1000));
            router.push("/dashboard"); // Redirect after login
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input
 {...register("mobileNumber")}
  type="tel"
  placeholder="Enter your mobile number"
  className="p-3 rounded-md border border-gray-300 focus:border-[#D07522] outline-none"
/>
{errors.mobileNumber && (
  <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>
)}


            <input
                {...register("password")}
                type="password"
                placeholder="Enter your password"
                className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="bg-[#D07522] text-white py-2 rounded-md mt-2 hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Logging in..." : "Log In"}
            </button>

            <p className="text-center text-sm mt-2">
                Don't have an account? <Link href="/register" className="text-[#D07522] font-semibold">Sign Up</Link>
            </p>
        </form>
    );
}
