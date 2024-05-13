//used to add products to cart
export default function AddToCart(){
    
    const handleClick=()=>{
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