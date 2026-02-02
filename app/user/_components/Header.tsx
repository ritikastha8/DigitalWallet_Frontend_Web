// // // // "use client";
// // // // import Image from "next/image";
// // // // import Link from "next/link";
// // // // import ThemeToggle from "@/app/_components/ThemeToggle";

// // // // export default function Header() {
// // // //   return (
// // // //     <header className="bg-[#484847]">
// // // //       <div className="mx-auto max-w-7xl px-4">
// // // //         <div className="flex h-14 items-center justify-between">

// // // //           {/* Logo */}
// // // //           <div className="flex items-center gap-2 text-white">
// // // //             <Image
// // // //               src="/images/logonovacash.png"
// // // //               alt="NovaCash"
// // // //               width={28}
// // // //               height={28}
// // // //             />
// // // //             <span className="font-semibold text-sm">NovaCash</span>
// // // //           </div>

// // // //           {/* Buttons */}
// // // //           <div className="flex gap-3">
// // // //             {/* <Link
// // // //               href="/login"
// // // //               className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
// // // //             >
// // // //               Log In
// // // //             </Link>
// // // //             <Link
// // // //               href="/register"
// // // //               className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
// // // //             >
// // // //               Register
// // // //             </Link> */}

// // // //             {/* Theme toggle added */}
// // // //             <ThemeToggle/>
// // // //           </div>

// // // //         </div>
// // // //       </div>
// // // //     </header>
// // // //   );
// // // // }

// // // "use client";

// // // import Image from "next/image";
// // // import Link from "next/link";
// // // import ThemeToggle from "@/app/_components/ThemeToggle";

// // // type User = {
// // //   name: string;
// // //   image?: string | null;
// // // };

// // // export default function Header() {
// // //   // 🔹 Replace this with real backend/session data
// // //   const user: User | null = {
// // //     name: "Nova",
// // //     image: null,
// // //   };

// // //   return (
// // //     <header className="bg-[#484847]">
// // //       <div className="mx-auto max-w-7xl px-4">
// // //         <div className="flex h-14 items-center justify-between">

// // //           {/* Logo */}
// // //           <div className="flex items-center gap-2 text-white">
// // //             <Image
// // //               src="/images/logonovacash.png"
// // //               alt="NovaCash"
// // //               width={28}
// // //               height={28}
// // //             />
// // //             <span className="font-semibold text-sm">NovaCash</span>
// // //           </div>

// // //           {/* Right side */}
// // //           <div className="flex items-center gap-4">
// // //             <ThemeToggle />

// // //             {user && (
// // //               <Link href="/profile" className="flex items-center gap-2">
// // //                 {/* Avatar */}
// // //                 {user.image ? (
// // //                   <Image
// // //                     src={user.image}
// // //                     alt={user.name}
// // //                     width={32}
// // //                     height={32}
// // //                     className="rounded-full"
// // //                   />
// // //                 ) : (
// // //                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
// // //                     {user.name.charAt(0).toUpperCase()}
// // //                   </div>
// // //                 )}

// // //                 {/* Name */}
// // //                 <span className="text-sm text-white font-medium">
// // //                   {user.name}
// // //                 </span>
// // //               </Link>
// // //             )}
// // //           </div>

// // //         </div>
// // //       </div>
// // //     </header>
// // //   );
// // // }
// // "use client";

// // import Image from "next/image";
// // import Link from "next/link";
// // import ThemeToggle from "@/app/_components/ThemeToggle";
// // import { useAuth } from "@/context/AuthContext";


// // export default function Header() {
// //   const { user } = useAuth();

// //   return (
// //     <header className="bg-[#484847]">
// //       <div className="mx-auto max-w-7xl px-4">
// //         <div className="flex h-14 items-center justify-between">

// //           {/* Logo */}
// //           <div className="flex items-center gap-2 text-white">
// //             <Image
// //               src="/images/logonovacash.png"
// //               alt="NovaCash"
// //               width={28}
// //               height={28}
// //             />
// //             <span className="font-semibold text-sm">NovaCash</span>
// //           </div>

// //           <div className="flex items-center gap-4">
// //             <ThemeToggle />


