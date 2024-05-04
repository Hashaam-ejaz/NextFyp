// import Image from 'next/image'
'use client';
import Image from 'next/image'
import Link from 'next/link'
import MainLogo from '../../public/images/main-logo.svg'
import UserLogo from '../../public/images/user.svg'
import CartLogo from '../../public/images/cart.svg'
import WishlistLogo from '../../public/images/wishlist.svg'
import SearchBar from './searchBar';
import MainLogoLargeScreen from '../../public/images/main-logo-md-screen.svg'
import { useState } from 'react'
import CategoryDropdownMenu from './categoryDropdownMenu';
import CategoriesName from '../../public/utils/databases/categoriesName.json';
const Navbar = () => {
  const [searchValue,setSearchValue]=useState('');
  const [showCategories,setShowCategories]=useState(false);
  const [mainCategoryIndex,setMainCategoryIndex]=useState(-1);
  const handleSearch=(value:string)=>
    {
      console.log(value);
      setSearchValue(value);
      //searchValue is the value of search bar after pressing enter
    }
  const showCategoryDiv=(value:boolean)=>
    {
      console.log('navbar showcategoryDiv',value)
      setShowCategories(value);
    }
    // const showCategoryDropdown=(value:boolean)=>
    //   {
    //     setShowCategories(value);
    //     console.log('show categories',value)
    //   }

    //   const mouseOver=(mainCategoryIndex: number, event: React.MouseEvent<HTMLDivElement>)=>{

    //     // console.log(CategoriesName.Categories[0].subCategories[0].name)
    //     setMainCategoryIndex(mainCategoryIndex);
    //     console.log('main category index',mainCategoryIndex);
    //     console.log('subcategory: ',CategoriesName.Categories[mainCategoryIndex].subCategories[0].name)
    //     let subcategoryMenu=document.querySelector('#mainCategoryMenu #subCategoryMenu');
    //     const mainCategoryMenu=document.getElementById('mainCategoryDiv');
    //     const rect=mainCategoryMenu?.getBoundingClientRect()
    //     console.log('space Left',rect?.height);
    // };

  return (
    <>
    {/*  ko finish */}
        <nav className='relative'>
            <div className="flex flex-row bg-[#F7FAFC] md:bg-[#FFFFFF] min-w-full max-w-full  justify-between flex-wrap p-1 sticky top-0">
                <div className="flex flex-col justify-center ml-2 ">
                  {/* src={require(`../../images/main-logo.svg`)} */}
                    <Link href='/'>
                    <Image
                            src={MainLogo}
                            alt='main-logo'
                            className='md:hidden block'
                      />
                    </Link>
                    <Link href='/'>
                    <Image
                            src={MainLogoLargeScreen}
                            alt='main-logo'
                            className='hidden md:block'
                      />
                    </Link>
                </div>
                {/* nav links */}
                <div className="flex flex-col p-2 md:flex-shrink md:order-last md:w-[30%] md:max-w-[30%]">
                    <div className="flex flex-row ">
                      <div className="flex flex-col p-3 justify-center md:border-r md:border-[#D9D9D9]  ">
                        <Link href="/login">
                          <Image src={UserLogo} alt="UserLogo" className='inline-block' />
                          <span className=' text-[#666666] ml-1 mt-1 hidden md:inline  md:text-sm '>Sign Up/Sign In</span>
                        </Link>
                      </div>
                      <div className="flex flex-col p-3 justify-center  ">
                      <Link href="#">
                        <Image src={CartLogo} alt="CartLogo" className='inline-block' />
                          <span className='md:text-sm text-[#666666] ml-1 mt-1 hidden md:inline '>Cart</span>

                      </Link>
                      </div>
                      <div className="flex flex-col p-3 justify-center   ">
                      <Link href="#">
                        <Image src={WishlistLogo} alt="WishlistLogo" className='inline-block' />
                          <span className='md:text-sm text-[#666666] ml-1 mt-1 hidden md:inline'>Orders</span>

                      </Link>
                      </div>
                    </div>
                </div>
                {/* search bar */}
                {/* <SearchBar /> */}
                <SearchBar onSearch={handleSearch} hoverOverButton={showCategoryDiv}/>
                {/* <SearchBar onSearch={handleSearch} showCategories={showCategoryDropdown}/> */}
                {/* / */}



                {
                  (showCategories) && 
                
                  <div className="absolute top-full z-50">

                    <CategoryDropdownMenu/>
                  </div>
                }



                {/* category drop down */}
                {/* {showCategories &&
                (
                  <div id='dropdownHead' className="w-auto  select-none group/mainDiv  bg-purple-200  ">

                {/* <div className='flex justify-end'>
                        <button id='category-btn' className=' justify-end shrink text-[#806491] text-sm border-[#806491] border-[0.8px] rounded-md p-1 pl-2 hover:ring-1 hover:ring-[#806491] md:bg-white '>
                            <span>All Categories</span>
                            <Image src={ExpandLogo} alt="expandMoreLogo" className='inline-block ml-1' />
                        </button>
                </div> */}
                  {/* <div className=' hidden  max-w-full min-w-full bg-green-100 group-hover/mainDiv:block'>
                    <div className="grid grid-cols-5">
                      {CategoriesName.Categories.map((category,keyIndex)=>(
                        <div key={keyIndex} className='p-2 text-md text-[#806491] hover:bg-gray-100/50 hover:p-2 cursor-pointer bg-yellow-200 group/individualMainCategory'  onMouseOver={(event) =>mouseOver(keyIndex,event)}> */}
                      {/* onMouseOver={mouseOver(keyIndex)} */}
                          {/* <Link href='#' className=''>

                          {category.name}
                          </Link>
                          <div className='grid grid-flow-row '>
                              
                            {category.subCategories.map((subcategory,subIndex)=>(
                                <div key={subIndex} className='bg-red-100 text-sm hover:text-blue-400'>
                                    <Link href='#'>
                                    {subcategory.name}
                                    </Link>
                                </div>
                            ))}
                        

                        
                        

                          </div> */}
                {/* {if(isSubMenuRight) && } 
                    
                        </div> 
                    ))}
                  </div>
                </div>

              </div>
                )
                } */}
                

            </div>
        </nav>
        
    </>
  )
}

