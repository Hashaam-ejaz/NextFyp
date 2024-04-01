import React from "react";
import Image from "next/image";

import homepageRect from "../../public/homepage.svg";
import loginLogo from "../../public/logo.svg";
import googleLogo from "../../public/google.svg";

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
            <span className="text-[#806491] text-2xl font-bold">Login</span>
          </div>
          <div className="text-black text-sm w-full mb-2">
            Enter your credentials to continue
          </div>
        </div>
        <div className="mb-4 w-full md:w-[24.752rem]">
          {" "}
          {/* Adjust width for larger screens */}
          <input
            type="email"
            placeholder="Email or Phone number"
            className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>
        <div className="mb-4 w-full md:w-[24.752rem]">
          {" "}
          {/* Adjust width for larger screens */}
          <input
            type="password"
            placeholder="Enter password"
            className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
          />
        </div>
        <div className="flex items-center mb-1 mt-5">
          <input
            className="me-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-[#806491]/25 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-white after:shadow-switch-2 after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ms-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-switch-1 checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-switch-3 focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ms-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-switch-3 checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-white/25 dark:after:bg-surface-dark dark:checked:bg-primary dark:checked:after:bg-primary"
            type="checkbox"
            role="switch"
            id="rememberMe"
          />
          <label
            className="inline-block hover:cursor-pointer"
            htmlFor="rememberMe"
          >
            Remember Me
          </label>
          <a href="#" className="text-[#806491] ml-20">
            Forgot password?
          </a>
        </div>
        <button className="text-white mt-4 px-4 py-3 rounded-lg shadow bg-[#806491] rounded-md-[0.375] w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]">
          Sign in
        </button>
        <button className="bg-black text-white flex items-center justify-center px-4 py-3 rounded-lg shadow rounded-md-[0.375] mt-4 w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]">
          <Image
            src={googleLogo}
            width={22}
            height={22}
            alt="Google Logo"
            className="mr-2"
          />
          Or Sign in with Google
        </button>
        <div className="mt-10">
          Don&apos;t have an account?{" "}
          <a className="text-[#806491]" href="#">
            Sign up now!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
