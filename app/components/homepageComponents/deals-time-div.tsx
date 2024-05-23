// const DealsTimeDiv = () => {
//   const date = new Date();
//   return (
//     <>
//       <div className="flex flex-row w-full">
//         <div className="flex flex-col">
//           <div className="flex flex-row text-xl font-semibold text-[#1C1C1C] md:w-full ">
//             Deals and offers
//           </div>
//           <div className="flex flex-row text-[#8B96A5] ">Cool Equipments</div>
//         </div>
//       </div>
//       <div className="flex flex-row w-1/2 md:w-full mt-[18px]">
//         <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
//           <div className="flex flex-row font-bold text-base">04</div>
//           <div className="flex flex-row text-xs">Days</div>
//         </div>
//         <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%] ">
//           <div className="flex flex-row font-bold text-base">04</div>
//           <div className="flex flex-row text-xs">Hour</div>
//         </div>
//         <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
//           <div className="flex flex-row font-bold text-base">13</div>
//           <div className="flex flex-row text-xs ">Min</div>
//         </div>
//         <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
//           <div className="flex flex-row font-bold text-base">56</div>
//           <div className="flex flex-row text-xs ">Sec</div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DealsTimeDiv;
import React, { useState, useEffect } from "react";

const DealsTimeDiv = ({
  initialDays,
  initialHours,
  initialMinutes,
}: {
  initialDays: number;
  initialHours: number;
  initialMinutes: number;
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: initialDays,
    hours: initialHours,
    minutes: initialMinutes,
    seconds: 0,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimeLeft((prevTime) => {
        let { days, hours, minutes, seconds } = prevTime;

        if (seconds > 0) {
          seconds -= 1;
        } else if (minutes > 0) {
          minutes -= 1;
          seconds = 59;
        } else if (hours > 0) {
          hours -= 1;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days -= 1;
          hours = 23;
          minutes = 59;
          seconds = 59;
        } else {
          clearInterval(countdown);
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex flex-col">
          <div className="flex flex-row text-xl font-semibold text-[#1C1C1C] md:w-full">
            Deals and offers
          </div>
          <div className="flex flex-row text-[#8B96A5]">Cool Equipments</div>
        </div>
      </div>
      <div className="flex flex-row w-1/2 md:w-full mt-[18px]">
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">
            {String(timeLeft.days).padStart(2, "0")}
          </div>
          <div className="flex flex-row text-xs">Days</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">
            {String(timeLeft.hours).padStart(2, "0")}
          </div>
          <div className="flex flex-row text-xs">Hours</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">
            {String(timeLeft.minutes).padStart(2, "0")}
          </div>
          <div className="flex flex-row text-xs">Mins</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">
            {String(timeLeft.seconds).padStart(2, "0")}
          </div>
          <div className="flex flex-row text-xs">Sec</div>
        </div>
      </div>
    </>
  );
};

export default DealsTimeDiv;
