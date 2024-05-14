"use client";
import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { IBankInfo } from "../../../models/bankInfo";

const PaymentSettings: React.FC = () => {
  const { data: session } = useSession();
  const [userData, setUserData] = useState<any>(null);
  const [bankData, setBankData] = React.useState({
    accName: "",
    iban: "",
    bankName: "",
  });

  useEffect(() => {
    if (!session || !session.user) {
      return;
    }
    const fetchUser = async () => {
      const response = await fetch(
        `http://localhost:3000/api/users?email=${session?.user?.email}`
      );
      const userDetails = await response.json();
      const user = userDetails.existingUser;
      setUserData(user);
    };
    fetchUser();
  }, [session]);


  const updateBankInfo = async () => {
    if (!session || !session.user) {
      return;
    }
    if(!userData){
      return;
    }
    const updatedBankData: Partial<IBankInfo> = {
      accName: bankData.accName,
      iban: bankData.iban,
      bankName: bankData.bankName,
    };
    console.log('Making request to submit bank info...');
      const bankInfoResponse = await fetch(`http://localhost:3000/api/bankInfo/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBankData),
      });
      if (!bankInfoResponse.ok) {
        throw new Error('Failed to submit bank info');
      }
      console.log('User All Information submitted successfully');
      setBankData({
        accName: "",
        iban: "",
        bankName: "",
      });
  };


  return (
    <div className="p-6">
      {/* Personal Details */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column with heading */}
        <div className="md:col-start-1">
          <h2 className="text-lg font-semibold mb-4 mt-5">Account Details</h2>
        </div>
        {/* Right column with fields */}
        <div className="md:col-start-2 md:mt-4 md:ml-[-10rem]">
          <div className="mb-4">
            <label className="block mb-1">Account Holder Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Jake Gyll"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={bankData.accName}
              onChange={(e) =>
                setBankData({ ...bankData, accName: e.target.value })
              }
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 md:w-1/2">
              <label className="block mb-1">IBAN Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                placeholder="44 1245 572 135"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={bankData.iban}
                onChange={(e) =>
                  setBankData({ ...bankData, iban: e.target.value })
                }
                required
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block mb-1">Bank Name</label>
              <input
                type="text"
                placeholder="Habib Metro Pvt Ltd"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={bankData.bankName}
                onChange={(e) =>
                  setBankData({ ...bankData, bankName: e.target.value })
                }
                required
              />
            </div>
          </div>
          <div className="flex justify-end float-right mt-10">
              <button onClick={updateBankInfo} className="px-6 py-2 bg-[#806491] text-white rounded-md hover:bg-[#806475] mr-5">Update Bank Info</button>
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Payments
          </caption>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Order ID
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Sender Name
              </th>
              <th scope="col" className="px-6 py-3">
                Sender Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Print</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Sample data */}
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</td>
              <td className="px-6 py-4">123456</td>
              <td className="px-6 py-4">Paid</td>
              <td className="px-6 py-4">John Doe</td>
              <td className="px-6 py-4">123-456-7890</td>
              <td className="px-6 py-4">$100</td>
              <td className="px-6 py-4">2024-05-10</td>
              <td className="px-6 py-4 text-right">
                <button className="px-5 py-2 bg-[#806491] text-white rounded-md hover:bg-[#806480]">Print</button>
              </td>
            </tr>
            {/* Add more rows as needed */}
          </tbody>
        </table>
      </div>
      
      <p> Add Pagination component here..</p>

      
    </div>
  );
};

export default PaymentSettings;
