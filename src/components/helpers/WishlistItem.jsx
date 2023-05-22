import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";

const WishlistItem = ({ wishItem }) => {
  const totalPrice = wishItem.price;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center relative">
        <RxCross1 className="cursor-pointer" size={25}/>
        <div>
          <img
            src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
            alt=""
            className="w-[8 0px] h-[80px] ml-2"
          />
        </div>
        <div className="pl-[5px]">
          <h1>{wishItem.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <BsCartPlus size={28} className="cursor-pointer" title="Add to cart" />
      </div>
    </div>
  );
};

export default WishlistItem;
