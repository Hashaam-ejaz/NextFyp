// BankInfoForm.tsx
"use client";
import React, { useState } from 'react';

interface BankInfoFormProps {
  formData: object;
  onNext: (data: object) => void;
}

const BankInfoForm: React.FC<BankInfoFormProps> = ({ formData, onNext }) => {
  const [bankInfo, setBankInfo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ ...formData, bankInfo });
  };

  return (
    <form className="px-10" onSubmit={handleSubmit}>
      <div className="mb-4">
      <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the to do as soon as possible, and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          Account Holder Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="John Doe"
          value={bankInfo}
          onChange={(e) => setBankInfo(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          IBAN Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="5415641513245345"
        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          Bank Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="Lorem Ipsum"
          
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          CNIC Number
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="0000-0000000-0"
       
        />
      </div>
      
    </form>
  );
};

export default BankInfoForm;
