import React, { useState } from "react";
import styles from "../../styles/styles";
import { HiOutlineMinus, HiPlus } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";

const CartItem = ({ cart }) => {
  const [value, setValue] = useState(1);
  const totalPrice = cart.price * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center relative">
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={() => setValue((prevState) => prevState + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className="pl-[8px]">{value}</span>
          <div
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.normalFlex} justify-center cursor-pointer `}
            onClick={() =>
              setValue((prevState) =>
                prevState === 1 ? prevState : prevState - 1
              )
            }
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <div>
          <img
            src="https://bonik-react.vercel.app/assets/images/products/Fashion/Clothes/1.SilverHighNeckSweater.png"
            alt=""
            className="w-[8 0px] h-[80px] ml-2"
          />
        </div>
        <div className="pl-[5px]">
          <h1>{cart.name}</h1>
          <h4 className="font-[400] text-[15px] text-[#00000082]">
            ${cart.price} * {value}
          </h4>
          <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222] font-Roboto">
            US${totalPrice}
          </h4>
        </div>
        <RxCross1
          className="cursor-pointer absolute bottom-0 right-0"
          size={20}
        />
      </div>
    </div>
  );
};

export default CartItem;
