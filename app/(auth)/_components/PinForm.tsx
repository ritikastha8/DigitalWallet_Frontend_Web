// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState, useTransition } from "react";
// import { useRouter } from "next/navigation";
// import { RegisterData, registerSchema } from "../schema";

// import { FiEye,FiEyeOff } from "react-icons/fi";
// import Link from "next/link";
// import { handleRegister } from "@/lib/actions/users/auth-action";

// export default function PinForm() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterData>({
//     resolver: zodResolver(registerSchema),
//     mode: "onSubmit",
//   });

//   const [pending, startTransition] = useTransition();
//   const [error, setError] = useState<string | null>(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const onSubmit = async (data: RegisterData) => {
//     setError(null);
//     startTransition(async () => {
//       try {
//         const response = await handleRegister(data);
//         if (!response.success) {
//               throw new Error(response.message);
//         }
//         if (response.success) {
//                router.push("/login");
//         } else {
//               setError('Registration failed');
//         }
//       } catch (err: Error | any) {
//               setError(err.message || 'Registration failed');
//       }
//      });
//         console.log("register", data);
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//       {/* Global error */}
//       {error && <p className="text-sm text-red-600">{error}</p>}


//       {/* Password */}
//       <div className="space-y-1 relative">
//         <label className="text-sm font-medium" htmlFor="password">New PIN</label>
//         <input
//           id="password"
//           inputMode="numeric"
//           maxLength={4}
//           type={showPassword ? "text" : "password"}
//           placeholder="Enter 4-digits PIN"
//           className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
//           {...register("password")}
//           onInput={(e)=>{
//             e.currentTarget.value = e.currentTarget.value.replace(/\D/g,"");
//           }}
//         />
//         <span
//           className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
//           onClick={() => setShowPassword(!showPassword)}
//         >
//           {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//         </span>
//         {errors.password && <p className="text-xs text-red-600">{errors.password.message}</p>}
//       </div>

//      {/* Confirm Password */}
//       <div className="space-y-1 relative">
//         <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm new PIN</label>
//         <input
//           id="confirmPassword"
//           inputMode="numeric"
//           maxLength={4}
//           type={showConfirmPassword ? "text" : "password"}
//           placeholder="Enter confirm 4-digits PIN"
//           className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
//           {...register("confirmPassword")}
//           onInput={(e)=>{
//             e.currentTarget.value = e.currentTarget.value.replace(/\D/g,"");
//           }}
//         />
//         <span
//           className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
//           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//         >
//           {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
//         </span>
//         {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
//       </div>

      
//       {/* Submit Button */}
//       <button
//         type="submit"
//         disabled={isSubmitting || pending}
//         className="h-10 w-full rounded-md bg-[#D07522] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
//       >
//         {isSubmitting || pending ? "Creating account..." : "DONE"}
//       </button>

      
//     </form>
//   );
// }



"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { RegisterPinData, registerPinSchema } from "../schema"; // use new schema

import { FiEye, FiEyeOff } from "react-icons/fi";
import {handleRegisterPin } from "@/lib/actions/users/auth-action";

export default function PinForm() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterPinData>({
    resolver: zodResolver(registerPinSchema),
    mode: "onSubmit",
  });

  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [showPin, setShowPin] = useState(false);
  const [showConfirmPin, setShowConfirmPin] = useState(false);

  const onSubmit = async (data: RegisterPinData) => {
    setError(null);
    startTransition(async () => {
      try {
        const response = await handleRegisterPin(data); // or handlePinSetup if separate API
        if (!response.success) throw new Error(response.message);
        router.push("/login");
      } catch (err: any) {
        setError(err.message || "PIN setup failed");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <p className="text-sm text-red-600">{error}</p>}

      {/* PIN */}
      <div className="space-y-1 relative">
        <label className="text-sm font-medium" htmlFor="pin">New PIN</label>
        <input
          id="pin"
          inputMode="numeric"
          maxLength={4}
          type={showPin ? "text" : "password"}
          placeholder="Enter 4-digit PIN"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
          {...register("pin")}
          onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")}
        />
        <span
          className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          onClick={() => setShowPin(!showPin)}
        >
          {showPin ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
        {errors.pin && <p className="text-xs text-red-600">{errors.pin.message}</p>}
      </div>

      {/* Confirm PIN */}
      <div className="space-y-1 relative">
        <label className="text-sm font-medium" htmlFor="confirmPin">Confirm new PIN</label>
        <input
          id="confirmPin"
          inputMode="numeric"
          maxLength={4}
          type={showConfirmPin ? "text" : "password"}
          placeholder="Confirm 4-digit PIN"
          className="h-10 w-full rounded-md border border-gray-300 px-3 text-sm outline-none focus:border-[#D07522] pr-10"
          {...register("confirmPin")}
          onInput={(e) => e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "")}
        />
        <span
          className="absolute right-3 top-[35px] text-gray-500 cursor-pointer"
          onClick={() => setShowConfirmPin(!showConfirmPin)}
        >
          {showConfirmPin ? <FiEyeOff size={18} /> : <FiEye size={18} />}
        </span>
        {errors.confirmPin && <p className="text-xs text-red-600">{errors.confirmPin.message}</p>}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting || pending}
        className="h-10 w-full rounded-md bg-[#D07522] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
      >
        {isSubmitting || pending ? "Creating PIN..." : "DONE"}
      </button>
    </form>
  );
}