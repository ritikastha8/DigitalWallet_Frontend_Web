// "use client";

// import Link from "next/link";

// export default function PublicHeader() {
//   return (
//     <header className="bg-orange-500 text-white">
//       <div className="mx-auto max-w-7xl px-6 h-14 flex items-center justify-between">

//         {/* Logo */}
//         <div className="flex items-center gap-2 font-bold">
//           <span className="bg-black text-orange-400 px-2 py-1 rounded">
//             NC
//           </span>
//           NovaCash
//         </div>

//         {/* Nav links */}
//         <nav className="hidden md:flex gap-6 text-sm">
//           <Link href="/">Homepage</Link>
//           <Link href="#">Send Money</Link>
//           <Link href="#">Top Up</Link>
//           <Link href="#">Load Money</Link>
//           <Link href="#">Transaction History</Link>
//         </nav>

//         {/* Auth buttons */}
//         <div className="flex gap-2">
//           <Link
//             href="/login"
//             className="px-3 py-1 border border-white rounded text-sm"
//           >
//             Login
//           </Link>
//           <Link
//             href="/register"
//             className="px-3 py-1 bg-white text-orange-500 rounded text-sm font-semibold"
//           >
//             Register
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }


// "use client";

// import Link from "next/link";
// import Image from "next/image";

// export default function Header() {
//   return (
//     <header className="bg-[#f2994a]">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-14 items-center justify-between">
          
//           {/* Logo */}
//           <div className="flex items-center gap-2">
//             <Image
//               src="/Novacash.png"
//               alt="NovaCash"
//               width={32}
//               height={32}
//             />
//             <span className="font-semibold text-white">NovaCash</span>
//           </div>

//           {/* Nav */}
//           <nav className="hidden md:flex items-center gap-6 text-sm text-white">
//             <Link href="/">Homepage</Link>
//             <Link href="#">Send Money</Link>
//             <Link href="#">Top Up</Link>
//             <Link href="#">Loan Money</Link>
//             <Link href="#">Transaction History</Link>
//           </nav>

//           {/* Auth buttons */}
//           <div className="flex items-center gap-2">
//             <Link
//               href="/login"
//               className="rounded bg-white px-3 py-1 text-sm font-medium text-[#f2994a]"
//             >
//               Log in
//             </Link>
//             <Link
//               href="/register"
//               className="rounded bg-[#333] px-3 py-1 text-sm text-white"
//             >
//               Register
//             </Link>
//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }

"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeToggle from "@/app/_components/ThemeToggle";

export default function PublicHeader() {
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

          {/* Buttons */}
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

            {/* Theme toggle added */}
            <ThemeToggle/>
          </div>

        </div>
      </div>
    </header>
  );
}

