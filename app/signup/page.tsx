"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import Image from "next/image";
import LoadingPage from "../components/loadingComponent";
import homepageRect from "../../public/svg/homepage.svg";
import loginLogo from "../../public/svg/logo.svg";
import googleLogo from "../../public/svg/google.svg";
import symbol from "../../public/svg/pak.svg";
import { IUser } from "@/models/users";

const Signup: React.FC = () => {
  const [userType, setUserType] = useState("buyer"); // Default to 'buyer'
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<number>();
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const recom_ids = ["AG3D6O4STAQKAY2UVGEUV46KN35Q","AHMY5CWJMMK5BJRBBSNLYT3ONILA","AHCTC6ULH4XB6YHDY6PCH2R772LQ","AGYHHIERNXKA6P5T7CZLXKVPT7IQ",
    "AG4OGOFWXJZTQ2HKYIOCOY3KXF2Q","AENGU523SXMOS7JPDTW52PNNVWGQ","AEQJHCVTNINBS4FKTBGQRQTGTE5Q","AFC3FFC5PKFF5PMA52S3VCHOZ5FQ","AECPFYFQVRUWC3KGNLJIOREFP5LQ",
    "AGYYVPDD7YG7FYNBXNGXZJT525AQ","AHONIZU3ICIEHQIGQ6R2VFRSBXOQ","AFPHD2CRPDZMWMBL7WXRSVYWS5JA","AEZ346GX3HJ4O4XNRPHCNHXQURMQ","AEPSWFPNECKO34PUC7I56ITGXR6Q",
    "AHWVEHR5DYLVFTO2KF3IZATFQSWQ","AH4QT33M55677I7ISQOAKEQWACYQ","AGU3BBQ2V2DDAMOAKGFAWDDQ6QHA","AESFLDV2PT363T2AQLWQOWZ4N3OA","AHTPQRIMGUD4BYR5YIHBH3CCGEFQ",
    "AEUVWXYP5LT7PZLLZENEO2NODPBQ","AHC7MPW55DOO6WNCOQVA2VHOD26A","AFDI6FRPFBTNBG7BAEB7JDJSMKDQ","AFQKCEEEKXCOHTDG4WUN3XPPHJQQ","AHKUUFNMBZIDLSSPA4FEHIO2EC7Q",
    "AEWAZDZZJLQUYVOVGBEUKSLXHQ5A","AG5HTSFRRE6NL3M5SGCUQBP7YSCA","AH725ST5NW2Y4JZPKUNTIJCUK2BA","AHV3TXIFCJPMS4D5JATCEUR266MQ","AGWIGDEMFIIUAOXYY2QATNBSUGHA",
    "AFSTSLQUV4EVEXWKBOLEFHL2H5YQ","AGAKDNBHY2FKX7I4ACRGILU7QL7A","AFNWJUWJRHCC6HN52KMG5AKZY37Q","AE3Q6KSUK5P75D5HFYHCRAOLODSA","AFUGIFH5ZAFXRDSZHM4QB2KPKFUQ",
    "AFK4NJOLFSJGWLOJIUIAROJF6YVA","AFUOTYRFUXVPEBGIXVZZ7DR3CZUA","AFDLRSXKDZ6U3U3KD46SQLFGZQRA"];

    const getRandomRecomId = () => {
      const randomIndex = Math.floor(Math.random() * recom_ids.length);
      return recom_ids[randomIndex];
    };

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    if (fullName.length < 0) {
      setError("Please enter a name");
      return;
    }
    if (password.length < 5) {
      setError("Please enter a password");
      return;
    }
    if (typeof phoneNumber === "undefined") {
      setError("Please enter a phone number");
      return;
    }
    setLoading(true);
    const response = await fetch(
      `http://localhost:3000/api/users?email=${email.toLowerCase()}`
    );
    if (response.status === 202) {
      setError("This Email is already registered.");
      setLoading(false);
      return;
    }
    
 

    const newUser: IUser = {
      name: fullName,
      email: email.toLowerCase(),
      password: password,
      role: userType,
      phone: phoneNumber,
      wishlist: [],
      recom_id: getRandomRecomId(),
    };
    console.log(newUser);
    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (!response.ok) {
        setError("This phone number is already in use.");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Error sending user data:", error);
      setLoading(false);
    }
    if (userType == "seller") {
      router.push("/sellerAccount");
      return;
    }
    router.push("/login");
  }
  if (loading) {
    return <LoadingPage message="Registration Successful"/>;
  }

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
          <span className="text-[#806491] text-[1.5rem] text-center m-4">
            Your Blockchain Bazaar
          </span>
        </p>
        <p className="text-black mt-20">
          Welcome to <span className="text-[#806491]">SafeCommerce</span>
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
          {error && <div className="text-red-500 m-4">{error}</div>}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 w-full md:w-[24.752rem]">
            {" "}
            {/* Adjust width for larger screens */}
            <input
              type="text"
              placeholder="Full Name"
              className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full md:w-[24.752rem]">
            {" "}
            {/* Adjust width for larger screens */}
            <input
              type="email"
              placeholder="Email Address"
              className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              type="number"
              placeholder="Phone Number"
              className="w-full md:w-[20.753rem] px-3 py-3 pl-16 md:pl-10 rounded-r-lg border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
              value={phoneNumber || ""}
              onChange={(e) => {
                const newValue = parseInt(e.target.value);
                // Update the state only if newValue is a valid number, otherwise set to undefined
                setPhoneNumber(isNaN(newValue) ? undefined : newValue);
              }}
            />
          </div>

          <div className="mb-4 w-full md:w-[24.752rem]">
            {" "}
            {/* Adjust width for larger screens */}
            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mb-4 w-full md:w-[24.752rem]">
            {/* Adjust width for larger screens */}
            <select
              className="w-full px-3 py-3 rounded-md border bg-[#F2F2F2] border-[55] border-[#E5E5E5] focus:outline-none focus:border-[#806491] rounded-md-[0.375]"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="buyer">Buyer</option>
              <option value="seller">Seller</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white mt-2 px-4 py-3 rounded-lg shadow bg-[#806491] rounded-md-[0.375] w-full md:w-[24.752rem] h-[2.75rem] md:mt-[3.438rem]"
          >
            Sign Up
          </button>
        </form>
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
          <a className="text-[#806491]" href="/login">
            Sign in now!
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
