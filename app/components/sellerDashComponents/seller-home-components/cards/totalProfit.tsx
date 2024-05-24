'use client';
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import TotalProfitIcon from '../../../../../public/svg/dollarIcon.svg'
import {IOrder} from '../../../../../models/orders'
import { Types } from 'mongoose';

interface totalSalesProps {
  userID: string;
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

const TotalProfit: React.FC<totalSalesProps>= ({userID, Orders}) => {
  const [totalRevenue,setTotalRevenue]=useState(0);
  const [currencySymbol,setCurrencySymbol]=useState('Rs. ');
  
  useEffect(() => {
    if (!Orders) return;
    // console.log('Orders on TotalProfit', Orders)
    const countTotalProfit = async () => {
        let revenue = 0;

        Orders.forEach((order: IOrder) => {
          order.products.forEach((product: IProduct) => {
            revenue += product.subtotal;
          });
        });

        setTotalRevenue(revenue);
    };

    countTotalProfit();
  }, [Orders]);
  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-full items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto ">
            <Image
            src={TotalProfitIcon}
            alt='Total-Profit-icon'
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

export default TotalProfit