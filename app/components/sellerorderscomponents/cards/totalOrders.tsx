'use client';

import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import TotalOrdersIcon from '../../../../public/svg/amountIcon.svg'
import { IOrder } from '@/models/orders';

interface totalOrderProps{
  Orders: IOrder[]
}

const TotalOrders: React.FC<totalOrderProps> = ({Orders}) => {
  const [noOfOrders,setNoOfOrders]=useState(0);
  useEffect(()=>{
    if(!Orders) return;
    setNoOfOrders(Orders.length)
  },[Orders])
  // console.log('Orders on TotalOrders',Orders)
  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-auto items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto ">
            <Image
            src={TotalOrdersIcon}
            alt='Total-orders-icon'
            />
        </div>
        <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center ">
            <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
                Total Orders
            </div>
            <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8 ">{noOfOrders}</div>
        </div>

    </div>
    </>
  )
}

export default TotalOrders