'use client';
import LineChart from './LineChart'
import PieChart from './PieChart'
import React, { useEffect, useState } from 'react'
import Orders from '../../../../../providers/orders.json'
import SellerProducts from '../../../../../providers/sellerProducts.json'
import { IOrder } from '../../../../../models/orders'
import { Types } from 'mongoose'

interface TSLProps{
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

const TotalSalesGraphComponent: React.FC<TSLProps> = ({userID, Orders }) => {
  const [userOrders, setUserOrders] = useState<IOrder[]>(Orders);
  // const [userid, setUserID] = useState(userID);
  const [totalSales,setTotalSales]=useState(0);
  useEffect(()=>{
    if (!Orders) return;
    // console.log('Orders on TotalSalesGraph', Orders)
    const countTotalSales = async () => {
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
    <div className="flex flex-col w-full max-w-full min-w-full h-full bg-white rounded-[6px]">
        <div className="flex flex-row w-full max-w-full min-w-full h-auto max-w-auto min-w-auto py-4 px-7">
            <div className="flex flex-col w-full max-w-full min-w-full h-auto ">
                <div className="flex flex-row max-w-full min-w-full h-auto text-[#A3AED0]  font-medium text-[14px] leading-6">Total Sales</div>
                <div className="flex flex-row max-w-full min-w-full h-auto text-[##2B3674] text-[24px] font-bold leading-8">{totalSales}</div>
                <div className="flex flex-row max-w-full min-w-full h-auto text-[#A3AED0] text-[11.65px] font-medium leading-5">The Total Sales You Made</div>
            </div>
        </div>
        <hr className='border-t-[1.62px] border-[#ECECEC] w-full max-w-full min-w-full h-auto'/>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto max-h-auto min-h-auto p-5 justify-center"> 
            <LineChart userID={userID}/>
        </div>
    </div>
    </>
  )
}

export default TotalSalesGraphComponent