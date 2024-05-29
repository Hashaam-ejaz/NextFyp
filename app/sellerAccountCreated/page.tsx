"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import accountimage from "../../public/assets/creation.svg";
import logo from "../../public/assets/logo.png";

const AccountCreated: React.FC = () => {
  const router = useRouter();
  const goToLogin = () => {
    router.push("/sellerDashboard");
  };
  return (
    <div className="flex flex-col md:flex-row w-full bg-white">
      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full">
        <div className="hidden md:flex flex-col items-center justify-center h-screen md:w-1/2">
          <Image
            className="mb-4"
            src={accountimage}
            width={271}
            height={194.66}
            alt="Account Created"
          />
          <p className="font-bold text-2xl text-[#806491] mt-5">
            Account Created!{" "}
          </p>
          <p className="text-black mt-5">
            Your SafeCommerce account has been created, please login to
            continue.
          </p>
          <button
            onClick={goToLogin}
            className="text-white mt-4 px-4 py-3 rounded-lg shadow bg-[#806491] rounded-md-[0.375] w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCreated;
