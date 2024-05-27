"use client";
import React, { useState, useEffect } from 'react';

interface LoadingPageProps {
  message: string;
}
const LoadingPage: React.FC<LoadingPageProps> = ({message}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 10000); 

    return () => clearTimeout(timer);
  }, [message]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading ? (
        <>
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#806491]"></div>
        <p className="mt-6 text-xl font-semibold text-[#806491]">Please Wait...</p>
        </>
      ) : (
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900">{message}</h1> 
      )}
    </div>
  );
};

export default LoadingPage;
