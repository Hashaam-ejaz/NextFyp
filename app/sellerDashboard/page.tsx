"use client";
import TotalOrderGraphComponent from "../components/sellerDashComponents/seller-home-components/charts/totalOrderGraphComponent";
import TotalOrders from "../components/sellerDashComponents/seller-home-components/cards/totalOrders";
import TotalProfit from "../components/sellerDashComponents/seller-home-components/cards/totalProfit";
import TotalReturns from "../components/sellerDashComponents/seller-home-components/cards/totalReturns";
import TotalSales from "../components/sellerDashComponents/seller-home-components/cards/totalSales";
import TotalSalesGraphComponent from "../components/sellerDashComponents/seller-home-components/charts/totalSalesGraphComponent";
import TopSellingProductsTable from "../components/sellerDashComponents/seller-home-components/table/topSellingProductsTable";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import WelcomeBar from "../components/sellerDashComponents/welcome-bar/WelcomeBar";
import SideBar from "../components/sellerDashComponents/navbar/SideBar";
import { IOrder } from "../../models/orders";

const SellerHomepage: React.FC = () => {
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
    // console.log(session);
    if (!session || !session.user?.name || !session.user?.email) return;
    // console.log('calling user...')
    const response = await fetch(
        `http://localhost:3000/api/users?email=${session.user.email}`
      );
      if (response.status === 400) {
        throw new Error('User not found');
        return;
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
//   console.log('UserId on Main',userID);

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
// console.log('Orders on Main',userOrders)

  return (
    <>
      <div className="flex flex-row min-w-screen-md h-auto w-[1440px] md:max-w-full md:min-w-full md:w-full bg-[#f7f7f7] ">
        <SideBar />
        <div className="flex flex-col max-w-[82.84vw] min-w-[82.84vw] w-[82.84vw] h-auto flex-1 ml-[17.15vw] ">
          <WelcomeBar userName={userName} />
          <div className="flex flex-row max-w-full min-w-full w-full h-auto ">
            <div className="flex flex-col w-full max-w-full min-w-full h-auto px-[47px] py-[30px]">
              <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
                <div className="flex flex-col max-w-full min-w-full w-full h-auto">
                  <div className="flex flex-row w-full max-w-full min-w-full h-auto mb-7 justify-between flex-1">
                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%]">
                      <TotalSales Orders={userOrders}/>
                    </div>
                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%]">
                      <TotalProfit Orders={userOrders} userID={userID}/>
                    </div>
                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%]">
                      <TotalOrders Orders={userOrders}/>
                    </div>
                    <div className="flex flex-col h-auto w-[21.3%] max-w-[21.3%] min-w-w-[21.3%]">
                      <TotalReturns Orders={userOrders}/>
                    </div>
                  </div>
                  <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-7 justify-between flex-1">
                    <div className="flex flex-col w-[33%] max-w-[33%] min-w-w-[33%] h-auto">
                      <TotalOrderGraphComponent userID={userID} Orders={userOrders}/>
                    </div>
                    <div className="flex flex-col w-[57.67%] max-w-[57.67%] min-w-w-[57.67%] h-auto">
                      <TotalSalesGraphComponent userID={userID} Orders={userOrders}/>
                    </div>
                  </div>
                  <div className="flex flex-row w-full max-w-full min-w-full h-auto">
                    <TopSellingProductsTable userID={userID}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerHomepage;
