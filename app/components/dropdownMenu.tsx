'use client';
import React, { useRef, useState } from 'react'
import ExpandLogo from '../../public/images/expand_more.svg'
import Image from 'next/image'
import CategoriesName from '../../public/utils/databases/categoriesName.json';
import Link from 'next/link';
const DropdownMenu = () => {
    // const mouseOver=(mainCategoryIndex: number)=>{
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
        {/* <div id='dropdownHead' className="absolute right-3 top-3 w-auto h-[2/3] select-none group bg-purple-200"> */}
        <div id='dropdownHead' className="w-auto h-[2/3] select-none group/mainDiv  bg-purple-200  ">
        {/* <div id='dropdownHead' className="absolute right-3 top-3 w-auto h-[2/3] select-none "> */}
            
            <div className='flex justify-end'>
                <button id='category-btn' className=' justify-end shrink text-[#806491] text-sm border-[#806491] border-[0.8px] rounded-md p-1 pl-2 hover:ring-1 hover:ring-[#806491] md:bg-white '>
                    <span>All Categories</span>
                    <Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1' />
                </button>
            </div>
                {/* <div className='group bg-green-300'> */}
                <div id='category-div' className='hidden group-hover/mainDiv:block bg-green-300 relative'>
                {/* <div className='group-hover:block'> */}
                    {/* <div id='mainCategoryMenu' className=" hidden group-hover:block bg-pink-400 border-[0.8px] rounded-md mt-[8px] p-2 "> */}
                    <div ref={mainDivRef} onMouseOver={()=>handleMouseOverMainCategoryDiv()} id='mainCategoryMenu' className="  bg-pink-400 border-[0.8px] rounded-md mt-[8px] p-2 group/mainCategory ">
                    {/* <div id='mainCategoryMenu' className=" hidden  bg-white border-[0.8px] rounded-md mt-[8px] p-2 "> */}

                    
                    {CategoriesName.Categories.map((category,keyIndex)=>(
                        <div key={keyIndex} className='relative p-2 text-sm text-[#806491] hover:bg-gray-100/50 hover:p-2 cursor-pointer bg-yellow-200 group/individualMainCategory'  onMouseOver={(event) =>mouseOver(keyIndex,event)}>
                            {/* onMouseOver={mouseOver(keyIndex)} */}
                            <Link href='#'>

                                 {category.name}
                            </Link>
                        {/* {if(isSubMenuRight) && } */}
                            <Image src={ExpandLogo} alt="expandMoreLogo" className={` invisible inline-block ml-1 -rotate-90 bg-pink-500 group-hover/individualMainCategory:visible ${submenuPosition === 'left' ? 'rotate-90' : '-rotate-90'}`} />

                            <div ref={subDivRef} id='subcategoryMenu' className={`absolute w-full hidden group-hover/mainCategory:block bg-white  border-[0.8px] rounded-md mt-[8px] p-2 top-0 ${submenuPosition === 'right' ? 'left-full' : 'right-full'}`}>

                            {CategoriesName.Categories[mainCategoryIndex]?.subCategories.map((subCategory,index)=>(
                                
                                <div  key={index} className=' p-2 text-sm text-[#806491] hover:bg-gray-100/50 cursor-pointer hover:p-2 bg-lime-200'>
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

                    ))}
                {/* <div ref={subDivRef} id='subcategoryMenu' className={`absolute w-full hidden group-hover/mainCategory:block bg-white  border-[0.8px] rounded-md mt-[8px] p-2 top-0 ${submenuPosition === 'right' ? 'left-full' : 'right-full'}`}>

                {CategoriesName.Categories[mainCategoryIndex]?.subCategories.map((subCategory,index)=>(

                <div  key={index} className=' p-2 text-sm text-[#806491] hover:bg-gray-100/50 cursor-pointer hover:p-2 bg-lime-200'>
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
                {/* </div>  */}
                        
                    </div>
                    {/* <div id='subcategoryMenu' className="hidden group-hover:block bg-white  border-[0.8px] rounded-md mt-[8px] p-2 "> */}
                    
                </div>
                {/* <style jsx>
                {`
                #category-btn:hover + #category-div, #category-div:hover 
                    {
                        display: block;
                    }
                `}
                </style> */}
            {/* </div> */}

        </div>
    </>
  )
}

export default DropdownMenu