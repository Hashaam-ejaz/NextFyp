'use client';
import Image from 'next/image'
import { useState } from 'react'
import CarouselDivs from './carousel-divs'
import CarouselArrow from '../../../public/images/carouselArrow.svg'
import CarouselButton from '../../../public/images/carousel-button.svg'
const Carousel = () => {
  const carouselImages=[6];
  const slides=[{CarouselDivs},{CarouselDivs},{CarouselDivs}];
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
        <div className="flex flex-row w-[90%] mx-auto relative my-[10px] z-1  group">
        {/*overflow-x-hidden shrink-0 grow-0
         {Array.from({ length: 6 }).map((_, index)=>( */}
            {/* <CarouselDivs key={index}/> */}
            <CarouselDivs />
        {/* // ))} */}
            {/* <div className="flex bg-[#806491] w-full h-full absolute"> */}
            {/* hhh */}
            {/* </div> */}

            {/* right Carousel button */}
            <div className="hidden group-hover:block absolute  top-[calc(50%-18.5px)] right-[-18.5px] cursor-pointer">
              
              <button className=''onClick={()=>nextSlide()}>
                  <Image src={CarouselArrow} alt="CarouselArrowRight" className='rotate-180'/>
                  {/* <Image src={require(`../../../public/images/`)} alt="CarouselArrowRight" className='rotate-180'/> */}
              </button>
              
            </div>
            {/* left carousel arrow */}
            <div className="hidden group-hover:block cursor-pointer absolute top-[calc(50%-18.5px)] left-[-18.5px] ">
             
                <button onClick={()=>prevSlide()} className='' >
                  <Image src={CarouselArrow} alt="CarouselArrowleft" className=''/>
                </button>
              
              
            </div>
            <div className="hidden md:flex flex-row absolute bottom-[15px] left-[20px] justify-center">
              {/* dynamic production of cols */}
              {/* <div className="flex flex-row"> */}
                
              {slides.map((slide, slideIndex)=>(
                // <div  className="flex flex-col mx-1">
                
                  <button key={slideIndex} onClick={()=>{setCurrentIndex(slideIndex)}} className={`size-[1vw] bg-white rounded-full    mx-1 cursor-pointer ${
                    slideIndex === currentIndex ? 'w-[3vw] transition duration-300' : ''} `}>

                  </button>

              // </div>
              ))}
              {/* </div> */}
              {/* <div className="flex flex-col"> */}
              </div>
              
            </div>
        {/* </div> */}
    </>
  )
}

export default Carousel
            // <div className="flex ">
            //     <Image src={require(`../../../public/images/pexels-andrea-piacquadio-1050244.jpg`)} alt='carouselImage'/>
            // </div>






    // <div >
        

    //     <div id="indicators-carousel" className="relative w-full" data-carousel="static">
    //         {/* <!-- Carousel wrapper --> */}
    //         <div className="relative h-[7.3vh] overflow-hidden rounded-lg md:h-[12.5vh]">
    //             {/* <!-- Item 1 --> */}
    //             <div className="hidden bg-red-500 duration-700 ease-in-out" data-carousel-item="active">
    //                 <Image src={require(`./main-logo.svg`)} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
    //             </div>
    //             {/* <!-- Item 2 --> */}
    //             <div className="hidden bg-pink-500 duration-700 ease-in-out" data-carousel-item>
    //                 <Image src={require(`./main-logo.svg`)} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
    //             </div>
    //             {/* <!-- Item 3 --> */}
    //             <div className="hidden bg-blue-500 duration-700 ease-in-out" data-carousel-item>
    //                 <Image src={require(`./main-logo.svg`)} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
    //             </div>
    //             {/* <!-- Item 4 --> */}
    //             <div className="hidden bg-green-500 duration-700 ease-in-out" data-carousel-item>
    //                 <Image src={require(`./main-logo.svg`)} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
    //             </div>
    //             {/* <!-- Item 5 --> */}
    //             <div className="hidden bg-orange-500 duration-700 ease-in-out" data-carousel-item>
    //                 <Image src={require(`./main-logo.svg`)} className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..."/>
    //             </div>
    //         </div>
    //         {/* <!-- Slider indicators --> */}
    //         <div className="absolute z-30 flex -translate-x-1/2 space-x-3 rtl:space-x-reverse bottom-5 left-1/2">
    //             <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
    //             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
    //             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
    //             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
    //             <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
    //         </div>
    //         {/* <!-- Slider controls --> */}
    //         <button type="button" className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
    //             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //                 <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
    //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4"/>
    //                 </svg>
    //                 <span className="sr-only">Previous</span>
    //             </span>
    //         </button>
    //         <button type="button" className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
    //             <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
    //                 <svg className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
    //                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4"/>
    //                 </svg>
    //                 <span className="sr-only">Next</span>
    //             </span>
    //         </button>
    //     </div>

    // </div>