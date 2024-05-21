import Image from "next/image";
import CarouselImageText from "../../../public/svg/CarouselImageText.svg";
import CarouselDivGroupImage from "../../../public/images/carouselDivGroupImage.png";
const CarouselDivs = () => {
  return (
    <div className="flex flex-col bg-[#806491] w-full h-auto justify-center relative rounded-[6.84px] transform ease-in duration-500 ">
      <Image
        src={CarouselDivGroupImage}
        alt="carouselImage"
        className="md:block hidden w-[80%] h-auto mx-auto "
      />
      <Image
        src={CarouselImageText}
        alt="carouselImage"
        className="block md:hidden w-[90%] h-auto mx-auto  p-[24px]"
      />
    </div>
  );
};

export default CarouselDivs;
