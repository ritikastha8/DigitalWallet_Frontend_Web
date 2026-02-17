"use client";
import { Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { handleLogout } from "@/lib/actions/users/auth-action";
export default function Header() {
  const { user, isAuthenticated , logout} = useAuth();

  return (
    <header className="bg-[#484847]">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-14 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2 text-white">
            <Image
              src="/images/logonovacash.png"
              alt="NovaCash"
              width={28}
              height={28}
            />
            <span className="font-semibold text-sm">NovaCash</span>
          </div>
          <div className="flex items-center justify-end gap-6 w-full">
      {isAuthenticated && user ? (
      <div className="flex items-center gap-3">
      <Link href="/user/profile" className="flex items-center gap-2">
        {user.imageUrl ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${user.imageUrl}`}
            alt={user.name}
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-sm text-white font-medium">{user.name}</span>
      </Link>
      {/* <ThemeToggle /> */}
      </div>
      ) : (
      <div className="flex gap-3">
        <Link
        href="/login"
        className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
        >
          Log In
          </Link>
          <Link
          href="/register"
          className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
          >
            Register
            </Link>
            </div>
          )}
          <Link
          href="/user/dashboard/termsconditions"
          className="text-sm font-medium text-white hover:text-[#F4AE6F] transition-colors whitespace-nowrap"
          >
            Terms & Condition
          </Link>
          <Link
          href="/user/notifications"
          className="relative text-[#F4AE6F] hover:text-white transition-colors"
          >
            <Bell size={20} />  {/* the bell icon */}
            {user?.unreadNotifications > 0 && (
              <span className="absolute -top-1 -right-1 inline-flex h-3 w-3 items-center justify-center rounded-full bg-red-500 text-white text-xs">
                {user.unreadNotifications}
              </span>
            )}
          </Link>
          <button 
          onClick={handleLogout}
          className="
          h-9 px-3 inline-flex items-center justify-center rounded-md
          bg-[#D07522] dark:bg-[#A65F1A]
          text-white
          border border-black/10 dark:border-white/15
          text-sm font-medium
          hover:bg-[#c6681d] dark:hover:bg-[#955013]
          transition-colors
          "
          >
            Logout
          </button>
          </div>
        </div>
      </div>
    </header>
  );
}
