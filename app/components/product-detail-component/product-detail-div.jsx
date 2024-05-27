"use client";
import AddToCart from "../buttons/add-to-cart.jsx";
import { useState, useEffect } from "react";
import { ProductReviews, StarRating } from "../product-reviews"; // Import StarRating component
import QuantityIterator from "../quantity-iterator.jsx";
import { ImagesDisplayDiv } from "./images-display-div.jsx";
import deliveryIcon from "../../../public/images/icon-delivery.png";
import returnIcon from "../../../public/images/Icon-return.png";
import ProductDetailsTable from "../product-details-table.jsx";
import Image from "next/image.js";
import { useSession } from "next-auth/react";
import { fetchData } from "next-auth/client/_utils";

function ProductDetailDiv({ product }) {
  const [information, setInformation] = useState(product.description);
  const [showReviews, setToggleReviews] = useState(false);
  const [showAdditionalInfo, setToggleInfo] = useState(false);
  const [userID, setUserID] = useState("");
  const [itemCount, setItemCount] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
      const fetchData = async () => {
      const response = await fetch(`/api/users?email=${session.user.email}`);
      const data = await response.json();
      const user = data.existingUser;
      setUserID(user._id);
      }
      fetchData();
  }, [product, size, color, itemCount]);
  // console.log(product);
  const decreaseQuantity = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const increaseQuantity = () => {
    setItemCount(itemCount + 1);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value); // Update the size state when the select value changes
  };
  const handleColorChange = (event) => {
    setColor(event.target.value); // Update the size state when the select value changes
  };

  return (
    <>
      <div className="conatiner bg-white flex flex-col p-4">
        <div className="bg-white p-4">
          <div className="flex flex-row flex-wrap bg-white">
            <div className="basis-full md:basis-7/12 bg-white p-4 md:bg-white">
              <div className="md:flex justify-center">
                <ImagesDisplayDiv
                  product={product}
                  className="w-full md:w-auto min-w-full "
                />
              </div>
            </div>

            <div className="basis-full md:basis-5/12 bg-white p-4 flex flex-col flex-wrap w-full max-w-full">
              <div className="text-4xl font-semibold">
                <h1>{product.name}</h1>
              </div>
              <div className="mt-2 flex items-center">
                <StarRating rating={product.avgRating} /> {/* Display stars */}
                <div className="ml-5 text-gray-500">
                  {product.noReviews} Reviews{" "}
                </div>{" "}
                {/* Display number */}
                <div className="ml-2 mr-2">|</div> {/* Vertical line */}
                <div className="text-[#00FF66]">
                  {product ? "In Stock" : "Out of Stock"}
                </div>{" "}
              </div>

              <div className="text-2xl font-medium capitalize mt-2">
                <h3>PKR {product.price}</h3>
              </div>
              <div className="text-lg font-light normal-case my-4">
                <h3>{product.description}</h3>
              </div>
              <div className="container flex flex-row justify-items-center my-4">
                <div className="w-1/5 grow-0 text-center text-lg font-light">
                  <label>Size</label>
                </div>
                <div className="w-4/5 grow text-lg font-light ">
                  <select
                    id="size"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={size}
                    onChange={handleSizeChange}
                  >
                    <option value="defaultOption">Choose a size</option>
                    {product.size.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="container flex flex-row justify-items-center my-4">
                <div className="w-1/5 grow-0 text-center text-lg font-light">
                  <label>Color</label>
                </div>
                <div className="w-4/5 grow text-lg font-light ">
                  <select
                    id="color"
                    className="bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={color}
                    onChange={handleColorChange}
                  >
                    <option value="defaultValue">Choose a color</option>
                    {product.color.map((item, index) => (
                      <option key={index} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-row flex-wrap m-4 justify-evenly">
                <div className="my-4">
                  <div className="flex flex-row items-center justify-center mx-8">
                    <div>
                      <button
                        className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                    </div>
                    <div className="border border-gray-400 bg-white px-4 py-2">
                      {itemCount}
                    </div>
                    <div>
                      <button
                        className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <AddToCart product={product} itemCount={itemCount} userID={userID}/>
                </div>
              </div>
              <div className="mx-4 sm:mx-auto w-full sm:max-w-screen-md">
                <div className="border border-gray-400 overflow-hidden">
                  <div className="px-4 py-2 bg-white flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-2 bg-gray-200">
                      <Image
                        src={deliveryIcon}
                        alt="Delivery Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="w-64 sm:w-auto h-16  flex items-center">
                      <div className="text-lg font-semibold text-[#806491]">
                        Free Delivery
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-400"></div>
                  <div className="px-4 py-2 bg-white flex items-center">
                    <div className="flex items-center justify-center w-12 h-12 mr-2 bg-gray-200">
                      <Image
                        src={returnIcon}
                        alt="Return Icon"
                        className="w-6 h-6"
                      />
                    </div>
                    <div className="w-64 sm:w-auto h-16">
                      <div className="text-lg font-semibold text-[#806491]">
                        Return Delivery
                      </div>
                      <div className="text-sm text-gray-500">
                        Free 30 Days Delivery Returns.{" "}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 flex flex-col">
          <div className="bg-white p-4 flex flex-row justify-center flex-wrap">
            <div className="m-4">
              <button
                className="underline underline-offset-8"
                onClick={() => {
                  setInformation(product.description);
                  setToggleReviews(false);
                }}
              >
                Description
              </button>{" "}
            </div>

            <div className="m-4">
              <button
                className="underline underline-offset-8"
                onClick={() => {
                  setInformation(<ProductDetailsTable product={product} />);
                  setToggleInfo(true);
                }}
              >
                Additional Information
              </button>
            </div>

            <div className="m-4">
              <button
                className="underline underline-offset-8"
                onClick={() => {
                  setToggleReviews(true);
                }}
              >
                Reviews
              </button>
            </div>
          </div>

          <div className="bg-white p-4">
            {showReviews ? <ProductReviews product={product} /> : information}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailDiv;
