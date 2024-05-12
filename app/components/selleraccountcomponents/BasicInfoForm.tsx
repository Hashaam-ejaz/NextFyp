// BasicInfoForm.tsx
"use client";
import React, { useState } from 'react';

interface BasicInfoFormProps {
  onNext: (data: object) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');

  const handleSubmit = () => {
    onNext({ name, email, mobileNo });
  };

  return (
    <form className="px-10" onSubmit={handleSubmit}>
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
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="olivia@untitledui.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
          Mobile Number <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="text"
          placeholder="+92 300 1234567"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
          required
          />
      </div>
     
    </form>
  );
};

export default BasicInfoForm;
