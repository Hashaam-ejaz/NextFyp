"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IProduct } from "@/models/products";

const Products: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);

  return <></>;
};

export default Products;
