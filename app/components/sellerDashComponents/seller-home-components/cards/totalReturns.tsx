'use client';

import React, { use, useState, useEffect } from 'react'
import { IOrder } from '../../../../../models/orders'

interface TotalReturnsProps {
   Orders: IOrder[]; 
  }

const TotalReturns: React.FC<TotalReturnsProps> = ({Orders}) => {
  useEffect(()=>{
    if(!Orders) return;
  }
  ,[Orders]);
  const totalReturns=(Orders.filter(o=>(o.orderStatus==='returned'))).length;
  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-full items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-full max-w-full min-w-full h-auto ">
           <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
                Total Returns
            </div>
           <div className="flex flex-row w-full max-w-full h-auto text-[24px] text-[#A3AED0] leading-8 font-bold ">
                {totalReturns}
            </div>
           
        </div>

    </div>
    </>
  )
}

export default TotalReturns