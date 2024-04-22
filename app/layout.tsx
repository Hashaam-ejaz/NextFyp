import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AuthProvider from "../app/component/AuthProvider/authProvider";
import "./globals.css";
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
          {children}
        </AuthProvider>
        </body>
    </html>
  );
}
