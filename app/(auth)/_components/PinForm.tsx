
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