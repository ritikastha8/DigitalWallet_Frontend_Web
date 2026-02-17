"use client";

import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/_components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";

export default function PublicHeader() {
  const { user, logout } = useAuth();

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

          {/* Right side: Auth + Theme */}
          <div className="flex items-center gap-3">
            <Link href="/termsconditions" className="text-sm font-medium text-white hover:text-[#F4AE6F] transition-colors whitespace-nowrap"> Terms & Condition </Link>


            {user ? (
              <>
                <span className="text-sm text-white hidden sm:block">
                  Hi, {user.name}
                </span>
                <button
                  onClick={logout}
                  className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
                >
                  Log out
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
             

            {/* <ThemeToggle /> */}
          </div>

        </div>
      </div>
    </header>
  );
}
