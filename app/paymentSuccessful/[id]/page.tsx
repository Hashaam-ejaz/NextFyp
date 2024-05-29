"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import PaymentSuccessfulImage from "../../public/assets/paymentsuccessful.png";
import { useRouter } from "next/router";

const Payment = () => {
  const [isModalOpen, setModalOpen] = useState(true);
  const router = useRouter();
  const { id } = router.query; // Access the dynamic route parameter
  const link = decodeURIComponent(id as string);

  useEffect(() => {
    if (!id) return; // Ensure id is available

    const timer = setTimeout(() => {
      setModalOpen(false);
    }, 3000); // Close the modal after 3 seconds

    return () => clearTimeout(timer);
  }, [id]);

  const handleCloseModal = () => {
    router.push("/");
    setModalOpen(false);
  };

  if (!isModalOpen) return null;

  const transactionUrl = decodeURIComponent(id as string);

  const shortenedUrl =
    transactionUrl.length > 50
      ? transactionUrl.substring(0, 50) + "..."
      : transactionUrl;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 sm:mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-[#806491] font-semibold">
            Payment Successful
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-900 text-2xl"
          >
            &times;
          </button>
        </div>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
            <p className="mb-4">
              Your order has been confirmed. A receipt has been sent to your
              email address.
            </p>
            <p className="mb-2">Transaction address:</p>
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 break-words"
            >
              {shortenedUrl}
            </a>
            <div className="flex justify-start mt-8">
              <button
                onClick={handleCloseModal}
                className="text-white bg-[#806491] px-4 py-2 rounded-md"
              >
                Back to Homepage
              </button>
            </div>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={PaymentSuccessfulImage}
              alt="Payment Successful"
              width={180}
              height={180}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
