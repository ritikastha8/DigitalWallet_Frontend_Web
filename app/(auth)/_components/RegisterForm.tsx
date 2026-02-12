"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RegisterData, registerSchema } from "../schema";

import { FiEye,FiEyeOff } from "react-icons/fi";
import Link from "next/link";
import { handleRegister } from "@/lib/actions/users/auth-action";

export default function RegisterForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        {errors.mobileNumber && <p className="text-xs text-red-600">{errors.mobileNumber.message}</p>}
      </div>


       {/* Email Address */}
      <div className="space-y-1">
        <label className="text-sm font-medium" htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="Enter your email address"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522]"
          {...register("email")}
        />
        {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
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
      </div>

     {/* Confirm Password */}
      <div className="space-y-1 relative">
        <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm Password</label>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Enter your Confirm password"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
          {...register("confirmPassword")}
        />
        <span
          className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
        {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
      </div>

      {/* Terms & Conditions */}
<div className="flex items-center space-x-2">
  <input
    type="checkbox"
    id="terms"
    {...register("terms")}
    className="h-4 w-4 rounded border-gray-300 focus:ring-[#D07522]"
  />
  <label htmlFor="terms" className="text-sm text-gray-700">
  I agree to the{" "}
  <Link href="/terms" className="text-[#D07522] underline" target="_blank">
    Terms & Conditions
  </Link>
</label>
</div>
{errors.terms && (
  <p className="text-xs text-red-600">{errors.terms.message}</p>
)}
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
