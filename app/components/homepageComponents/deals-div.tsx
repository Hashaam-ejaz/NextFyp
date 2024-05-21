import React from "react";
import DealsTimeDiv from "./deals-time-div";
import DealsCategoryDiv from "./deals-category-div";

const DealsDiv = () => {
  return (
    <div className="flex flex-row w-[86vw] md:w-[82vw] mt-[29px] mb-[22px] md:my-[24px] mx-auto flex-wrap md:flex-nowrap md:h-auto">
      {/* md:h-[11.5vh] */}
      <div className="flex flex-col md:w-[24%] w-full  ">
        <DealsTimeDiv />
      </div>
      <div className="flex flex-col md:w-[76%] w-full mt-[23px] md:mt-0">
        <div className="flex flex-row w-full  justify-center items-center">
          {/* <Link href='#'> */}
          <div className="flex flex-col md:w-[20%] w-1/3 h-auto  items-center">
            <DealsCategoryDiv />
          </div>
          {/* </Link> */}
          {/* <Link href='#'> */}
          <div className="flex flex-col md:w-[20%] w-1/3 h-auto  items-center">
            <DealsCategoryDiv />
          </div>
          {/* </Link> */}
          {/* <Link href='#'> */}
          <div className="flex flex-col md:w-[20%] w-1/3 h-auto  items-center">
            <DealsCategoryDiv />
          </div>
          {/* </Link> */}
          {/* <Link href='#'> */}
          <div className="hidden md:flex flex-col w-[20%] h-auto  items-center ">
            <DealsCategoryDiv />
          </div>
          {/* </Link> */}
          {/* <Link href='#'> */}
          <div className="hidden md:flex flex-col w-[20%] h-auto  items-center">
            <DealsCategoryDiv />
          </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default DealsDiv;
