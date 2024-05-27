import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "./Providers";
import "./globals.css";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import ClientNavbarLogic from "./ClientNavbarLogic";

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
        <AuthProvider>
          <ClientNavbarLogic />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
