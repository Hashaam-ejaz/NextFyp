'use client';
import Link from 'next/link'
import Image from 'next/image'
import CategoryDivImage from '@/public/images/categoryCard.jpg'
import Categories from '@/public/utils/databases/categories.json'
import Category from '@/public/utils/interfaces/category'


const CategoryCard = () => {
  const categoryToDisplay:Category=Categories.subcategories[0];
  return (
    <> 
    {/* <Link href="#"> */}
      {/* <div className="flex flex-row"> */}

        <div className="flex  flex-row relative  transition-shadow shadow  hover:shadow-xl border-[1px] border-[#E0E0E0] justify-between cursor-pointer">
            
          <div className="flex flex-col p-[12.47px] justify-start content-start max-w-[62%] w-[62%] min-w-[62%]">
            <div className="flex flex-row  font-normal    text-[#1C1C1C]">
            
            {/* 12.47px padding */}
                {categoryToDisplay.subcategoryName}
            </div>
            <div className="flex flex-row leading-3 text-[10.13px] font-normal text-[#8B96A5] md:leading-4">
                {/* <div className="fle top-[37.42px] left-[12.47px] leading-3 text-[10.13px] font-normal text-[#8B96A5] md:top-[48px] md:left-[16px]    md:leading-4 w-[44%]"> */}
                  From PKR 2000
                {/* </div> */}
            </div>
            
            
          </div>
          <div className="flex flex-col    w-[32%] min-w-[32%] max-w-[32%]  md:w-[30%] md:min-w-[30%] md:max-w-[30%]  ">
            <div className="flex flex-row  pt-[30%] w-auto">
              {/* md:min-h-[62%]   h-[60%] max-h-[60%] top-[30%] right-0 */}
            {/* <div className="absolute  w-auto md:min-h-[62%]  top-[30%] right-0 h-[60%] max-h-[60%] "> */}
              {/* <div className="relative">
              <Image fill className='h-full w-auto' src={CategoryDivImage} alt={categoryToDisplay.imageLabel.alt} />
            </div> */}
                <Image className='h-auto w-full ' src={CategoryDivImage} alt={categoryToDisplay.imageLabel.alt} />
              {/* 
              md:h-[62%]
              md:max-h-[62%]
                min-h-[60%]
              <Image className='h-full' src={require(`../../../public/images/`)} alt="category-div" /> */}
            </div>
          </div>
          {/* <div className="absolute top-[16%] left-[7.2%] md:top-[15.74%]  md:left-[7.17%]  font-normal    text-[#1C1C1C]     h-[17%] max-w-[62%] min-w-[62%] md:h-[15.27%] "> 
                {categoryToDisplay.subcategoryName}</div> */}
                {/*w-[62%] h-[16%]*/}
                {/* <div className="absolute top-[37.42px] left-[12.47px] leading-3 text-[10.13px] font-normal text-[#8B96A5] md:top-[48px] md:left-[16px]    md:leading-4 w-[44%]">
                  From PKR 2000
                </div> */}
            {/* <div className="absolute  w-auto md:min-h-[62%]  top-[30%] right-0 h-[60%] max-h-[60%] "> */}
              {/* <div className="relative">
              <Image fill className='h-full w-auto' src={CategoryDivImage} alt={categoryToDisplay.imageLabel.alt} />
            </div> */}
                {/* <Image className='h-full w-auto' src={CategoryDivImage} alt={categoryToDisplay.imageLabel.alt} /> */}
              {/* 
              md:h-[62%]
              md:max-h-[62%]
                min-h-[60%]
              <Image className='h-full' src={require(`../../../public/images/`)} alt="category-div" /> */}
            {/* </div> */}
        </div>

      {/* </div> */}
    {/* </Link> */}

             
    </>
  )
}

export default CategoryCard
//
// {/* <div className="flex flex-row">
//                 <div className="flex flex-col">
//                     <div className="flex flex-row text-sm  bg-pink-200 p-2">
//                       <h1>Smart Watches 2</h1>
//                     </div>
//                     <div className="flex flex-row text-sm bg-teal-200 p-2 ">
//                       <h1>Smart Watches</h1>
//                     </div>
//                 </div>
//              </div>
//             <div className=" absolute top-1/3 left-2/3 bg-lime-200 p-2">
//                 <Image src={require(`../../../public/images/categoryCard.jpg`)} alt="" />
//             </div>  */}