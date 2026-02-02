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