// //    {/* Profile Image Display
// //         <div className="mb-4">
// //           <Controller
// //             name="imageUrl"
// //             control={control}
// //             render={({ field: { onChange } }) => (
// //               <div className="flex flex-col items-center gap-2">
// //                 <div className="relative w-24 h-24">
// //                   {previewImage ? (
// //                     <>
// //                       <img
// //                         src={previewImage}
// //                         alt="Profile Preview"
// //                         className="w-24 h-24 rounded-full object-cover"
// //                       />
// //                       <button
// //                         type="button"
// //                         onClick={() => handleDismissImage(onChange)}
// //                         className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
// //                       >
// //                         ✕
// //                       </button>
// //                     </>
// //                   ) : profileImageUrl ? (
// //                     <Image
// //                       src={profileImageUrl}
// //                       alt={user.name}
// //                       width={96}
// //                       height={96}
// //                       className="w-24 h-24 rounded-full object-cover"
// //                     />
// //                   ) : (
// //                     <div className="w-24 h-24 flex items-center justify-center rounded-full bg-[#F4AE6F] text-3xl font-bold text-white">
// //                       {user.name.charAt(0).toUpperCase()}
// //                     </div>
// //                   )}
// //                 </div> */}
// //             {user && (
// //               <Link href="/user/profile" className="flex items-center gap-2">
// //                 {/* Avatar */}
// //                 {user.image ? (
// //                   <Image
// //                     src={user.image}
// //                     alt={user.name}
// //                     width={32}
// //                     height={32}
// //                     className="rounded-full"
// //                   />
// //                 ) : (
// //                   <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
// //                     {user.name.charAt(0).toUpperCase()}
// //                   </div>
// //                 )}

// //                 {/* Name */}
// //                 <span className="text-sm text-white font-medium">
// //                   {user.name}
// //                 </span>
// //               </Link>
// //             )}
// //           </div>

// //         </div>
// //       </div>
// //     </header>
// //   );
// // }
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import ThemeToggle from "@/app/_components/ThemeToggle";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { user, setUser } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     // Clear user from context
//     setUser(null);

//     // Optional: clear token or session storage
//     localStorage.removeItem("token");

//     // Redirect to login page
//     router.push("/login");
//   };

//   return (
//     <header className="bg-[#484847]">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-14 items-center justify-between">

//           {/* Logo */}
//           <div className="flex items-center gap-2 text-white">
//             <Image
//               src="/images/logonovacash.png"
//               alt="NovaCash"
//               width={28}
//               height={28}
//             />
//             <span className="font-semibold text-sm">NovaCash</span>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-4">
//             <ThemeToggle />

//             {user && (
//               <div className="flex items-center gap-3">
//                 {/* Profile Link */}
//                 <Link href="/user/profile" className="flex items-center gap-2">
//                   {user.image ? (
//                     <Image
//                       src={user.image}
//                       alt={user.name}
//                       width={32}
//                       height={32}
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                   )}

//                   <span className="text-sm text-white font-medium">
//                     {user.name}
//                   </span>
//                 </Link>

//                 {/* Logout Button */}
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             )}

//           </div>

//         </div>
//       </div>
//     </header>
//   );
// }

// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import ThemeToggle from "@/app/_components/ThemeToggle";
// import { useAuth } from "@/context/AuthContext";
// import { useRouter } from "next/navigation";

// export default function Header() {
//   const { user, setUser } = useAuth();
//   const router = useRouter();

//   const handleLogout = () => {
//     setUser(null); // Clear user in context
//     localStorage.removeItem("token"); // Clear token
//     router.push("/"); // Redirect to homepage
//   };

//   return (
//     <header className="bg-[#484847]">
//       <div className="mx-auto max-w-7xl px-4">
//         <div className="flex h-14 items-center justify-between">

//           {/* Logo */}
//           <div className="flex items-center gap-2 text-white">
//             <Image
//               src="/images/logonovacash.png"
//               alt="NovaCash"
//               width={28}
//               height={28}
//             />
//             <span className="font-semibold text-sm">NovaCash</span>
//           </div>

//           {/* Right side */}
//           <div className="flex items-center gap-4">
//             <ThemeToggle />

//             {user ? (
//               // Logged-in view
//               <div className="flex items-center gap-3">
//                 <Link href="/user/profile" className="flex items-center gap-2">
//                   {user.image ? (
//                     <Image
//                       src={user.image}
//                       alt={user.name}
//                       width={32}
//                       height={32}
//                       className="rounded-full"
//                     />
//                   ) : (
//                     <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F4AE6F] text-sm font-semibold text-white">
//                       {user.name.charAt(0).toUpperCase()}
//                     </div>
//                   )}
//                   <span className="text-sm text-white font-medium">{user.name}</span>
//                 </Link>

//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               // Logged-out view
//               <div className="flex gap-3">
//                 <Link
//                   href="/login"
//                   className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
//                 >
//                   Log In
//                 </Link>
//                 <Link
//                   href="/register"
//                   className="rounded-md bg-[#F4AE6F] px-4 py-1.5 text-sm text-white"
//                 >
//                   Register
//                 </Link>
//               </div>
//             )}

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
          <div className="flex items-center gap-4">
            <ThemeToggle />

            {isAuthenticated && user ? (
              <div className="flex items-center gap-3">
                <Link href="/user/profile" className="flex items-center gap-2">
                  {user.image ? (
                    <Image
                      src={user.image}
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
                  onClick={logout} // ✅ Use AuthContext logout
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Logout
                </button>
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

          </div>

        </div>
      </div>
    </header>
  );
}
