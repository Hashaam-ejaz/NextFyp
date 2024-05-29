'use client'
import Image from "next/image";
import SingleProductDiv from "../SingleProductDiv";
import SliderArrow from "../../../public/svg/productArrowButton.svg";
// import { IProduct } from "@/models/products";
import { useEffect } from "react";

export default function Recommendations({recommendations}) {
//   useEffect(() => {
//   }, [recommendations]);
  const slideLeftRecommendation = () => {
    var slider = document.getElementById("recommendationSlider");
    if (slider) slider.scrollLeft = slider.scrollLeft - 200;
  };

  const slideRightRecommendation = () => {
    var slider = document.getElementById("recommendationSlider");
    if (slider) slider.scrollLeft = slider.scrollLeft + 200;
  };

  return (
    <>
      <div className=" mt-[10px] mb-[33px] w-full max-w-full justify-items-center">
        <div className="font-semibold text-xl w-[90%] mx-auto mb-[10px] ">
          People Also Viewed
        </div>
        <div className="relative flex items-center ">
          <div>
            <button
              onClick={() => slideLeftRecommendation()}
              className="rotate-180 "
            >
              <Image
                src={SliderArrow}
                alt="CarouselArrowleft"
                width={40}
                height={40}
                className=""
              />
            </button>
          </div>
          <div
            id="recommendationSlider"
            className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth snap-mandatory snap-x my-[20px]"
          >
            {recommendations.map((item, index) => (
              <div
                key={index}
                className="snap-start inline-block  cursor-pointer w-[30vw] max-w-[30vw] min-w-[30vw] md:w-[18vw] md:max-w-[18vw] md:min-w-[18vw]  "
              >
                <SingleProductDiv prod={item} />
              </div>
            ))}
          </div>
          <div>
            <button onClick={() => slideRightRecommendation()}>
              <Image
                src={SliderArrow}
                alt="CarouselArrowRight"
                width={40}
                height={40}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};