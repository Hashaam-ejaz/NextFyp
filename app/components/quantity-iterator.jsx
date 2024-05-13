import { useState, useEffect } from "react";

function QuantityIterator({ onQuantityChange }) {
  const [itemCount, setItemCount] = useState(1);

  const decreaseQuantity = () => {
    if (itemCount > 1) {
      setItemCount(itemCount - 1);
    }
  };

  const increaseQuantity = () => {
    setItemCount(itemCount + 1);
  };

  useEffect(() => {
    // Call the onQuantityChange function after itemCount has been updated
    onQuantityChange(itemCount);
  }, [itemCount, onQuantityChange]);

  return (
    <div className="flex flex-row items-center justify-center mx-8">
      <div>
        <button
          className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
          onClick={decreaseQuantity}
        >
          -
        </button>
      </div>
      <div className="border border-gray-400 bg-white px-4 py-2">
        {itemCount}
      </div>
      <div>
        <button
          className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
          onClick={increaseQuantity}
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantityIterator;
