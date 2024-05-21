import Image from 'next/image'
import DealsCategoryDivImage from '../../../public/images/dealsCategoryDiv.jpg'
const DealsCategoryDiv = () => {
  return (
    <>
    {/* <Link href="#"> */}

    <div className="flex flex-row w-full h-full cursor-pointer ">
        {/* <Link href='#'>     */}
            <div className="flex flex-col items-center m-[0.25px] transition-shadow shadow  hover:shadow-md p-2 w-full">
                <div className="flex flex-row h-2/3   justify-center">
                    <Image src={DealsCategoryDivImage} alt="categoryImage" className='h-full w-auto' />
                </div>
                <div className="flex flex-row h-1/4 ">
                    <div className="flex flex-col mb-[2px]">
                        <div className="flex flex-row justify-center text-sm  text-[#1C1C1C] my-1">Laptops</div>
                        <div className="flex flex-row text-[#EB001B] bg-[#FFE3E3] text-[9px] rounded-[18.63px] px-[8.35px] py-[2px] justify-center mb-1 ">-19%</div>
                    </div>
                </div>
            
            </div>
        {/* </Link> */}

    </div>
        
    {/* </Link> */}
    </>
  )
}

export default DealsCategoryDiv