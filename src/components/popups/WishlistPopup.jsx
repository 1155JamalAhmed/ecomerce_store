import React from "react";
import styles from "../../styles/styles";
import WishlistItem from "../helpers/WishlistItem";
import { AiOutlineHeart } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { CloseButton } from "../ui/Button";
import Backdrop from "../ui/Backdrop";
import { createPortal } from "react-dom";

const cartsData = [
  {
    name: "Iphone 14 pro max, 256gb ssd, and 8gb of ram",
    description: "test",
    price: 999,
  },
  {
    name: "Iphone 14 pro max, 256gb ssd, and 8gb of ram",
    description: "test",
    price: 289,
  },
  {
    name: "Iphone 14 pro max, 256gb ssd, and 8gb of ram",
    description: "test",
    price: 245,
  },
];

const WishlistPopup = ({ setOpenWishlist, isOpen }) => {
  return createPortal(
    <div className="z-[60] relative">
      <AnimatePresence>
        {isOpen && (
          <Backdrop>
            <motion.div
              initial={{ opacity: 0, x: "5%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "5%" }}
              transition={{ duration: 0.5 }}
              className="fixed top-0 right-0 min-h-full w-full sm:w-[60vw] 800px:w-[40vw] bg-white flex flex-col justify-between shadow-lg"
            >
              <div>
                <CloseButton
                  setOpen={setOpenWishlist}
                  contClasses={"pt-5 pr-5"}
                />
                {/* Items length */}
                <div className={`${styles.normalFlex} p-4`}>
                  <AiOutlineHeart size={25} />
                  <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
                </div>

                {/* Cart items */}
                <div className="w-full border-t">
                  {cartsData &&
                    cartsData.map((cart, index) => (
                      <WishlistItem key={index} wishItem={cart} />
                    ))}
                </div>
              </div>
            </motion.div>
          </Backdrop>
        )}
      </AnimatePresence>
    </div>,
    document.getElementById("portal")
  );
};

export default WishlistPopup;
