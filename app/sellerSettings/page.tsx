"use client";
import React, { useState } from "react";
import ToggleBar from "../components/sellerSettingsComponents/ToggleBar";
import ProfileSettings from "../components/sellerSettingsComponents/ProfileSettings";
import PaymentSettings from "../components/sellerSettingsComponents/PaymentSettings";
import WelcomeBar from "../components/sellerSettingsComponents/WelcomeBar";

const IndexPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <WelcomeBar userName="[Name of the user]" />
        <ToggleBar activeTab={activeTab} onTabChange={handleTabChange} />
        <div className="mt-4">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "payment" && <PaymentSettings />}
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
