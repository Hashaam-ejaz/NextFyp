'use client'

import Image from 'next/image'
import Link from 'next/link'
import productDetails from '../../public/utils/databases/productDetails.json';
import Product from '../../public/utils/interfaces/product';
import ProductImage from '../../public/images/ProductImage.png'

// const SingleProductDiv = (product: Product) => {
const SingleProductDiv = () => {
    const product:Product=productDetails.products[0];
    // console.log('product',productDetails.products[0]);

    // const StarRating = ({rating}) => {
    const StarRating = ({rating}:{rating:number}) => {
        
        // const stars = [];
        const stars:JSX.Element[] = [];
        // Fill stars array with filled or empty stars based on rating
        for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
        stars.push(<span key={i} className='text-[#FA8232]'>&#9733;</span>); // Filled star
        } else {
        stars.push(<span key={i} className='text-[#77878F]'>&#9734;</span>); // Empty star
        }
        }
        return(<div>{stars}</div>);
    }
    
  return (
    <>
        {/* {console.log(product.rating.averageRating)} */}
            <Link href={`/${product.category}/${product.subCategory}/${product.id}`} >
        <div id='singleProductDiv' className="flex flex-col p-2  self-center h-auto transition-shadow shadow  hover:shadow-xl ease-in-out duration-300 rounded-[0.5px] mx-[0.55vw] ">

            <div id='productImage'className="relative flex flex-row w-full  h-auto  ">
                {/* w-[90%] mx-auto */}
                {/* <div className='h-full w-full'> */}
                    <Image src={ProductImage} alt='product' className='h-auto w-[90%] max-w-[90%] min-w-[90%] '/>
                    {/* alt='product-image' max-h-full min-h-full transform scale-150 */}
                    <div className="absolute top-3 left-3 bg-[#954BAF] px-[4.68px] py-[2.34px]md:px-[10px] md:py-[5px] text-white flex shrink rounded-sm ">
                        <span className='w-auto h-auto max-w-[100%] md:text-xs text-[5.61px]'>
                            BEST DEALS
                        </span>
                    </div>
                {/* </div> */}
                
            </div>
            
            <div id='productDetails' className=" flex flex-row px-2 w-[90%] mx-auto justify-center ">
                <div className="flex flex-col h-full w-full ">
                    <div id='rating'className="flex flex-row text-[5.61%] md:text-xs ">
                        <StarRating rating={product.rating.averageRating}/>
                        <span className='text-[#77878F]'>{'('}{product.rating.reviewCount}{')'}</span>
                    </div>
                    <div id='productName' className="flex flex-row text-[#191C1F] text-xs md:text-sm font-normal mt-1  ">
                        <p className='max-h-[14px] md:max-h-[20px] md:h-[20px] overflow-hidden text-ellipsis whitespace-nowrap inline-block'>

                            {product.name}
                        </p>
                    </div>
                    <div id='productPrice' className="flex flex-row text-[#954BAF] text-sm mt-1 font-semibold">
                        {product.currencySymbol}{product.price}
                    </div>
                </div>
            </div>
        </div>
            </Link>
    </>
  )
}

export default SingleProductDiv;