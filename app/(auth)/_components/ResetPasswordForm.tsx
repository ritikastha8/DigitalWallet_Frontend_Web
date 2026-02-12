"use client";
import { useForm } from "react-hook-form";
import { resetPasswordSchema, ResetPasswordData } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
// import { handleResetPassword } from "@/lib/actions/auth-action";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import Link from "next/link";
import { FiEye,FiEyeOff } from "react-icons/fi";
import { handleResetPassword } from "@/lib/actions/users/auth-action";
const ResetPasswordForm = (
    { token }: { token: string }
) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordData>({
        mode: "onSubmit",
        resolver: zodResolver(resetPasswordSchema),
    });
    const [error, setError] = useState<string | null>(null);
    const [pending, setTransition] = useTransition();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit = (values: ResetPasswordData) => {
        setError(null);
        setTransition(async () => {
            try {
                const result = await handleResetPassword(token, values.newPassword);
                if (result.success) {
                    toast.success("Password has been reset successfully.");
                    return router.push('/login');
                }
                else {
                    throw new Error(result.message || 'Failed to reset password');
                }
            } catch (err: Error | any) {
                toast.error(err.message || 'Failed to reset password');
            }
        })
    }
    return (

        <form onSubmit={handleSubmit(submit)} className="space-y-4">
            {error && (
                <p className="text-sm text-red-600">{error}</p>
            )}



  <div className="space-y-1 relative">
  <label className="text-sm font-medium" htmlFor="password">Password</label>
  <div className="relative">
    <input
      id="password"
      type={showPassword ? "text" : "password"}
      autoComplete="new-password"
      className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
      {...register("newPassword")}
      placeholder="••••••"
    />
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
    >
      {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  </div>
  {errors.newPassword?.message && (
    <p className="text-xs text-red-600">{errors.newPassword.message}</p>
  )}
</div>



            <div className="space-y-1 relative">
  <label className="text-sm font-medium" htmlFor="confirmPassword">Confirm password</label>
  <div className="relative">
    <input
      id="confirmPassword"
      type={showConfirmPassword ? "text" : "password"}
      autoComplete="new-password"
      className="h-10 w-full rounded-md border border-black/10 dark:border-white/15 bg-background px-3 pr-10 text-sm outline-none focus:border-foreground/40"
      {...register("confirmNewPassword")}
      placeholder="••••••"
    />
    <button
      type="button"
      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      className="absolute inset-y-0 right-3 flex items-center text-gray-500"
    >
      {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
    </button>
  </div>
  {errors.confirmNewPassword?.message && (
    <p className="text-xs text-red-600">{errors.confirmNewPassword.message}</p>
  )}
</div>


            <button
                type="submit"
                disabled={isSubmitting || pending}
                className=" h-10 w-full rounded-md bg-[#D07522] text-white text-sm font-semibold hover:opacity-90 disabled:opacity-60"
               
            >
                {isSubmitting || pending ? "Resetting password..." : "Reset password"}
            </button>

            <div className="mt-1 text-center text-sm">
                Want to log in? <Link href="/login" className="text-[#D07522] font-semibold hover:underline">Log in</Link>
            </div>
        </form>
    );
}

export default ResetPasswordForm;

