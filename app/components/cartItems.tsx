"use client";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  useCallback,
} from "react";

import { IProduct } from "@/models/products";
import { IShoppingCart } from "@/models/shoppingCart";

const CartItems = ({
  setSubtotal,
  userId,
  parentSetCart,
}: {
  setSubtotal: Dispatch<SetStateAction<number>>;
  userId: string;
  parentSetCart: Dispatch<
    SetStateAction<
      {
        userID: string;
        productID: string;
        quantity: number;
        totalPrice: number;
      }[]
    >
  >;
}) => {
  const [cart, setCart] = useState<any[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cartItems, setCartItems] = useState<
    {
      userID: string;
      productID: string;
      quantity: number;
      totalPrice: number;
    }[]
  >([]);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    parentSetCart(cartItems);
  }, [cartItems, parentSetCart]);

  useEffect(() => {
    async function getCart() {
      const response = await fetch(
        `http://localhost:3000/api/shoppingCart/${userId}`
      );
      const res = await response.json();
      setCart(res.shoppingCart);
    }
    async function getProducts() {
      const response = await fetch(`http://localhost:3000/api/products/`);
      const res = await response.json();
      setProducts(res.products);
    }
    getCart();
    getProducts();
  }, [userId]);

  useEffect(() => {
    if (cart.length > 0 && products.length > 0) {
      const updatedCartItems = cart.map((item) => {
        const product = products.find((p) => p._id === item.productID);
        return {
          userID: item.userID,
          productID: item.productID,
          quantity: item.quantity,
          totalPrice: item.quantity * (product?.price ?? 0),
        };
      });
      setCartItems(updatedCartItems);
    }
  }, [cart, products]);

  useEffect(() => {
    const newSubtotal = cartItems.reduce(
      (acc, item) => acc + item.totalPrice,
      0
    );
    const newTotalQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setSubtotal(newSubtotal);
    setTotalQuantity(newTotalQty);
  }, [cartItems, setSubtotal]);

  const increaseQuantity = useCallback(
    (index: number) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        const product = products.find(
          (p) => p._id === updatedCartItems[index].productID
        );
        updatedCartItems[index] = {
          ...updatedCartItems[index],
          quantity: updatedCartItems[index].quantity + 1,
          totalPrice:
            updatedCartItems[index].totalPrice + (product?.price ?? 0),
        };
        return updatedCartItems;
      });
    },
    [products]
  );

  const decreaseQuantity = useCallback(
    (index: number) => {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        const product = products.find(
          (p) => p._id === updatedCartItems[index].productID
        );

        if (updatedCartItems[index].quantity > 1) {
          updatedCartItems[index] = {
            ...updatedCartItems[index],
            quantity: updatedCartItems[index].quantity - 1,
            totalPrice:
              updatedCartItems[index].totalPrice - (product?.price ?? 0),
          };
        } else {
          // If quantity is 1, remove the item from the cart
          updatedCartItems.splice(index, 1);
        }

        return updatedCartItems;
      });
    },
    [products]
  );

  return (
    <div className="flex flex-col w-[94.5%] max-w-[94.5%] min-w-[94.5%] h-auto md:w-full md:max-w-full md:min-w-full ">
      {cartItems
        .filter((item) => item.quantity > 0)
        .map((item, index) => {
          const product = products.find((p) => p._id === item.productID);
          return (
            item.quantity > 0 && (
              <div
                key={index}
                className="flex flex-row w-full max-w-full min-w-full h-auto"
              >
                <div className="flex flex-col w-full max-w-full min-w-full h-full ">
                  <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between py-[3.5%] border-b-[#F4F4F4] border-b-[0.530]">
                    <div className="flex flex-col w-[38.15%] max-w-[38.15%] min-w-[38.15%] h-auto ">
                      <div className="flex flex-row max-w-full min-w-full h-auto">
                        <div className="flex flex-col w-[19%] max-w-[19%] min-w-[19%] mr-[2.2%] h-auto">
                          <Image
                            alt={
                              product && product.images && product.images[0]
                                ? product.images[0].alt
                                : "default-image"
                            }
                            src={product?.images[0].src as string}
                            width={50}
                            height={50}
                          />
                        </div>

                        <div className="flex flex-col w-[75%] max-w-[75%] min-w-[75%] h-auto">
                          <p className="break-all font-normal text-xs md:text-base text-[#3A3A3A]">
                            {product?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col w-[29.15%] max-w-[29.15%] min-w-[29.15%] h-auto">
                      <div className="flex flex-row w-full max-w-full min-w-full h-auto justify-between flex-wrap">
                        <div className="flex flex-col md:w-[54%] w-full md:max-w-[54%] max-w-full md:min-w-[54%] min-w-full h-auto">
                          <div className="flex flex-row w-[95%] max-w-[95%] min-w-[95%] h-auto justify-center shrink">
                            <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto">
                              <button
                                className="transition-color duration-100 focus:outline-none text-black px-4 py-2 bg-white hover:bg-[#806491] hover:text-white rounded-[2.13px] hover:rounded-[2.13px]"
                                onClick={() => decreaseQuantity(index)}
                              >
                                -
                              </button>
                            </div>

                            <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto text-[#060709] bg-[rgb(244,244,244)] font-normal rounded-[2.13px] px-4 py-2 place-self-center">
                              <p>{item.quantity}</p>
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
                          Rs. {product?.price}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col text-[#806491] font-bold text-xs place-self-center">
                      Rs. {item.totalPrice}
                    </div>
                  </div>
                </div>
              </div>
            )
          );
        })}
    </div>
  );
};

export default CartItems;
