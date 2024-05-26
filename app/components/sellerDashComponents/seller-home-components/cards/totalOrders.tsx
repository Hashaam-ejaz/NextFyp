'use client';
import React, { useEffect, useState } from 'react'
import {IOrder} from '../../../../../models/orders'


interface TotalOrdersProps {
  Orders: IOrder[];
}

const TotalOrders: React.FC<TotalOrdersProps> = ({ Orders }) =>
{
  const totalOrders=Orders.length;
  const [orderVariation,setOrderVariation]=useState(0);
  const [isOrdersIncrease, setIsOrdersIncrease]=useState(true);

  useEffect(()=>
  {
    findOrderVariation();
  },[]);

    let currentMonth=new Date().getMonth();
    let prevMonth=(currentMonth === 0 ? 12 : currentMonth - 1);
    let currentMonthOrders=0, prevMonthOrders=0;
    let orderMonth=-1;

  const findOrderVariation=()=>
  {
      Orders.forEach(order=>
        {
          orderMonth=new Date(order.date).getMonth();
          // console.log(orderMonth,'orderMonth'); // Output: +25.00%
          if(orderMonth===currentMonth)
            currentMonthOrders+=1;
          else if(orderMonth===prevMonth)
            prevMonthOrders+=1;

        }
      )
      // console.log(currentMonthOrders,'currentMonthOrders');
      // console.log(prevMonthOrders,'prevMonthOrders');

      // Calculate the percentage change
      const percentageChangeAmount = (((currentMonthOrders - prevMonthOrders) / prevMonthOrders) * 100);
      const percentageChange=isNaN(percentageChangeAmount) ? 0 : percentageChangeAmount;
      setOrderVariation(Math.abs(percentageChange))
      if(percentageChange>=0)
        setIsOrdersIncrease(true);
      else
        setIsOrdersIncrease(false)
      // console.log(percentageChange,'percentagechange'); // Output: +25.00%
  }

  return (
    <>
    <div className="flex flex-row w-full max-w-full min-w-full h-full items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
        <div className="flex flex-col w-full max-w-full min-w-full h-auto ">
           <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
                Total Orders
            </div>
           <div className="flex flex-row w-full max-w-full h-auto text-[24px] text-[#A3AED0] leading-8 font-bold ">
                {totalOrders}
            </div>
           <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium  ">
                {(isOrdersIncrease) &&
                  
                  <span className='text-[#05CD99] mr-[4px]'>+{orderVariation}% </span>
                }
                {(!isOrdersIncrease) &&
                  
                  <span className='text-[#CD0500] mr-[4px]'>-{orderVariation}% </span>
                }
                
                since last month
            </div>
        </div>

    </div>
    </>
  )
}

export default TotalOrders