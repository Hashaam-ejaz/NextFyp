"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const SearchPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, []);
  return <></>;
};

export default SearchPage;
