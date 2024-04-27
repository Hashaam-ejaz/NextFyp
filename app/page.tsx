'use client';
import Image from "next/image";
import Footer from "./components/footer";
import SingleProductDiv from "./components/singleProductDiv";
import ProductsDiv from "./components/productsDiv";
import Homepage from "./home/homepage";
import Carousel from "./components/homepageComponents/carousel";
import CarouselDivs from "./components/homepageComponents/carousel-divs";
import CategoryCardDiv from "./components/homepageComponents/category-card-div";
import Navbar from "./components/navbar";
import RecommendedProductsDiv from "./components/homepageComponents/recommendedProductsDiv";
import ScrollerDiv from "./components/scrollerDiv/scrollerDiv";
import FeaturedProductsDiv from "./components/homepageComponents/featuredProductsDiv";
import CategoryCard from "./components/homepageComponents/category-card";
import SearchBar from "./components/searchBar";
import { useState } from "react";
import DropdownMenu from "./components/dropdownMenu";

export default function Home() {
  // const [searchValue,setSearchValue]=useState('');
  // const handleSearch=(value:string)=>
  //   {
  //     console.log(value);
  //     setSearchValue(value);
  //   }
  return (
    <>
    
{/* <html lang="en" className="bg-[#F7FAFC] min-w-[400px]"> */}
      {/* <header className="  top-0 z-[1000]"><Navbar/></header> */}
      {/* <RecommendedProductsDiv/> */}
      {/* <ScrollerDiv/> */}
      <Homepage />
      {/* <CategoryCardDiv/> */}
      {/* <FeaturedProductsDiv/> */}
      {/* <DropdownMenu/> */}
      {/* <footer className=" fixed bottom-0 z-[1000]"><Footer/></footer> */}
      {/* <Carousel/> */}
      {/* <SearchBar onSearch={handleSearch}/> */}
      {/* <Navbar/> */}
    </>
  );
}
