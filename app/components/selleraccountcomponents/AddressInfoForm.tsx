// AddressInfoForm.tsx
"use client";
import React, { useState } from 'react';
import { FormData } from './stepper';

interface AddressInfoFormProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
}

const AddressInfoForm: React.FC<AddressInfoFormProps> = ({ formData, setFormData }) => {

  return (
    <form className="px-10">
       <div className="mb-4">
       <h2 className='font-semibold text-lg text-[#5D6881]'> Create Seller Account </h2>
              <p className='text-xs'> Please complete the to do as soon as possible, and start your business journey！</p>
            </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Store Address <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          Area <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum Area"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          City <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Rawalpindi"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          required
        
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
          District <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="address"
          type="text"
          placeholder="Lorem Ipsum"
          value={formData.district}
          onChange={(e) => setFormData({ ...formData, district: e.target.value })}
          required
        />
      </div>
      
    </form>
  );
};

export default AddressInfoForm;
