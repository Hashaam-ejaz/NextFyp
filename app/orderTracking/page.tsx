// pages/order-tracking.tsx

"use client";
import { useState } from 'react';
import { FaCheckCircle, FaShippingFast, FaTruck, FaBoxOpen, FaCalendarAlt } from 'react-icons/fa';
import { IOrder } from '../../models/orders';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<IOrder | null>(null);
  // const [order, setOrder] = useState<IOrder | null>(null); // [1
  const [error, setError] = useState<string | null>(null);

  const handleTrackOrder = async () => {
    if (!orderNumber) {
      setError('Please enter the order number.');
      return;
    }
    setError(null);

    //fetch the order details from the orders table using the trackingNo
    const order = await fetch(`http://localhost:3000/api/orders/tracking/${orderNumber}`);
    const orderDetails = await order.json();
    const userOrder = orderDetails.order;
    if (orderDetails.message) {
      setError(orderDetails.message);
      return;
    }

    setOrderStatus(userOrder);
  };

  const steps = ['Order Confirmed', 'Shipped', 'Out for Delivery', 'Delivered'];

  const getStepClass = (currentStep: number, step: number) => {
    if (currentStep >= step) {
      return 'bg-[#806491] text-white';
    } else {
      return 'bg-gray-100 text-gray-800 dark:bg-neutral-700 dark:text-white';
    }
  };

  const currentStep = () => {
    switch (orderStatus?.orderStatus) {
      case 'Order Confirmed':
        return 1;
      case 'Shipped':
        return 2;
      case 'Out for Delivery':
        return 3;
      case 'Delivered':
        return 4;
      default:
        return 0;
    }
  };

  function extractDatePart(date: Date | string): string {
    let validDate: Date;
  
    // Check if the input is already a Date object
    if (date instanceof Date) {
      validDate = date;
    } else {
      // Try to parse the string as a Date object
      validDate = new Date(date);
    }
  
    // Check if the date is valid
    if (isNaN(validDate.getTime())) {
      throw new TypeError("Invalid date input");
    }
  
    // Convert the Date object to an ISO string
    const isoString = validDate.toISOString();
    // Split the ISO string by 'T' and return the first part
    const [datePart] = isoString.split('T');
    return datePart;
  }
  
  const calculateSubtotal = (price: number, quantity: number) => {
    const priceNumber = price;
    return `$${(priceNumber * quantity).toFixed(2)}`;
  };

  const calculateTotal = () => {
    if (!orderStatus) return '$0.00';
    const total = orderStatus.products.reduce((acc, item) => {
      const priceNumber = item.productPrice;;
      return acc + priceNumber * item.quantity;
    }, 0);
    return `$${total.toFixed(2)}`;
  };

  const renderStatusIcon = (status: string) => {
    switch (status) {
      case 'Order Confirmed':
        return <FaCheckCircle className="text-green-600 mr-2" />;
      case 'Shipped':
        return <FaShippingFast className="text-blue-600 mr-2" />;
      case 'Out for Delivery':
        return <FaTruck className="text-yellow-600 mr-2" />;
      case 'Delivered':
        return <FaBoxOpen className="text-gray-600 mr-2" />;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
  <div className="bg-white p-6 rounded-lg w-full max-w-md lg:max-w-4xl md:max-w-3xl">
    <div className='flex flex-col items-center'>
    <h1 className="text-2xl font-semibold mb-4 text-[#806491]">Track your order</h1>
    <input
      type="text"
      placeholder="Enter order number"
      value={orderNumber}
      onChange={(e) => setOrderNumber(e.target.value)}
      className="w-full p-2 border border-gray-300 rounded mb-4"
    />
    {error && <p className="text-red-600 mb-4">{error}</p>}
    <button
      onClick={handleTrackOrder}
      className="w-1/2 text-white p-2 rounded bg-[#806491]" 
    >
      Track your order
    </button>
    </div>

    {orderStatus && (
      <div className="mt-6" style={{ width: "100%" }}>
        <div className="flex items-center mb-2">
          {renderStatusIcon(orderStatus.orderStatus)}
          <p className={`font-bold ${orderStatus.orderStatus === 'Order Confirmed' ? 'text-green-600' : ''}`}>
            {orderStatus.orderStatus}
          </p>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaCalendarAlt className="mr-2" />
            <p>Order Date: {extractDatePart(orderStatus.date)}</p>
          </div>
          <div className="flex items-center ml-4 text-[#12B76A] font-semibold">
            <FaTruck className="mr-2" />
            <p>Estimated Delivery: {extractDatePart(orderStatus.estimatedDelivery)}</p>
          </div>
        </div>

        <div className="relative pt-1 mb-6 w-full sm:ml-5 md:ml-20 lg:ml-20">
          <ul className="relative flex flex-row gap-x-2 justify-center lg:justify-start md:justify-start">
            <li className="shrink basis-0 flex-1 group">
                  <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full ${getStepClass(currentStep(), 1)}`}>
                      1
                    </span>
                    <div className={`ms-2 w-full h-px flex-1 ${currentStep() > 1 ? 'bg-[#806491]' : 'bg-gray-200'} group-last:hidden dark:bg-neutral-700`}></div>
                  </div>
                  <div className="mt-3">
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray">
                      Order Confirmed
                    </span>
                  </div>
                </li>
                <li className="shrink basis-0 flex-1 group">
                  <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full ${getStepClass(currentStep(), 2)}`}>
                      2
                    </span>
                    <div className={`ms-2 w-full h-px flex-1 ${currentStep() > 2 ? 'bg-[#806491]' : 'bg-gray-200'} group-last:hidden dark:bg-neutral-700`}></div>
                  </div>
                  <div className="mt-3">
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray">
                      Shipped
                    </span>
                  </div>
                </li>
                <li className="shrink basis-0 flex-1 group">
                  <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full ${getStepClass(currentStep(), 3)}`}>
                      3
                    </span>
                    <div className={`ms-2 w-full h-px flex-1 ${currentStep() > 3 ? 'bg-[#806491]' : 'bg-gray-200'} group-last:hidden dark:bg-neutral-700`}></div>
                  </div>
                  <div className="mt-3">
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray">
                      Out for Delivery
                    </span>
                  </div>
                </li>
                <li className="shrink basis-0 flex-1 group">
                  <div className="min-w-7 min-h-7 w-full inline-flex items-center text-xs align-middle">
                    <span className={`size-7 flex justify-center items-center flex-shrink-0 font-medium rounded-full ${getStepClass(currentStep(), 4)}`}>
                      4
                    </span>
                    <div className={`ms-2 w-full h-px flex-1 ${currentStep() >= 4 ? 'bg-[#806491]' : 'bg-gray-200'} group-last:hidden dark:bg-neutral-700`}></div>
                  </div>
                  <div className="mt-3">
                    <span className="block text-sm font-medium text-gray-800 dark:text-gray">
                      Delivered
                    </span>
                  </div>
                </li>
              </ul>
            </div>

            <h2 className="text-lg font-semibold mt-4 text-[#806491] p-4">Order Item(s)</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b">Image</th>
                    <th className="px-4 py-2 border-b">Product Name</th>
                    <th className="px-4 py-2 border-b">Link</th>
                    <th className="px-4 py-2 border-b">Price</th>
                    <th className="px-4 py-2 border-b">Quantity</th>
                    <th className="px-4 py-2 border-b">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {orderStatus.products.map((item, index) => (
                    <tr key={index} className="text-center">
                      <td className="px-4 py-2 border-b">
                        <img src={item.productImage} alt={item.productName} className="w-16 h-16 object-cover mx-auto" />
                      </td>
                      <td className="px-4 py-2 border-b">{item.productName}</td>
                      <td className="px-4 py-2 border-b">
                        <a href={orderStatus.trackingLink} className="text-blue-500 underline">
                          {orderStatus.trackingLink}
                        </a>
                      </td>
                      <td className="px-4 py-2 border-b">{item.productPrice}</td>
                      <td className="px-4 py-2 border-b">{item.quantity}</td>
                      <td className="px-4 py-2 border-b">{calculateSubtotal(item.productPrice, item.quantity)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan={5} className="px-4 py-2 border-b text-right font-semibold">Total</td>
                    <td className="px-4 py-2 border-b text-center">{calculateTotal()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
