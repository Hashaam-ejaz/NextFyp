'use client';
import React, { useEffect, useState } from 'react'
import { IOrder } from '@/models/orders';

interface unshippedOrdersProps{
  Orders: IOrder[]
}
const UnshippedOrders: React.FC<unshippedOrdersProps> = ({Orders}) => {
  const unshippedOrders=(Orders.filter(o=>o.orderStatus==='unshipped')).length
  useEffect(()=>{
    if(!Orders) return;
  },[Orders])
  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-auto items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center ">
            <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
                Unshipped Orders
            </div>
            <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8 ">{unshippedOrders}</div>
        </div>

    </div>
    </>
  )
}

export default UnshippedOrders