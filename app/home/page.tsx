"use client";
import { signOut } from "next-auth/react";
import SingleProductDiv from "../components/SingleProductDiv";
import { useEffect, useState } from "react";
import { IProduct } from "@/models/products";

const Page = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products/");
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>This is the home Page</h1>
      <div className="bg-red-400 w-fit rounded-lg px-4 py-2 cursor-pointer m-16">
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </button>
      </div>
      {products.map((product, index) => (
        <div
          key={product.id || index}
          className="snap-start inline-block  cursor-pointer"
        >
          <SingleProductDiv prod={product} />
        </div>
      ))}
    </div>
  );
};

export default Page;
