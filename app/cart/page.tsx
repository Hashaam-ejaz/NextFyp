"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CartItems from "../components/cartItems";
import DeliveryIcon from "../../public/images/deliveryIcon.svg";
import FreeDeliveryIcon from "../../public/images/freeDeliveryIcon.svg";
import FreeReturnsIcon from "../../public/images/freeReturnsIcon.svg";
import Mastercard from "../../public/images/mastercard.svg";
import Visacard from "../../public/images/visacard.svg";
import { useSession } from "next-auth/react";
import { IProduct } from "@/models/products";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [newSubtotal, setNewsubtotal] = useState(0);
  const [discount, setDiscount] = useState<number>(0);
  const [couponValue, setCouponValue] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [userId, setUserId] = useState(null);
  const [finalTotal, setfinalTotal] = useState<number>();
  const [cartItems, setCartItems] = useState<
    {
      userID: string;
      productID: string;
      quantity: number;
      totalPrice: number;
    }[]
  >([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const newTotal = newSubtotal - discount + 500;
    setfinalTotal(newTotal);
  }, [discount, newSubtotal]);

  const distinctSellers = new Set();
  cartItems.forEach((item) => {
    const prod = products.find((p) => p._id === item.productID);
    distinctSellers.add(prod?.sellerId);
  });

  useEffect(() => {
    async function getProducts() {
      const response = await fetch(`http://localhost:3000/api/products/`);
      const res = await response.json();
      setProducts(res.products);
    }
    getProducts();
  }, []);

  useEffect(() => {
    const fetchCartInfo = async () => {
      if (session) {
        const response = await fetch(
          `http://localhost:3000/api/users/?email=${session.user?.email}`
        );
        const data = await response.json();
        setUserId(data.existingUser._id);
        const response2 = await fetch(
          `http://localhost:3000/api/shoppingCart/${data.existingUser._id}`
        );
        const data2 = await response2.json();
      }
    };

    fetchCartInfo();
  }, [session]);

  const settingCouponCodeValue = (value: string) => {
    setCouponValue(value);
  };

  const applyCoupon = () => {
    const hardcodedCouponCode = "OFF300";
    if (couponValue === hardcodedCouponCode) {
      setIsValidCoupon(true);
      setDiscount(300);
    } else {
      setIsValidCoupon(false);
      setDiscount(0);
    }
  };

  const createOrders = () => {
    const orders = Array.from(distinctSellers).map((sellerId) => {
      const productsForSeller = cartItems
        .filter((item) => {
          const prod = products.find((p) => p._id === item.productID);
          return prod?.sellerId === sellerId;
        })
        .map((item) => {
          const prod = products.find((p) => p._id === item.productID);
          return {
            productID: item.productID,
            productName: prod?.name,
            productImage: prod?.images[0].src,
            productPrice: prod?.price,
            quantity: item.quantity,
            subtotal: item.totalPrice,
          };
        });

      return {
        buyerID: userId,
        buyerName: session?.user?.name,
        sellerID: sellerId,
        products: productsForSeller,
        totalAmount: productsForSeller.reduce(
          (acc, curr) => acc + curr.subtotal,
          0
        ),
        paymentStatus: "",
        orderStatus: "",
        address: "",
        phoneNo: "",
        date: new Date(),
        estimatedDelivery: new Date(
          new Date().getTime() + 7 * 24 * 60 * 60 * 1000
        ),
        trackingNo: "",
        trackingLink: "",
      };
    });
    return orders;
  };

  const sendOrderData = () => {
    const orders = createOrders();

    router.push(`/checkout/${encodeURIComponent(JSON.stringify(orders))}`);
  };

  return (
    <div className="flex flex-row bg-[#F7FAFC] md:bg-white w-full max-w-full min-w-full h-auto flex-wrap md:flex-nowrap md:justify-center">
      <div className="flex flex-col w-full max-w-full min-w-full h-auto md:w-[47.64%] md:max-w-[47.64%] md:min-w-[47.64%] md:mx-[2.22vw] border-b-[0.55px]">
        <div className="flex flex-row w-[94.485%] max-w-[94.485%] min-w-[94.485%] h-auto  place-self-center justify-between ">
          <div className="flex flex-col font-semibold text-[#5B4966] text-lg md:text-2xl">
            Your Cart
          </div>
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-center">
          {userId && (
            <CartItems
              setSubtotal={setNewsubtotal}
              userId={userId}
              parentSetCart={setCartItems}
            />
          )}
        </div>
        <div className=" hidden md:flex flex-row w-full max-w-full min-w-full h-auto  justify-between">
          <div className="flex flex-col w-full max-w-full min-w-full h-auto">
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto font-normal text-xl text-[#806491] my-4">
                Delivery
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto font-normal text-xl text-[#806491] my-4">
                Free Delivery
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto font-normal text-xl text-[#806491] my-4">
                Free Returns
              </div>
            </div>
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto p-4 border-[1px] border-[#F4F4F4] rounded-xl">
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4">
                  <Image alt="delivery-div-icon" src={DeliveryIcon} />
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 text-[#1A1E26] font-normal text-lg">
                  Order by 10pm for free next day delivery on Orders overs RS
                  1000
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378] ">
                  We deliver Monday to Saturday
                </div>
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto p-4 border-[1px] border-[#F4F4F4] rounded-xl">
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4">
                  <Image alt="free-delivery-div-icon" src={FreeDeliveryIcon} />
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 text-[#1A1E26] font-normal text-lg">
                  Free next day delivery to stores.
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378]">
                  Home delivery is RS. 500 for orders under 1000 and is FREE for
                  all orders over RS. 1000
                </div>
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto p-4 border-[1px] border-[#F4F4F4] rounded-xl">
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4">
                  <Image alt="free-returns-icon" src={FreeReturnsIcon} />
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378]">
                  We have made returns SO EASY - you can now return your order
                  to a store or send it with PakPost FOR FREE. Subject to return
                  date within 30 days of purchase.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-full min-w-full h-auto md:w-[29.2%] md:max-w-[29.2%] md:min-w-[29.2%] md:mx-[2.22vw] rounded-[14.79px] border-[1px] border-[#F4F4F4] md:rounded-2xl place-self-start ">
        <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
          <div className="flex flex-col w-full min-w-full max-w-full h-auto  p-[22.18px] md:p-6">
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col font-normal text-[14.79px] text-[#9D9EA2] leading-[22.18px] md:text-base">
                Subtotal
              </div>
              <div className="flex flex-col font-normal text-[14.79px] text-[#060709] leading-[22.18px] md:text-base">
                {newSubtotal}
              </div>
            </div>
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col font-normal text-[14.79px] text-[#9D9EA2] leading-[22.18px] md:text-base">
                Discount
              </div>
              <div className="flex flex-col font-normal text-[14.79px] text-[#060709] leading-[22.18px] md:text-base">
                {discount}
              </div>
            </div>
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col font-normal text-[14.79px] text-[#9D9EA2] leading-[22.18px] md:text-base">
                Shipping Costs
              </div>
              <div className="flex flex-col font-normal text-[14.79px] text-[#060709] leading-[22.18px] md:text-base ">
                RS. 500
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto  px-[22.18px] mb-[22.18px] md:px-6 md:mb-6 justify-between">
          <div className="flex flex-col  w-3/5 max-w-3/5 min-w-3/5 h-auto place-self-center">
            <input
              aria-disabled={isValidCoupon}
              disabled={isValidCoupon}
              type="text"
              className="rounded-[7.39px] md:rounded-lg border-[#F4F4F4] border-[1px] text-[14.79px] md:text-base px-[22.18px] py-[11.18px] break-words disabled:bg-[#e5e5e5] disabled:text-[#acacac]"
              placeholder="Coupon Code"
              onChange={(e) => settingCouponCodeValue(e.target.value)}
            />
          </div>
          <div className="flex flex-col  w-[37%] max-w-[37%] min-w-[37%] h-auto place-self-center">
            <button
              aria-disabled={isValidCoupon}
              disabled={isValidCoupon}
              className="bg-[#F3FBF4]  text-[#17AF26]  rounded-[92.42px] md:rounded-[100px] px-5 py-2 font-medium text-sm break-words disabled:bg-[#e5e5e5] disabled:text-[#acacac]
                    hover:bg-[#E6F4E7] focus:bg-[#E6F4E7]
                    transition-colors duration-300 ease-in-out"
              onClick={() => applyCoupon()}
            >
              Apply Coupon
            </button>
          </div>
        </div>
        {isValidCoupon && couponValue !== "" && (
          <div className="flex flex-row w-full max-w-full min-w-full h-auto  px-[22.18px] mb-[22.18px] md:px-6 md:mb-6 justify-between text-green-500 text-xs font-bold">
            <span>Coupon is valid!</span>
          </div>
        )}
        {!isValidCoupon && couponValue !== "" && (
          <div className="flex flex-row w-full max-w-full min-w-full h-auto  px-[22.18px] mb-[22.18px] md:px-6 md:mb-6 justify-between text-red-500 text-xs font-bold">
            <span>Coupon is invalid!</span>
          </div>
        )}
        <div className="flex flex-row w-full max-w-full min-w-full h-auto ">
          <div className="flex flex-col w-full min-w-full max-w-full h-auto  p-[22.18px] md:p-6">
            <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between">
              <div className="flex flex-col font-normal text-[14.79px] text-[#9D9EA2] leading-[22.18px] md:text-base">
                Total
              </div>
              <div className="flex flex-col font-normal text-[14.79px] text-[#060709] leading-[22.18px] md:text-base ">
                {finalTotal}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto   mb-[22.18px]  md:mb-6 justify-center ">
          <button
            className="bg-[#806491] px-[13.5%] py-[2.92px] text-[#FAFAFA] rounded font-semibold text-lg mx-3 w-full h-auto "
            onClick={() => sendOrderData()}
          >
            Go to Checkout
          </button>
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto mb-[19px] justify-center">
          <hr className=" h-[0.92px] w-[88.6%]max-w-[88.6%] min-w-[88.6%] border-t-0 bg-[#F4F4F4] " />
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto ml-[22.18px] md:ml-6 2 justify-start">
          <div className="flex flex-col min-w-[61.2%] max-w-[61.2%] w-[61.2%] md:min-w-[53.3%] md:max-w-[53.3%] md:w-[53.3%] h-full">
            <div className="flex flex-row w-full max-w-full min-w-full h-autofont-light text-xs text-[#717378]">
              SECURE PAYMENTS PROVIDED BY
            </div>
            <div className="flex flex-row w-full max-w-full min-w-full h-auto mt-[14.79px] mb-6">
              <div className="flex flex-col mr-3">
                <Image src={Mastercard} alt="mastercard" />
              </div>
              <div className="flex flex-col">
                <Image src={Visacard} alt="visacard" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
