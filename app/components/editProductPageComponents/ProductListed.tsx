import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface ProductListedModalProps {
  onClose: () => void;
  productName: string;
  productDescription: string;
  productPrice: string;
  productImage: string;
}

const ProductListedModal: React.FC<ProductListedModalProps> = ({
  onClose,
  productName,
  productDescription,
  productPrice,
  productImage,
}) => {

  const router = useRouter();

  const handleBackToDashboard = () => {
    onClose();
    router.push('/sellerDashboard');
  };

  const handleViewProduct = () => {
    onClose();
    router.push('/sellerProducts');
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-14 w-[40rem]">
       <div className='flex'>
       <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-green-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
          <p className='italic mb-5'> Your listing has been saved </p>
        </div>
        <div className="flex">
          <div className="flex-none mr-4">
            <Image src={productImage} alt={productName} className="w-40 h-40 object-cover rounded-md" width={50} height={50} />
          </div>
          <div>
            <h2 className="text-lg font-semibold">{productName}</h2>
            {/* <p className="text-sm text-gray-600 mb-2 break-words">{productDescription}</p> */}
            <p className="text-md font-bold text-gray-600 mb-2">Price: Rs.{productPrice}</p>
            <div className="flex mt-4 ml-12">
              <button
                className=" mr-2 px-3 py-2 bg-white text-[#806491] rounded-md border border-gray-300 hover:bg-gray-300"
                onClick={handleBackToDashboard}
              >
                Back to Dashboard
              </button>
              <button
                className="px-3 py-2 bg-[#806491] text-white rounded-md hover:bg-[#806470]"
                onClick={handleViewProduct}
              >
                View Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListedModal;
