'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import TotalRevenueIcon from '../../../../public/svg/dollarIcon.svg'
import { IOrder } from '@/models/orders';

interface totalRevenueProps{
  Orders: IOrder[]
}

const TotalRevenue : React.FC<totalRevenueProps> = ({Orders}) => {
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [currencySymbol,setCurrencySymbol]=useState('Rs. ');

useEffect(()=>{
  if(!Orders) return;
  countTotalRevenue();
},[Orders])

const countTotalRevenue=()=>
{
  let revenue=0;
  Orders.forEach(order => {
    order.products.forEach(product => {
      const salesPrice = product.productPrice;
      revenue += salesPrice * product.quantity;
    });
  });
  
  setTotalRevenue(revenue);
}

  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-auto items-center px-[7%] py-[8.27%] rounded-[20px] bg-white  justify-around">
        <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto ">
            <Image
            src={TotalRevenueIcon}
            alt='Total-revenue-icon'
            />
        </div>
        <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center ">
            <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
                Total Revenue
            </div>
            <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8 ">{currencySymbol}{totalRevenue}</div>
        </div>

    </div>
    </>
  )
}

export default TotalRevenue