import React from 'react';

interface ProductProps {
  productName: string;
  description: string;
  price: number;
}

const ProductCard: React.FC<ProductProps> = ({ productName, description, price }) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between">
      {/* <!-- Product Icon --> */}
      <div className="relative h-12 w-12 bg-gray-200 flex justify-center items-center">
        <div className="absolute h-8 w-8 bg-gray-300"></div>
      </div>
      {/* <!-- Product Details --> */}
      <div className="ml-4 flex-grow">
        <div className="font-semibold">{productName}</div>
        <div className="text-sm">{description}</div>
      </div>
      {/* <!-- Price and Add to Cart --> */}
      <div className="flex flex-col">
          <div className="font-semibold mb-2 ml-8">Rs. {price}</div>
          <button className="bg-white text-xs text-[#806491] hover:bg-[#806491] hover:text-white border border-[#806491] h-[1.5rem] py-1 px-4 rounded-[0.278rem] sm:ml-4">Add to Cart</button>
        </div>
    </div>
  );
};

export default ProductCard;
