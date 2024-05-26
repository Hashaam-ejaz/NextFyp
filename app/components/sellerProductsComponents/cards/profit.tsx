// 'use client';
// import React, { useEffect, useState } from 'react'
// import Image from 'next/image';
// import DollarIcon from '../../../../public/svg/dollarIcon.svg'
// import Orders from '../../providers/orders.json'
// import SellerProducts from '../../providers/sellerProducts.json'

// const ProfitCard= () => {
//   const [totalProfit,setTotalProfit]=useState(0);
//   const [currencySymbol,setCurrencySymbol]=useState('$');

//   useEffect(()=>
//     {
//       countTotalProfit();
//     },[]);

    
//   let revenue=0;
//       let totalRevenue=0;
//       let cogs=0;
//       let prod;
//       let salesPrice=0, costPrice=0, profitVariable=0;
  


//   const countTotalProfit=()=>
//     {
      
//       Orders.forEach(order=>
//         {
//           prod=SellerProducts.products.find(p=>(p.productID===order.productID));
//           salesPrice= prod?.price.salesPrice !== undefined ? prod.price.salesPrice : 0;
//           costPrice= prod?.price.costPrice !== undefined ? prod.price.costPrice : 0;
//           revenue+=salesPrice*order.quantity;
//           cogs+=costPrice*order.quantity;
//         }
       
//       )
//       profitVariable=revenue-cogs;
//       setTotalProfit(profitVariable);
//     }
//   return (
//     <>
//     <div className="flex flex-row w-full max-w-full min-w-full h-auto items-center px-[7%] py-[8.27%] rounded-[20px] bg-white justify-around">
//         <div className="flex flex-col w-[22%] max-w-[22%] min-w-[22%] h-auto ">
//             <Image
//             src={DollarIcon}
//             alt='dollar-icon'
//             />
//         </div>
//         <div className="flex flex-col w-[56.7%] max-w-[56.7%] min-w-[56.7%] h-auto justify-center self-center ">
//             <div className="flex flex-row w-full max-w-full h-auto text-[60%] text-[#A3AED0] leading-6 font-medium ">
//                 Profit
//             </div>
//             <div className="flex flex-row w-full max-w-full h-auto text-[100%] text-[#2B3674] font-bold leading-8 ">{currencySymbol}{totalProfit}</div>
//         </div>

//     </div>
//     </>
//   )
// }

// export default ProfitCard