'use client';
import React, { useEffect} from 'react'
import Image from 'next/image';
import TotalProductsIcon from '../../../../public/svg/amountIcon.svg'
import { IProduct } from '@/models/products';

interface totalProductsProps {
  Products: IProduct[]
}
const TotalProducts: React.FC<totalProductsProps> = ({Products}) => {
  useEffect(()=>{
    if(!Products) return;
  },[Products])
  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-auto items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto ">
            <Image
            src={TotalProductsIcon}
            alt='Total-products-icon'
            />
        </div>
        <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center">
            <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium">
                Total Products
            </div>
            <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8 ">{Products.length}</div>
        </div>

    </div>
    </>
  )
}

export default TotalProducts