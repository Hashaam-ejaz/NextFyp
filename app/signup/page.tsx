import React from "react";
import Image from "next/image";

import homepageRect from "../../public/homepage.svg";
import loginLogo from "../../public/logo.svg";
import googleLogo from "../../public/google.svg";
import symbol from "../../public/pak.svg";

const Login = () => {
  return (
    <div className="flex flex-col md:flex-row w-full bg-[#F7F1FB]">
      {/* Smaller screens layout */}
      <div className="hidden md:flex flex-col items-center justify-center h-screen md:w-1/2">
        <Image
          className="mb-4"
          src={homepageRect}
          width={271}
          height={194.66}
          alt="Logo of the shop"
        />
        <div className="mt-4">
          <Image src={loginLogo} width={163} height={39.52} alt="Logo" />
        </div>
        <p className="text-black text-xl mt-5">
          Your <span className="text-[#806491]">Slogan</span> goes here
        </p>
        <p className="text-black mt-20">
          Welcome to <span className="text-[#806491]">Logoipsum</span>
        </p>
      </div>

      {/* Larger screens layout */}
      <div className="flex flex-col bg-white min-w-5/12 w-full md:w-7/12 p-8 justify-center items-center md:mt-0 relative">
        <div className="flex justify-start items-center mb-8 lg:-ml-2 w-full md:w-[24.752rem] lg:w-auto">
          <Image
            src={loginLogo}
            width={163}
            height={39.52}
            alt="Logo"
            className="lg:mb-10" // Apply margin-bottom only for screens wider than lg breakpoint
          />
        </div>

        <div className="flex flex-col items-center mb-8 w-full md:w-[24.752rem]">
          <div className="w-full px-2 mb-3">
            <span className="text-[#806491] text-2xl font-bold">Sign Up</span>
          </div>
          <div className="text-black text-sm w-full mb-2">
            Enter your credentials to create account.
          </div>
        </div>
        <div className="mb-4 w-full md:w-[24.752rem]">
          {" "}
          {/* Adjust width for larger screens */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>
        <div className="mb-4 w-full md:w-[24.752rem]">
          {" "}
          {/* Adjust width for larger screens */}
          <input
            type="email"
            placeholder="Email Address"
            className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>

        <div className="mb-4 flex w-full items-center md:w-[24.753rem]">
          <div className="relative">
            <div className="absolute left-7 top-1/2 transform -translate-y-1/2">
              <Image src={symbol} height={14} width={14} alt="Country Flag" />
            </div>
            {/* Dropdown */}
            <select className="appearance-none pl-16 pr-8 border bg-[#F2F2F2] border-[#55] border-[#E5E5E5] px-3 py-3 rounded-l-md focus:outline-none focus:border-[#806491]">
              <option value="+92">+92</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                />
              </svg>
            </div>
          </div>
          <input
            type="text"
            placeholder="Phone Number"
            className="w-full md:w-[20.753rem] px-3 py-3 pl-16 md:pl-10 rounded-r-lg border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>

        <div className="mb-4 w-full md:w-[24.752rem]">
          {" "}
          {/* Adjust width for larger screens */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>

        <button className="text-white mt-2 px-4 py-3 rounded-lg shadow bg-[#806491] rounded-md-[0.375] w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]">
          Sign Up
        </button>
        <button className="bg-black text-white flex items-center justify-center px-4 py-3 rounded-lg shadow rounded-md-[0.375] mt-4 w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]">
          <Image
            src={googleLogo}
            width={22}
            height={22}
            alt="Google Logo"
            className="mr-2"
          />
          Or Sign up with Google
        </button>
        <div className="mt-10">
          Already have an account?{" "}
          <a className="text-[#806491]" href="#">
            Sign in now!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;