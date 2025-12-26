// import Link from "next/link";

// export default function NavBar() {
//   return (
//     <nav className="bg-[#EC9444]">
//       <div className="mx-auto max-w-7xl px-4">
//         <ul className="flex h-10 items-center gap-6 text-sm text-white">
//           <li><Link href="/">Homepage</Link></li>
//           <li><Link href="#">Send Money</Link></li>
//           <li><Link href="#">Topup</Link></li>
//           <li><Link href="#">Load Money</Link></li>
//           <li><Link href="#">Transaction History</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// }


// NavBar.tsx
import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-[#EC9444]">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex h-10 items-center gap-12 text-sm text-white"> {/* increased gap */}
          <li><Link href="/">Homepage</Link></li>
          <li><Link href="#">Send Money</Link></li>
          <li><Link href="#">Topup</Link></li>
          <li><Link href="#">Load Money</Link></li>
          <li><Link href="#">Transaction History</Link></li>
        </ul>
      </div>
    </nav>
  );
}
