export interface CartItem
{
    productID:number;//change to string
    quantity:number;
    price:number;
    totalPrice:number;
    additional? : CartItem[];

}
export type CartItemType=CartItem