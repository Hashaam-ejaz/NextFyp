"use client";
import React from "react";
import { useState } from "react";
import { IOrder } from "../../../models/orders";
import { usePathname } from "next/navigation";

const CheckoutPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const stringdata = decodeURIComponent(pathname.slice(10, pathname.length));
  const data2 = JSON.parse(stringdata);
  console.log("data2", data2);

  const [shippingFormData, setShippingFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
    walletAddress: "",
  });
  const [billingFormData, setBillingFormData] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    saveCard: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    form: string
  ) => {
    const { name, value, type, checked } = e.target;
    if (form === "shipping") {
      setShippingFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    } else if (form === "billing") {
      setBillingFormData((prevState) => ({
        ...prevState,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };
  const handleSubmits = async () => {
    try {
      console.log("Submitting form");

      //Generate random tracking number

      const postOrders = async (data2: IOrder[]) => {
        for (const order of data2) {
          const trackingNo = Math.random().toString(36).substring(7);
          const newOrder = {
            buyerID: order.buyerID,
            buyerName: order.buyerName,
            sellerID: order.sellerID, // Assuming you have a way to get the sellerID
            walletAddress: shippingFormData.walletAddress,
            products: order.products,
            totalAmount: order.totalAmount,
            paymentStatus: "Paid",
            orderStatus: "unshipped",
            address:
              shippingFormData.address +
              shippingFormData.city +
              shippingFormData.postalCode,
            phoneNo: shippingFormData.postalCode,
            date: new Date(order.date),
            estimatedDelivery: new Date(order.estimatedDelivery),
            trackingNo: trackingNo,
            trackingLink: "",
          };

          console.log("New Order", newOrder);
          try {
            const response = await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newOrder),
            });

            console.log("response fetched", response);
            if (!response.ok) {
              console.error("Payment Not Verified, Order Not Created.");
              continue; // Move to the next order
            }
            console.log("Order created successfully");
          } catch (error) {
            console.error("Error sending user data:", error);
          }
        }
      };
      postOrders(data2);
      console.log("buyer id", data2.buyerID);
      const response5 = await fetch(
        `http://localhost:3000/api/shoppingCart/${data2[0].buyerID}`,
        {
          method: "DELETE",
        }
      );
      if (!response5.ok) {
        console.error("Error clearing shopping cart");
      }
      console.log("Shopping cart cleared successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:space-x-8">
          {/* Shipping Details */}
          <div className="md:w-1/2 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-[#5B4966] ml-6">
              Shipping Details
            </h2>
            <div className="border-t border-gray-400 w-full sm:w-[21.563rem] lg:w-[31.563rem] ml-6 "></div>

            <div className="bg-white p-6">
              {/* Shipping form */}
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="fullName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={shippingFormData.fullName}
                    onChange={(e) => handleChange(e, "shipping")}
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    placeholder="Full Name"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="address"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    value={shippingFormData.address}
                    onChange={(e) => handleChange(e, "shipping")}
                    name="address"
                    placeholder="Street Address"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="city"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={shippingFormData.city}
                    onChange={(e) => handleChange(e, "shipping")}
                    name="city"
                    placeholder="Islamabad"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="postalCode"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={shippingFormData.postalCode}
                    onChange={(e) => handleChange(e, "shipping")}
                    name="postalCode"
                    placeholder="46000"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="phoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="phoneNumber"
                    value={shippingFormData.phoneNumber}
                    onChange={(e) => handleChange(e, "shipping")}
                    name="phoneNumber"
                    placeholder="+92 300 3000567"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="walletAddress"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    ERC Wallet Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="walletAddress"
                    value={shippingFormData.walletAddress}
                    onChange={(e) => handleChange(e, "shipping")}
                    name="walletAddress"
                    placeholder="0x5aAeb6053F3E..."
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          {/* Billing Information */}
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-4 text-[#5B4966] ml-6">
              Payment Information
            </h2>
            <div className="border-t border-gray-400 w-full sm:w-[21.563rem] lg:w-[31.563rem] ml-6 "></div>

            <div className="bg-white p-6">
              {/* Billing form */}
              <form>
                <div className="mb-4">
                  <label
                    htmlFor="cardNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Card Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    value={billingFormData.cardNumber}
                    onChange={(e) => handleChange(e, "billing")}
                    name="cardNumber"
                    placeholder="3000 5678 9012 3456"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="expiry"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    Expiration Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="expiry"
                    value={billingFormData.expiry}
                    onChange={(e) => handleChange(e, "billing")}
                    name="expiry"
                    placeholder="MM/YY"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="cvv"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray"
                  >
                    CVV <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    value={billingFormData.cvv}
                    onChange={(e) => handleChange(e, "billing")}
                    name="cvv"
                    placeholder="123"
                    className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5"
                    required
                  />
                </div>
                <div className="mb-4 flex ">
                  <input
                    type="checkbox"
                    id="saveCard"
                    checked={billingFormData.saveCard}
                    onChange={(e) => handleChange(e, "billing")}
                    name="saveCard"
                    className="mr-2"
                  />
                  <label htmlFor="saveCard" className="text-sm text-gray-500">
                    Save card details
                  </label>
                </div>
                <div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleSubmits}
                    className="text-white mt-2 px-4 py-3 rounded rounded-md-[0.2] shadow bg-[#806491] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.75rem] "
                  >
                    Pay Now
                  </button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-4">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
