// "use client";


// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useTransition,useState  } from "react";
// import { useRouter } from "next/navigation";
// import { LoginData, loginSchema } from "../schema";
// import Link from "next/link";
// import { handleLogin } from "@/lib/actions/auth-action";

// export default function LoginForm() {
//     const router = useRouter();
//     const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
//         resolver: zodResolver(loginSchema),
//         mode: "onSubmit",
//     });

//     const [pending, startTransition] = useTransition();
//         const [error, setError] = useState<string | null>(null);

//     const onSubmit = (data: LoginData) => {
//         setError(null);

//         startTransition(async () => {
//             // console.log("Login data", data);
//             // await new Promise(r => setTimeout(r, 1000));
//             // router.push("/dashboard"); // Redirect after login
//         // });
//           try {
//                 const response = await handleLogin(data);
//                 if (!response.success) {
//                     throw new Error(response.message);
//                 }
//                 if (response.success) {
//                     router.push("/user/dashboard");
//                 } else {
//                     setError('Login failed');
//                 }
//             } catch (err: Error | any) {
//                 setError(err.message || 'Login failed');
//             }
//         })
//     };

//     return (
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
//             {error && (
//                 <p className="text-red-500 text-xs">{error}</p>
//             )}
//             <input
//             {...register("mobileNumber")}
//             type="tel"
//              placeholder="Enter your mobile number"
//              className="p-3 rounded-md border border-gray-300 focus:border-[#D07522] outline-none"
//              />
//              {errors.mobileNumber && (
//                 <p className="text-red-500 text-xs">{errors.mobileNumber.message}</p>
//             )}


//             <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="Enter your password"
//                 className="p-3 rounded-md border border-gray-300 focus:border-orange-500 outline-none"
//             />
//             {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}

//             <button
//                 type="submit"
//                 disabled={isSubmitting || pending}
//                 className="bg-[#D07522] text-white py-2 rounded-md mt-2 hover:opacity-90 disabled:opacity-60"
//             >
//                 {isSubmitting || pending ? "Logging in..." : "Log In"}
//             </button>

//             <p className="text-center text-sm mt-2">
//                 Don't have an account? <Link href="/register" className="text-[#D07522] font-semibold">Sign Up</Link>
//             </p>
//         </form>
//     );
// }


"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import Link from "next/link";
import { handleLogin } from "@/lib/actions/auth-action";

export default function LoginForm() {
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });

    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const onSubmit = (data: LoginData) => {
        setError(null);

        startTransition(async () => {
              try {
                const response = await handleLogin(data);
                if (!response.success) {
                    throw new Error(response.message);
                }
                if (response.success) {
                    router.push("/user/dashboard");
                } else {
                    setError('Login failed');
                }
            } catch (err: Error | any) {
                setError(err.message || 'Login failed');
            }
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Error message */}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* Mobile Number Field */}
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
                {errors.mobileNumber && (
                    <p className="text-xs text-red-600">{errors.mobileNumber.message}</p>
                )}
            </div>

            {/* Password Field */}
            <div className="space-y-1">
                <label className="text-sm font-medium" htmlFor="password">Password</label>
                <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
                    {...register("password")}
                />
                {errors.password && (
                    <p className="text-xs text-red-600">{errors.password.message}</p>
                )}
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isSubmitting || pending}
                className="h-10 w-full rounded-md bg-[#D07522] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
            >
                {isSubmitting || pending ? "Logging in..." : "Log In"}
            </button>

            {/* Sign Up Link */}
            <p className="text-center text-sm mt-2">
                Don't have an account?{" "}
                <Link href="/register" className="text-[#D07522] font-semibold hover:underline">
                    Sign Up
                </Link>
            </p>
        </form>
    );
}

