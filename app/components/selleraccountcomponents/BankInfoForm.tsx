// BankInfoForm.tsx
"use client";
import React, { useState } from 'react';
import { FormData } from './stepper';

interface BankInfoFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const BankInfoForm: React.FC<BankInfoFormProps> = ({ formData, setFormData}) => {

  return (
    <form className="px-10">
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
          value={formData.accName}
          onChange={(e) => setFormData({ ...formData, accName: e.target.value })}
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
          value={formData.iban}
          onChange={(e) => setFormData({ ...formData, iban: e.target.value })}
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
          value={formData.bankName}
          onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
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
          value={formData.cnic}
          onChange={(e) => setFormData({ ...formData, cnic: e.target.value })}
          required
        />
      </div>
      
    </form>
  );
};

export default BankInfoForm;
