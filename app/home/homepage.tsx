import Images from 'next/image'
import Navbar from '../components/navbar';
import CategoryDiv from '../components/homepageComponents/categoryDiv';
import Carousel from '../components/homepageComponents/carousel';
import DealsTimeDiv from '../components/homepageComponents/deals-time-div';
import DealsCategoryDiv from '../components/homepageComponents/deals-category-div';
import CategoryCardDiv from '../components/homepageComponents/category-card-div';
import BestSellingProductsDiv from '../components/homepageComponents/bestSellingProductsDiv';
import RecommendedProductsDiv from '../components/homepageComponents/recommendedProductsDiv';
import FeaturedProductsDiv from '../components/homepageComponents/featuredProductsDiv';
import Footer from '../components/footer';
import DealsDiv from '../components/homepageComponents/deals-div';

const Homepage = () => {
    // const slides=[`D:/react/homepage/src/images/pexels-andrea-piacquadio-1050244.jpg`,`D:/react/homepage/src/images/pexels-andrea-piacquadio-1050244.jpg`,`D:/react/homepage/src/images/pexels-andrea-piacquadio-1050244.jpg`,`D:/react/homepage/src/images/pexels-andrea-piacquadio-1050244.jpg`]
  return (
    <>
    {/* <header>
        <Navbar/>
    </header> */}
     
    
    {/* <body className='bg-[#F7FAFC] py-[20px] min-w-[400px]'> */}
        {/* <div className="flex flex-row my-3 p-3"> */}

        <CategoryDiv/>
        {/* </div> */}
        {/* <div className="flex flex-row"> */}
            <Carousel/>
            {/* <Carousel>
                {slides.map((s)=>(
                    <img src={s}/>
                ))}
            </Carousel> */}
        {/* </div> */}
        {/* Discount div */}
        {/* <div className="flex flex-row w-[90%] max-w-[90%] min-w-[90%] my-4 mx-auto flex-wrap">
            <div className="flex flex-col ml-2 mb-2 grow">
                <DealsTimeDiv/>
            </div>
            
            <div className="flex flex-col  grow">
            <div className="flex flex-row  ">
                    <div className="flex flex-col "><DealsCategoryDiv/></div>
                    <div className="flex flex-col "><DealsCategoryDiv/></div>
                    <div className="flex flex-col "><DealsCategoryDiv/></div>
                    <div className="hidden md:flex flex-col "><DealsCategoryDiv/></div>
                    <div className="hidden md:flex flex-col "><DealsCategoryDiv/></div>
                </div>
            </div>
        </div> */}
        <DealsDiv/>
        {/* <div className="flex flex-row w-[90%] mx-auto ">
            <div className="flex flex-col w-full">
                <CategoryCardDiv/>
            </div>
        </div> */}
        <CategoryCardDiv/>
        <BestSellingProductsDiv/>
        <RecommendedProductsDiv/>
        <FeaturedProductsDiv/>

    {/* </body> */}
    {/* <footer>
        <Footer/>
    </footer> */}
    
    </>
  )
}

export default Homepage
        // <div className="md:hidden flex flex-row">Categories</div>
        //  <div className="flex flex-row my-4 mx-auto w-[90%] max-w-[90%] min-w-[90%] bg-slate-700 items-center">

        
        //     <div className="hidden md:flex flex-col bg-teal-100 w-[24%] max-w-[24%] min-w-[24%]">
        //         All Categories
        //     </div>
        //     <div className="flex flex-col md:w-[76%] md:max-w-[76%] md:min-w-[76%] bg-pink-700 p-2 w-full max-w-full min-w-full justify-center">
        //         <div className="flex flex-row w-full flex-wrap">
        //             <div className="flex flex-col md:w-[25%] md:max-w-[25%] md:min-w-[25%] w-[50%] max-w-[50%] min-w-[50%]  relative">
        //                 Image
        //             </div>
        //             <div className="flex flex-col md:w-[25%] md:max-w-[25%] md:min-w-[25%] w-[50%] max-w-[50%] min-w-[50%] relative">Cat</div>
        //             <div className="flex flex-col md:w-[25%] md:max-w-[25%] md:min-w-[25%] w-[50%] max-w-[50%] min-w-[50%] relative">Cat</div>
        //             <div className="flex flex-col md:w-[25%] md:max-w-[25%] md:min-w-[25%] w-[50%] max-w-[50%] min-w-[50%] relative">Cat</div>
        //         </div>
        //         <div className="hidden md:flex flex-row w-full">
        //             <div className="flex flex-col w-[25%] max-w-[25%] min-w-[25%] relative">Cat</div>
        //             <div className="flex flex-col w-[25%] max-w-[25%] min-w-[25%] relative">Cat</div>
        //             <div className="flex flex-col w-[25%] max-w-[25%] min-w-[25%] relative">Cat</div>
        //             <div className="flex flex-col w-[25%] max-w-[25%] min-w-[25%] relative">Cat</div>
        //         </div>
        //     </div>
        //  </div>