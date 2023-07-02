import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AiOutlineHeart } from "react-icons/ai";
import WishlistPopup from "../popups/WishlistPopup";
import { CloseButton } from "../ui/Button";
import SearchInput from "../forms/SearchInput";
import Backdrop from "../ui/Backdrop";

const MobileHeaderDrawer = ({ openMobileDrawer, setOpenMobileDrawer }) => {
  const [openWishlist, setOpenWishlist] = useState(false);

  return (
    <AnimatePresence>
      {openMobileDrawer && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, x: "-50px" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="fixed w-full sm:w-[60vw] 800px:w-[40vw] bg-[#fff] h-screen top-0 left-0 z-10">
              <div className="w-full flex justify-between items-center pt-4 px-2">
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
              <div className="relative my-8 w-[92%] m-auto h-[40px]">
                <SearchInput />
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default MobileHeaderDrawer;
