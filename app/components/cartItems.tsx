"use client";
import Image from "next/image";
import Cart from "../providers/individualUsercart.json";
import Products from "../providers/products.json";
import defaultImage from "../../public/images/defaultImage.png";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const CartItems = ({
  subtotal,
  setSubtotal,
}: {
  subtotal: number;
  setSubtotal: Dispatch<SetStateAction<number>>;
}) => {
  const cartItems: (
    | {
        productID: number;
        quantity: number;
        price: number;
        totalPrice: number;
        additonals: { productID: number; quantity: number }[];
      }
    | {
        productID: number;
        quantity: number;
        additonals: never[];
        price: number;
        totalPrice: number;
      }
  )[] = [];
  const [itemCount, setItemCount] = useState(0);
  const [hasAddOns, setHasAddOns] = useState(true);
  const [totalQuantity, setTotalQuantity] = useState(0);
  Cart.subtotal = subtotal;
  Cart.noOfItems = totalQuantity;
  console.log("quantity", totalQuantity);
  console.log("index");

  useEffect(() => {
    let newSubtotal = 0,
      newTotalQty = 0;
    const updatedCartItems = Cart.cartItems.map((item, index) => {
      const product = Products.find((p) => p.productID === item.productID);
      const price = product?.price ?? 0;
      const tPrice = item.totalPrice;
      const qty = item.quantity;
      newSubtotal += tPrice;
      newTotalQty += qty;

      return {
        ...item,
        price,
        tPrice,
        qty,
      };
    });

    cartItems.push(...updatedCartItems);
    setSubtotal(newSubtotal);
    console.log("use effect subtotal", subtotal);
    setTotalQuantity(newTotalQty);
  }, [cartItems, setSubtotal, subtotal]);
  const settingInitialQuantity = (i: number) => {
    setItemCount(i);
  };

  const settingInitialSubtotal = (price: number) => {
    var temp = subtotal;
    temp += price;
    setSubtotal(temp);
  };
  const settingInitialTotalPrice = (i: number) => {
    var totalPrice = cartItems[i].price * cartItems[i].quantity;
    var subTotalTemp = subtotal;
    return totalPrice;
  };
  console.log("subtotal", subtotal);

  const increaseQuantity = (i: number) => {
    var subtotalTemp = subtotal,
      totalQuantityTemp = totalQuantity;
    cartItems[i].quantity += 1;
    cartItems[i].totalPrice =
      (cartItems[i].totalPrice ?? 0) + cartItems[i].price;
    setItemCount(cartItems[i].quantity);
    subtotalTemp += cartItems[i].price;
    totalQuantityTemp += 1;
    setSubtotal(subtotalTemp);
    setTotalQuantity(totalQuantityTemp);
    console.log("subtotal increase", subtotal);
  };
  const decreaseQuantity = (i: number) => {
    var subtotalTemp = subtotal,
      totalQuantityTemp = totalQuantity;
    cartItems[i].quantity -= 1;
    cartItems[i].totalPrice =
      (cartItems[i].totalPrice ?? 0) - cartItems[i].price;
    setItemCount(cartItems[i].quantity);
    subtotalTemp -= cartItems[i].price;
    totalQuantityTemp -= 1;
    setSubtotal(subtotalTemp);
    setTotalQuantity(totalQuantityTemp);
    console.log("subtotal decrease", subtotal);
  };
  return (
    <>
      <div className="flex flex-col w-[94.5%] max-w-[94.5%] min-w-[94.5%] h-auto md:w-full md:max-w-full md:min-w-full ">
        {Cart.cartItems.map((item, index) => {
          const product = Products.find((p) => p.productID === item.productID);
          cartItems.push(item);
          const price = product?.price;
          cartItems[index].price = price ?? 0;
          cartItems[index].totalPrice = settingInitialTotalPrice(index);
          let totalPriceTemp = cartItems[index].totalPrice;
          return (
            item.quantity > 0 && (
              <div
                key={index}
                className="flex flex-row w-full max-w-full min-w-full h-auto"
              >
                <div className="flex flex-col w-full max-w-full min-w-full h-full ">
                  <div className="flex flex-row w-full max-w-full min-w-full h-auto  justify-between py-[3.5%] border-b-[#F4F4F4]  border-b-[0.530]">
                    <div className="flex flex-col w-[38.15%] max-w-[38.15%] min-w-[38.15%] h-auto ">
                      <div className="flex flex-row max-w-full min-w-full h-auto">
                        <div className="flex flex-col w-[19%] max-w-[19%] min-w-[19%] mr-[2.2%] h-auto">
                          <Image
                            alt={
                              product && product.images && product.images[0]
                                ? product.images[0].alt
                                : "default-image"
                            }
                            src={
                              product && product.images && product.images[0]
                                ? require(`../../public/images/${product.images[0].src}`)
                                : defaultImage
                            }
                          />
                        </div>

                        <div className="flex flex-col w-[75%] max-w-[75%] min-w-[75%] h-auto  ">
                          <p className="break-all font-normal text-xs md:text-base text-[#3A3A3A]">
                            {subtotal}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col  w-[29.15%] max-w-[29.15%] min-w-[29.15%] h-auto">
                      <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between flex-wrap">
                        <div className="flex flex-col  md:w-[54%] w-full md:max-w-[54%] max-w-full md:min-w-[54%] min-w-full h-auto  ">
                          <div className="flex flex-row w-[95%] max-w-[95%] min-w-[95%] h-auto justify-center shrink">
                            <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto">
                              <button
                                className="transition-color duration-100 focus:outline-none text-black px-4 py-2 bg-white hover:bg-[#806491] hover:text-white rounded-[2.13px] hover:rounded-[2.13px]"
                                onClick={() => decreaseQuantity(index)}
                              >
                                -
                              </button>
                            </div>

                            <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto  text-[#060709]   bg-[rgb(244,244,244)] font-normal rounded-[2.13px] px-4 py-2 place-self-center">
                              <p>{cartItems[index].quantity}</p>
                            </div>
                            <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto">
                              <button
                                className="transition-color duration-100 focus:outline-none bg-white text-black px-4 py-2 hover:bg-[#806491] hover:text-white rounded-[2.13px] hover:rounded-[2.13px] text-center"
                                onClick={() => increaseQuantity(index)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="hidden md:flex flex-col w-[40%] max-w-[40%] min-w-[40%] h-auto font-normal text-sm break-words place-self-center">
                          {product?.currencySymbol}
                          {product?.price}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-[#806491] font-bold text-xs place-self-center">
                      {product?.currencySymbol}
                      {cartItems[index].totalPrice}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default CartItems;
