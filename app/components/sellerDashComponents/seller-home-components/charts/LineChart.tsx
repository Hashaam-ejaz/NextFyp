'use client';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';
import { IOrder } from '../../../../../models/orders'
import { Types } from 'mongoose'

interface LineChartProps {
  userID: string;
}
interface IProduct {
  productID: Types.ObjectId;
  productName: string;
  productImage: string;
  productPrice: number;
  quantity: number;
  subtotal: number;
}


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const LineChart: React.FC<LineChartProps> = ({userID}) => {
  const { data: session, status } = useSession();
  const [userOrders, setUserOrders] = useState<IOrder[]>();
  const currentDate = new Date();
  const currentMonthIndex = currentDate.getMonth();
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const labelsVar = monthNames.slice(0, currentMonthIndex+1);
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
const [monthlySales, setMonthlySales] = useState(Array(currentMonth + 1).fill(0));
useEffect(()=>
  {
    const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/orders/${userID}`);
      const data = await response.json();

      const fetchedOrders: IOrder[] = data.orders;
      setUserOrders(fetchedOrders);
      calculateMonthlySales(fetchedOrders);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  }
  const calculateMonthlySales = (orders: IOrder[]) => {
    const sales = Array(currentMonthIndex + 1).fill(0);
    orders.forEach((order: IOrder) => {
      const itemYear = new Date(order.date).getFullYear();
      const itemMonth = new Date(order.date).getMonth();
      if (itemYear === currentYear) {
        order.products.forEach((product: IProduct) => {
          sales[itemMonth] += product.quantity;
        });
      }
    });
    setMonthlySales(sales);
  };
  if(userID){
    fetchData();
  }
  },[userID, currentYear, currentMonth]);

  // useEffect(() => {
  //   console.log('monthly sales', monthlySales);
  // }, [monthlySales]);


  const data = {

    labels: labelsVar,
    datasets: [
      {
        label: 'Sales',
        data: monthlySales,
        borderColor: '#4CAF50',
        backgroundColor: '#4CAF50',
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: string | number) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;
            return Number.isInteger(numericValue) ? numericValue : null;
          },
          stepSize: 5, 
        },
      },
    },
  };

  return <Line className='w-full max-w-full min-w-full h-auto' data={data} options={options} />;
};

export default LineChart;
