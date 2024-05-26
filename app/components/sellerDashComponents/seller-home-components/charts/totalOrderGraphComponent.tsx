import PieChart from './PieChart'
import React, { useEffect, useState } from 'react'
import { IOrder } from '../../../../../models/orders'

interface TOGCProps{
    userID: string;
    Orders: IOrder[];
}

const TotalOrderGraphComponent: React.FC<TOGCProps> = ({ userID, Orders }) =>{
    
    useEffect(()=>{
        if(!Orders) return;
        // console.log('UserID in Order Graph',userID)
        // console.log('Orders in Order Graph',Orders)
    },[userID, Orders]);
    
  return (
    <>
    <div className="flex flex-col w-full max-w-full min-w-full h-full bg-white rounded-[6px] ">
        <div className="flex flex-row w-full max-w-full min-w-full h-auto max-w-auto min-w-auto py-4 px-7">
            <div className="flex flex-col w-full max-w-full min-w-full h-auto ">
                <div className="flex flex-row max-w-full min-w-full h-auto text-[#2B3674]  font-bold text-[19.98px] leading-6">
                    Total Orders
                </div>
                <div className="flex flex-row max-w-full min-w-full h-auto text-[#A3AED0] text-[11.65px] font-medium leading-5">
                    Order Statistics
                </div>
            </div>
        </div>
        
        <hr className='w-full max-w-full min-w-full h-auto border-t-[1.62px] border-[#ECECEC]'/>
        
        <div className="flex flex-row w-full max-w-full min-w-full h-auto max-h-auto min-h-auto p-[33px]  items-center justify-center "> 
            <PieChart Orders={Orders}/>
        </div>
    </div>
    </>
  )
}

export default TotalOrderGraphComponent