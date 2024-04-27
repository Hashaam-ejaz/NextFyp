'use client';
import React, { useState } from 'react'
import Image from 'next/image';
import laptopImage1 from '../../../../public/images/laptop1.jpg'
import laptopImage2 from '../../../../public/images/laptop2.jpg'
import laptopImage3 from '../../../../public/images/laptop3.jpg'
import CarouselArrow from '../../../../public/images/carouselArrow.svg'
const Carousel = () => {

    const slides=[laptopImage1,laptopImage2,laptopImage3];
    const [currentIndex,setCurrentIndex]=useState(0);
    const prevSlide=()=>{
        const isFirstSlide=currentIndex===0;
        const newIndex=isFirstSlide? slides.length -1 : currentIndex -1;
        setCurrentIndex(newIndex);
    }
    const nextSlide=()=>{
        const islastSlide=currentIndex===slides.length-1;
        const newIndex=islastSlide? 0 : currentIndex +1;
        setCurrentIndex(newIndex);
    }

  return (
    <>
    {console.log('slides',slides[0])}
        <div className='max-w-[1440px] h-[780px] w-full m-auto py-16 px-4 relative group'>
            <div style={{backgroundImage: `url(${slides[currentIndex].src})`}} className='w-full h-full rounded-2xl bg-center bg-cover duration-500 '>

            </div>
            {/* right Carousel button */}
            {/* <div className="absolute top-[calc(50%-18.5px)] right-[-18.5px] "> */}
            <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[50%] right-5 text-2xl rounded-full cursor-pointer ">
              
              <button onClick={()=>nextSlide()} className=''>
                  <Image src={CarouselArrow} alt="CarouselArrowRight" className='rotate-180' width={30} height={30}/>
                  {/* <Image src={require(`../../../public/images/`)} alt="CarouselArrowRight" className='rotate-180'/> */}
              </button>
              
            </div>
            {/* left carousel arrow */}
            <div className="hidden group-hover:block absolute top-[50%] translate-x-0 translate-y-[50%] left-5 text-2xl rounded-full cursor-pointer ">
             
                <button onClick={()=>prevSlide()} className='' >
                  <Image src={CarouselArrow} alt="CarouselArrowleft" className='' width={30} height={30}/>
                </button>
              
              
            </div>
            <div className="absolute left-4 bottom-20 justify-center py-2 bg-transparent">

                {slides.map((slide, slideIndex)=>(
                    // <div className="flex flex-col mx-1">
                    
                        <button key={slideIndex} onClick={()=>{setCurrentIndex(slideIndex)}}  className={`size-[1vw] bg-white rounded-full    mx-1 cursor-pointer ${
                            slideIndex === currentIndex ? 'w-[3vw] transition duration-300' : ''} `}>

                        </button>

                    // </div>
                ))}

            </div>
        </div>
    </>
  )
}

export default Carousel