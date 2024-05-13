"use client";
import Image from "next/image";
import logo from "../public/svg/safeCommerceLogo.svg";
import Link from "next/link";
import GoogleLogo from "../public/svg/GoogleLogo.svg";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row">
      <div className="w-full h-screen bg-[#F7F1FB]  hidden md:block">
        <div className="flex flex-col">
          <div className="flex">
            <span className="font-normal text-[0.825rem] text-[#161616]">
              Dont have an account?
            </span>
            <Link href={"/signup"}>Sign up now</Link>
          </div>
        </div>
      </div>
      <div className="w-full flex-grow">
        <div></div>
        <div className="hidden md:block bg-red"></div>
        <div className="flex">
          <Image src={logo} alt="logo" />
        </div>
        <div className="flex text-[#806491] font-semibold text-[1.5rem] mt-[3.125rem] mb-[1.25rem]">
          Login
        </div>
        <div className="flex font-normal text-[#1A1A1A] text-xs">
          Enter your credentials to continue
        </div>

        <div className="flex items-center justify-between text-xs">
          <div>
            <span className="ml-2">Remember me</span>
          </div>
          <div className="text-[#806491] font-normal">
            <Link href={""}>Forgot Password?</Link>
          </div>
        </div>
        <div className="p-4 w-full h-[2.813rem] bg-[#806491] rounded-[0.352rem] flex items-center justify-center mt-[1.438rem] text-white font-bold mb-[3.25rem]">
          Sign in
        </div>
        <hr />
        <div className="mt-[2.9rem] p-4 w-full h-[2.813rem] bg-[#333333]  rounded-[0.352rem] mb-[0.346rem]">
          <div className=" flex items-center justify-center text-white font-normal text-xs">
            <Image src={GoogleLogo} alt="Google Logo" /> Or sign in with Google
          </div>
        </div>
        <div className="flex items-center justify-center text-xs font-normal">
          {" "}
          <span>Don&apos;t Have an account ?</span>
          <Link href={"/signup"} className="text-[#806491]">
            Sign up now
          </Link>
        </div>
      </div>
    </main>
  );
}
