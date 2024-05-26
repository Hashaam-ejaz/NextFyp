import React from 'react';

interface ModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const DeleteProductDialogBox: React.FC<ModalProps> = ({ show, onClose, onConfirm }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow-lg max-w-sm w-full">
        <h2 className="text-xl mb-4">Confirm Delete</h2>
        <p className="mb-4">Are you sure you want to delete this product?</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProductDialogBox;