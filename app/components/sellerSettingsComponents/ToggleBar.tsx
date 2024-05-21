// components/ToggleBar.tsx
import React from "react";

interface ToggleBarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const ToggleBar: React.FC<ToggleBarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mb-4 border-b border-gray-200 dark:border-gray-700">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" id="default-styled-tab" data-tabs-toggle="#default-styled-tab-content" data-tabs-active-classes="text-purple-600 hover:text-purple-600 dark:text-purple-500 dark:hover:text-purple-500 border-purple-600 dark:border-purple-500" data-tabs-inactive-classes="dark:border-transparent text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300" role="tablist">
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "profile" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500"} hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
            id="profile-styled-tab"
            data-tabs-target="#styled-profile"
            type="button"
            role="tab"
            aria-controls="profile"
            aria-selected={activeTab === "profile" ? "true" : "false"}
            onClick={() => onTabChange("profile")}
          >
            Profile Information
          </button>
        </li>
        <li className="me-2" role="presentation">
          <button
            className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === "payment" ? "border-purple-600 text-purple-600" : "border-transparent text-gray-500"} hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300`}
            id="payment-styled-tab"
            data-tabs-target="#styled-payment"
            type="button"
            role="tab"
            aria-controls="payment"
            aria-selected={activeTab === "payment" ? "true" : "false"}
            onClick={() => onTabChange("payment")}
          >
            Payment Information
          </button>
        </li>
      
      </ul>
    </div>
  );
};

export default ToggleBar;
