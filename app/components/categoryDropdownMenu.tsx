"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { IProduct } from "@/models/products";
import { ICategories } from "@/models/categories";
interface SetCategoryFunction {
  (category: string): void;
}
interface ShowCategoryFunction {
  (value: boolean): void;
}

const CategoryDropdownMenu = ({
  setCat,
  showCat,
}: {
  setCat: SetCategoryFunction;
  showCat: ShowCategoryFunction;
}) => {
  const [data, setData] = useState<ICategories[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/categories"); // Adjusted URL
        const data = await response.json();
        setData(data.categories); // Set the fetched categories to data state
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData(); // Call the function to fetch data
  }, []);

  const [mainCategoryIndex, setMainCategoryIndex] = useState(-1);

  // const [isSubMenuRight,setIsSubMenuRight]=useState(false)
  const [submenuPosition, setSubmenuPosition] = useState("right");
  const mainDivRef = useRef<HTMLDivElement>(null);
  const subDivRef = useRef<HTMLDivElement>(null);
  // console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)

  const handleMouseOverMainCategoryDiv = () => {
    if (mainDivRef.current) {
      const rect = mainDivRef.current.getBoundingClientRect();
      const spaceOnRight = window.innerWidth - rect.right;
      if (subDivRef.current) {
        const submenuWidth = subDivRef.current.offsetWidth; // Define your submenu's width here

        if (spaceOnRight >= submenuWidth) {
          setSubmenuPosition("right");
        } else {
          setSubmenuPosition("left");
        }
      }
    }
  };
  const mouseOver = (
    mainCategoryIndex: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    setMainCategoryIndex(mainCategoryIndex);
    let subcategoryMenu = document.querySelector(
      "#mainCategoryMenu #subCategoryMenu"
    );
    const mainCategoryMenu = document.getElementById("mainCategoryDiv");
    const rect = mainCategoryMenu?.getBoundingClientRect();
  };
  return (
    <>
      <div className=" ease-in-out transition-transform p-2  top-0 w-[100vw] max-w-full min-w-full bg-gray-100 bg-opacity-95 z-50">
        <div className="grid grid-cols-5">
          {data?.map((category, keyIndex) => (
            <div
              key={keyIndex}
              className="p-2 text-lg text-[#806491] 
                        cursor-pointer  group/individualMainCategory"
              onMouseOver={(event) => mouseOver(keyIndex, event)}
            >
              {category.category}

              <div className="grid grid-flow-row ">
                {category.subCategories.map((subcategory, subIndex) => (
                  <div
                    key={`${keyIndex}-${subIndex}`}
                    className="text-sm hover:underline mb-2 text-wrap"
                  >
                    <div
                      className=" hover:underline text-sm hover:text-[#806491] cursor-pointer"
                      onClick={() => {
                        // showCat(false);
                        setCat(subcategory.name);
                      }}
                    >
                      {subcategory.name}
                    </div>
                  </div>
                ))}
              </div>
              {/* {if(isSubMenuRight) && } */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategoryDropdownMenu;
