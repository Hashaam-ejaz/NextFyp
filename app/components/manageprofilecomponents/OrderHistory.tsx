import React from 'react';

interface OrderProduct {
  id: number;
  name: string;
  href: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
}

interface Order {
  number: string;
  date: string;
  datetime: string;
  products: OrderProduct[];
}

interface OrderHistoryProps {
  orders: Order[];
}

const OrderHistory: React.FC<OrderHistoryProps> = ({ orders }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6 lg:px-8 lg:pb-24">
        <div className="mt-1">
          <div className="space-y-20">
            {orders.map((order) => (
              <div key={order.number}>
                {order.products.map((product) => (
                  <div key={product.id}>
                    <table className="w-full text-gray-500 sm:mt-6">
                      <caption className="sr-only">Products</caption>
                      <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                        <tr>
                          <th scope="col" className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3">
                            Product
                          </th>
                          <th scope="col" className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell">
                            Price
                          </th>
                          <th scope="col" className="hidden py-3 pr-8 font-normal sm:table-cell">
                            Status
                          </th>
                        </tr>
                      </thead>
                    
                      <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                        <tr key={product.id}>
                          <td className="py-6 pr-8">
                            <div className="flex items-center">
                              <img
                                src={product.imageSrc}
                                alt={product.imageAlt}
                                className="mr-6 h-16 w-16 rounded object-cover object-center"
                              />
                              <div>
                                <div className="font-medium text-gray-900">{product.name}</div>
                                <div className="text-gray-500 text-sm text-[#806491]">
                                  <span className="font-medium">Date Placed:</span> {order.date}
                                </div>
                                <div className="text-gray-500 text-sm">
                                  <span className="font-medium">Order Number:</span> {order.number}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="hidden py-6 pr-8 sm:table-cell">{product.price}</td>
                          <td className="hidden py-6 pr-8 sm:table-cell">Delivered</td>
                          <td className="whitespace-nowrap py-6 text-right font-medium">
                            <a href={product.href} className="text-[#806491] border border-[#806491] hover:bg-[#806491] hover:text-white h-[1.5rem] py-3 px-4 rounded-[0.278rem] sm:ml-3">
                              Review<span className="hidden lg:inline"> Product</span>
                              <span className="sr-only">, {product.name}</span>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                      
                    </table>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;