'use client';
// import React from 'react'
import Image from 'next/image'
import ExpandLogo from '../../public/images/expand_more.svg'
import React, { useRef, useState } from 'react'
import CategoriesName from '../../public/utils/databases/categoriesName.json';
import Link from 'next/link';
const CategoryDropdownMenu = () => {
    const [mainCategoryIndex,setMainCategoryIndex]=useState(-1);
    
    // const [isSubMenuRight,setIsSubMenuRight]=useState(false)
    const [submenuPosition,setSubmenuPosition]=useState('right');
    const mainDivRef = useRef<HTMLDivElement>(null);
    const subDivRef = useRef<HTMLDivElement>(null);
    // console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)

    const handleMouseOverMainCategoryDiv=()=>{
        if (mainDivRef.current) {
            const rect = mainDivRef.current.getBoundingClientRect();
            const spaceOnRight = window.innerWidth - rect.right;
            if(subDivRef.current)
            {
                
            
                const submenuWidth = subDivRef.current.offsetWidth; // Define your submenu's width here

                if (spaceOnRight >= submenuWidth) {
                    setSubmenuPosition('right');
                } else {
                    setSubmenuPosition('left');
                }
            }
        }
    };
    const mouseOver=(mainCategoryIndex: number, event: React.MouseEvent<HTMLDivElement>)=>{

        // console.log(CategoriesName.Categories[0].subCategories[0].name)
        setMainCategoryIndex(mainCategoryIndex);
        // console.log('main category index',mainCategoryIndex);
        // console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)
        let subcategoryMenu=document.querySelector('#mainCategoryMenu #subCategoryMenu');
        const mainCategoryMenu=document.getElementById('mainCategoryDiv');
        const rect=mainCategoryMenu?.getBoundingClientRect()
        // console.log('space Left',rect?.height);
    };
  return (
    <>
    {/* <div id='dropdownHead' className="w-auto  select-none   "> */}

        {/*
        
        <div className='flex justify-end'>
                <button id='category-btn' className=' justify-end shrink text-[#806491] text-sm border-[#806491] border-[0.8px] rounded-md p-1 pl-2 hover:ring-1 hover:ring-[#806491] md:bg-white '>
                    <span>All Categories</span>
                    <Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1' />
                </button>
        </div> */}
        <div className=' ease-in-out transition-transform p-2  top-0 w-[100vw] max-w-full min-w-full bg-gray-100 bg-opacity-95 z-50'>
            <div className="grid grid-cols-5">
            {CategoriesName.Categories.map((category,keyIndex)=>(
                        <div key={keyIndex} className='p-2 text-lg text-[#806491] 
                        cursor-pointer  group/individualMainCategory'  onMouseOver={(event) =>mouseOver(keyIndex,event)}>
                            {/* onMouseOver={mouseOver(keyIndex)} */}
                            <Link href='#' className='hover:underline my-8 text-wrap font-semibold'>

                                 {category.name}
                            </Link>
                            <div className='grid grid-flow-row '>
                                
                                    {category.subCategories.map((subcategory,subIndex)=>(
                                        <div key={subIndex} className='text-sm hover:underline mb-2 text-wrap'>
                                            <Link href='#'>
                                            {subcategory.name}
                                    </Link>
                                        </div>
                                    ))}
                                

                                
                                

                            </div>
                        {/* {if(isSubMenuRight) && } */}
                            
                            </div> 
                            ))}
            </div>
        </div>

    {/* </div> */}
    
    </>
  )
}

export default CategoryDropdownMenu