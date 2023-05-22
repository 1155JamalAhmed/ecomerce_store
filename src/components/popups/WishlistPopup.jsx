import React from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import WishlistItem from "../helpers/WishlistItem";
import { AiOutlineHeart } from "react-icons/ai";

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

const WishlistPopup = ({ setOpenWishlist }) => {
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
                setOpenWishlist(false);
              }}
            />
          </div>
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
      </div>
    </div>
  );
};

export default WishlistPopup;
