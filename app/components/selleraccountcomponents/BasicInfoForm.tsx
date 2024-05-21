// BasicInfoForm.tsx
"use client";
import React, { useState } from 'react';
import { FormData } from './stepper';

interface BasicInfoFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ formData , setFormData }) => {

  return (
    <form className="px-10">
            <div className="mb-4">
              <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the form and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name" >
          Shop Name <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Lorem Ipsum Store"
          value={formData.shopName}
          onChange={(e) => setFormData({...formData, shopName: e.target.value})}
          required
        />
      </div>
      {/* <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="olivia@untitledui.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
          required
        />
      </div> */}
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="text"
          placeholder="+92 300 1234567"
          value={formData.mobileNo}
          onChange={(e) => setFormData({...formData, mobileNo: e.target.value})}
          required
          />
      </div>
    </form>
  );
};

export default BasicInfoForm;
