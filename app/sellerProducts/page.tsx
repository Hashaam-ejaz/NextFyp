'use client'
import SideBar from '../components/sellerDashComponents/navbar/SideBar'
import ProductTable from '../components/sellerProductsComponents/table/productsTable'
import TotalRevenue from '../components/sellerorderscomponents/cards/totalRevenue'
import OrdersTable from '../components/sellerorderscomponents/table/ordersTable'
// import CogsCard from '../components/sellerProductsComponents/cards/cogs'
// import ProfitCard from '../components/sellerProductsComponents/cards/profit'
import TotalProducts from '../components/sellerProductsComponents/cards/totalProducts'
import WelcomeBar from '../components/sellerDashComponents/welcome-bar/WelcomeBar'
import React, { useEffect, useState }from 'react'
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import AddProductBtn from '../components/sellerProductsComponents/buttons/addProductBtn'
import { IOrder } from '../../models/orders'
import { IProduct } from '../../models/products'

const SellerProductsPage: React.FC = () => {
    const [userName, setUserName] = useState("");
    const [userID, setUserID] = useState("");
    const [userOrders, setUserOrders] = useState<IOrder[]>([]);
    const [userProducts, setUserProducts] = useState<IProduct[]>([]);
    const { data: session, status } = useSession();
    const router = useRouter();
    useEffect(() => {
      const fetchData = async () => {
      if (status === 'loading') {
          // Do nothing while loading
          return
      }
      if (status === 'unauthenticated') {
          router.replace('/login')
      }
      if (!session || !session.user?.name || !session.user?.email) return;
      const response = await fetch(
          `http://localhost:3000/api/users?email=${session.user.email}`
        );
        if (response.status === 400) {
          throw new Error('User not found');
        }
        // console.log('Response: ', response)
      const user = await response.json();
      const userData = user.existingUser;
      setUserID(userData._id);
      setUserName(session.user.name);
      }
      fetchData();
    }, [session, status, router]);
    // console.log('User ID on Main: ', userID)
    useEffect(() => {
      const fetchOrders = async () => {
        if (!userID) return;
  
        try {
          const response = await fetch(`http://localhost:3000/api/orders/${userID}`); 
          const data = await response.json();
          const Orders: IOrder[] = data.orders;
          setUserOrders(Orders);
        } catch (error) {
          console.error("Failed to fetch orders", error);
        }
      };
  
      fetchOrders();
    }, [userID]);
    // console.log('User Orders on Main: ', userOrders)

    useEffect(() => {
      const fetchProducts = async () => {
        if (!userID) return;
  
        try {
          const response = await fetch(`http://localhost:3000/api/products/sellerProducts/${userID}`); 
          const data = await response.json();
          const Products: IProduct[] = data.products;
          setUserProducts(Products);
        } catch (error) {
          console.error("Failed to fetch products", error);
        }
      };
  
      fetchProducts();
    }, [userID]);
    // console.log('Seller Products on Main: ', userProducts)
  return (
    <>
        <div className='flex flex-row min-w-screen-md h-auto w-[1440px] md:max-w-full md:min-w-full md:w-full bg-[#f7f7f7] '>
                <SideBar/>
            <div className='flex flex-col max-w-[82.85vw] min-w-[82.85vw] w-[82.85vw] h-auto  ml-[17.15vw]'>
                <WelcomeBar userName={userName}/>
                <div className="flex flex-row max-w-full min-w-full w-full h-auto">
                    <div className="flex flex-col w-full max-w-full min-w-full h-auto px-[47px] py-[30px]">
                        <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
                            <div className="flex flex-col max-w-full min-w-full w-full h-auto">
                                <div className="flex flex-row w-full max-w-full min-w-full h-auto mb-7 justify-between flex-1 ">
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-[21.3%] self-center">
                                        <TotalProducts Products={userProducts}/>
                                    </div>
                                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-[21.3%] self-center">
                                        <TotalRevenue Orders={userOrders}/>
                                    </div>
                                    {/* <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-[21.3%] self-center">
                                        <CogsCard/>
                                    </div> */}
                                    {/* <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-[21.3%] self-center">
                                      <ProfitCard/>
                                    </div> */}
                                </div>

                                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-7 justify-end flex-wrap">
                                  <AddProductBtn/>
                                </div>
                                
                                <div className="flex flex-row w-full max-w-full min-w-full h-auto bg-white">
                                <ProductTable Products={userProducts}/>
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

export default SellerProductsPage