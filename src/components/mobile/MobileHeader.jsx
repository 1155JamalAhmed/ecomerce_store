import React, { useState } from "react";
import CartPopup from "../popups/CartPopup.jsx";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { BiMenuAltLeft } from "react-icons/bi";
import MobileHeaderDrawer from "../mobile/MobileHeaderDrawer";
import styles from "../../styles/styles.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const MobileHeader = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openMobileDrawer, setOpenMobileDrawer] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="w-full h-[70px] sticky bg-[#fff] z-50 top-[0px] left-0 shadow-sm 800px:hidden">
      {/* Header for mobile screens */}
      <div className="w-full h-full flex items-center justify-between">
        <div onClick={() => setOpenMobileDrawer(true)}>
          <BiMenuAltLeft size={40} className="ml-4 cursor-pointer" />
        </div>
        <div
          className="flex items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-online-shopping-shopping-and-ecommerce-itim2101-lineal-color-itim2101-4.png"
            alt=""
            className="w-[60px] h-[60px] object-cover"
          />
          <h1 className={`${styles.heading} !pb-0 pl-3`}>E-Store</h1>
        </div>
        {/* Shopping cart icon */}
        <div
          className="relative cursor-pointer mr-4"
          onClick={() => setOpenCart(true)}
        >
          <AiOutlineShoppingCart size={40} color="rgba(0 0 0 / 83%)" />
          <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
            {cartItems.length}
          </span>
          {/* cart popup */}
          <CartPopup setOpenCart={setOpenCart} isOpen={openCart} />
        </div>
      </div>
      {/* Mobile Header sidebar */}
      <MobileHeaderDrawer
        openMobileDrawer={openMobileDrawer}
        setOpenMobileDrawer={setOpenMobileDrawer}
      />
    </div>
  );
};

export default MobileHeader;
