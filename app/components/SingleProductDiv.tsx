"use client";

import { IProduct } from "@/models/products";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const SingleprodDiv: React.FC<{ prod: IProduct }> = ({ prod }) => {
  const StarRating = ({ rating }: { rating: number }) => {
    const stars: JSX.Element[] = [];

    // useEffect(() => {
    // }, [prod]);

    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(
          <span key={i} className="text-[#FA8232]">
            &#9733;
          </span>
        );
      } else {
        stars.push(
          <span key={i} className="text-[#77878F]">
            &#9734;
          </span>
        );
      }
    }
    return <div>{stars}</div>;
  };

  return (
    // Check if prod and its id exist
    <Link href={`/products/${prod._id}`}>
      <div
        id="singleprodDiv"
        className="flex flex-col self-center w-[14.625rem] h-[20rem] transition-shadow shadow hover:shadow-xl ease-in-out duration-300 rounded-[0.5px]"
      >
        <div
          id="prodImage"
          className="relative w-[12.625rem] h-[11rem] m-[1rem] self-center"
        >
          <Image src={prod?.images[0].src} alt="prod" className="h-auto" fill />
        </div>
        <div
          id="prodDetails"
          className=" flex flex-row px-2 mx-[1rem] mb-[1rem] mt-[0.5rem] justify-center"
        >
          <div className="flex flex-col h-full w-full ">
            <div id="rating" className="flex flex-row text-[5.61%] md:text-xs ">
              <StarRating rating={prod?.avgRating} />
              <span className="text-[#77878F]">
                {"("}
                {prod?.noReviews}
                {")"}
              </span>
            </div>
            <div
              id="prodName"
              className="flex flex-row text-[#191C1F] text-xs md:text-sm font-normal mt-1  "
            >
              <p className="text-ellipsis inline-block text-wrap">
                {prod?.name}
              </p>
            </div>
            <div
              id="prodPrice"
              className="flex flex-row text-[#954BAF] text-sm mt-1 font-semibold"
            >
              PKR{"   "}
              {prod?.price}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SingleprodDiv;
