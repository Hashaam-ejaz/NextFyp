'use client';
import Image from 'next/image'
import SingleProductDiv from '../singleProductDiv'
import SliderArrow from '../../../public/images/productArrowButton.svg'

//hydration issue, therefore disabling ssr
import dynamic from 'next/dynamic'

//const DynSingleProductDiv=dynamic(()=>import('../singleProductDiv'),{ssr:false});


const FeaturedProductsDiv = () => {
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
        <div className='my-[10px] mt-[20px]' >
            <div className='font-semibold text-xl w-[90%] mx-auto '>
                Featured Items
            </div>
            <div className="relative flex items-center ">
                <div className="">
                {/* <div className="absolute top-[calc(50%-18.5px)] left-[-18.5px] "> */}
                        
                    <button onClick={()=>slideLeft()} className='rotate-180' >
                        <Image src={SliderArrow} alt="CarouselArrowleft" width={40} height={40}  className=''/>
                    </button>        
                </div>
                {/* left carousel arrow */}

                <div id="slider" className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth'>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw] '><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                    <div className='inline-block  cursor-pointer w-[30vw] md:w-[18vw]'><SingleProductDiv/></div>
                </div>
                
                <div className="">
                {/* <div className="absolute top-[calc(50%-18.5px)] right-[-18.5px] "> */}
                    <button onClick={()=>slideRight()} className=''>
                    <Image src={SliderArrow} alt="CarouselArrowRight" width={40} height={40} className=' '/>
                    </button>

                </div>

                </div>
        </div>
        

    </>
  
  )
}

export default FeaturedProductsDiv
    // <div className="flex flex-row flex-wrap overflow-x-hidden justify-center relative bg-yellow-200 ">

    //     <div className=" absolute top-[calc(50%-12px)] left-[-12px] ">
              
    //           <button className=''>
    //               <Image src={ProductDivArrowButton} alt="CarouselArrowleft" className='rotate-180 hover:ring-2'/>
    //           </button>
              
    //     </div>

    //     <div className="flex flex-col w-[30%] md:w-[18%] h-auto relative">
    //         <SingleProductDiv/>
            
    //     </div>
    //     <div className="flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="flex flex-col w-[30%] md:w-[18%] h-auto relative md:static">
    //         <SingleProductDiv/>
    //         <div className="md:hidden absolute top-[calc(50%-12px)] right-[-12px] ">
              
    //           <button className=''>
    //               <Image src={ProductDivArrowButton} alt="CarouselArrowRight" className=''/>
    //           </button>
              
    //         </div>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
    //         <SingleProductDiv/>
    //     </div>
    //     <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto md:relative">
    //         <SingleProductDiv/>
            
        
    //     </div>
    //     <div className="hidden md:block absolute top-[calc(50%-12px)] right-[-12px] ">
              
    //           <button className=''>
    //               <Image src={ProductDivArrowButton} alt="CarouselArrowRight" className=''/>
    //           </button>
              
    //     </div>

        

    // </div>