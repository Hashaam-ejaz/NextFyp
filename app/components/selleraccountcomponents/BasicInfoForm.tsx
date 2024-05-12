// BasicInfoForm.tsx
"use client";
import React, { useState } from 'react';

interface BasicInfoFormProps {
  onNext: (data: object) => void;
}

const BasicInfoForm: React.FC<BasicInfoFormProps> = ({ onNext }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ name, email });
  };

  return (
    <form className="px-10" onSubmit={handleSubmit}>
            <div className="mb-4">
              <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the to do as soon as possible, and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Shop Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Lorem Ipsum Store"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
          Email Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="email"
          type="email"
          placeholder="olivia@untitledui.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phonenumber">
          Mobile Number 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="number"
          type="text"
          placeholder="+92 300 1234567"
          />
      </div>
     
    </form>
  );
};

export default BasicInfoForm;
