import { CartItem, CartItemType } from "./cartItem"

export interface CartInfo
{
    subtotal:number;
    total:number;
    noOfItems:number;
    shippingCost:number;
    shippingCostCurrency:string;
    shippingCostCurrencySymbol:string;
    discount:number;
    couponCodes:
        {
            codeName:string;
            discount:number;
            
        }[];
    cartItems: CartItemType[] ;
    
}

export type CartInfoType=CartInfo