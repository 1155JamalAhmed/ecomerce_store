import React from "react";
import useActiveTab from "../../hooks/useActiveTab";
import { useNavigate } from "react-router-dom";

const activeTabMapping = {
  "/users/checkout/enter-shipping-info": 1,
  "/users/checkout/enter-payment-info": 2,
  "/users/orders/:id/created": 3,
};

const CheckoutSteps = () => {
  const active = useActiveTab(activeTabMapping);
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center">
      <div
        className={`py-2 px-4 rounded-full bg-[#f5b6c3] text-[14px] text-[crimson] cursor-pointer ${
          (active === 1 || active === 2 || active === 3) &&
          "!bg-[crimson] text-white font-bold"
        }`}
        onClick={() => navigate("/users/checkout/enter-shipping-info")}
      >
        1.Shipping
      </div>
      <div
        className={`w-[4rem] h-[2px] bg-[#f5b6c3] ${
          (active === 2 || active === 3) && "!bg-[crimson]"
        }`}
      ></div>
      <div
        className={`py-2 px-4 rounded-full bg-[#f5b6c3] text-[14px] text-[crimson] cursor-pointer ${
          (active === 2 || active === 3) && "!bg-[crimson] text-white font-bold"
        }`}
        onClick={() => navigate("/users/checkout/enter-payment-info")}
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
