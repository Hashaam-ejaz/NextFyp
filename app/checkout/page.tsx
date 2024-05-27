"use client";
import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/");
  }, []);
  return <></>;
};

export default CheckoutPage;
