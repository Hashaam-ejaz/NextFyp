import Image from 'next/image'
import CarouselImage from '../../../public/images/carouselDivImage.svg'
import CarouselImageText from '../../../public/images/CarouselImageText.svg'
import CarouselDivGroupImage from '../../../public/images/carouselDivGroupImage.png'
const CarouselDivs = () => {
  return (
<>
        {/* {Array.from({ length: 6 }).map((_, index)=>( key={index}*/ }
             {/* <Carousel /> */}

    <div  className="flex flex-col bg-[#806491] w-full h-auto justify-center relative rounded-[6.84px] transform ease-in duration-500 ">
        <Image src={CarouselDivGroupImage} alt="carouselImage" className='md:block hidden w-[80%] h-auto mx-auto '/>
        {/* <Image src={CarouselDivItemImage} alt="CarouselDivItemImage" className='md:block hidden absolute right-[10%] top-[10%]' /> */}


        <Image src={CarouselImageText} alt="carouselImage" className='block md:hidden w-[90%] h-auto mx-auto  p-[24px]'/>
        {/* why absolute not working here ^ */}
    </div>
     {/* ))} */}
</>
  )
}

export default CarouselDivs