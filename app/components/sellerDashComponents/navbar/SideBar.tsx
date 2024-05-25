"use client";
import React, { useState } from "react";
import { FaHome, FaClipboardList, FaBox, FaCog, FaSignOutAlt } from "react-icons/fa";
import logo from '../../../../public/svg/sidebarMainLogo.svg'
import Image from "next/image";
import Link from "next/link";

const SideBar  = () => {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <>
    <div className='flex flex-col max-w-[17.15vw] min-w-[17.15vw] w-[17.15vw] h-screen min-h-screen max-h-screen fixed'>
      <div className=" flex flex-row bg-white sm:hidden">
        <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-700 focus:outline-none focus:text-gray-700">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div className={`bg-white text-gray-500 w-64 ${showMenu ? 'block' : 'hidden'} sm:block flex-shrink-0 flex flex-col` }>
      <div className={`bg-white text-gray-500 w-full max-w-full min-w-full ${showMenu ? 'block' : 'hidden'} sm:block  flex flex-col` }>
        <div className="h-[60rem] border-r border-gray-300">
           {/* Logo */}
           <div className="p-4">
             <Image src={logo} alt="Logo" className="w-40" /> 
           </div>

           <div className="sidebar flex flex-col justify-between h-full">
             <ul className="sidebar-nav">
               <li className="flex items-center p-4 hover:bg-[#806491] hover:text-white">
                 <Link href='/sellerDashboard'>
                  <FaHome className="mr-2" />
                    <span>
                      Home
                  </span>
                 </Link>
               </li>
               <li className="flex items-center p-4 hover:bg-[#806491] hover:text-white">
                <Link href='/sellerOrders'> 
                  <FaClipboardList className="mr-2" />
                  <span>
                    Orders
                  </span>
                 </Link>
               </li>
               <li className="flex items-center p-4 hover:bg-[#806491] hover:text-white">
               <Link href='/seller/products'><FaBox className="mr-2" /><span>Products</span></Link>
               </li>
               <li className="flex items-center p-4 hover:bg-[#806491] hover:text-white">
               <Link href='/seller/settings'><FaCog className="mr-2" /><span>Settings</span></Link>
               </li>
               <hr className="my-4" />
             <li className="flex items-center p-4 hover:bg-[#806491] hover:text-white"> 
             <Link href='/login'><FaSignOutAlt className="mr-2" /><span>Logout</span></Link>
             </li>
             </ul>
           
            
           </div>

         </div>
      </div> 
    </div>
    </div>

      </>
  );
};

export default SideBar;
         
