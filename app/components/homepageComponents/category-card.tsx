import Image from "next/image";
import CategoryDivImage from "@/public/images/categoryCard.jpg";

const CategoryCard: React.FC<{ name: string; image: string }> = ({
  name,
  image,
}) => {
  return (
    <>
      <div className="flex  flex-row relative  transition-shadow shadow  hover:shadow-xl border-[1px] border-[#E0E0E0] justify-between cursor-pointer">
        <div className="flex flex-col p-[12.47px] justify-start content-start max-w-[62%] w-[62%] min-w-[62%]">
          <div className="flex flex-row  font-normal    text-[#1C1C1C]">
            {name}
          </div>
          <div className="flex flex-row leading-3 text-[10.13px] font-normal text-[#8B96A5] md:leading-4">
            From PKR 2000
          </div>
        </div>
        <div className="flex flex-col    w-[32%] min-w-[32%] max-w-[32%]  md:w-[30%] md:min-w-[30%] md:max-w-[30%]  ">
          <div className="flex flex-row  pt-[30%] w-auto">
            <Image
              className="h-auto w-full "
              src={CategoryDivImage}
              alt={"lol"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryCard;
