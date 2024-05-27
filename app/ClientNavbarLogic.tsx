"use client";
import { usePathname } from "next/navigation";
import Navbar from "./components/navbar";
import { useSession } from "next-auth/react";

export default function ClientNavbarLogic() {
  const pathname = usePathname();

  const shouldShowNavbar =
    pathname !== "/login" &&
    pathname !== "/signup" &&
    pathname !== "/sellerDashboard" &&
    pathname !== "/sellerOrders" &&
    pathname !== "/sellerProducts" &&
    pathname !== "/sellerSettings" &&
    pathname !== "/sellerAccountCreated" &&
    pathname !== "/sellerAccount" &&
    pathname !== "/addProduct" &&
    pathname !== "/editProduct";

  return shouldShowNavbar ? <Navbar /> : null;
}
