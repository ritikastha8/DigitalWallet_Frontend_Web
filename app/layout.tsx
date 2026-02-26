import type { Metadata } from "next";
import { Geist, Geist_Mono, Great_Vibes } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastContainer } from "react-toastify";
import { getUserData } from "@/lib/cookie";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NovaCash - Digital Wallet",
  description: "NovaCash digital wallet for sending, loading and managing money.",
};

type Theme = "light" | "dark" | "system";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserData();
  const initialTheme: Theme = (user?.theme ?? "system") as Theme;

  const themeScript = `
(function() {
  var t = ${JSON.stringify(initialTheme)};
  var d = document.documentElement;
  if (t === 'dark') { d.classList.add('dark'); d.classList.remove('light'); }
  else if (t === 'light') { d.classList.remove('dark'); d.classList.add('light'); }
  else {
    d.classList.remove('light');
    d.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);
  }
})();
`.trim();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${greatVibes.variable}  antialiased `}
      >
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <AuthProvider>
          <ThemeProvider initialTheme={initialTheme}>
            {children}
            <ToastContainer position="top-right" autoClose={3000} />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
