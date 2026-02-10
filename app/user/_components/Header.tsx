"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function Header() {
  const { user, isAuthenticated, logout } = useAuth();

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

          {/* Right side */}
          {/* <div className="flex items-center gap-4">
            

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

                <button
                  onClick={logout} //  Use AuthContext logout
                  className="h-9 px-3 inline-flex items-center justify-center rounded-md
bg-white dark:bg-black
border border-black/10 dark:border-white/15
text-sm font-medium
hover:bg-gray-100 dark:hover:bg-white/10
transition-colors"
                >
                  Logout
                </button>
                <ThemeToggle /> */}
              {/* </div>
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

          </div> */}

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

   

      <ThemeToggle />
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

  {/* Terms & Condition – RIGHT MOST */}
  <Link
    href="/users/termscondition"
    className="text-sm font-semibold text-[#F4AE6F] hover:text-white transition-colors whitespace-nowrap"
  >
    Terms & Condition
  </Link>

     {/* <button
        onClick={logout}
        className="h-9 px-3 inline-flex items-center justify-center rounded-md
        bg-white dark:bg-black
        border border-black/10 dark:border-white/15
        text-sm font-medium
        hover:bg-gray-100 dark:hover:bg-white/10
        transition-colors"
      >
        Logout
      </button> */}

      <button
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
