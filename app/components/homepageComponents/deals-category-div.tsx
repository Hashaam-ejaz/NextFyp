import Image from "next/image";
import { useRouter } from "next/navigation";

const DealsCategoryDiv = ({
  imageLink,
  categoryName,
  percentage,
}: {
  imageLink: string;
  categoryName: string;
  percentage: number;
}) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/search/categoryName=${categoryName}&query=Enter%20Search...`);
  };

  return (
    <div
      className="flex flex-row w-full h-full cursor-pointer "
      onClick={handleClick}
    >
      <div className="flex flex-col items-center m-[0.25px] transition-shadow shadow  hover:shadow-md p-2 w-full">
        <div className="flex flex-row h-2/3   justify-center">
          <Image
            src={imageLink}
            alt="categoryImage"
            className="h-full w-auto"
            width={50}
            height={50}
          />
        </div>
        <div className="flex flex-row h-1/4 ">
          <div className="flex flex-col mb-[2px]">
            <div className="flex flex-row justify-center text-sm  text-[#1C1C1C] my-1 ">
              {categoryName}
            </div>
            <div className="flex flex-row text-[#EB001B] bg-[#FFE3E3] text-[9px] rounded-[18.63px] justify-center mb-1 ">
              {percentage}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsCategoryDiv;
