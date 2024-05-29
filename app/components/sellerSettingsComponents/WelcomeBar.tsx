// components/WelcomeBar.tsx
import React from "react";
import { useSession, signOut } from "next-auth/react";

interface WelcomeBarProps {
  userName: string;
}

const WelcomeBar: React.FC<WelcomeBarProps> = ({ userName }) => {
  const session = useSession();
  if (!session.data) {
    return null;
  }
  // Get current date and time
  const date = new Date();
  //extract the full date from the current date object
  const currentDate = date.toDateString();
  const backToDashboard = () => {
    window.location.href = "/sellerDashboard";
  }

  return (
    <div className="mb-4 flex justify-between">
    <div className="flex flex-col">
      <p className="font-bold">Welcome, {session.data?.user?.name}</p>
      <p>{currentDate}</p>
      <hr className="my-4" /> {/* Line separator */}
    </div>
    <div className="flex flex-row">
    <div
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="bg-red-300 cursor-pointer rounded-2xl h-10 w-fit flex  justify-center items-center px-2 sm:px-4 lg:px-6 mt-10 mr-4"
    >
      <div className="text-black font-semibold">Logout</div>
    </div>
    <div
      onClick={() => backToDashboard()}
      className="bg-red-300 cursor-pointer rounded-2xl h-10 w-fit flex  justify-center items-center px-2 sm:px-4 lg:px-6 mt-10"
    >
      <div className="text-black font-semibold">Back To Dashboard</div>
    </div>
    </div>
    
  </div>
  
  );
};

export default WelcomeBar;
