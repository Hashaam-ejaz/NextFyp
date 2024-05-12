// AddressInfoForm.tsx
"use client";
import React, { useState } from 'react';

interface AddressInfoFormProps {
  onNext: (data: object) => void;
}

const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ onNext }) => {
  const [address, setAddress] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ address });
  };

  return (
    <form className="px-10" onSubmit={handleSubmit}>
       <div className="mb-4">
       <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the to do as soon as possible, and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Store Address
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Area
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum Area"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          City
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Rawalpindi"
        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          District 
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum"
         
        />
      </div>
      
    </form>
  );
};

export default AddressInfoForm;
