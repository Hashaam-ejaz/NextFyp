'use client';
import { FC, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import Orders from '../../../../../providers/orders.json'
import { IOrder } from '../../../../../models/orders'

interface PieChartProps {
  Orders: IOrder[];
}

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart: React.FC<PieChartProps> = ({Orders}) => {


  useEffect(()=>{
    if(!Orders) return;
    // console.log('Orders in PieChart',Orders)
  }
  ,[Orders]);
    const fulfilledOrders=(Orders.filter(o=>(o.orderStatus==='shipped'))).length;
    const ongoingOrders=(Orders.filter(o=>(o.orderStatus==='unshipped'))).length;
    const cancelledOrders=(Orders.filter(o=>(o.orderStatus==='cancelled'))).length;
    const returnedOrders=(Orders.filter(o=>(o.orderStatus==='returned'))).length;
  const data = {
    labels: ['Fulfilled', 'Ongoing', 'Cancelled','Returned'],
    datasets: [
      {
        label: '# of Orders',
        data: [fulfilledOrders, ongoingOrders, cancelledOrders,returnedOrders],
        backgroundColor: ['#2779E2', '#5AA0FF', '#8DBBF9','#B1D4FC'],
        borderColor: ['#2779E2', '#5AA0FF', '#8DBBF9','#B1D4FC'],
        borderWidth: 1,
      },
    ],
  };
  // const options:ChartOptions<'pie'>={
  //   plugins: {
  //     legend: {
  //       display: true,
  //       position: 'right',
  //       labels: {
  //         color: '#333',
  //         usePointStyle: true,
  //         pointStyle: 'circle',
  //         padding: 20,
  //       },
  //     },
  //     tooltip: {
  //       callbacks: {
  //         label: function(context: any) {
  //           const label = context.label || '';
  //           const value = context.raw || 0;
  //           return `${label}: ${value}%`;
  //         }
  //       }
  //     }
  //   };

  return (
    <>
     {/* <div className="flex flex-row items-center justify-center"> */}
     {/* <div className="flex flex-col"> */}
      {/* <div className="w-52 h-52"> */}
        <Pie data={data} />
      {/* </div> */}
      {/* <div className="flex flex-col">
        <div className="flex flex-row items-center">
          <span className="w-4 h-4 mr-2 rounded bg-[#2779E2]"></span> Fulfilled
        </div>
        <div className="flex flex-row items-center">
          <span className="w-4 h-4 mr-2 rounded bg-[#5AA0FF]"></span> Ongoing
        </div>
        <div className="flex flex-row items-center">
          <span className="w-4 h-4 mr-2 rounded bg-[#8DBBF9]"></span> Cancelled
        </div>
      </div>   */}
    {/* </div> */}
      </>
  );
};

export default PieChart;
