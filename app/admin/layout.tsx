import { redirect } from "next/navigation";
import { getUserData } from "@/lib/cookie";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";

export const dynamic = "force-dynamic";

export default async function Layout({ children }: { children: React.ReactNode }) {
    const user = await getUserData();
    if (!user) redirect("/login");
    if (user.role !== "admin") redirect("/user/dashboard");

    return (
        <div className="flex w-full min-h-screen" data-theme-bg style={{ backgroundColor: "var(--background)" }}>
            <div className="page-wrapper flex w-full" data-theme-bg style={{ backgroundColor: "var(--background)" }}>
                <div className="xl:block hidden">
                    <Sidebar />
                </div>
                <div className="w-full" data-theme-bg style={{ backgroundColor: "var(--background)" }}>
                    <Header />
                    <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 p-2">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}