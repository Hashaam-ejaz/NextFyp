"use client";
import Image from "next/image";
import CategoryCard from "./category-card";
import CategoryCardDivImage from "../../../public/images/categoryCardDivImage.jpg";
import { ICategories } from "@/models/categories";
import { useState, useEffect } from "react";
const CategoryCardDiv = () => {
  const [categories, setCategories] = useState<ICategories[]>();
  let subCategories: string[] = [];
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories"); // Make API call
        const data = await response.json(); // Parse JSON response
        setCategories(data.categories); // Update state with fetched categories
        console.log(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/products"); // Make API call
        const data = await response.json(); // Parse JSON response
        setCategories(data.categories); // Update state with fetched categories
        console.log(data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories(); // Call function on component mount
  }, []); // Empty dependency array for initial fetch only

  categories?.map((item) =>
    item.subCategories.map((subCat) => subCategories.push(subCat.name))
  );
  subCategories = subCategories.slice(0, 8);

  console.log(subCategories);
  return (
    <>
      <div className="flex flex-row w-[90%] max-w-[90%] min-w-[90%] mx-auto">
        <div className="flex flex-col w-full max-w-full min-w-full h-auto">
          <div className="md:hidden flex flex-row text-xl w-[100%]  my-[10px] font-semibold">
            Categories
          </div>

          <div className="flex flex-row w-[100%] max-w-[100%] h-auto min-w-[100%] ">
            <div className="hidden md:flex md:flex-col w-1/5 max-w-[1/5] min-w-[1/5] relative">
              <div className="absolute font-semibold text-xl text-[#1C1C1C] h-[60%] max-h-[60%] min-h-[60%] top-[10%] left-[15.6%] mr-5">
                Explore Categories
              </div>
              <Image
                className="h-full w-full"
                src={CategoryCardDivImage}
                alt="Category-Card-Div-Label"
              />
            </div>

            <div className="flex flex-col w-full md:w-4/5 md:min-w-4/5 md:max-w-4/5 h-full ">
              <div className="flex flex-row w-full max-w-full min-w-full h-full ">
                <div className="flex flex-col w-full max-w-full min-w-full h-full">
                  <div className="flex flex-row flex-wrap w-full max-w-full min-w-full h-full md:flex-nowrap">
                    {subCategories.slice(0, 4).map((item, index) => (
                      <div
                        key={index}
                        className="w-1/2 max-w-1/2 min-w-1/2 md:w-1/4 md:max-w-1/4 md:min-w-1/4 flex flex-col  h-auto"
                      >
                        <CategoryCard name={item} image={"lalalal"} />
                      </div>
                    ))}
                  </div>
                  <div className="md:flex flex-row hidden h-full">
                    {subCategories.slice(4, 8).map((item, index) => (
                      <div
                        key={index}
                        className="w-1/4 max-w-1/4 min-w-1/4 hidden md:flex md:flex-col h-auto"
                      >
                        <CategoryCard name={item} image={"lalalal"} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCardDiv;
