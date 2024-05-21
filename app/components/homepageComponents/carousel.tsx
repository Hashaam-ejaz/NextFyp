"use client";
import Image from "next/image";
import { useState } from "react";
import CarouselDivs from "./carousel-divs";
import CarouselArrow from "../../../public/svg/carouselArrow.svg";
const Carousel = () => {
  const carouselImages = [6];
  const slides = [{ CarouselDivs }, { CarouselDivs }, { CarouselDivs }];
  const [currentIndex, setCurrentIndex] = useState(0);
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const nextSlide = () => {
    const islastSlide = currentIndex === slides.length - 1;
    const newIndex = islastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <>
      <div className="flex flex-row w-[90%] mx-auto relative my-[10px] z-1  group">
        <CarouselDivs />
        <div className="hidden group-hover:block absolute  top-[calc(50%-18.5px)] right-[-18.5px] cursor-pointer">
          <button className="" onClick={() => nextSlide()}>
            <Image
              src={CarouselArrow}
              alt="CarouselArrowRight"
              className="rotate-180"
            />
          </button>
        </div>
        <div className="hidden group-hover:block cursor-pointer absolute top-[calc(50%-18.5px)] left-[-18.5px] ">
          <button onClick={() => prevSlide()} className="">
            <Image src={CarouselArrow} alt="CarouselArrowleft" className="" />
          </button>
        </div>
        <div className="hidden md:flex flex-row absolute bottom-[15px] left-[20px] justify-center">
          {slides.map((slide, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => {
                setCurrentIndex(slideIndex);
              }}
              className={`size-[1vw] bg-white rounded-full    mx-1 cursor-pointer ${
                slideIndex === currentIndex
                  ? "w-[3vw] transition duration-300"
                  : ""
              } `}
            ></button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
