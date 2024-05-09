"use client";
import React, { useState } from 'react';

const ShoppingCartTestPage: React.FC = () => {

    const buyerid = "663a16258d94db1306530feb";
    const handleButtonClick = async () => {
        console.log("Button clicked");
        try {
            const response = await fetch(`http://localhost:3000/api/shoppingCart/${buyerid}`, {
                method: "DELETE",
                body: JSON.stringify({})
            });
            const data = await response.json();
            console.log("Response:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <button onClick={handleButtonClick}>Test Delete API</button>
        </div>
    );
};

export default ShoppingCartTestPage;
