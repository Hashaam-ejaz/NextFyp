"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import MainLogo from "../../public/svg/main-logo.svg";
import CartLogo from "../../public/svg/cart.svg";
import UserLogo from "../../public/svg/user.svg";
import WishlistLogo from "../../public/svg/wishlist.svg";
import { useEffect, useState } from "react";
import MainLogoLargeScreen from "../../public/svg/main-logo-md-screen.svg";
import SearchBar from "./searchBar";
import CategoryDropdownMenu from "./categoryDropdownMenu";
const Navbar = () => {
  const router = useRouter();
  const [searchValue, setSearchValue] = useState("");
  const [showCategories, setShowCategories] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All Categories");
  const handleSearch = (value: string) => {
    setSearchValue(value);
    router.push(
      `/search/categoryName=${encodeURIComponent(
        selectedCategory
      )}&query=${value}`
    );
  };
  const showCategoryDiv = (value: boolean) => {
    setShowCategories(value);
  };

  return (
    <div className=" z-50 sticky top-0">
      <div className="flex flex-row bg-[#F7FAFC] md:bg-[#FFFFFF] min-w-full max-w-full  justify-between flex-wrap pt-1">
        <div className="flex flex-col justify-center ml-2 ">
          <Link href="/">
            <Image src={MainLogo} alt="main-logo" className="md:hidden block" />
          </Link>
          <Link href="/">
            <Image
              src={MainLogoLargeScreen}
              alt="main-logo"
              className="hidden md:block"
            />
          </Link>
        </div>
        {/* nav links */}
        <div className="flex flex-col p-2 md:flex-shrink md:order-last md:w-[30%] md:max-w-[30%] mt-4">
          <div className="flex flex-row ">
            <div className="flex flex-col p-3 justify-center md:border-r md:border-[#D9D9D9]  ">
              <Link href="/login">
                <Image src={UserLogo} alt="UserLogo" className="inline-block" />
                <span className=" text-[#666666] ml-1 mt-1 hidden md:inline  md:text-sm ">
                  Sign Up/Sign In
                </span>
              </Link>
            </div>
            <div className="flex flex-col p-3 justify-center  ">
              <Link href="/cart">
                <Image src={CartLogo} alt="CartLogo" className="inline-block" />
                <span className="md:text-sm text-[#666666] ml-1 mt-1 hidden md:inline ">
                  Cart
                </span>
              </Link>
            </div>
            <div className="flex flex-col p-3 justify-center   ">
              <Link href="/manageProfile">
                <Image
                  src={WishlistLogo}
                  alt="WishlistLogo"
                  className="inline-block"
                />
                <span className="md:text-sm text-[#666666] ml-1 mt-1 hidden md:inline">
                  Orders
                </span>
              </Link>
            </div>
          </div>
        </div>
        <SearchBar
          onSearch={handleSearch}
          hoverOverButton={showCategoryDiv}
          selectedCat={selectedCategory}
        />
        {showCategories && (
          <div className="absolute top-full">
            <CategoryDropdownMenu
              setCat={setSelectedCategory}
              showCat={showCategoryDiv}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
