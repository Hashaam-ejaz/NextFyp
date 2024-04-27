import Image from 'next/image'
import ProductDivArrowButton from '../../public/images/productArrowButton.svg'
import SingleProductDiv from './singleProductDiv'

//hydration issue, therefore disabling ssr
import dynamic from 'next/dynamic'

const DynSingleProductDiv=dynamic(()=>import('./singleProductDiv'),{ssr:false});


const ProductsDiv = () => {
  return (
    <>
    <div className="flex flex-row justify-center relative ">

        <div className="flex flex-col w-[30%] md:w-[18%] h-auto relative">
            <SingleProductDiv/>
            <div className=" absolute top-[calc(50%-12px)] left-[-12px] ">
              
              <button className=''>
                  <Image src={ProductDivArrowButton} alt="CarouselArrowleft" className='rotate-180 hover:ring-2'/>
              </button>
              
            </div>
        </div>
        <div className="flex flex-col w-[30%] md:w-[18%] h-auto">
            <SingleProductDiv/>
        </div>
        <div className="flex flex-col w-[30%] md:w-[18%] h-auto relative md:static">
            <SingleProductDiv/>
            <div className="md:hidden absolute top-[calc(50%-12px)] right-[-12px] ">
              
              <button className=''>
                  <Image src={ProductDivArrowButton} alt="CarouselArrowRight" className=''/>
              </button>
              
            </div>
        </div>
        <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto">
            <SingleProductDiv/>
        </div>
        <div className="hidden md:flex flex-col w-[30%] md:w-[18%] h-auto md:relative">
            <SingleProductDiv/>
            <div className="hidden md:block absolute top-[calc(50%-12px)] right-[-12px] ">
              
              <button className=''>
                  <Image src={ProductDivArrowButton} alt="CarouselArrowRight" className=''/>
              </button>
              
            </div>
        
        </div>

        

    </div>
    </>
  )
}

export default ProductsDiv