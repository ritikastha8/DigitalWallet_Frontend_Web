import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="bg-[#EC9444]">
      <div className="mx-auto max-w-7xl px-4">
        <ul className="flex h-10 items-center gap-12 text-sm text-white"> {/* increased gap */}
          <li><Link href="/user/dashboard">Homepage</Link></li>
          <li><Link href="/user/dashboard/sendmoney">Send Money</Link></li>
          <li><Link href="/user/dashboard/receive-qr">Receive money</Link></li>
          <li><Link href="/user/dashboard/topup">Topup & Data</Link></li>
          <li><Link href="/user/dashboard/plusbuttonlink">Load Money</Link></li>
          <li><Link href="/user/dashboard/transactionhistory">Transaction History</Link></li>
        </ul>
      </div>
    </nav>
  );
}
