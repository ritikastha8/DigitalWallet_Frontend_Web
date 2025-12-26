// import PublicHeader from "./_components/PublicHeader";
// import PublicFooter from "./_components/PublicFooter";

// export default function PublicLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <>
//       <PublicHeader />
//       <main className="min-h-[60vh]">{children}</main>
//       <PublicFooter />
//     </>
//   );
// }

// import PublicHeader from "./_components/PublicHeader";
// import PublicFooter from "./_components/PublicFooter";

// export default function Layout({ children }: { children: React.ReactNode }) {
//   return (
//     <>
//       <PublicHeader />
//       <main className="mx-auto max-w-7xl px-4 py-10">
//         {children}
//       </main>
//       <PublicFooter />
//     </>
//   );
// }


import PublicHeader from "./_components/PublicHeader";
import NavBar from "./_components/NavBar";
import PublicFooter from "./_components/PublicFooter";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <NavBar />
      <main className="min-h-[60vh] bg-white">
        {children}
      </main>
      <PublicFooter />
    </>
  );
}
