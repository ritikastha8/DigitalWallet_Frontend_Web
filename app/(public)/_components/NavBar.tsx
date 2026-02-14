// import Link from "next/link";

// export default function NavBar() {
//   return (
//     <nav className="bg-[#EC9444]">
//       <div className="mx-auto max-w-7xl px-4">
//         <ul className="flex h-10 items-center gap-12 text-sm text-white"> {/* increased gap */}
//           <li><Link href="/user/dashboard">Homepage</Link></li>
//           <li><Link href="#">Send Money</Link></li>
//           <li><Link href="#">Topup & Data</Link></li>
//           <li><Link href="#">Load Money</Link></li>
//           <li><Link href="#">Transaction History</Link></li>
//         </ul>
//       </div>
//     </nav>
//   );
// }
"use client";

import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function NavBar() {
  // Replace this with your actual authentication check
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!isLoggedIn) {
      e.preventDefault(); // prevent navigation
      toast.warning("Please log in to access this page");
    }
  };

  return (
    <nav className="bg-[#EC9444]">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex h-10 items-center gap-12 text-sm text-white">
          <li>
            <Link href="/user/dashboard">Homepage</Link>
          </li>
          <li>
            <Link href="/send-money" onClick={(e) => handleClick(e, "/send-money")}>
              Send Money
            </Link>
          </li>
          <li>
            <Link href="/topup-data" onClick={(e) => handleClick(e, "/topup-data")}>
              Topup & Data
            </Link>
          </li>
          <li>
            <Link href="/load-money" onClick={(e) => handleClick(e, "/load-money")}>
              Load Money
            </Link>
          </li>
          <li>
            <Link
              href="/transaction-history"
              onClick={(e) => handleClick(e, "/transaction-history")}
            >
              Transaction History
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
