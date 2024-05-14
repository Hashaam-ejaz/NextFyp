// components/WelcomeBar.tsx
import React from "react";
import { useSession } from "next-auth/react";

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

  return (
    <div className="mb-4">
      <p className="font-bold">Welcome, {session.data?.user?.name}</p>
      <p>{currentDate}</p>
      <hr className="my-4" /> {/* Line separator */}
    </div>
  );
};

export default WelcomeBar;
