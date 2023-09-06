import React from "react";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import { backend_url } from "../../server";
import store from "../../redux/store";
import {
  decrementQuantityByOne,
  deleteItemFromCart,
  incrementQuantityByOne,
} from "../../redux/actions/cartActions";

const CartItem = ({ item }) => {
  const totalPrice = item.product.discountPrice * item.quantity;

  const itemIncrementHandler = async () => {
    await store.dispatch(incrementQuantityByOne(item._id));
  };

  const itemDecrementHandler = async () => {
    await store.dispatch(decrementQuantityByOne(item._id));
  };

  const removeItemClickHandler = async () => {
    await store.dispatch(deleteItemFromCart(item._id));
  };

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center relative">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={itemIncrementHandler}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <div className="pl-[8px]">{item.quantity}</div>
          <div
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={itemDecrementHandler}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <div>
          <img
            src={`${backend_url}/${item.product.images[0]}`}
            alt=""
            className="w-[80px] h-[80px] ml-2"
          />
        </div>
        <div className="pl-[5px]">
          <h1>{item.product.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${item.product.discountPrice} * {item.quantity}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer absolute bottom-0 right-0"
          size={20}
          onClick={removeItemClickHandler}
        />
      </div>
    </div>
  );
};

export default CartItem;
