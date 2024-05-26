import Link from 'next/link'
import React from 'react'


const AddProductBtn = () => {
  return (
    <>
    <Link href='/addProduct'>
    
        <button className='w-auto bg-[#806491] rounded-[7.62px] leading-5 font-semibold px-[15.23px] py-[9.52px]  text-[13.33px] text-white transition-colors ease-in-out hover:bg-[#634c72] '>
            Add New Product
        </button>
        
    </Link>
    </>
  )
}

export default AddProductBtn