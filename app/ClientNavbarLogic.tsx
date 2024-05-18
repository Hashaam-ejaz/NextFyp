"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar";

export default function ClientNavbarLogic() {
  const pathname = usePathname();

  const shouldShowNavbar = pathname !== "/login" && pathname !== "/signup";

  return shouldShowNavbar ? <Navbar /> : null;
}
