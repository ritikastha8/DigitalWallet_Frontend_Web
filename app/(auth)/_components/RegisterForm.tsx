// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState,useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { RegisterData, registerSchema } from "../schema";
// import { handleRegister } from "@/lib/actions/auth-action";
// import Link from "next/link";

// export default function RegisterForm() {
//     const router = useRouter();
//     const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
//         resolver: zodResolver(registerSchema),
//         mode: "onSubmit",
//     });

//     const [pending, startTransition] = useTransition();
//     const [error, setError] = useState<string | null>(null);

//     const onSubmit = async(data: RegisterData) => {
//         setError(null);
//         startTransition(async () => {
            
//             // console.log("Register data", data);
//     //          const payload = {
//     //   name: data.name,
//     //   mobileNumber: data.mobileNumber,
//     //   password: data.password,
//     // };

//     // console.log("Payload to backend:", payload);
    
//     //         await new Promise(r => setTimeout(r, 1000));
//     //         router.push("/login"); // Redirect after registration
//     //     });
//     try {
//         // const payload = {
//         //   name: data.name,
//         //   mobileNumber: data.mobileNumber,
//         //   password: data.password,
//         // };

//         const response = await handleRegister(data);
//         if (!response.success) {
//                     throw new Error(response.message);
//                 }
//                 if (response.success) {
//                     router.push("/login");
//                 } else {
//                     setError('Registration failed');
//                 }

//             } catch (err: Error | any) {
//                 setError(err.message || 'Registration failed');
//             }
//     });
//             console.log("register", data);
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//             {error && <p className="text-red-500 text-xs">{error}</p>}
//             <input {...register("name")} type="text" placeholder="Enter your full name" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
//             {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

//            <input {...register("mobileNumber")} type="tel"placeholder="Enter your mobile number" className="p-3 rounded-md border border-gray-300 focus:border-[#D07522] outline-none"/>
//            {errors.mobileNumber && (<p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>)}

//             <input {...register("password")} type="password" placeholder="Enter your password" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
//             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

//             <input {...register("confirmPassword")} type="password" placeholder="Confirm password" className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none" />
//             {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}

//             <button type="submit" disabled={isSubmitting || pending} className="bg-[#D07522] text-white py-2 rounded-md mt-2 hover:opacity-90 disabled:opacity-60">
//                 {isSubmitting || pending ? "Creating account..." : "Create Account"}
//             </button>

//             <p className="text-center text-sm mt-2">
//                 Already have an account? <Link href="/login" className="text-[#D07522] font-semibold">Log In</Link>
//             </p>
//         </form>
//     );
// }


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, registerSchema } from "../schema";
import { handleRegister } from "@/lib/actions/auth-action";
import Link from "next/link";

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: RegisterData) => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await handleRegister(data);
        if (!response.success) {
              throw new Error(response.message);
        }
        if (response.success) {
               router.push("/login");
        } else {
              setError('Registration failed');
        }
      } catch (err: Error | any) {
              setError(err.message || 'Registration failed');
      }
     });
        console.log("register", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Global error */}
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* Full Name */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="name">Full Name</label>
        <input
          id="name"
          type="text"
          autoComplete="name"
          placeholder="Enter your full name"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("name")}
        />
        {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
      </div>

      {/* Mobile Number */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="mobileNumber">Mobile Number</label>
        <input
          id="mobileNumber"
          type="tel"
          autoComplete="tel"
          placeholder="Enter your mobile number"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("mobileNumber")}
        />
        {errors.mobileNumber && <p className="text-xs text-red-600">{errors.mobileNumber.message}</p>}
      </div>

      {/* Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          placeholder="Enter your password"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("password")}
        />
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-[#D07522] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Creating account..." : "Create Account"}
      </button>

      {/* Login link */}
      <p className="text-center text-sm">
        Already have an account? <Link href="/login" className="text-[#D07522] font-semibold hover:underline">Log In</Link>
      </p>
    </form>
  );
}
