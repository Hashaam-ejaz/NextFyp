'use client'
import TotalOrders from '../components/sellerorderscomponents/cards/totalOrders'
import ShippedOrders from '../components/sellerorderscomponents/cards/shippedOrders'
import TotalRevenue from '../components/sellerorderscomponents/cards/totalRevenue'
import UnshippedOrders from '../components/sellerorderscomponents/cards/unshippedOrders'
import WelcomeBar from '../components/sellerDashComponents/welcome-bar/WelcomeBar'
import React, { useEffect, useState }from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import OrdersTable from '../components/sellerorderscomponents/table/ordersTable'
import SideBar from '../components/sellerDashComponents/navbar/SideBar'
import { IOrder } from '../../models/orders'


const SellerOrdersPage: React.FC= () => {
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [userOrders, setUserOrders] = useState<IOrder[]>([]); // Add this line
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      const fetchData = async () => {
          // console.log(status)
      if (status === 'loading') {
          // Do nothing while loading
          return
      }
      if (status === 'unauthenticated') {
          router.replace('/login')
      }
    //   console.log(session);
      if (!session || !session.user?.name || !session.user?.email) return;
    //   console.log('calling user...')
      const response = await fetch(
          `http://localhost:3000/api/users?email=${session.user.email}`
        );
        if (response.status === 400) {
          throw new Error('User not found');
        }
      const user = await response.json();
      const userData = user.existingUser;
      setUserID(userData._id);
      setUserName(session.user.name);
  
      // console.log(session.user.name);
      // setUserID(userData._id);
      // setUserName(session.user.name);
      // console.log(userEmail);
      }
      fetchData();
    }, [session, status, router]);
    // console.log('UserId on Main',userID);
  
    useEffect(() => {
      const fetchOrders = async () => {
        if (!userID) return;
  
        try {
          // console.log("calling orders...");
          const response = await fetch(`http://localhost:3000/api/orders/${userID}`); // Adjust the URL if needed
          const data = await response.json();
  
          const Orders: IOrder[] = data.orders;
          setUserOrders(Orders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
  
      fetchOrders();
    }, [userID]);
//   console.log('Orders on Main',userOrders)

  return (
    <>
        {/* <div className='flex flex-row min-w-screen-md h-auto w-[1440px] md:max-w-full md:min-w-full md:w-full bg-pink-500'> */}
        <div className='flex flex-row min-w-[768px] h-auto w-screen md:max-w-full md:min-w-full md:w-full bg-[#f7f7f7]'>

            {/* <div className='flex flex-col max-w-[17.15%] min-w-[17.15%] w-[17.15%] h-auto bg-blue-300'> */}
            {/* <div className='flex flex-col max-w-[17.15vw] min-w-[17.15vw] w-[17.15vw] h-auto bg-blue-300'> */}
                <SideBar/>
                {/* sidebar */}
            {/* </div> */}
            {/* <div className='flex flex-col max-w-[82.85%] min-w-[82.85%] w-[82.85%] h-auto bg-green-900'> */}
            <div className='flex flex-col max-w-[82.85vw] min-w-[82.85vw] w-[82.85vw] h-auto  ml-[17.15vw]'>
                {/* <div className="flex flex-col max-w-[82.84vw] min-w-[82.84vw] w-[82.84vw] h-auto flex-1 ml-[17.15vw]"> */}
                    <WelcomeBar userName={userName}/>
                {/* </div> */}
                <div className="flex flex-row max-w-full min-w-full w-full h-auto ">
                    <div className="flex flex-col w-full max-w-full min-w-full h-auto px-[47px] py-[30px] ">
                        <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
                            <div className="flex flex-col max-w-full min-w-full w-full h-auto">
                                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-7 justify-between flex-1">
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%] ">
                                        <TotalOrders Orders={userOrders}/>
                                    </div>
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%] ">
                                        <TotalRevenue Orders={userOrders}/>
                                    </div>
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%] ">
                                        <ShippedOrders Orders={userOrders}/>
                                    </div>
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%] "><UnshippedOrders Orders={userOrders}/></div>
                                </div>
                                
                                <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
                                <OrdersTable Orders={userOrders}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default SellerOrdersPage