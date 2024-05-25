import Image from "next/image";
import SingleProductDiv from "../SingleProductDiv";
import SliderArrow from "../../../public/svg/productArrowButton.svg";
import { IProduct } from "@/models/products";

const FeaturedProductsDiv = ({
  featuredProd,
}: {
  featuredProd: IProduct[];
}) => {
  const slideLeft = () => {
    var slider = document.getElementById("featuredProductsSlider");
    if (slider) slider.scrollLeft = slider.scrollLeft - 200;
  };
  const slideRight = () => {
    var slider = document.getElementById("featuredProductsSlider");
    if (slider) slider.scrollLeft = slider.scrollLeft + 200;
  };
  return (
    <div className=" mt-[20px] my-[10px] w-full max-w-full justify-items-center h-auto">
      <div className="font-semibold text-xl w-[90%] mx-auto mb-[10px]">
        Featured Items
      </div>
      <div className="relative flex items-center h-auto">
        <div>
          <button onClick={() => slideLeft()} className="rotate-180">
            <Image
              src={SliderArrow}
              alt="CarouselArrowleft"
              width={40}
              height={40}
            />
          </button>
        </div>
        <div
          id="featuredProductsSlider"
          className="w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth snap-mandatory snap-x my-[20px]"
        >
          {featuredProd.map((item, index) => (
            <div
              key={item.sellerId + index}
              className="snap-start inline-block  cursor-pointer w-[30vw] max-w-[30vw] min-w-[30vw] md:w-[18vw] md:max-w-[18vw] md:min-w-[18vw] "
            >
              <SingleProductDiv prod={item} />
            </div>
          ))}
        </div>
        <div className="">
          <button onClick={() => slideRight()} className="">
            <Image
              src={SliderArrow}
              alt="CarouselArrowRight"
              width={40}
              height={40}
              className=" "
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductsDiv;
