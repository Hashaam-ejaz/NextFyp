'use client';
import { useState } from "react";


// function QuantityIterator({ ItemCount, setItemCount,index }){
function QuantityIterator({ ItemCount, index }){
// function QuantityIterator({}){
    const [ItemCount,setItemCount]=useState(1);

    const decreaseQuantity=()=>{
        if(ItemCount>1)
            setItemCount(ItemCount-1);
            
        // console.log('index',index,'Item Count:',ItemCount)
    };

    const increaseQuantity=()=>{
        setItemCount(ItemCount+1);
        // console.log('index',index1,'Item Count:',ItemCount)
    };
    
    return(
        <>
        
            <div className="flex flex-row w-[95%] max-w-[95%] min-w-[95%] h-auto justify-center">
                <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto">
                    {/* <button
                        className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
                        onClick={decreaseQuantity}
                    > */}
                    <button
                        className="transition-color duration-100 focus:outline-none text-black px-4 py-2 bg-white hover:bg-[#806491] hover:text-white rounded-[2.13px] hover:rounded-[2.13px]"
                        onClick={decreaseQuantity}
                    >
                        -
                    </button>
                </div>
                {/* <div className="border border-gray-400 bg-white px-4 py-2"> */}
                <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto  text-[#060709]   bg-[#F4F4F4] font-normal rounded-[2.13px] px-4 py-2 place-self-center">
                    {ItemCount}
                </div>
                <div className="flex flex-col w-1/3 max-w-1/3 min-w-1/3 h-auto">
                    {/* <button
                        className="transition-color duration-500 focus:outline-none border border-gray-400 text-black px-4 py-2 hover:bg-[#806491] hover:text-white"
                        onClick={increaseQuantity}
                    > */}
                    <button
                        className="transition-color duration-100 focus:outline-none bg-white text-black px-4 py-2 hover:bg-[#806491] hover:text-white rounded-[2.13px] hover:rounded-[2.13px]"
                        onClick={increaseQuantity}
                    >
                        +
                    </button>
                </div>
            </div>
        </>
    );
}

export default QuantityIterator;
