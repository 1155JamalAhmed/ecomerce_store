import React from "react";
import styles from "../../styles/styles";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

import Navbar from "./Navbar";
import SearchInput from "../forms/SearchInput";
import MobileHeader from "../mobile/MobileHeader";

const Header = ({ activeHeading }) => {
  return (
    <>
      {/* The main search bar for width > 800px */}
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
            <SearchInput />
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

      {/* Navbar for width > 800px */}
      <Navbar activeHeading={activeHeading} />

      {/* Header for mobile screen only visible for devices width < 800px*/}
      <MobileHeader />
    </>
  );
};

export default Header;
