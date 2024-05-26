'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image'
import { IProduct } from '../../../../../models/products'


interface TopSellingProductsTableProps {
  userID: string;
}
const TopSellingProductsTable: React.FC<TopSellingProductsTableProps> = ({userID}) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productToEdit,setProductToEdit]=useState('');
  // console.log('UserId on TopSellingProductsTable', userID);

  useEffect(() => {
    const fetchData = async () => {
      if (!userID) return;
      try {
        const response = await fetch(`http://localhost:3000/api/products/sellerProducts/${userID}`);
        const productsDetails = await response.json();
        const Products = productsDetails.products;
         // Sort products by noSales in descending order
        const sortedProducts = Products.sort((a: IProduct, b: IProduct) => b.noSales - a.noSales);
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };
    fetchData();
  }, [userID]);
  const editProduct=(index:number)=>
    {

    }
  return (
    <div className='flex flex-col min-w-full max-w-full w-full h-auto bg-white p-5'>
        <div className="flex flex-row w-full min-w-full max-w-full h-auto mb-5 font-bold text-xl leading-6 text-[#2B3674]">
          Top Selling Products
        </div>
        <div className="flex flex-row w-full max-w-full min-w-full h-auto">

          <table className=" table min-w-full   border-gray-200 text-center ">
            <thead className="table-header-group border-b-[1.62px] border-[#ECECEC]">
              <tr>
                <th className="py-2 px-4 border-b">Product</th>
                <th className="py-2 px-4 border-b">SKU</th>
                <th className="py-2 px-4 border-b">Product Name</th>
                <th className="py-2 px-4 border-b">Category</th>
                <th className="py-2 px-4 border-b">Sales Price</th>
                <th className="py-2 px-4 border-b">Sold</th>
                <th className="py-2 px-4 border-b">Edit</th>
              </tr>
            </thead>
            <tbody className='table-row-group'>
              {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b text-center mx-auto">
                  <Image 
                    src={product.images.length > 0 && product.images[0].src ? product.images[0].src : ""} 
                    alt={product.images.length > 0 && product.images[0].alt ? product.images[0].alt : "No image available"} 
                    width={32} 
                    height={32} 
                  />
                  </td>
                  <td className="py-2 px-4 border-b text-center">{product.sku}</td>
                  <td className="py-2 px-4 border-b text-center">{product.name}</td>
                  <td className="py-2 px-4 border-b text-center">{product.category}</td>
                  <td className="py-2 px-4 border-b text-center">${product.price}</td>
                  <td className="py-2 px-4 border-b text-center">{product.status ? "In Stock" : "Out of Stock"}</td>
                  <td className="py-2 px-4 border-b text-center">
                    <button className="bg-indigo-600 text-white hover:bg-indigo-900 py-1 px-2 rounded">
                      Edit
                    </button>
                  </td>
                </tr>
              ))
              ) : (
                <tr>
                <td colSpan={7} className="py-2 px-4 border-b text-center">
                  No products found.
                </td>
              </tr>
            )}
            </tbody>
          </table>

        </div>
    </div>

  );
};

export default TopSellingProductsTable;
