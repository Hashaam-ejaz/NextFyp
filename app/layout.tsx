import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./Providers";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce",
  description: "A FYP of MCS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " p-0"}>
        <Navbar />
        <AuthProvider>{children}</AuthProvider>
        <Footer />
      </body>
    </html>
  );
}
