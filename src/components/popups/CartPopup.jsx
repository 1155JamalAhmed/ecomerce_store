import React from "react";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import CartItem from "../helpers/CartItem";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { CloseButton } from "../ui/Button";
import Backdrop from "../ui/Backdrop";
import { useSelector } from "react-redux";

const CartPopup = ({ setOpenCart, isOpen }) => {
  const { cartItems, cartItemsIsLoading, cartItemsError, grandTotal } =
    useSelector((state) => state.cart);

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop>
          <motion.div
            key="cartPopup"
            initial={{ opacity: 0, x: "10px" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "10px" }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 right-0 min-h-full w-full sm:w-[60vw] 800px:w-[40vw] bg-white flex flex-col justify-between shadow-lg"
          >
            <div>
              <CloseButton setOpen={setOpenCart} contClasses={"pt-5 pr-5"} />
              {/* Items length */}
              <div className={`${styles.normalFlex} p-4`}>
                <IoBagHandleOutline size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {cartItems.length} items
                </h5>
              </div>

              {/* Cart items */}
              <div className="w-full border-t">
                {!cartItemsIsLoading &&
                  cartItems &&
                  cartItems.map((item) => (
                    <CartItem key={item._id} item={item} />
                  ))}
                {cartItemsError && !cartItemsIsLoading && (
                  <h1 className={`${styles.error}`}>{cartItemsError}</h1>
                )}
              </div>
            </div>
            <div className="px-5 mb-3">
              {/* checkout buttons */}
              <Link to="/users/checkout/enter-shipping-info">
                <div
                  className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
                >
                  <h1 className="text-white text-[18px] font-[600]">
                    Checkout Now (USD${grandTotal})
                  </h1>
                </div>
              </Link>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default CartPopup;
