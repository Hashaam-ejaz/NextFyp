import { useEffect } from "react"

//used to add products to cart
export default function AddToCart({product, itemCount, userID}){
    useEffect(() => {
    },[product, itemCount, userID]) 
    const handleClick= async ()=>{
      console.log('adding product to cart...')
      const newCart = {
        productID: product._id,
        userID: userID,
        quantity: itemCount
      }
      console.log('New Cart', newCart)
        const response = await fetch('/api/shoppingCart', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newCart),
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
        alert('One Product has been added to cart')

    }
    return(
<button 
  type="button" 
  className="transition-color duration-500 text-white bg-[#806491] hover:bg-black font-medium text-sm px-8 py-2.5 me-2 mb-2 dark:bg-purple-500 dark:hover:bg-white dark:hover:text-black focus:outline-none dark:focus:ring-blue-800" 
  onClick={handleClick}
>
  Add to Cart
</button>
               
    );

    
}