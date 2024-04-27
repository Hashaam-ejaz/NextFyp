'use client';
import React, { useState } from 'react'
import ExpandLogo from '../../public/images/expand_more.svg'
import Image from 'next/image'
import CategoriesName from '../../public/utils/databases/categoriesName.json';
import Link from 'next/link';
const DropdownMenu = () => {
    // const mouseOver=(mainCategoryIndex: number)=>{
    const [mainCategoryIndex,setMainCategoryIndex]=useState(-1);
    const [isSubMenuRight,setIsSubMenuRight]=useState(false)
    
    // console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)

    const mouseOver=(mainCategoryIndex: number, event: React.MouseEvent<HTMLDivElement>)=>{

        // console.log(CategoriesName.Categories[0].subCategories[0].name)
        setMainCategoryIndex(mainCategoryIndex);
        console.log('main category index',mainCategoryIndex);
        console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)
        let subcategoryMenu=document.querySelector('#mainCategoryMenu #subCategoryMenu');
        const mainCategoryMenu=document.getElementById('mainCategoryDiv');
        const rect=mainCategoryMenu?.getBoundingClientRect()
        console.log('space Left',rect?.height);
    }
  return (
    <>
        {/* <div className="absolute right-3 top-3 w-auto h-[2/3] "> */}
        <div id='dropdownHead' className="absolute right-3 top-3 w-auto h-[2/3] select-none group">
            
            {/* <div className=''> */}
                <button className='shrink text-[#806491] text-sm border-[#806491] border-[0.8px] rounded-md p-1 pl-2 hover:ring-1 hover:ring-[#806491] md:bg-white '>
                    <span>All Categories</span>
                    <Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1' />
                </button>
                <div className='group'>
                    <div id='mainCategoryMenu' className=" hidden group-hover:block bg-white border-[0.8px] rounded-md mt-[8px] p-2 ">

                    
                    {CategoriesName.Categories.map((category,keyIndex)=>(
                        <div key={keyIndex} className='p-2 text-sm text-[#806491] hover:bg-gray-100/50 hover:p-2 cursor-pointer group' onMouseOver={(event) =>mouseOver(keyIndex,event)}>
                            {/* onMouseOver={mouseOver(keyIndex)} */}
                            <Link href='#'>

                                 {category.name}
                            </Link>
                        {/* {if(isSubMenuRight) && } */}
                       <Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1 -rotate-90' /> 
                        </div>

                    ))}
                    </div>
                    <div id='subcategoryMenu' className="hidden group-hover:block bg-white  border-[0.8px] rounded-md mt-[8px] p-2 ">

                        {CategoriesName.Categories[mainCategoryIndex]?.subCategories.map((subCategory,index)=>(
                            
                            <div  key={index} className=' p-2 text-sm text-[#806491] hover:bg-gray-100/50 cursor-pointer hover:p-2'>
                                <Link href='#'>
                                {subCategory.name}
                                </Link>
                            </div> 
                        ))}
                        {/* {
                            mainCategory.map((category,keyIndex)=>(
                                <div key={keyIndex} className='p-2 text-sm text-[#806491] hover:bg-gray-100/50 hover:p-2' >
                                {/* onMouseOver={mouseOver(keyIndex)} */}
                                {/* {category.name} */}
                        
                            {/* </div> */}

                        {/* ))} */} 
                    </div>
                </div>
            {/* </div> */}

        </div>
    </>
  )
}

export default DropdownMenu