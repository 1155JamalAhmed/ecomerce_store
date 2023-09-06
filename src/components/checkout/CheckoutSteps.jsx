import React from "react";

const CheckoutSteps = ({ active }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className={`py-2 px-4 rounded-full bg-[#f5b6c3] text-[14px] text-[crimson]  ${
          (active === 1 || active === 2 || active === 3) &&
          "!bg-[crimson] text-white font-bold"
        }`}
      >
        1.Shipping
      </div>
      <div
        className={`w-[4rem] h-[2px] bg-[#f5b6c3] ${
          (active === 2 || active === 3) && "!bg-[crimson]"
        }`}
      ></div>
      <div
        className={`py-2 px-4 rounded-full bg-[#f5b6c3] text-[14px] text-[crimson] ${
          (active === 2 || active === 3) && "!bg-[crimson] text-white font-bold"
        }`}
      >
        2.Payment
      </div>
      <div
        className={`w-[4rem] h-[2px] bg-[#f5b6c3] ${
          active === 3 && "!bg-[crimson]"
        }`}
      ></div>
      <div
        className={`py-2 px-4 rounded-full bg-[#f5b6c3] text-[14px] text-[crimson] ${
          active === 3 && "!bg-[crimson] text-white font-bold"
        }`}
      >
        3.Success
      </div>
    </div>
  );
};

export default CheckoutSteps;
