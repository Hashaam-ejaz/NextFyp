import React, { useState } from 'react';
import { formData } from './stepper';

interface DescriptionProps {
  formData: formData;
  setFormData: (data: formData) => void;
  productID: string;
}

const Description: React.FC<DescriptionProps> = ({ formData, setFormData,productID }) => {
  const [showCustomColorInput, setShowCustomColorInput] = useState(false);
  const [showCustomSizeInput, setShowCustomSizeInput] = useState(false);
  const [showCustomMaterialInput, setShowCustomMaterialInput] = useState(false);


  const handleColorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({...formData, productColor:event.target.value});
    if (value === "Other") {
      setShowCustomColorInput(true);
      setFormData({...formData, productColor:event.target.value});
    } else {
      setShowCustomColorInput(false);
    }
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({...formData, productSize:event.target.value});
    if (value === "Custom") {
      setShowCustomSizeInput(true);
      setFormData({...formData, productSize:event.target.value});
    } else {
      setShowCustomSizeInput(false);
    }
  };

  const handleMaterialChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setFormData({...formData, productMaterial:event.target.value});
    if (value === "Other") {
      setShowCustomMaterialInput(true);
      setFormData({...formData, productMaterial:event.target.value});
    } else {
      setShowCustomMaterialInput(false);
    }
  };

  return (
    <form className="px-10" >
      <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="bankInfo">
        Product Details
      </label>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Name of the Product"
          value={formData.productName}
          onChange={(e) => setFormData({...formData, productName:e.target.value})}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="text-paragraph">
          Product Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="text-paragraph"
          placeholder='Add your product description here..'
          className="shadow appearance-none border rounded w-full h-[10rem] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40 resize-none"
          value={formData.productDescription}
          onChange={(e) => setFormData({...formData, productDescription:e.target.value})}
          autoFocus
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-md font-bold mb-2" htmlFor="address">
          Item Specifics
        </label>
        <div className="flex mb-2">
          <div className="w-1/2 relative mr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">
              Product Color
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="color"
                value={formData.productColor}
                onChange={handleColorChange}
              >
                <option value="">Select Color</option>
                <option value="Black">Black</option>
                <option value="Blue">Blue</option>
                <option value="Brown">Brown</option>
                <option value="White">White</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                  />
                </svg>
              </div>
            </div>
            {showCustomColorInput && (
              <input
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter custom color"
                value={formData.productColor}
                onChange={(e) => setFormData({...formData, productColor:e.target.value})}
              />
            )}
          </div>
          <div className="w-1/2 relative ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
              Product Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="price"
                type="text"
                placeholder='Enter Product Price (Rs.)'
                value={formData.productPrice}
                onChange={(e) => setFormData({...formData, productPrice:(e.target.value)})}
                 required
              />
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="w-1/2 relative mr-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="size">
              Size
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="size"
                value={formData.productSize}
                onChange={handleSizeChange}
              >
                <option value="">Select Size</option>
                <option value="Small">Small</option>
                <option value="Medium">Medium</option>
                <option value="Large">Large</option>
                <option value="Custom">Custom</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                  />
                </svg>
              </div>
            </div>
            {showCustomSizeInput && (
              <input
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter custom size"
                value={formData.productSize}
                onChange={(e) => setFormData({...formData, productSize:e.target.value})}
              />
            )}
          </div>
          <div className="w-1/2 relative ml-2">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="material">
              Material
            </label>
            <div className="relative">
              <select
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="material"
                value={formData.productMaterial}
                onChange={handleMaterialChange}
              >
                <option value="">Select Material</option>
                <option value="Metal">Metal</option>
                <option value="Other">Other</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 12l-6-6 1.414-1.414L10 9.172l4.586-4.586L16 6z"
                  />
                </svg>
              </div>
            </div>
            {showCustomMaterialInput && (
              <input
                className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Enter custom material name"
                onChange={(e) => setFormData({...formData, productMaterial:e.target.value})}
              />
            )}
          </div>
        </div>
      </div>
    </form>
  );
};

export default Description;
