import React from "react";

const ProductDetailsTable = ({ product }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
              Weight
            </td>
            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
              {" "}
              {/* Reduced px value */}
              {product.weight}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
              SKU
            </td>
            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
              {" "}
              {/* Reduced px value */}
              {product.sku}
            </td>
          </tr>
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-500">
              Category
            </td>
            <td className="px-2 py-2 whitespace-nowrap text-sm text-gray-500">
              {" "}
              {/* Reduced px value */}
              {product.category}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailsTable;
