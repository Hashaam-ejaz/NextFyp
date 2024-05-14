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
import { IOrder } from '../../models/orders';
import { Order } from '../components/manageprofilecomponents/OrderHistory';
import TogglePasswordButton from '../components/manageprofilecomponents/TogglePassword';
import icon from "../../public/profile-icon.png";
import bcrypt from "bcryptjs";

const ProfilePage: React.FC = () => {
  const { data: session, status } = useSession();
  const [error, setError] = useState<string | null>(null);
  const [userId, setUserId] = useState<ObjectId | null>(null);
  const [userDetails, setUserDetails] = useState<IUser | null>(null);
  const [updateFormData, setUpdateFormData] = useState({
    name: '',
    city: '',
    address: '',
    phone: '',
  });
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateFormData({
      ...updateFormData,
      [e.target.id]: e.target.value,
    });
  }
  const [wishlistEntries, setWishlistEntries] = useState<IWishlist[]>([]);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [cart, setCart] = useState<IShoppingCart[]>([]); // State to manage cart items
  const [orderHistory, setOrderHistory] = useState<Order[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      console.log('Submitting Password');
      const hashedPreviousPassword = userDetails?.password;
      if(!hashedPreviousPassword){
        setPasswordError("User not found.");
        return;
      }
      if(oldPassword.length === 0){
        setPasswordError("Please enter your old password.");
        return;
      }
      const passwordsMatch = await bcrypt.compare(oldPassword, hashedPreviousPassword);

      if (passwordsMatch === false) {
        setPasswordError("Old password is incorrect.");
        return;
      }
      if (newPassword.length < 5) {
          setPasswordError("Password must be at least 5 characters long.");
          return;
      }

      if (newPassword === oldPassword) {
        setPasswordError("New password must be different from old password.");
        return;
      }
      const updatedPassword : Partial<IUser> = {
        password: newPassword,
      }
      // Update the user's password
      const updateResponse = await fetch(
        `http://localhost:3000/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPassword),
        }
      );
      console.log("Password Updated");
      if (!updateResponse.ok) {
        setPasswordError("An unexpected error occurred.");
        return;
      }
      setPasswordError("");
      setNewPassword("");
      setOldPassword("");
  }

  const toggleShowOldPassword = () => {
    setShowOldPassword((prevShowOldPassword) => !prevShowOldPassword);
  };

  const toggleShowNewPassword = () => {
    setShowNewPassword((prevShowNewPassword) => !prevShowNewPassword);
  };

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
        const user = userData.existingUser;
        setUserDetails(user);
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
        setWishlistEntries(wishlistData.wishlist);

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
          fetchedProducts.push(productData.existingProduct);
        }
        setProducts(fetchedProducts);

        // Fetch order history
        const orderResponse = await fetch(`http://localhost:3000/api/orders/${user._id}`);
        if (!orderResponse.ok) {
          setError("Failed to fetch order history.");
          return;
        }
        const orderData = await orderResponse.json();
        const orders = orderData.orders;
        // Fetch product details for each product in orders
        const transformedOrders = [];
        for (const order of orders) {
          const productsWithDetails = [];
          for (const productId of order.productID) {
            const productResponse = await fetch(`http://localhost:3000/api/products/${productId}`);
            if (!productResponse.ok) {
              throw new Error(`Failed to fetch product with ID ${productId}`);
            }
            const productData = await productResponse.json(); 
            const product = productData.existingProduct;
            productsWithDetails.push({
              id: product._id,
              name: product.name,
              price: product.price,
              imageSrc: product.images[0].src,
              imageAlt: product.images[0].alt,
            });
          }

          transformedOrders.push({
            number: order._id,
            date: extractDate(order.date),
            products: productsWithDetails,
          });
        }
        setOrderHistory(transformedOrders);
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
          const updatedData : Partial<IUser> = {
            name: updateFormData.name,
            address: updateFormData.address + ", " + updateFormData.city,
            phone: +updateFormData.phone,
          }            
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
          console.log("User Updated");
          if (!updateResponse.ok) {
            setError("An unexpected error occurred.");
            return;
          }
          setError("");
          // Reset form fields
          setUpdateFormData({
          name: "",
          address: "",
          city: "",
          phone: "",
          });
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
          const response = await fetch('http://localhost:3000/api/shoppingCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCartItem),
          });
          console.log("Product Added to Cart");
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
            // Function to extract date from ISO string
        const extractDate = (isoDate: string): string => {
          const dateObj = new Date(isoDate);
          const year = dateObj.getFullYear();
          const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Add leading zero if needed
          const day = String(dateObj.getDate()).padStart(2, '0'); // Add leading zero if needed
          return `${year}-${month}-${day}`;
        };

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
            <input type="text" id="name" placeholder='John Doe' value={updateFormData.name} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="city" className="text-gray-600 mb-1">City</label>
            <input type="text" id="city" placeholder='Rawalpindi' value={updateFormData.city} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="text-gray-600 mb-1">Address</label>
            <input type="text" id="address" placeholder='123 Street, City' value={updateFormData.address} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="phone" className="text-gray-600 mb-1">Contact</label>
            <input type="tel" id="phone" placeholder='+92 123 456789' value={updateFormData.phone} onChange={handleChange} className="border border-gray-300 rounded px-4 py-2" />
          </div>
        </div>
        <div className="mx-4 sm:mx-auto bg-white p-6 rounded-lg w-full flex flex-col sm:flex-row items-center mt-4">
          <button onClick={handleUpdate} className="bg-[#806491] w-[9rem] text-white py-2 px-4 rounded-[0.278rem] mt-4 sm:mt-0 ml-auto">Update</button>
        </div>
      </div>

      {/* Change Password Profile */}
      <div className="relative mt-8 mx-4 sm:mx-auto lg:mx-auto w-full max-w-4xl bg-white p-6 rounded-lg">
  <h2 className="text-xl font-semibold mb-6 text-[#806491]">Change Password</h2>
  <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4" style={{ minHeight: '150px' }}> {/* Add minHeight style */}
    <div className="flex flex-col">
      <label htmlFor="oldPassword" className="text-gray-600 mb-1">Old Password</label>
      <div className="relative">
        <input
          type={showOldPassword ? "text" : "password"}
          id="oldPassword"
          placeholder="Old Password"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
        <TogglePasswordButton
          showPassword={showOldPassword}
          togglePassword={toggleShowOldPassword}
        />
      </div>
    </div>
    <div className="flex flex-col">
      <label htmlFor="newPassword" className="text-gray-600 mb-1">New Password</label>
      <div className="relative">
        <input
          type={showNewPassword ? "text" : "password"}
          id="newPassword"
          placeholder="New Password"
          className="border border-gray-300 rounded-md px-4 py-2 w-full"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <TogglePasswordButton
          showPassword={showNewPassword}
          togglePassword={toggleShowNewPassword}
        />
      </div>
    </div>
    {passwordError && <p className="text-red-500">{passwordError}</p>}
    <div className="absolute bottom-0 right-0 mb-8 mr-8">
      <button className="bg-[#806491] text-white py-2 px-4 rounded-md">Update Password</button>
    </div>
  </form>
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
        <OrderHistory orders={orderHistory} userID={userId}/>
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
