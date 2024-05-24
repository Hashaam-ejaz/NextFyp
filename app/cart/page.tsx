"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CartItems from "../components/cartItems";
import DeliveryIcon from "../../public/images/deliveryIcon.svg";
import FreeDeliveryIcon from "../../public/images/freeDeliveryIcon.svg";
import FreeReturnsIcon from "../../public/images/freeReturnsIcon.svg";
import DisplayMessages from "../providers/messages.json";
import Mastercard from "../../public/images/mastercard.svg";
import Visacard from "../../public/images/visacard.svg";
import CartInfo from "../providers/individualUsercart.json";
import { CartInfoType } from "../interfaces/cart";

const Cart = () => {
  const [newSubtotal, setNewsubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponValue, setCouponValue] = useState("");
  const [isValidCoupon, setIsValidCoupon] = useState(false);
  const [subtotal, setSubtotal] = useState(CartInfo.subtotal);
  const [totalQuantity, setTotalQuantity] = useState(CartInfo.noOfItems);
  const cartInfoVariable: CartInfoType = CartInfo;
  const [cartValue, setCartValue] = useState(cartInfoVariable);

  CartInfo.total =
    CartInfo.subtotal +
    CartInfo.shippingCost +
    (discount * CartInfo.subtotal) / 100;
  console.log("cart info", CartInfo);

  useEffect(() => {
    console.log("NEW SUBTOTAL CHANGED FROM CLIENT COMPONENT \n" + newSubtotal);
  }, [newSubtotal]);
  useEffect(() => {
    console.log("useeffect discount", discount);
    setSubtotal(CartInfo.subtotal);
    console.log("useeffect subtotal", subtotal);
    setTotalQuantity(CartInfo.noOfItems);
    console.log("useeffect qty", CartInfo.noOfItems);
    CartInfo.total =
      CartInfo.subtotal +
      CartInfo.shippingCost +
      (discount * CartInfo.subtotal) / 100;
    console.log(
      "CartInfo.subtotal",
      (CartInfo.discount * CartInfo.subtotal) / 100
    );
    console.log("use effect cart info", CartInfo);
  }, [discount, CartInfo, subtotal, totalQuantity]);

  const settingCouponCodeValue = (value: string) => {
    setCouponValue(value);
  };

  const sendOrderData = () => {};

  const applyCoupon = () => {
    const coupon = CartInfo.couponCodes.find((c) => c.codeName === couponValue);
    if (coupon === undefined) {
      console.log("coupon doesnot exist");
      setIsValidCoupon(false);
    } else {
      console.log("coupon exists");
      setIsValidCoupon(true);
      setDiscount(coupon.discount);
    }
  };
  return (
    <div className="flex flex-row bg-[#F7FAFC] md:bg-white w-full max-w-full min-w-full h-auto flex-wrap md:flex-nowrap md:justify-center">
      <div className="flex flex-col w-full max-w-full min-w-full h-auto md:w-[47.64%] md:max-w-[47.64%] md:min-w-[47.64%] md:mx-[2.22vw] border-b-[0.55px]">
        <div className="flex flex-row w-[94.485%] max-w-[94.485%] min-w-[94.485%] h-auto  place-self-center justify-between ">
          <div className="flex flex-col font-semibold text-[#5B4966] text-lg md:text-2xl">
            Your Cart {subtotal}
          </div>
          <div className="flex flex-col text-[#9D9EA2] font-light text-[8.81px] leading-[13.22px] md:text-base  place-self-center">
            <p>({totalQuantity})</p>
          </div>
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-center">
          <CartItems subtotal={newSubtotal} setSubtotal={setNewsubtotal} />
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
                  {DisplayMessages.deliveryInfo.mainHeading}
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378] ">
                  {DisplayMessages.deliveryInfo.subHeading}
                </div>
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto p-4 border-[1px] border-[#F4F4F4] rounded-xl">
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4">
                  <Image alt="free-delivery-div-icon" src={FreeDeliveryIcon} />
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 text-[#1A1E26] font-normal text-lg">
                  {DisplayMessages.freeDeliveryInfo.mainHeading}
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378]">
                  {DisplayMessages.freeDeliveryInfo.subHeading}
                </div>
              </div>
              <div className="flex flex-col w-[30%] max-w-[30%] min-w-[30%] h-auto p-4 border-[1px] border-[#F4F4F4] rounded-xl">
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4">
                  <Image alt="free-returns-icon" src={FreeReturnsIcon} />
                </div>
                <div className="flex flex-row w-full max-w-full min-w-full h-auto  mb-4 font-normal text-base text-[#717378]">
                  {DisplayMessages.freeReturnInfo}
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
                {CartInfo.shippingCostCurrencySymbol}
                {CartInfo.shippingCost}
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
                {CartInfo.total}
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
