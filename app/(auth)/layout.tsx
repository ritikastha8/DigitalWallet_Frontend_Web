import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 px-4">

      {/* Welcome Text */}
      <h1 className="text-4xl font-bold text-black mb-8 text-center">
        Welcome To NovaCash
      </h1>

      {/* Form + Image */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* LEFT – FORM */}
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md bg-[#EDEDED] rounded-2xl p-8 shadow-md">
            {children}
          </div>
        </div>

        {/* RIGHT – IMAGE */}
        <div className="hidden md:flex items-center justify-center">
          <Image
            src="/images/digitalwalletlogin.png"
            alt="Digital Wallet Illustration"
            width={520}
            height={520}
            priority
          />
        </div>

      </div>
    </section>
  );
}
