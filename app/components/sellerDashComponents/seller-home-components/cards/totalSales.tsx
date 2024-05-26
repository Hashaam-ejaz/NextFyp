'use client';
import React, { useEffect } from 'react'
import { useState } from 'react';
import Image from 'next/image'
import TotalSalesIcon from '../../../../../public/svg/amountIcon.svg'
import {IOrder} from '../../../../../models/orders'
import { Types } from 'mongoose';

interface totalSalesProps {
  // userID: string;
  Orders: IOrder[];
}
interface IProduct {
  productID: Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}

const TotalSales: React.FC<totalSalesProps> = ({ Orders}) => {

  const [totalSales,setTotalSales]=useState(0);
  useEffect(()=>{
    const countTotalSales = async () => {
      if (!Orders) return;
        let temp = 0;
        Orders.forEach((order: IOrder) => {
          order.products.forEach((product: IProduct) => {
            temp += product.quantity;
          });
        });

        setTotalSales(temp);
    };

    countTotalSales();
  },[Orders])

  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-full items-center px-[7%] py-[8.27%] rounded-[20px] justify-around bg-white">
        <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto">
            <Image
            src={TotalSalesIcon}
            alt='Total-sales-icon'
            />
        </div>
        <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center ">
            <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium">
                Total Sales
            </div>
            <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8">{totalSales}</div>
        </div>

    </div>
    </>
  )
}

export default TotalSales

function useSate(): [any, any] {
  throw new Error('Function not implemented.');
}
