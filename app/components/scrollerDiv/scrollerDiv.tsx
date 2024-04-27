'use client';

import React, { useEffect, useRef } from 'react'
import SingleProductDiv from '../singleProductDiv'
import SliderArrow from '../../../public/images/productArrowButton.svg'
import Image from 'next/image';

const ScrollerDiv = () => {

  // let scrollPosition = 0;
  // const container=document.getElementById('container');
  // const scrollable=document.getElementById('scrollable');
  // console.log(container?.offsetWidth)
  
  // const scrollableRef=useRef<HTMLDivElement>(null);
  // const containerRef=useRef<HTMLDivElement>(null);
  // // let containerOffsetWidth;
  // const containerOffsetWidth = useRef<number | null>(null); // Initialize as null
  // const scrollableOffsetWidth = useRef<number | null>(null); // Initialize as null

  // useEffect(() => 
  // {
  //   console.log('use effect',containerRef.current?.offsetWidth);
  //   console.log('use effect scrollable',scrollableRef.current?.offsetWidth);
  //   if(containerRef.current)
  //     containerOffsetWidth.current=containerRef.current.offsetWidth
  //   if(scrollableRef.current)
  //     scrollableOffsetWidth.current=scrollableRef.current.offsetWidth

  // }, []); // Empty dependency array ensures this effect runs only once after initial render

  
  // // console.log(containerRef.current.offsetWidth)
  // const nextScroll=()=>{
  //   // if(containerRef.current && scrollableRef.current)
  //   if(containerOffsetWidth.current && scrollableOffsetWidth.current)
  //   {
      
  //     // scrollPosition += containerRef.current.offsetWidth;
  //     scrollPosition += containerOffsetWidth.current ?? 0;
  //     console.log('scroll position', scrollPosition);
  //     // scrollPosition = Math.min(scrollPosition, scrollableRef.current.scrollWidth - containerRef.current.offsetWidth);
  //     scrollPosition = Math.min(scrollPosition, (scrollableOffsetWidth.current ??0) - (containerOffsetWidth.current ??0));
  //     console.log('scroll position', scrollPosition);
  //     if(scrollableRef.current)
  //       {
  //         scrollableRef.current.scrollTo({
  //           left: scrollPosition,
  //           behavior: 'smooth'
  //         });
  //       }
  //   }
  // }
  // const prevScroll=()=>{}

  const slideLeft=()=>
  {
    var slider=document.getElementById('slider');
    // slider?.scrollLeft=slider?.scrollLeft-500;
    if(slider)
      slider.scrollLeft=slider.scrollLeft-(slider?.scrollWidth);

  }
  const slideRight=()=>
  {
    var slider=document.getElementById('slider');
    if(slider)
      slider.scrollLeft=slider.scrollLeft+500;

  }

  return (
    <>

    <div className="relative flex items-center">
      <div className="">
      {/* <div className="absolute top-[calc(50%-18.5px)] left-[-18.5px] "> */}
             
          <button onClick={()=>slideLeft()} className='rotate-180' >
            <Image src={SliderArrow} alt="CarouselArrowleft" width={40} height={40}  className=''/>
          </button>        
      </div>
      {/* left carousel arrow */}

      <div id="slider" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
        <div className='inline-block p-2 cursor-pointer'><SingleProductDiv/></div>
      </div>
      
      <div className="">
      {/* <div className="absolute top-[calc(50%-18.5px)] right-[-18.5px] "> */}
        <button onClick={()=>slideRight()} className=''>
          <Image src={SliderArrow} alt="CarouselArrowRight" width={40} height={40} className=' '/>
        </button>

      </div>

    </div>


    </>
  )
}

export default ScrollerDiv



// <>
//   {/* {console.log(container)} */}
//   <div className="flex flex-row bg-purple-400 overflow-x-hidden no-scrollbar scroll-ps-8 p-2">
    
//     <button className='bg-blue-500' onClick={()=>nextScroll()}>Next</button>
//     <button className='bg-zinc-500' onClick={()=>prevScroll()}>Prev</button>
    
//     <div ref={containerRef} id='container' className="flex flex-col p-2 bg-orange-400">
//       <div ref={scrollableRef} id='scrollable' className="flex flex-row bg-pink-400 p-2 ">

//           <div className="flex flex-col bg-lime-200 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-lime-700 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-lime-200 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-slate-700 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-green-200 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-grey-700 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-black min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-white min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-blue-200 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-red-700 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-pink-700 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//           <div className="flex flex-col bg-pink-200 min-w-[30vw] min-h-[30vh]  text-center">Div</div>
//       </div>
//     </div>


//   </div>

// </>