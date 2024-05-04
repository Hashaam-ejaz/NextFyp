"use client";
import { signOut } from "next-auth/react";

const Page = () => {
  return (
    <div>
      <h1>This is the home Page</h1>
      <div className="bg-red-400 w-fit rounded-lg px-4 py-2 cursor-pointer">
        <button onClick={() => signOut({ callbackUrl: "/login" })}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Page;
