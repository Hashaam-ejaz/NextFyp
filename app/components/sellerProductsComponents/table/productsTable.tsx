'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import DeleteProductDialogBox from '../modals/deleteProductDialogBox';
import Link from 'next/link';
import { IProduct } from '@/models/products';
import { Types } from 'mongoose';

interface ProductsTableProps {
  Products: IProduct[];
}

const ProductsTable: React.FC<ProductsTableProps> = ({Products}) => {
  const [currentPage,setCurrentPage]=useState(1);
  const recordsPerPage=6;
  const lastIndex=currentPage*recordsPerPage;
  const firstIndex=lastIndex-recordsPerPage;
  const records=Products.slice(firstIndex,lastIndex);
  const noOfPages=Math.ceil(Products.length/ recordsPerPage);
  const numbers=[...Array(noOfPages+1).keys()].slice(1);
  const [isFirstPage,setIsFirstPage]=useState(true);
  const [isLastPage,setIsLastPage]=useState(false);

  const [showModal, setShowModal] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState<Types.ObjectId | null>(null);

  const openModal = (productId: Types.ObjectId) => {
    setProductIdToDelete(productId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setProductIdToDelete(null);
  };

  const confirmDelete = async () => {
    if (productIdToDelete !== null) {
      const response = await fetch(`http://localhost:3000/api/products/${productIdToDelete}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        alert('Failed to delete product');
        throw new Error('Failed to delete product');
      }
      alert('Product deleted!');
      console.log('Product deleted!');
      closeModal();
      window.location.reload();
    }
  };

  useEffect(()=>{
    if(!Products)
      return;
    if(currentPage===1)
      setIsFirstPage(true);
    else
      setIsFirstPage(false);

    if(currentPage===noOfPages)
      setIsLastPage(true);
    else
      setIsLastPage(false);

  },[Products,records,currentPage,noOfPages]);


  const prevPage=()=>
    {
      if(currentPage!==firstIndex)
        setCurrentPage(currentPage-1);
    };
  const changeCurrentPage=(id:number)=>
    {
      setCurrentPage(id);
    };
  const nextPage=()=>
    {
      if(currentPage!==lastIndex)
        setCurrentPage(currentPage+1);
    };
    // const handleEdit = (product: Product) => {
    //   const productData = encodeURIComponent(JSON.stringify(product));
    //   // router.push(`/edit/${product.productID}?data=${productData}`);
    //   router.push(`/edit/${product.productID}`);
    // };

  return (
    <div className='flex flex-col min-w-full max-w-full w-full h-auto bg-white p-5'>
      <div className="flex flex-row w-full min-w-full max-w-full h-auto mb-5 font-bold text-xl leading-6 text-[#2B3674]">
        Products <span className='font-normal '>({Products.length})</span>
      </div>
      <div className="flex flex-row w-full min-w-full max-w-full h-auto ">

        <table id='productsTable' className="table min-w-full max-w-full w-full h-auto  border-gray-200 text-center  ">
          <thead className="table-header-group border-b-[1.62px] border-[#ECECEC]">
            <tr className='flex-wrap'>
              <th className="py-2 px-4 border-b">Product</th>
              <th className="py-2 px-4 border-b">SKU</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              {/* <th className="py-2 px-4 border-b">Description</th> */}
              <th className="py-2 px-4 border-b">Stock</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Discounted Price</th>
              <th className="py-2 px-4 border-b">Discount %</th>
              <th className="py-2 px-4 border-b">Actions</th>
              
            </tr>
          </thead>
          <tbody className='table-row-group'>
            {records.map((product, index) => (
              <tr key={index} className="text-center flex-wrap">
                <td className="py-2 px-4 border-b text-center mx-auto">
                  <Image 
                  src={product.images[0].src ? product.images[0].src : ""} 
                  alt={product.images[0].alt ? product.images[0].alt : "No image available"} 
                  width={32} height={32} />
                </td>
                <td className="py-2 px-4 border-b text-center">{product.sku}</td>
                <td className="py-2 px-4 border-b text-center">{product.name}</td>
                <td className="py-2 px-4 border-b text-center">{product.quantity}</td>
                <td className="py-2 px-4 border-b text-center">{product.price}</td>
                <td className="py-2 px-4 border-b text-center">{product.price - ((product.discount? product.discount: 0) * product.price/100)}</td>
                <td className="py-2 px-4 border-b text-center">{product.discount? product.discount: 0}</td>
                
                <td className="py-2 px-4 border-b ">
                  <div className="flex">
                    <Link href={`/seller/products/edit/product/${product._id}`}>
                      <button className="bg-[#806491] text-white hover:bg-[#604b6d] py-[9.52px] px-[15.23px] rounded-[7.62px] text-[13.33px] font-semibold leading-5 inline-block">
                          Edit
                      </button>
                    </Link>
                    <div className="w-2"></div>
                    <button className="bg-[#806491] text-white hover:bg-[#604b6d] py-[9.52px] px-[15.23px] rounded-[7.62px] text-[13.33px] font-semibold leading-5 inline-block" onClick={() => openModal(product._id)}>
                        Delete
                    </button>
                    

                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <div className="flex flex-row justify-end min-w-full max-w-full w-full h-auto">
            {/* dropdown */}
        {/* <div className="flex flex-col">
              <div className="flex flex-row"></div>
              <div className="flex flex-row">
                <div className="flex flex-col">
                  <div className="flex flex-row">
                    
                  </div>
                </div>
              </div>
        </div> */}

          {/* pagination */}
        {/* <div className="flex"> */}

        <ul className="pagination flex mt-5">
            <li className="page-item mx-1">
              <a href="#productsTable" className={`page-link px-1 py-2 border border-[#dee2e6] ${isFirstPage ? 'pointer-events-none text-[#6c757d] cursor-not-allowed':''} font-medium text-base items-center bg-white`} onClick={(e)=>{
                if (isFirstPage) {
                  e.preventDefault(); // Prevent action if disabled
                } else {
                  prevPage();
                }
              }}>
                Prev
              </a>
            </li>

              {numbers.map((num,index)=>(
                <li key={index} className={`page-item ${currentPage=== num ? 'active':''} active:bg-[#007bff] active:text-white  active:border-[#dee2e6]`}>
                  <a href="#productsTable" className='page-link px-2 py-2 border border-[#dee2e6] font-medium text-base items-center bg-white ' onClick={()=>changeCurrentPage(num)} >
                    {num}
                    </a>
                </li>  
              ))}

            <li className="page-item mx-1">
              <a href="#productsTable" className={`page-link px-1 py-2 border border-[#dee2e6] ${isLastPage ? 'pointer-events-none text-[#6c757d] cursor-not-allowed':''} font-medium text-base items-center bg-white`} onClick={(e)=>{
                if(isLastPage)
                  e.preventDefault();
                else
                  nextPage();
              }}>
                Next
              </a>
            </li>
          </ul>

        {/* </div> */}
      </div>
      <DeleteProductDialogBox
        show={showModal}
        onClose={closeModal}
        onConfirm={confirmDelete}
      />
    </div>

  );
};

export default ProductsTable;
