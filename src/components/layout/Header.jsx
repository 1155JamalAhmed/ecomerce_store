import React from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";
import { useMediaQuery } from "react-responsive";

import Navbar from "./Navbar";
import SearchInput from "../forms/SearchInput";
import MobileHeader from "../mobile/MobileHeader";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";

const Header = () => {
  const { isShopAuthenticated } = useSelector((state) => state.shop);
  const navigate = useNavigate();

  const desktopView = useMediaQuery({
    query: `(min-width: 800px)`,
  });

  return (
    <>
      {/* The main search bar for width > 800px */}
      {desktopView && (
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
                <SearchInput />
              </div>

              {/* BECOME SELLER */}
              <Button
                endIcon={<IoIosArrowForward size={20} />}
                variant="contained"
                size="large"
                color="tertiary"
                onClick={() => {
                  isShopAuthenticated
                    ? navigate("/shops/dashboard")
                    : navigate("/shops/create-shop");
                }}
              >
                {`${isShopAuthenticated ? "Shop Dashboard" : "Create Shop"}`}
              </Button>
            </div>
          </div>
          {/* Navbar for width > 800px */}
          <Navbar />
        </>
      )}

      {/* Header for mobile screen only visible for devices width < 800px*/}
      {!desktopView && <MobileHeader />}
    </>
  );
};

export default Header;
