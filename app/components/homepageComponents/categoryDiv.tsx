"use client";
import { ICategories } from "@/models/categories";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

const CategoryDiv = () => {
  const [categories, setCategories] = useState<ICategories[]>();
  let subCategories: string[] = [];
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories");
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  categories?.map((item) =>
    item.subCategories.map((subCat) => subCategories.push(subCat.name))
  );
  return (
    <>
      <div
        id="categoryDiv"
        className="my-4 flex-row hidden md:flex w-[90%] max-w-[90%] min-w-[90%] mx-auto mb-[20px] overflow-x-scroll whitespace-nowrap scroll-smooth snap-mandatory snap-x "
      >
        <div className="mx-4 snap-start inline-block  cursor-pointer">
          <button className="rounded-[22px] py-1 px-2 bg-[#806491] text-white">
            All Categories
          </button>
        </div>
        {subCategories.map((item, index) => (
          <div
            key={index}
            className="mx-4 snap-start inline-block  cursor-pointer"
          >
            <Link href={`/search/categoryName=${item}&query=Enter%20Search...`}>
              <div className=" rounded-[20px] py-1 px-2 bg-slate-200 ">
                {item}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryDiv;
