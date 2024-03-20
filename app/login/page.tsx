import React from "react";
import Image from "next/image";

import homepageRect from "../../public/homepageRect.png";

const Login = () => {
  return (
    <div className="flex flex-row">
      <div className="bg-red-500 min-h-32 min-w-32">
        <Image
          src={homepageRect}
          width={500}
          height={500}
          alt="Picture of the author"
        />
      </div>

      <div className="bg-red-600 min-w-32 min-h-32 flex flex-col">
        <div className="flex">Hello</div>
        <div className="flex">Hello</div>
        <div className="flex">Hello</div>
        <div className="flex">Hello</div>
      </div>
    </div>
  );
};

export default Login;
