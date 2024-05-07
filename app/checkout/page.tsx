"use client";
import React from 'react';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import  connectMongoDB from '../../libs/mongodb';
import { useRouter } from 'next/router';
import { IShoppingCart } from '../../models/shoppingCart';
import { ShoppingCart } from '../../models/shoppingCart';
import { IOrder } from '../../models/orders';
import { Order } from '../../models/orders';
import { Product } from '../../models/products';


const CheckoutPage: React.FC = () => {
    const { data: session, status } = useSession();
    const [error, setError] = useState<string | null>(null);
    const [shippingFormData, setShippingFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        postalCode: '',
        phoneNumber: '',
      });
      const [billingFormData, setBillingFormData] = useState({
        cardNumber: '',
        expiry: '',
        cvv: '',
        saveCard: false,
      });
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>, form: string) => {
        const { name, value, type, checked } = e.target;
        if (form === 'shipping') {
          setShippingFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
          }));
        } else if (form === 'billing') {
          setBillingFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value,
          }));
        }
      };
      const handleShippingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !session.user) return;
    
        try {
          const router = useRouter();
          const response = await fetch(
            `http://localhost:3000/api/users?email=${session.user.email}`
          );
          const user1 = await response.json();
          const buyer = user1.existingUser;
          // Find the buyer ID using the user's email
          if (!buyer || !buyer._id)  setError("User not found or missing ID");

          const newOrder : Partial<IOrder> = {
            buyerID: buyer._id,
            buyerName: shippingFormData.fullName,
            productID: [], // Add product IDs here
            amount: 0, // Set the correct amount
            quantity: 0, // Set the correct quantity
            paymentStatus: 'pending', // Change status as required
            address: shippingFormData.address + ', ' + shippingFormData.city + ', ' + shippingFormData.postalCode,
            phoneNo: shippingFormData.phoneNumber,
            date: new Date(),
          }
          try {
            const response = await fetch("http://localhost:3000/api/orders", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newOrder),
            });
            if (!response.ok) {
              setError("Payment Not Verified, Order Not Created.");
              return;
            }
          } catch (error) {
            console.error("Error sending user data:", error);
          }

          // await db.collection('orders').insertOne({
          //   buyerID: buyer._id,
          //   buyerName: shippingFormData.fullName,
          //   productID: [], // Add product IDs here
          //   amount: 0, // Set the correct amount
          //   quantity: 0, // Set the correct quantity
          //   paymentStatus: 'pending', // Change status as required
          //   address: shippingFormData.address + ', ' + shippingFormData.city + ', ' + shippingFormData.postalCode,
          //   phoneNo: shippingFormData.phoneNumber,
          //   date: new Date(),
          // });
          console.log('Order Placed successfully');
          // Redirect to success page
          router.push('/success');
        } catch (error) {
          console.error('Error saving shipping order:', error);
        }
      };
    
      const handleBillingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!session || !session.user) return;
    
        try {
          const router = useRouter();
          // Find the buyer ID using the user's email
          // const buyer = await db.collection('users').findOne({ email: session.user.email });
          const response = await fetch(
            `http://localhost:3000/api/users?email=${session.user.email}`
          );
          const user1 = await response.json();
          const buyer = user1.existingUser;
          if (!buyer || !buyer._id) setError("User not found or missing ID");
          // Step 1: Find the user's previous order

          // http://localhost:3000/api/orders?buyerID=660a79d1f570eb8e957c9d3f&paymentStatus=Paid
          const response2 = await fetch(`http://localhost:3000/api/orders?buyerID=${buyer._id}&paymentStatus=pending`);
          const res2 = await response2.json();
          const existingOrder = res2.existingOrder;
          // Step 2: Find products in the user's shopping cart
          const userShoppingCart: IShoppingCart[] = await ShoppingCart.find({ userID: buyer._id });
          // Step 3: Calculate total amount and quantity for the order
          let totalAmount: number = 0;
          let totalQuantity: number = 0;
          const productIDs: string[] = [];

          // Calculate total amount for each product
          for (const entry of userShoppingCart) {
            const product = await Product.findById(entry.productID);
            if (product) {
              totalAmount += product.price * entry.quantity;
              totalQuantity += entry.quantity;
              productIDs.push(entry.productID.toString());
            }
          }
           //Generate random tracking number
           const trackingNo = Math.random().toString(36).substring(7);
          // Step 4: Prepare update data
          const updateData: Partial<IOrder> = {
            buyerName: shippingFormData.fullName,
            productID: productIDs,
            amount: totalAmount,
            quantity: totalQuantity,
            paymentStatus: 'Paid', // Change status as required
            date: new Date(),
            trackingNo: trackingNo,
          };

          // Step 5: Update the previous order if it exists, otherwise insert a new one
          if (previousOrder) {
            await Order.findOneAndUpdate({ _id: previousOrder._id }, {$set: updateData}, { new: true });
            console.log('Order Updated successfully');
          } else {
            //insert new order
            const newOrder: IOrder = new Order({
              buyerID: buyer._id,
              buyerName: shippingFormData.fullName,
              productID: productIDs,
              amount: totalAmount,
              quantity: totalQuantity,
              paymentStatus: 'Paid',
              date: new Date(),
              trackingNo: trackingNo,
            });
            try {
              const response = await fetch("http://localhost:3000/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(newOrder),
              });
              if (!response.ok) {
                setError("Payment Not Verified, Order Not Created.");
                return;
              }
            } catch (error) {
              console.error("Error sending user data:", error);
            }
            // await db.collection('orders').insertOne({
            //   buyerID: buyer._id,
            //   buyerName: shippingFormData.fullName,
            //   productID: productIDs,
            //   amount: totalAmount,
            //   quantity: totalQuantity,
            //   paymentStatus: 'Paid',
            //   date: new Date(),
            //   trackingNo: trackingNo,
            // });
            console.log('New Order Inserted successfully');
          }
          // Redirect to success page
          router.push('/success');
          }
           catch (error) {
          console.error('Error saving billing order:', error);
        }
      };




  return (
    <div className="bg-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="md:flex md:space-x-8">
          {/* Shipping Details */}
          <div className="md:w-1/2 mb-8">
            <h2 className="text-lg font-semibold mb-4 text-[#5B4966] ml-6">Shipping Details</h2>
            <div className="border-t border-gray-400 w-full sm:w-[21.563rem] lg:w-[31.563rem] ml-6 "></div>

            <div className="bg-white p-6">
              {/* Shipping form */}
              <form onSubmit={handleShippingSubmit}>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" id="fullName" name="fullame" value={shippingFormData.fullName} onChange={(e) => handleChange(e, 'shipping')} className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" placeholder="Full Name" required />
                </div>
                <div className="mb-4">
                  <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Address <span className="text-red-500">*</span></label>
                  <input type="text" id="address" value={shippingFormData.address} onChange={(e) => handleChange(e, 'shipping')} name="address" placeholder="Street Address" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">City <span className="text-red-500">*</span></label>
                  <input type="text" id="city" value={shippingFormData.city} onChange={(e) => handleChange(e, 'shipping')} name="city" placeholder="Islamabad" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="postalCode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Postal Code <span className="text-red-500">*</span></label>
                  <input type="text" id="postalCode" value={shippingFormData.postalCode} onChange={(e) => handleChange(e, 'shipping')} name="postalCode" placeholder="46000" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Phone Number <span className="text-red-500">*</span></label>
                  <input type="text" id="phoneNumber" value={shippingFormData.phoneNumber} onChange={(e) => handleChange(e, 'shipping')} name="phoneNumber" placeholder="+92 300 1234567" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                  
                </div>
              </form>
            </div>
          </div>
          {/* Billing Information */}
          <div className="md:w-1/2">
            <h2 className="text-lg font-semibold mb-4 text-[#5B4966] ml-6">Payment Information</h2>
            <div className="border-t border-gray-400 w-full sm:w-[21.563rem] lg:w-[31.563rem] ml-6 "></div>

            <div className="bg-white p-6">
              {/* Billing form */}
              <form onSubmit={handleBillingSubmit}>
                <div className="mb-4">
                  <label htmlFor="cardNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Card Number <span className="text-red-500">*</span></label>
                  <input type="text" id="cardNumber" value={billingFormData.cardNumber} onChange={(e) => handleChange(e, 'billing')} name="cardNumber" placeholder="1234 5678 9012 3456" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="expiry" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">Expiration Date <span className="text-red-500">*</span></label>
                  <input type="text" id="expiry" value={billingFormData.expiry} onChange={(e) => handleChange(e, 'billing')} name="expiry" placeholder="MM/YY" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4">
                  <label htmlFor="cvv" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">CVV <span className="text-red-500">*</span></label>
                  <input type="text" id="cvv" value={billingFormData.cvv} onChange={(e) => handleChange(e, 'billing')} name="cvv" placeholder="123" className="bg-white border border-gray-500 text-gray-900 text-sm rounded-[0.2rem] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.875rem] p-2.5" required/>
                </div>
                <div className="mb-4 flex ">
                  <input type="checkbox" id="saveCard" checked={billingFormData.saveCard} onChange={(e) => handleChange(e, 'billing')} name="saveCard" className="mr-2" />
                  <label htmlFor="saveCard"  className="text-sm text-gray-500">Save card details</label>
                </div>
                <div>
                  {error && <p className="text-red-500 text-sm">{error}</p>}
                </div>
                <div>
                  <button type="submit" className="text-white mt-2 px-4 py-3 rounded rounded-md-[0.2] shadow bg-[#806491] w-full sm:w-[21.563rem] lg:w-[31.563rem] h-[2.75rem] ">Pay Now</button>
                </div>
              </form>
              <p className="text-sm text-gray-500 mt-4">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our privacy policy.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
