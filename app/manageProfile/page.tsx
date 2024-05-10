"use client";
import React from 'react';
import ProductCard from '../components/manageprofilecomponents/ProductCard';
import OrderHistory from '../components/manageprofilecomponents/OrderHistory';
import Pagination from '../components/manageprofilecomponents/Pagination';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { IUser } from '../../models/users';
import { IWishlist } from '../../models/wishlist'; 
import { IProduct } from '../../models/products'; 
import { IShoppingCart } from '../../models/shoppingCart';
import { ObjectId } from 'mongodb'; 
import icon from "../assets/profile-icon.png";
import { set, Types } from 'mongoose';

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<ObjectId | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.id]: e.target.value,
    });
  }
  const [wishlistEntries, setWishlistEntries] = useState<IWishlist[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IShoppingCart[]>([]); // State to manage cart items

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!session || !session.user) return;

        const userResponse = await fetch( `http://localhost:3000/api/users?email=${session.user.email}`);
        if (!userResponse.ok) {
          setError("User not found.");
          return;
        }
        const userData = await userResponse.json();
        console.log("userData" , userData);
        const user = userData.existingUser;
        setUserId(user._id);
        if (!user || !user._id) {
          setError("User not found or missing ID.");
          return;
        }

        const wishlistResponse = await fetch(
          `http://localhost:3000/api/wishlist?userID=${user._id}`
        );
        if (!wishlistResponse.ok) {
          setError("Failed to fetch wishlist.");
          return;
        }
        const wishlistData = await wishlistResponse.json();
        console.log("wishlistData" , wishlistData);
        setWishlistEntries(wishlistData.wishlist);

        // const productIDs = wishlistData.wishlist.map((entry: IWishlist) => entry.productID);
        // console.log("productIDs" , productIDs);
        

        const fetchedProducts: IProduct[] = [];
        for (const entry of wishlistData.wishlist) {
          const productResponse = await fetch(
            `http://localhost:3000/api/products/${entry.productID}`
          );
          if (!productResponse.ok) {
            setError("Failed to fetch product.");
            return;
          }
          const productData = await productResponse.json();
          console.log("productData" , productData);
          console.log("productData.existingProduct" , productData.existingProduct);
          fetchedProducts.push(productData.existingProduct);
        }
        setProducts(fetchedProducts);
        console.log("fetchedProducts" , fetchedProducts);
      } catch (error) {
        setError("An unexpected error occurred.");
      }
    };
    fetchData();
  }, [session]);

  const handleUpdate = async() => {
    if (!session || !session.user) return;
        try {
          console.log('Submitting form');
          const buyerId = userId;
          console.log("buyerId" , buyerId);
          const updatedData : Partial<IUser> = {
            name: updateFormData.name,
            address: updateFormData.address + ", " + updateFormData.city,
            phone: +updateFormData.phone,
          }
          console.log("updatedData" , updatedData);
            
          // Update the buyer's information
          const updateResponse = await fetch(
            `http://localhost:3000/api/users/${buyerId}`,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(updatedData),
            }
          );
          console.log("User Updated: " , updateResponse);
          if (!updateResponse.ok) {
            setError("An unexpected error occurred.");
            return;
          }

  }
  catch (error) {
    setError("An unexpected error occurred.");
  }
  
}
    // Function to handle adding a product to the cart
    const addToCart = async (product: IProduct) => {
      console.log("button clicked...");
      if (userId) {
        const newCartItem = {
          userID: userId,
          productID: product._id,
          quantity: 1,
        } as IShoppingCart;
        try {
          console.log("newCartItem" , newCartItem);
          console.log("making POST request for shoppingcart");
          const response = await fetch('http://localhost:3000/api/shoppingCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCartItem),
          });
          console.log("response for shoppingcart: " , response);
          if (!response.ok) {
            throw new Error('Failed to add item to cart');
          }
        setCart([...cart, newCartItem]);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        setError('Failed to add item to cart');
      }
    }
       else {
        // Handle the case where userId is null
        setError("User ID is not available.");
      }
    };
  const orders = [
    {
      number: 'NU881911',
      date: 'January 22, 2021',
      datetime: '2021-01-22',
      products: [
        {
          id: 1,
          name: 'TOZO T6 True Wireless Earbuds',
          href: '#',
          price: 'Rs. 3000',
          imageSrc: 'https://tailwindui.com/img/ecommerce-images/order-history-page-02-product-01.jpg',
          imageAlt: 'Any text here',
        },
        // More products...
      ],
    },
    // More orders...
  ];

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col justify-start items-center">
      {/* Top Bar */}
      <div className="bg-[#806491] w-full h-40 flex justify-between items-center px-4 sm:px-6 lg:px-8">
        <div className="bg-white h-20 flex justify-between items-center px-4 sm:px-6 lg:px-8 mt-10">
          <div className="flex items-center">
            <div className="bg-white rounded-full p-2 mr-4">
              <img src="https://www.w3.org/assets/website-2021/svg/avatar.svg" alt="User Profile Icon" className="h-10 w-10 text-purple-600" />
            </div>
            <div>
              <div className="text-black font-semibold">Buyer Account</div>
              <div className="text-black">John Doe</div>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Info Profile */}
      <div className="mt-8 mx-4 sm:mx-auto lg:mx-auto w-full max-w-4xl bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-6 text-[#806491]">Personal Info</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-gray-600 mb-1">Name</label>
            <input type="text" id="name" placeholder='John Doe' onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-600 mb-1">City</label>
            <input type="text" id="city" placeholder='Rawalpindi' onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-600 mb-1">Address</label>
            <input type="text" id="address" placeholder='123 Street, City' onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-600 mb-1">Contact</label>
            <input type="tel" id="phone" placeholder='+92 123 456789' onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
        </div>
        <div className="mx-4 sm:mx-auto bg-white p-6 rounded-lg w-full flex flex-col sm:flex-row items-center mt-4">
          <button onClick={handleUpdate} className="bg-[#806491] w-[9rem] text-white py-2 px-4 rounded-[0.278rem] mt-4 sm:mt-0 ml-auto">Update</button>
        </div>
      </div>

      {/* Wishlist */}
      <div className="mt-8 mx-4 sm:mx-auto lg:mx-auto w-full max-w-4xl bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
        <div className="space-y-4">
          {products.map((product: IProduct) => (
            <ProductCard 
            key={product._id}
            productName={product.name}
            price={product.price}
            description={product.description}
            onAddToCart={() => addToCart(product)} // Add to Cart function as a prop here
          />
          ))}
          
          {/* <ProductCard 
            productName="TOZO T6 True Wireless Earbuds"
            price={3000}
            description="Description of Product 1"
          />
          <ProductCard 
            productName="TOZO T6 True Wireless Earbuds"
            price={3000}
            description="Description of Product 1"
          /> */}
        </div>
        <div className='flex justify-end'>
          <Pagination />
        </div>
      </div>

      {/* Order History */}
      <div className="mt-8 mx-4 sm:mx-auto lg:mx-auto w-full max-w-4xl bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold">Order History</h2>
        <OrderHistory orders={orders} />
        <div className='flex justify-end'>
          <Pagination />
        </div>
      </div>

      {/* Footer */}
      <div>
        Add Footer Component
      </div>
    </div>
  );
};

export default ProfilePage;
