// import React, { useState } from 'react'
// import {Product} from '../../../providers/interfaces/product'

// interface ProductTableProps {
//     products: Product[];
//     deleteProduct: (id: number) => void;
//   }

// const DeleteBtn = () => {
//     const [showModal, setShowModal] = useState(false);
//   const [productIdToDelete, setProductIdToDelete] = useState<number | null>(null);

//   const openModal = (productId: number) => {
//     setProductIdToDelete(productId);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setProductIdToDelete(null);
//   };

//   const confirmDelete = () => {
//     if (productIdToDelete !== null) {
//       deleteProduct(productIdToDelete);
//       closeModal();
//     }
//   };
//   return (
//     <>
//     <button className="bg-[#806491] text-white hover:bg-[#604b6d] py-[9.52px] px-[15.23px] rounded-[7.62px] text-[13.33px] font-semibold leading-5 inline-block" onClick={() => openModal(product.id)}>
//         Delete
//     </button>
//     </>
//   )
// }

// export default DeleteBtn