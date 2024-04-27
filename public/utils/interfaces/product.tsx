export default interface Product
{
    id: number,
    name:string,
    price:number,
    currency:string,
    currencySymbol:string,
    category:string,
    subCategory:string,
    rating:
    {
        averageRating:number,
        reviewCount:number
    }

};