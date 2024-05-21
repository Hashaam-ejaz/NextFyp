const DealsTimeDiv = () => {
  const date = new Date();
  return (
    <>
      <div className="flex flex-row w-full">
        <div className="flex flex-col">
          <div className="flex flex-row text-xl font-semibold text-[#1C1C1C] md:w-full ">
            Deals and offers
          </div>
          <div className="flex flex-row text-[#8B96A5] ">Cool Equipments</div>
        </div>
      </div>
      <div className="flex flex-row w-1/2 md:w-full mt-[18px]">
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">04</div>
          <div className="flex flex-row text-xs">Days</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%] ">
          <div className="flex flex-row font-bold text-base">04</div>
          <div className="flex flex-row text-xs">Hour</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">13</div>
          <div className="flex flex-row text-xs ">Min</div>
        </div>
        <div className="flex flex-col bg-[#806491] p-[7.5px] text-white rounded-[4px] items-center ml-[5px] min-w-[22.5%] max-w-[22.5%] md:min-w-[22%] md:max-w-[22%]">
          <div className="flex flex-row font-bold text-base">56</div>
          <div className="flex flex-row text-xs ">Sec</div>
        </div>
      </div>
    </>
  );
};

export default DealsTimeDiv;
