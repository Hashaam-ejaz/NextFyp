'use client';
import React, { useState, useEffect, use } from 'react';
import BasicInfoForm from './BasicInfoForm';
import Description from './Description';
import StocksPrice from './StocksPrice';
import ProductListedModal from './ProductListed';
import { IProduct } from '@/models/products';

interface StepperProps {
  steps: number;
  sellerProductID: string;
}

export interface FormData {
  category: string;
  subCategory: string;
  featured: boolean;
  sku: string;
  barcode: string;
  deliveryPrice: string;
  stock: number;
  discountPercentage: string;
  shippingWeight: string;
  productDescription: string;
  productName: string;
  productColor: string;
  productPrice: string;
  productSize: string;
  productMaterial: string;
}

const Stepper: React.FC<StepperProps> = ({ steps, sellerProductID }) => {

  const [currentStep, setCurrentStep] = useState(1);
  const [productListed, setProductListed] = useState(false);
  const [product, setProduct] = useState<IProduct | null>(null);
  const [formData, setFormData] = useState<FormData>({
    category: '',
    subCategory: '',
    featured: false,
    sku: '',
    barcode: '',
    deliveryPrice: '',
    stock: 0,
    discountPercentage: '',
    shippingWeight: '',
    productDescription: '',
    productName: '',
    productColor: '',
    productPrice: '',
    productSize: '',
    productMaterial: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:3000/api/products/${sellerProductID}`);
      const data = await response.json();
      const productData = data.existingProduct;
      setProduct(productData);
      if (productData) {
        setFormData({
          category: productData.category,
          subCategory: productData.subCategory,
          featured: productData.featured,
          sku: productData.sku,
          barcode: '',
          deliveryPrice: '250',
          stock: productData.quantity,
          discountPercentage: productData.discount? productData.discount.toString() : '',
          shippingWeight: productData.weight,
          productDescription: productData.description,
          productName: productData.name,
          productColor: productData.color ? productData.color[0] : '',
          productPrice: productData.price,
          productSize: productData.size ? productData.size[0] : '',
          productMaterial: '',
        });
      }
    };
    fetchData();
  }, [sellerProductID]);

  useEffect(() => {
  } , [product]);
  const handleNext = (data: Partial<FormData>) => {
    setFormData({ ...formData, ...data });
    if (currentStep < steps) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === steps) {
      handleSubmit();
      setProductListed(true);
    }
  };

  const handleSubmit = async () => {
    console.log('Updating Product...');
    try {
      const updatedProductData = {
        category: formData.category,
        subCategory: formData.subCategory,
        sku: formData.sku,
        quantity: formData.stock,
        discount: parseInt(formData.discountPercentage),
        weight: formData.shippingWeight,
        description: formData.productDescription,
        name: formData.productName,
        color: formData.productColor,
        price: parseInt(formData.productPrice),
        size: formData.productSize,
        featured: formData.featured,
      };
      const response = await fetch(`http://localhost:3000/api/products/${sellerProductID}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProductData),
      });
      console.log('Product Updated: ');
    } catch (error) {
      console.error('Error Updating Product: ', error);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const stepNames = ['Basic Information', 'Description', 'Stocks & Price'];

  const renderFormForStep = () => {
    switch (currentStep) {
      case 1:
        return <BasicInfoForm formData={formData} setFormData={setFormData} productID={sellerProductID}/>;
      case 2:
        return <Description formData={formData} setFormData={setFormData} productID={sellerProductID}/>;
      case 3:
        return <StocksPrice formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen flex flex-col justify-center items-center">
      <div className="lg:w-full lg:max-w-4xl md:max-w-md sm:max-w-md flex justify-center items-start">
        <ul className="relative flex flex-col sm:flex-row gap-x-2 mt-8 sm:my-4 md:gap-x-2 lg:w-full">
          {Array.from({ length: steps }, (_, index) => (
            <li
              key={index}
              className={`flex items-center gap-x-2 shrink basis-0 flex-1 group ${index + 1 === currentStep ? 'active' : ''}`}
            >
              <div className="flex items-center">
                {index !== 0 && (
                  <div className="hidden sm:flex items-center justify-center mx-2">
                    <svg
                      className="w-4 h-4 text-gray-300 group-active:text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                )}
                <div
                  className={`w-8 h-8 rounded-full flex justify-center items-center ${
                    index + 1 === currentStep ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              </div>
              <div className="text-gray-600 text-xs sm:text-sm sm:leading-5">{stepNames[index]}</div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-8 w-full max-w-4xl mx-auto p-4">
        {renderFormForStep()}
        <div className="flex justify-between mt-4">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="bg-gray-200 text-gray-600 py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Back
          </button>
          <button onClick={() => handleNext({})} className="bg-blue-600 text-white py-2 px-4 rounded">
            {currentStep === steps ? 'Finish' : 'Next'}
          </button>
        </div>
        {productListed && <ProductListedModal 
        onClose={() => setProductListed(false)} 
        productName={formData.productName} 
        productDescription={formData.productDescription} 
        productPrice={formData.productPrice} 
        productImage={product? product.images[0].src: '' }/>}
      </div>
    </div>
  );
};

export default Stepper;
export type { FormData as formData};
