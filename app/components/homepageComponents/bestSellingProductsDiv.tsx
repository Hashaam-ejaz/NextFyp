import Image from "next/image";
import SingleProductDiv from "../SingleProductDiv";
import ProductDivArrowButton from "../../../public/svg/productArrowButton.svg";
import { IProduct } from "@/models/products";

const BestSellingProductsDiv = ({
  bestSellers,
}: {
  bestSellers: IProduct[];
}) => {
  return (
    <>
      <div className="flex flex-row w-full p-2 mt-[20px] relative">
        <div className="md:hidden absolute top-[calc(50%-12px)] right-[-12px] ">
          <button className="">
            <Image
              src={ProductDivArrowButton}
              alt="CarouselArrowRight"
              className=""
            />
          </button>
        </div>

        <div className="flex flex-col ">
          <div className="flex flex-row font-semibold text-xl w-[90%] mx-auto my-[10px]">
            Top Selling
          </div>
          <div className="flex flex-row justify-center md:flex-wrap flex-nowrap w-full ">
            {bestSellers.map((item, index) => (
              <div
                key={index}
                className="flex flex-col w-[30vw] md:w-[18vw] h-auto "
              >
                <SingleProductDiv prod={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellingProductsDiv;
