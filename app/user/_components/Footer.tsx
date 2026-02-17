import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#484847] text-white mt-20">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-y-10 gap-x-24 text-sm">

        {/* LEFT COLUMN – About */}
        <div className="text-left">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logonovacash.png"
              alt="NovaCash Logo"
              width={32}
              height={32}
            />
            <span className="font-semibold text-lg">NovaCash</span>
          </div>

          <p className="text-white/80 leading-relaxed">
            NovaCash provides a secure and convenient digital wallet experience,
            allowing users to easily load money, transfer funds wallet-to-wallet,
            make fast QR-based payments, manage their profiles, and track all
            transactions instantly through a simple and user-friendly interface.
          </p>
        </div>

        {/* CENTER COLUMN – Contact (pushed right) */}
        <div className="md:justify-self-end">
          <h3 className="font-semibold text-lg mb-3">About Us</h3>
          <p className="mb-2 font-semibold">CONTACT DETAILS</p>

          <p>NTC Toll Free – 16600123456</p>
          <p className="mt-1">Ncell Toll Free – 18100123456</p>
          <p className="mt-1">Contact: +9779839264194</p>
        </div>
        <div className="text-right">
          {/* <Link
          href="/user/dashboard/termsconditions"
          className="text-lg font-semibold text-white hover:text-[#F4AE6F] transition-colors whitespace-nowrap"
          >
            Terms & Condition
          </Link> */}

          <Link
            href="/user/dashboard/termsconditions"
            className="rounded font-semibold bg-[#EC9444] text-white text-center  text-white hover:text-gray-500 transition-colors whitespace-nowrap py-3 px-2 text-lg"
          >
            Terms & Condition
          </Link>
           {/* <Link
            href="/user/dashboard/termsconditions"
            className="rounded font-semibold bg-white text-[#EC9444]  text-center  text-[#EC9444]  hover:text-gray-500 transition-colors whitespace-nowrap py-3 px-2 text-lg"
          >
            Terms & Condition
          </Link> */}
        </div>

      

      </div>
    </footer>
  );
}
