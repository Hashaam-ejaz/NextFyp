// BankInfoForm.tsx
"use client";
import React, { useState } from 'react';

interface BankInfoFormProps {
  formData: object;
  onNext: (data: object) => void;
}

const BankInfoForm: React.FC<BankInfoFormProps> = ({ formData, onNext }) => {
  const [name, setName] = useState('');
  const [iban, setIban] = useState('');
  const [bankName, setBankName] = useState('');
  const [cnic, setCnic] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onNext({ ...formData, name, iban, bankName, cnic});
  };

  return (
    <form className="px-10" onSubmit={handleSubmit}>
      <div className="mb-4">
      <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the to do as soon as possible, and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          Account Holder Name <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="John Doe"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          IBAN Number <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="PK36 SCBL 0000 0011 2345 6702"
          value={iban}
          onChange={(e) => setIban(e.target.value)}
          required
        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          Bank Name <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="Habib Bank Limited"
          value={bankName}
          onChange={(e) => setBankName(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bankInfo">
          CNIC Number <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="bankInfo"
          type="text"
          placeholder="00000-0000000-0"
          value={cnic}
          onChange={(e) => setCnic(e.target.value)}
          required
        />
      </div>
      
    </form>
  );
};

export default BankInfoForm;
