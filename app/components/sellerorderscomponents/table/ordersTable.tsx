'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image'
import { IOrder } from '@/models/orders';
import Types from 'mongoose';

interface ordersTableProps{
  Orders: IOrder[]
}

const OrdersTable: React.FC<ordersTableProps> = ({Orders}) => {
  const [currentPage,setCurrentPage]=useState(1);
  const [orders, setOrders] = useState<IOrder[]>(Orders);
  const [isFirstPage,setIsFirstPage]=useState(true);
  const [isLastPage,setIsLastPage]=useState(false);
  const recordsPerPage=6;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const [currentOrdersIndex,setCurrentOrdersIndex]=useState(0);
  // const records=Products.products.slice(firstIndex,lastIndex);
  const records=Orders.slice(firstIndex,lastIndex);
  // const noOfPages=Math.ceil(Products.products.length/ recordsPerPage);
  const noOfPages=Math.ceil(Orders.length/ recordsPerPage);
  // "downlevelIteration": true in tsconfig.json
  const numbers=[...Array(noOfPages+1).keys()].slice(1);
  // console.log('records',records);

  const shipProducts= async (index:number, orderID: Types.ObjectId)=>
    {
      setCurrentOrdersIndex(index);
      // console.log('Order Index: ',index);
      // console.log('Order Id: ',orderID);
      const response = await fetch(`http://localhost:3000/api/orders/${orderID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderStatus: 'shipped' }),
      });
      if (!response.ok) {
        console.error('Failed to update order');
        return;
      }
      console.log('Order Shipped');
      Orders[(currentOrdersIndex+1)*currentPage-1].orderStatus='shipped';
      window.location.reload();
    }
  useEffect(()=>{
    if(!Orders) return;

    if(currentPage===1)
      setIsFirstPage(true);

    else
      setIsFirstPage(false);

    if(currentPage===noOfPages)
      setIsLastPage(true);
    else
      setIsLastPage(false);

  },[Orders,records,currentPage,noOfPages,currentOrdersIndex]);
  // console.log('Orders on OrdersTable',Orders);
  const prevPage=()=>
    {
      if(currentPage!==firstIndex)
        setCurrentPage(currentPage-1);
    };
  const changeCurrentPage=(id:number)=>
    {
      setCurrentPage(id);
    };
  const nextPage=()=>
    {
      if(currentPage!==lastIndex)
        setCurrentPage(currentPage+1);
    };



  return (
    <>
    <div className='flex flex-col min-w-full max-w-full w-full h-auto  p-5 bg-white'>
      <div className="flex flex-row w-full min-w-full max-w-full h-auto mb-5 font-bold text-xl leading-6 text-[#2B3674]">
        Orders <span className='font-normal '>({Orders.length})</span>
      </div>
      <div  className="flex flex-row w-full min-w-full max-w-full h-auto ">

        <table id='ordersTable' className="table min-w-full max-w-full w-full h-auto  border-gray-200 text-center  ">
          <thead className="table-header-group border-b-[1.62px] border-[#ECECEC]">
            <tr className='flex-wrap '>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">Order ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Buyer Name</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Quantity</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Method</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody className='table-row-group'>
            {Orders.map((order, orderIndex) => (
              order.products.map((product, productIndex) => (
                <tr key={`${orderIndex}-${productIndex}`} className="text-center flex-wrap">
                  <td className="py-2 px-4 border-b text-center mx-auto">
                    <Image src={product.productImage || ''} alt={product.productName} width={32} height={32} />
                  </td>
                  <td className="py-2 px-4 border-b text-center">{order._id}</td>
                  <td className="py-2 px-4 border-b text-center">{product.productName}</td>
                  <td className="py-2 px-4 border-b text-center">{order.buyerName}</td>
                  <td className="py-2 px-4 border-b text-center">{order.address}</td>
                  <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                  <td className="py-2 px-4 border-b text-center">{product.subtotal}</td>
                  <td className="py-2 px-4 border-b text-center">{order.paymentStatus}</td>
                  <td className="py-2 px-4 border-b text-center">
                    {order.orderStatus === 'unshipped' && (
                      <label className='rounded-2xl py-[2px] px-[10px] bg-[#6BAAFC] text-white text-sm font-medium leading-5 '>Confirmed</label>
                    )}
                    {order.orderStatus === 'cancelled' && (
                      <label className='rounded-2xl py-[2px] px-[10px] bg-[#D92D20] text-white text-sm font-medium leading-5 '>Cancelled</label>
                    )}
                    {order.orderStatus === 'shipped' && (
                      <label className='rounded-2xl py-[2px] px-[10px] bg-[#22C67F] text-white text-sm font-medium leading-5 '>Shipped</label>
                    )}
                    {order.orderStatus === 'returned' && (
                      <label className='rounded-2xl py-[2px] px-[10px] bg-[#2222c6] text-white text-sm font-medium leading-5 '>Returned</label>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b text-center">
                    <div className="flex">
                      {order.orderStatus !== 'shipped' && order.orderStatus !== 'cancelled' && order.orderStatus !== 'returned' && (
                        <button className="bg-indigo-600 text-white hover:bg-indigo-900 py-1 px-2 rounded mr-2" onClick={() => shipProducts(orderIndex-productIndex,order._id)}>
                          Ship
                        </button>
                      )}
                      <button className="bg-indigo-600 text-white hover:bg-indigo-900 py-1 px-2 rounded">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ))}
          </tbody>

        </table>

      </div>
      <div className="flex flex-row w-full min-w-full max-w-full h-auto justify-end  ">
      {/* <div className=""> */}
            {/* dropdown */}
        {/* <div className="flex flex-col">
              <div className="flex flex-row"></div>
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    
                  </div>
                </div>
              </div>
        </div> */}

          {/* pagination */}
        {/* <div className="flex flex-col"> */}
        {/* <div className=""> */}

          <ul className="pagination flex mt-5">
            <li className="page-item mx-1">
              <a href="#ordersTable" className={`page-link px-1 py-2 border border-[#dee2e6] ${isFirstPage ? 'pointer-events-none text-[#6c757d] cursor-not-allowed':''} font-medium text-base items-center bg-white`} onClick={(e)=>{
                if (isFirstPage) {
                  e.preventDefault(); // Prevent action if disabled
                } else {
                  prevPage();
                }
              }}>
                Prev
              </a>
            </li>

              {numbers.map((num,index)=>(
                <li key={index} className={`page-item ${currentPage=== num ? 'active':''} active:bg-[#007bff] active:text-white  active:border-[#dee2e6]`}>
                  <a href="#ordersTable" className='page-link px-2 py-2 border border-[#dee2e6] font-medium text-base items-center bg-white ' onClick={()=>changeCurrentPage(num)} >
                    {num}
                    </a>
                </li>  
              ))}

            <li className="page-item mx-1">
              <a href="#ordersTable" className={`page-link px-1 py-2 border border-[#dee2e6] ${isLastPage ? 'pointer-events-none text-[#6c757d] cursor-not-allowed':''} font-medium text-base items-center bg-white`} onClick={(e)=>{
                if(isLastPage)
                  e.preventDefault();
                else
                  nextPage();
              }}>
                Next
              </a>
            </li>
          </ul>

        {/* </div> */}
      </div>
    </div>

  </>
  );
};

export default OrdersTable;
