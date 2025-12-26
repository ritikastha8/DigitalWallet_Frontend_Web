"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, registerSchema } from "../schema";
import Link from "next/link";

export default function RegisterForm() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const [pending, startTransition] = useTransition();

    const onSubmit = (data: RegisterData) => {
        startTransition(async () => {
            console.log("Register data", data);
            await new Promise(r => setTimeout(r, 1000));
            router.push("/login"); // Redirect after registration
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <input {...register("name")} type="text" placeholder="Enter your full name" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
            {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

           <input {...register("mobileNumber")} type="tel"placeholder="Enter your mobile number" className="p-3 rounded-md border border-gray-300 focus:border-[#D07522] outline-none"/>
           {errors.mobileNumber && (<p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>)}

            <input {...register("password")} type="password" placeholder="Enter your password" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

            <input {...register("confirmPassword")} type="password" placeholder="Confirm password" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
            {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

            <button type="submit" disabled={isSubmitting || pending} className="bg-[#D07522] text-white py-2 rounded-md mt-2 hover:opacity-90 disabled:opacity-60">
                {isSubmitting || pending ? "Creating account..." : "Create Account"}
            </button>

            <p className="text-center text-sm mt-2">
                Already have an account? <Link href="/login" className="text-[#D07522] font-semibold">Log In</Link>
            </p>
        </form>
    );
}
