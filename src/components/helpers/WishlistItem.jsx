import React from "react";
import { RxCross1 } from "react-icons/rx";
import { BsCartPlus } from "react-icons/bs";
import { backend_url } from "../../server";
import {
  fromWishlistToCart,
  removeItemFromWishlist,
} from "../../redux/actions/wishlistActions";
import store from "../../redux/store";

const WishlistItem = ({ wishItem }) => {
  const product = wishItem.product;

  const removeItemFromWishlistHandler = async () => {
    await store.dispatch(removeItemFromWishlist(wishItem._id));
  };

  const fromWishlistToCartHandler = async () => {
    await store.dispatch(fromWishlistToCart(wishItem._id));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center relative">
        <RxCross1
          className="cursor-pointer"
          size={25}
          onClick={removeItemFromWishlistHandler}
        />
        <div>
          <img
            src={`${backend_url}/${product.images[0]}`}
            alt=""
            className="w-[80px] h-[80px] ml-2"
          />
        </div>
        <div className="pl-[5px]">
          <h1>{product.name}</h1>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US ${product.discountPrice}
          </h4>
        </div>
        <div className="ml-auto">
          <BsCartPlus
            size={28}
            className="cursor-pointer"
            title="Add to cart"
            onClick={fromWishlistToCartHandler}
          />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
