import React from "react";
import Image from "next/image";

import homepageRect from "../../public/homepageRect.png";

const Login = () => {
  return (
    <div className="flex md:flex-row flex-col  ">
      <div className="w-full h-40 bg-red-500 flex-grow"></div>
      <div className="w-full h-40 bg-blue-500  hidden md:block"></div>
    </div>
  );
};

export default Login;
