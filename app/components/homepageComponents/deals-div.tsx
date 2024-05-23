import React from "react";
import DealsTimeDiv from "./deals-time-div";
import DealsCategoryDiv from "./deals-category-div";
import { IProduct } from "@/models/products";

const DealsDiv = ({ discountedProd }: { discountedProd: IProduct[] }) => {
  return (
    <div className="flex flex-row w-[86vw] md:w-[82vw] mt-[29px] mb-[22px] md:my-[24px] mx-auto flex-wrap md:flex-nowrap md:h-auto">
      <div className="flex flex-col md:w-[24%] w-full  ">
        <DealsTimeDiv initialDays={4} initialHours={22} initialMinutes={10} />
      </div>
      <div className="flex flex-col md:w-[76%] w-full mt-[23px] md:mt-0">
        <div className="flex flex-row w-full  justify-center items-center">
          {discountedProd.map((item, index) => (
            <div
              key={item.sellerId + index}
              className="flex flex-col md:w-[20%] w-1/3 h-full  items-center"
            >
              <DealsCategoryDiv
                imageLink={item.images[0].src}
                categoryName={item.subCategory}
                percentage={item.discount as number}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DealsDiv;
