"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import { IOrder } from "../../../models/orders";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { ethers } from "ethers";
import { ObjectId } from "mongodb";
import { useSession } from "next-auth/react";
import { resolve } from "path";

const CheckoutPage: React.FC = () => {
  const session = useSession();
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const stringdata = decodeURIComponent(pathname.slice(10, pathname.length));
  const [addresses, setAddresses] = useState<string[]>([]);
  const [buyerAddress, setBuyerAddress] = useState<string[]>([]);
  const data2 = JSON.parse(stringdata);
  console.log(data2);
  let sellerIDs: ObjectId[] = [];
  let productIDs: ObjectId[] = [];
  for (const order of data2) {
    let count = 0;
    sellerIDs.push(order.sellerID);
    for (const prod of order.products) {
      productIDs.push(prod.blockchainID);
      count += 1;
      if (count > 1) {
        console.log("pushing again");
        sellerIDs.push(order.sellerID);
      }
    }
  }

  useEffect(() => {
    async function getSellerAddresses() {
      for (const seller of sellerIDs) {
        const response = await fetch(
          `http://localhost:3000/api/users/${seller}`
        );
        const SellerWalletdata = await response.json();
        setAddresses((prevAddresses) => [
          ...prevAddresses,
          SellerWalletdata.user.walletAddress,
        ]);

        console.log("pushing : " + SellerWalletdata.user.walletAddress);
      }
    }
    getSellerAddresses();
  }, []);

  function extractString(inputString: string) {
    let startIndex = 186;
    let endIndex = inputString.indexOf('"', startIndex);
    if (endIndex === -1) {
      return inputString.substring(startIndex);
    } else {
      return inputString.substring(startIndex, endIndex);
    }
  }
  const marketplaceABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "sellerAddress",
          type: "address",
        },
      ],
      name: "registerSeller",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [{ internalType: "address", name: "", type: "address" }],
      name: "sellerCatalogs",
      outputs: [{ internalType: "address", name: "", type: "address" }],
      stateMutability: "view",
      type: "function",
    },
  ];

  const sellerABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "buyerAddress",
          type: "address",
        },
        {
          internalType: "uint256[]",
          name: "productId",
          type: "uint256[]",
        },
        {
          internalType: "uint256[]",
          name: "quantity",
          type: "uint256[]",
        },
      ],
      name: "buyProduct",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "productId",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "uint256",
          name: "quantity",
          type: "uint256",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      name: "listProduct",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "products",
      outputs: [
        {
          internalType: "string",
          name: "name",
          type: "string",
        },
        {
          internalType: "string",
          name: "uri",
          type: "string",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];
  const MarketplaceContractAddress: string =
    "0xF45fdc4eAfA28984C81e9A6B8c7f98ea8dEBceCC";
  const provider = new ethers.providers.JsonRpcProvider(
    "https://data-seed-prebsc-2-s1.binance.org:8545/"
  );
  const backendWallet = new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY as string,
    provider
  );
  const marketplaceContract = new ethers.Contract(
    MarketplaceContractAddress,
    marketplaceABI,
    backendWallet
  );
  const router = useRouter();

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
  const validateShippingForm = () => {
    const { fullName, address, city, postalCode, phoneNumber, walletAddress } =
      shippingFormData;
    if (
      !fullName ||
      !address ||
      !city ||
      !postalCode ||
      !phoneNumber ||
      !walletAddress
    ) {
      setError("Please fill out all shipping details.");
      return;
    }
    if (!/^\d{5}$/.test(postalCode)) {
      setError("Invalid postal code. It should be a 5-digit number.");
      return;
    }
    if (!/^\+?\d{10,15}$/.test(phoneNumber)) {
      setError("Invalid phone number.");
      return;
    }
    if (!/^0x[a-fA-F0-9]{40}$/.test(walletAddress)) {
      setError("Invalid wallet address.");
      return;
    }
    return null;
  };

  const validateBillingForm = () => {
    const { cardNumber, expiry, cvv } = billingFormData;
    if (!cardNumber || !expiry || !cvv) {
      setError("Please fill out all payment details.");
      return;
    }
    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Invalid card number. It should be a 16-digit number.");
      return;
    }
    if (!/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry)) {
      setError("Invalid expiry date. It should be in MM/YY format.");
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      setError("Invalid CVV. It should be a 3 or 4-digit number.");
      return;
    }
    return null;
  };

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

  console.log("IDS", productIDs);

  console.log(ethers.utils.parseEther(productIDs[0].toString()));
  console.log();
  console.log("Seller ids", sellerIDs);
  console.log("addresses of Sellers", addresses[0]);
  console.log("buyer", data2[0].buyerWalletAddress);
  const handleSubmits = async () => {
    const shippingError = validateShippingForm();
    const billingError = validateBillingForm();

    if (shippingError || billingError) {
      setError("Please fill all the required (*) fields correctly.");
      return;
    }

    setError(null);
    try {
      const postOrders = async (data2: IOrder[]) => {
        for (const order of data2) {
          productIDs.push(order.products.blockchainID);
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

          try {
            const response = await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newOrder),
            });
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
      const transferNFT = async () => {
        try {
          const sellerCatalogAddress = await marketplaceContract
            .connect(backendWallet)
            .sellerCatalogs(addresses[0]);
          console.log(sellerCatalogAddress);
          const sellerContract = new ethers.Contract(
            sellerCatalogAddress,
            sellerABI,
            backendWallet
          );

          // const transaction = sellerContract
          //   .connect(backendWallet)
          //   .buyProduct(
          //     data2[0].buyerWalletAddress,
          //     [ethers.utils.parseUnits(productIDs[0].toString(), 0)],
          //     [
          //       ethers.utils.parseUnits(
          //         data2[0].products[0].quantity.toString(),
          //         0
          //       ),
          //     ]
          //   );
          // const receipt = transaction.wait();
          // console.log(receipt);
        } catch (err: any) {
          console.log(err);
          throw new Error("Blockchain Error: " + extractString(err.toString()));
        }
      };
      transferNFT();

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
      router.push("/paymentSuccessful");
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
