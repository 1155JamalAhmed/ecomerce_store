import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import styles from "../../styles/styles";
import CartItem from "../helpers/CartItem";
import { Link } from "react-router-dom";

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

const CartPopup = ({ setOpenCart }) => {
  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-lg">
        <div>
          <div className="w-full text-right pt-5 pr-5 ">
            <RxCross1
              size={40}
              className="cursor-pointer inline-block hover:scale-110 hover:text-[red] hover:bg-gray-100 p-2 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setOpenCart(false);
              }}
            />
          </div>
          {/* Items length */}
          <div className={`${styles.normalFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
          </div>

          {/* Cart items */}
          <div className="w-full border-t">
            {cartsData &&
              cartsData.map((cart, index) => (
                <CartItem key={index} cart={cart} />
              ))}
          </div>
        </div>
        <div className="px-5 mb-3">
          {/* checkout buttons */}
          <Link to="/checkout">
            <div
              className={`h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px]`}
            >
              <h1 className="text-white text-[18px] font-[600]">
                Checkout Now (USD$1080)
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