export default Navbar
        // <nav>

        //         <div id='navbarDiv'className='flex flex-row justify-between'>
        //             <div id='navbarLogo' className='flex flex-col p-3 item-center mx-3'>
                        
        //                 {/* <button>

        //                     <Image
        //                     src={require(`../../../public/images/main-logo.svg`)}
        //                     alt='main-logo'
        //                     />
        //                 </button> */}
                                
        //             </div>
        //             {/* <div id='searchBarDiv' className=' flex flex-col max-w-full mx-3'>
        //                 <SearchBar/>
        //             </div> */}
        //             <div id='navbarOptions' className='flex flex-col'>
        //                 <div id='navbarOptionsGrouped'className='flex flex-row'>
        //                     <div id='userLogo'className='flex flex-col p-3 item-center'>
        //                         {/* <button>

        //                             <Image
        //                             src={require(`../../../public/images/user.svg`)}
        //                             alt='user-logo'
        //                             />
        //                         </button> */}
                                
        //                         {/* <div className='inline-block mx-1 '>Sign up/Sign in</div> */}
        //                     </div> 
        //                     {/* <div className='flex flex-col p-3 item-center mx-1 border-e-1 border-[#D9D9D9]'>Login</div> */}
        //                     {/* <div className='flex flex-col p-3 item-center mx-1 '>SignUp</div> */}
        //                     <div id='cartImage'className='flex flex-col p-3 item-center '>
        //                         {/* <button>

        //                             <Image
        //                             src={require(`../../../public/images/cart.svg`)}
        //                             alt='cart-logo'
        //                             />
        //                         </button> */}
        //                     </div> 
        //                     {/* <div className='collapse visible '>Cart</div> */}

        //                     <div id='wishlistLogo'className='flex flex-col p-3 item-center'>
        //                         {/* <button>

        //                             <Image
        //                             src={require(`../../../public/images/wishlist.svg`)}
        //                             alt='wishlist-logo'
        //                             />
        //                         </button> */}
        //                     </div> 
        //                 </div>                    
        //             </div>   
                    

        //         </div>
        //     </nav>