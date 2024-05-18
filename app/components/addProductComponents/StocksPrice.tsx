import React, { useState, useEffect } from 'react';
import { formData } from './stepper';

interface StocksPriceProps {
  formData: formData;
  setFormData: (data: formData) => void;
}

const StocksPrice: React.FC<StocksPriceProps> = ({ formData, setFormData }) => {
  return (
    <form className="px-10" >
      
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deliveryPrice">
          Delivery Price <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="deliveryPrice"
          type="text"
          placeholder="Free"
          value={formData.deliveryPrice}
          onChange={(e) => setFormData({...formData, deliveryPrice:e.target.value})}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock">
          Stock <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="stock"
          type="text"
          placeholder="12"
          value={formData.stock}
          onChange={(e) => setFormData({...formData, stock:e.target.value})}
          required
        />
      </div>
      {/* <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="price"
          type="text"
          placeholder="$50.00"
          value={formData.price}
          onChange={(e) => setFormData({...formData, price:e.target.value})}
          required 
        />
      </div> */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="discountPercentage">
          Discount Percentage
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="discountPercentage"
          type="text"
          placeholder="10"
          value={formData.discountPercentage}
          onChange={(e) => setFormData({...formData, discountPercentage:e.target.value})}
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="shippingWeight">
          Shipping Weight <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="shippingWeight"
          type="text"
          placeholder="in kg"
          value={formData.shippingWeight}
          onChange={(e) => setFormData({...formData, shippingWeight:e.target.value})}
          required
        />
      </div>
      </form>
  );
};

export default StocksPrice;
