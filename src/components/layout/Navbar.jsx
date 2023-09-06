import React, { useState } from "react";
import Navigation from "./Navigation";
import styles from "../../styles/styles";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "./DropDown";
import { CgProfile } from "react-icons/cg";

import { categoriesData } from "../../static/data";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import WishlistPopup from "../popups/WishlistPopup";
import CartPopup from "../popups/CartPopup";
import { BiMenuAltLeft } from "react-icons/bi";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const { wlItems } = useSelector((state) => state.wishlist);

  return (
    <div className="sticky top-[0px] z-[1] transition hidden 800px:flex items-center justify-between w-full bg-[#3321c8] h-[70px]">
      <div
        className={`${styles.section} relative ${styles.normalFlex} justify-between`}
      >
        {/* CATEGORIES */}
        <div className="cursor-pointer relative">
          <div
            className=" h-[60px] mt-[10px] w-[270px] hidden 1000px:flex items-center bg-white rounded-t-lg px-2"
            onClick={() => setDropDown((prevState) => !prevState)}
          >
            <BiMenuAltLeft size={30} className="" />
            <button className="font-[500]  font-sans text-lg select-none">
              All Categories
            </button>
            <IoIosArrowDown size={20} className="ml-auto" />
          </div>
          {dropDown && (
            <DropDown
              categoriesData={categoriesData}
              setDropDown={setDropDown}
            />
          )}
        </div>

        {/* NAVITEMS */}
        <div className={`${styles.normalFlex}`}>
          <Navigation />
        </div>

        <div className={`${styles.normalFlex}`}>
          {/* LOVEDITEMS */}
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenWishlist(true)}
          >
            <AiOutlineHeart size={30} color="rgba(255 255 255 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
              {wlItems.length}
            </span>

            <WishlistPopup
              setOpenWishlist={setOpenWishlist}
              isOpen={openWishlist}
            />
          </div>

          {/* Shopping cart icon */}
          <div
            className="relative cursor-pointer mr-[15px]"
            onClick={() => setOpenCart(true)}
          >
            <AiOutlineShoppingCart size={30} color="rgba(255 255 255 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
              {cartItems.length}
            </span>
            {/* cart popup */}
            <CartPopup setOpenCart={setOpenCart} isOpen={openCart} />
          </div>

          {/* USER PROFILE */}
          <div className="cursor-pointer">
            {isAuthenticated ? (
              <Link to="/users/profile">
                <img
                  src={`${backend_url}/${user.avatarImage}`}
                  alt=""
                  className="w-[35px] h-[35px] rounded-full"
                />
              </Link>
            ) : (
              <Link to="/users/login">
                <CgProfile size={30} color="rgba(255 255 255 / 83%)" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
