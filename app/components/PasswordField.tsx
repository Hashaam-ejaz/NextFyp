import React, { useState } from "react";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

const PasswordField = () => {
  const [Password, setPassword] = useState<string>("");
  const [Visible, setVisible] = useState<boolean>(false);
  return (
    <div className="flex items-center mb-[0.938rem] bg-gray-100 h-[2.813rem] p-4 pr-12 justify-between">
      <input
        value={Password}
        onChange={(e) => setPassword(e.target.value)}
        type={Visible ? "text" : "password"}
        name="password"
        id="pwd"
        className="bg-gray-100"
        placeholder="Enter Password"
      />
      <div
        className="p=2"
        onClick={() => {
          setVisible(!Visible);
        }}
      >
        {Visible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
      </div>
    </div>
  );
};

export default PasswordField;
