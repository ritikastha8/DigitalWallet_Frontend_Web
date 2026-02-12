"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginData, loginSchema } from "../schema";
import Link from "next/link";
import { FiEye,FiEyeOff } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { handleLogin } from "@/lib/actions/users/auth-action";

export default function LoginForm() {
    const { setUser, setIsAuthenticated } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginData>({
        resolver: zodResolver(loginSchema),
        mode: "onSubmit",
    });

    const [pending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data: LoginData) => {
        setError(null);

        startTransition(async () => {
              try {
                const response = await handleLogin(data);
                if (!response.success) {
                    throw new Error(response.message);
                }
                if (response.success && response.data) {

                    setUser(response.data); //  set the logged-in user
                     setIsAuthenticated(true); // mark as authenticated
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("userId", response.data._id);

                    if (response.data?.role == 'admin') {
                        return router.replace("/admin");
                    }
                    if (response.data?.role === 'user') {
                        return router.replace("/user/dashboard");
                    }
                    return router.replace("/");
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
                    inputMode="numeric"
                    maxLength={10}
                    autoComplete="tel"
                    placeholder="Enter your mobile number"
                    className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
                    {...register("mobileNumber")}
                    onInput={(e)=>{
             e.currentTarget.value = e.currentTarget.value.replace(/\D/g,"");
            }}
                />
                {errors.mobileNumber && (
                    <p className="text-xs text-red-600">{errors.mobileNumber.message}</p>
                )}
            </div>
    {/* Password */}
      <div className="space-y-1 relative">
        <label className="text-sm font-medium" htmlFor="password">Password</label>
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
          {...register("password")}
        />
        <span
          className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
        {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
     

         {/* Forgot Password Link */}
            <div className="mt-1 text-right text-sm">
                <Link href="/forget-password" className="font-semibold text-[#D07522] hover:underline">
                     Forgot Password?
                </Link>
            </div>
            
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

