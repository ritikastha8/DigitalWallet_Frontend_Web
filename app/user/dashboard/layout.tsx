// import PublicHeader from "./_components/PublicHeader";
// import NavBar from "./_components/NavBar";
// import PublicFooter from "./_components/PublicFooter";

import Footer from "../_components/Footer";
import Header from "../_components/Header";
import NavBar from "../_components/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <NavBar />
      <main className="min-h-[60vh] bg-white">
        {children}
      </main>
      <Footer />
    </>
  );
}