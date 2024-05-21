"use client";
import React, { use, useState, useEffect } from "react";
import TogglePasswordButton from "../manageprofilecomponents/TogglePassword";
import bcrypt from "bcryptjs";
import { IUser } from "../../../models/users";
import { useSession } from "next-auth/react";
import { set } from "mongoose";
import { useRouter } from "next/navigation";
import { IBankInfo } from "../../../models/bankInfo";


const ProfileSettings: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const { data: session } = useSession();
  const [sellerDetails, setSellerDetails] = useState<any>({
    fullName: "",
    phoneNumber: "",
    storeName: "",
    storeAddress: "",
    returnAddress: "",
    customerCarePhone: "",
  });
  const router = useRouter();

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

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session || !session.user) {
      return;
    }
    console.log('Submitting Password');
      const hashedPreviousPassword = userData.password;
      if(!hashedPreviousPassword){
        setPasswordError("User not found.");
        return;
      }
      if(oldPassword.length === 0){
        setPasswordError("Please enter your old password.");
        return;
      }
      const passwordsMatch = await bcrypt.compare(oldPassword, hashedPreviousPassword);

      if (passwordsMatch === false) {
        setPasswordError("Old password is incorrect.");
        return;
      }
      if (newPassword.length < 5) {
          setPasswordError("Password must be at least 5 characters long.");
          return;
      }

      if (newPassword === oldPassword) {
        setPasswordError("New password must be different from old password.");
        return;
      }
      const updatedPassword : Partial<IUser> = {
        password: newPassword,
      }
      // Update the user's password
      const updateResponse = await fetch(
        `http://localhost:3000/api/users/${userData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPassword),
        }
      );
      console.log("Password Updated");
      if (!updateResponse.ok) {
        setPasswordError("An unexpected error occurred.");
        return;
      }
      setPasswordError("");
      setNewPassword("");
      setOldPassword("");
  };

  const updateInformation = async() => {
    console.log('Updating Information');
    if (!session || !session.user) {
      return;
    }
    if(!userData){
      return;
    }
    const updatedUserData : Partial<IUser> = {
      name: sellerDetails.fullName,
      phone: sellerDetails.phoneNumber,
    }
    // Update the user's password
    const updateResponse = await fetch(
      `http://localhost:3000/api/users/${userData._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUserData),
      }
    );
    if (!updateResponse.ok) {
      throw new Error("Failed to update user information");
    }
    const updatedStoreData: Partial<IBankInfo> = {
      shopName: sellerDetails.storeName,
      shopAddress: sellerDetails.storeAddress,
      returnAddress: sellerDetails.returnAddress,
      customerCarePhone: sellerDetails.customerCarePhone
    }

    console.log('Making request to submit bank info...');
      const bankInfoResponse = await fetch(`http://localhost:3000/api/bankInfo/${userData._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedStoreData),
      });
      if (!bankInfoResponse.ok) {
        throw new Error('Failed to submit bank info');
      }
      console.log('User All Information submitted successfully');
      setSellerDetails({
        fullName: "",
        phoneNumber: "",
        storeName: "",
        storeAddress: "",
        returnAddress: "",
        customerCarePhone: "",
      });

  }

  const toggleShowOldPassword = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

  return (
    <div className="p-6">
      {/* Personal Details */}
      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column with heading */}
        <div className="md:col-start-1">
          <h2 className="text-lg font-semibold mb-4 mt-5">Personal Details</h2>
        </div>
        {/* Right column with fields */}
        <div className="md:col-start-2 md:mt-4 md:ml-[-10rem]">
          <div className="mb-4">
            <label className="block mb-1">Full Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Jake Gyll"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={sellerDetails.fullName}
              onChange={(e) => setSellerDetails({...sellerDetails, fullName: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4">
              <label className="block mb-1">Phone Number <span className="text-red-500">*</span></label>
              <input
                type="tel"
                placeholder="+92 1245 572 135"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={sellerDetails.phoneNumber}
                onChange={(e) => setSellerDetails({...sellerDetails, phoneNumber: e.target.value})}
                required
              />
            </div>
            {/* <div className="mb-4 md:w-1/2">
              <label className="block mb-1">Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                placeholder="Jakegyll@gmail.com"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={sellerDetails.email}
                onChange={(e) => setSellerDetails({...sellerDetails, email: e.target.value})}
              />
            </div> */}
          </div>
        </div>
      </div>

      {/* Store Info */}

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column with heading */}
        <div className="md:col-start-1">
          <h2 className="text-lg font-semibold mb-4 mt-5">Store Info</h2>
        </div>
        {/* Right column with fields */}
        <div className="md:col-start-2 md:mt-4 md:ml-[-10rem]">
        <div className="mb-4">
            <label className="block mb-1">Store Name <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Jake Gyll Road, 345 West"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={sellerDetails.storeName}
              onChange={(e) => setSellerDetails({...sellerDetails, storeName: e.target.value})}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Store Address <span className="text-red-500">*</span></label>
            <input
              type="text"
              placeholder="Jake Gyll Road, 345 West"
              className="border border-gray-300 rounded-md px-4 py-2 w-full"
              value={sellerDetails.storeAddress}
              onChange={(e) => setSellerDetails({...sellerDetails, storeAddress: e.target.value})}
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:gap-4">
            <div className="mb-4 md:w-1/2">
              <label className="block mb-1">Return Address <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="Jake Gyll Road, 345 West"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={sellerDetails.returnAddress}
                onChange={(e) => setSellerDetails({...sellerDetails, returnAddress: e.target.value})}
                required
              />
            </div>
            <div className="mb-4 md:w-1/2">
              <label className="block mb-1">Customer Care Phone <span className="text-red-500">*</span></label>
              <input
                type="tel"
                placeholder="+92 1245 572 135"
                className="border border-gray-300 rounded-md px-4 py-2 w-full"
                value={sellerDetails.customerCarePhone}
                onChange={(e) => setSellerDetails({...sellerDetails, customerCarePhone: e.target.value})}
                required
              />
            </div>
          </div>
          <div className="flex mt-10">
            <button onClick={updateInformation} className="px-6 py-2 bg-[#806491] text-white rounded-md hover:bg-[#806475]">Update Information</button>
          </div>
        </div>
      </div>

      {/* New Password */}

      <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column with heading */}
        <div className="md:col-start-1">
          <h2 className="text-lg font-semibold mb-4 mt-5">Password</h2>
        </div>
        {/* Right column with fields */}
        <form onSubmit={handleSubmit}>
          <div className="md:col-start-2 md:mt-4 md:ml-[-10rem]">
            <div className="mb-4">
              <label className="block mb-1">Old Password</label>
              <div className="relative">
                <input
                  type={showOldPassword ? "text" : "password"}
                  placeholder="Old Password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <TogglePasswordButton
                  showPassword={showOldPassword}
                  togglePassword={toggleShowOldPassword}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block mb-1">New Password</label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="border border-gray-300 rounded-md px-4 py-2 w-full"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <TogglePasswordButton
                  showPassword={showNewPassword}
                  togglePassword={toggleShowNewPassword}
                />
              </div>
            </div>
            {passwordError && <p className="text-red-500">{passwordError}</p>}
            <div className="flex mt-10">
              <button className="px-6 py-2 bg-[#806491] text-white rounded-md hover:bg-[#806475] mr-5">Change Password</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
