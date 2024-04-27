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
const Navbar = () => {
  const [searchValue,setSearchValue]=useState('');
  const handleSearch=(value:string)=>
    {
      console.log(value);
      setSearchValue(value);
      //searchValue is the value of search bar after pressing enter
    }
  return (
    <>
    {/*  ko finish */}
        <nav>
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
                <SearchBar onSearch={handleSearch}/>
                
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