import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistPopup from "../popups/WishlistPopup";
import { CloseButton } from "../ui/Button";
import Backdrop from "../ui/Backdrop";
import Navigation from "../layout/Navigation";
import Button from "@mui/material/Button";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { backend_url } from "../../server";
import MobileProductSearch from "./MobileProductSearch";

const MobileHeaderDrawer = ({ openMobileDrawer, setOpenMobileDrawer }) => {
  const [openWishlist, setOpenWishlist] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isShopAuthenticated } = useSelector((state) => state.shop);

  return (
    <>
      <AnimatePresence>{openMobileDrawer && <Backdrop />}</AnimatePresence>
      {/* Dirty dom but we need to preserve whatever has been searched by user */}
      <div
        className={`fixed w-full  400px:w-[55vw] 800px:hidden bg-[#fff] h-screen top-0 transform ${
          openMobileDrawer ? ` translate-x-[0px]` : ` translate-x-[-100%]`
        } z-50 transition duration-500 px-4`}
      >
        <div className="w-full flex justify-between items-center pt-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setOpenWishlist(true)}
          >
            <AiOutlineHeart size={30} color="rgba(0 0 0 / 83%)" />
            <span className="absolute right-0 top-0 rounded-full bg-[#3bc177] w-4 h-4 p-0 m-0 text-white font-mono text-[12px] leading-tight flex justify-center">
              8
            </span>

            <WishlistPopup
              setOpenWishlist={setOpenWishlist}
              isOpen={openWishlist}
            />
          </div>
          <CloseButton setOpen={setOpenMobileDrawer} />
        </div>

        {/* Mobile SEARCH BOX */}

        <div className="relative my-8 w-[100%] m-auto h-[40px]">
          <MobileProductSearch
            closeMobileHeaderDrawer={() => setOpenMobileDrawer(false)}
          />
        </div>

        <Navigation />
        <div className="flex flex-col items-center">
          <div className="mb-3 mt-8">
            {isAuthenticated ? (
              <div className="flex items-center">
                <Link to="/profile">
                  <img
                    src={`${backend_url}/${user.avatarImage}`}
                    alt=""
                    className="w-[60px] h-[60px] rounded-full border-black border-2 object-cover"
                  />
                </Link>
                <div className="ml-2">
                  <Link to="/profile">
                    <h1 className="text-xl font-semibold ">{user.name}</h1>
                    See profile
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-[18px] pr-[10px] text-[#000000b7]"
                >
                  Login /
                </Link>
                <Link
                  to="/sign-up"
                  className="text-[18px] pr-[10px] text-[#000000b7]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
          <Button
            endIcon={<IoIosArrowForward size={20} />}
            variant="contained"
            size="large"
            style={{
              backgroundColor: "black",
              color: "white",
              padding: "12px 14px",
              fontSize: "14px",
            }}
          >
            {isShopAuthenticated ? (
              <Link to={`/shops/dashboard`}>Shop Dashboard</Link>
            ) : (
              <Link to="/shops/create-shop">Create Shop</Link>
            )}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MobileHeaderDrawer;
