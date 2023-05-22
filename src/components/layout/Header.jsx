import React, { useState } from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import DropDown from "./DropDown";
import Navbar from "./Navbar";
import CartPopup from "../popups/CartPopup.jsx";

import { categoriesData, productData } from "../../static/data";
import { backend_url } from "../../server";

import {
  AiOutlineHeart,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import WishlistPopup from "../popups/WishlistPopup";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [dropDown, setDropDown] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productData &&
      productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
    setSearchData(filteredProducts);

    if (term.length === 0) {
      setSearchData(null);
    }
  };

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden 800px:h-[50px] 800px:my-[20px] 800px:flex items-center justify-between">
          {/* STORE ICON */}
          <div>
            <Link to="/">
              <img
                src="https://img.icons8.com/external-itim2101-lineal-color-itim2101/64/null/external-online-shopping-shopping-and-ecommerce-itim2101-lineal-color-itim2101-4.png"
                alt="shopping icon"
              />
            </Link>
          </div>
          {/* SEARCH BOX */}
          <div className="w-[50%] relative">
            <input
              type="text"
              placeholder="Search Product..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full h-[40px] rounded-md px-2 placeholder-gray-300 border-2 focus:border-blue-500 
            "
            />
            <AiOutlineSearch
              size={30}
              className="absolute top-1.5 right-2 cursor-pointer"
            />
            {searchData && searchData.length !== 0 && (
              <div className="absolute min-h-[30vh] max-h-[70vh] bg-slate-50 shadow-sm-2 z-[9] py-4 top-11 overflow-y-auto w-full">
                {searchData.map((item, index) => {
                  const Product_name = item.name.replace(/\s+/g, "-");
                  return (
                    <Link to={`/products/${Product_name}`}>
                      <div className="flex py-2 hover:bg-slate-200 px-4">
                        <img
                          src={item.image_Url[0].url}
                          alt=""
                          className="w-[40px] h-[40px] mr-[10px]"
                        />
                        <h1>{item.name}</h1>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
          {/* BECOME SELLER */}
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-white flex items-center">
                Become Seller <IoIosArrowForward className="ml-1" />
              </h1>
            </Link>
          </div>
        </div>
      </div>
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
            <Navbar active={activeHeading} />
          </div>

          <div className={`${styles.normalFlex}`}>
            {/* LOVEDITEMS */}
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenWishlist(true)}
            >
              <AiOutlineHeart size={30} color="rgba(255 255 255 / 83%)" />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
                8
              </span>
              {openWishlist && (
                <WishlistPopup setOpenWishlist={setOpenWishlist} />
              )}
            </div>

            {/* Shopping cart icon */}
            <div
              className="relative cursor-pointer mr-[15px]"
              onClick={() => setOpenCart(true)}
            >
              <AiOutlineShoppingCart
                size={30}
                color="rgba(255 255 255 / 83%)"
              />
              <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
                0
              </span>
              {/* cart popup */}
              {openCart && <CartPopup setOpenCart={setOpenCart} />}
            </div>

            {/* USER PROFILE */}
            <div className="cursor-pointer">
              {isAuthenticated ? (
                <Link to="/profile">
                  <img
                    src={`${backend_url}/${user.avatarImage}`}
                    alt=""
                    className="w-[35px] h-[35px] rounded-full"
                  />
                </Link>
              ) : (
                <Link to="/login">
                  <CgProfile size={30} color="rgba(255 255 255 / 83%)" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
