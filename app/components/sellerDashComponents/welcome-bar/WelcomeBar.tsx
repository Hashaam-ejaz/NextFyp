// components/WelcomeBar.tsx
'use client';
import React, { useEffect, useState } from "react";

interface WelcomeBarProps {
  userName: string;
}

const WelcomeBar: React.FC<WelcomeBarProps> = ({ userName }) => {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-row max-w-full min-w-full w-full h-auto bg-white border-b border-[#D1D1D1]">
      <div className="flex flex-col h-full w-full max-w-full min-w-full pl-8 py-[22px]">
        <div className="flex flex-row w-full max-w-full h-auto font-bold leading-8 text-xl text-black">
          Welcome, {userName}
        </div>
        <div className="flex flex-row w-full max-w-full h-auto font-medium text-sm text-[#7C7C7C]">
          {currentTime}
        </div>
      </div>
      <hr className="" /> {/* Line separator */}
    </div>
  );
};

export default WelcomeBar;
