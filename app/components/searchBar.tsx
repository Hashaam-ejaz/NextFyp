// import Image from 'next/image'
'use client';
import Image from 'next/image'
import SearchLogo from '../../public/images/Search.svg'
import ExpandLogo from '../../public/images/expand_more.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import DropdownMenu from './dropdownMenu';
import CategoryDropdownMenu from './categoryDropdownMenu';

export type SearchProps=
{
    onSearch:(value:string)=>void
    // showCategories:(value:boolean)=>void
}
export type HoverFunctionality=
{
    hoverOverButton:(value:boolean)=>void
}

export type CombinedProps = SearchProps & HoverFunctionality;

// const SearchBar = (props:SearchProps,toggle:HoverFunctionality) => {
const SearchBar = ({onSearch, hoverOverButton}:CombinedProps) => {
// const SearchBar = ({onSearch: SearchProps,hoverValue:SearchProps}: SearchProps) => {
    // const {onSearch} = props;
    // const {hoverOverButton}=toggle;
    // const {showCategories} =hoverValue ;
    const [value,setValue]=useState('Enter Search...')
    const [isHover,setIsHover]=useState(false);

    useEffect(()=>{
        hoverOverButton(isHover);
        console.log('showcategoryDiv',isHover)
        }
        ,[hoverOverButton, isHover]);

    const mouseOverAllCategories=()=>{
        setIsHover(true);
        // hoverOverButton(isHover);
        // console.log('showcategoryDiv mouseOver',isHover)
    }
    const mouseOutAllCategories=()=>{
        setIsHover(false);
        // hoverOverButton(isHover);
        console.log('showcategoryDiv mouseout',isHover)

    }
    const searchHandler=(event: ChangeEvent<HTMLInputElement>)=>
    {
        const {target}= event;
        setValue(target.value);
        // console.log(value);

    }
    const handleKeyDown=(event:React.KeyboardEvent<HTMLInputElement>)=>
        {
            if(event.key==='Enter')
                {
                    onSearch(value);
                    console.log(value);
                }
        }
  return (
    <>
        <div className="flex flex-col justify-center w-full order-last md:order-none md:justify-center md:w-[40%] ">

             <div className='flex flex-row p-1 w-full max-w-full min-w-full relative'>
             { /*  <div className='flex flex-col p-3 items-center '> */}
                    {/* <Image
                        src={require(`../../../public/images/Search-magnifyingGlass.svg`)}
                        alt={'Search Logo'}
                    /> */}
                {/* </div> */}
                {/* <div className='flex flex-col p-3 justify-center '> */}
                    {/* <input className="p-3 bg-[##FFFFFF] rounded-md w-full min-w-full pl-10 md:hidden md:bg-[#F3F9FB]" type="text" name="searchBar" id="searchBar" placeholder='Search...' /> */}
                    <input className="p-3 bg-[##FFFFFF] rounded-md w-full min-w-full pl-10 md:hidden md:bg-[#F3F9FB]" 
                    type={'search'} 
                    name={"searchBar"} 
                    id="searchBar" 
                    placeholder={'Search...'} 
                    onChange={searchHandler}
                    onKeyDown={handleKeyDown}
                    />
                    {/* <input className="hidden md:block p-3 bg-[#F3F9FB] rounded-md w-full min-w-full pl-10" type="text" name="searchBar" id="searchBar" placeholder='Search essentials, groceries and more ...'  /> */}
                    <input className="hidden md:block p-3 bg-[#F3F9FB] rounded-md w-full min-w-full pl-10
                    overflow-hidden text-ellipsis whitespace-nowrap " 
                    type={"search"} 
                    name={"searchBar"} 
                    id="searchBar" 
                    placeholder={'Search essentials, groceries and more ...'} 
                    onChange={searchHandler}
                    onKeyDown={handleKeyDown} />
                    <div className='p-3 items-center absolute left-1 top-2'>
                        <Image
                            src={SearchLogo}
                            alt='SearchLogo'
                            className=''
                        />
                    </div>
                    <div className="absolute right-3 top-3 w-auto h-[2/3] group/allCategoriesBtn ">
                        <button className='shrink text-[#806491] text-sm border-[#806491] border-[0.8px] rounded-md p-1 pl-2 hover:ring-1 hover ring-[#806491] md:bg-white  ' 
                        onMouseOver={()=>mouseOverAllCategories()}
                        onMouseOut={()=>mouseOutAllCategories()}
                        >
                            <span>All Categories</span><Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1' />
                        </button>
                        {/* <DropdownMenu/> */}
                        {/* <div className='hidden group-hover/allCategoriesBtn:block'>
                            <CategoryDropdownMenu /> */}
                            {/* <div className='bg-pink-500 w-'>hello</div> */}
                        {/* </div> */}
                        {/* <CategoryDropdownMenu /> */}

                    </div>

                {/* </div> */}
                {/* <div>
                    SelectCategories
                </div> */}

            </div>
        </div>
    
    
    </>
  )
}

export default SearchBar