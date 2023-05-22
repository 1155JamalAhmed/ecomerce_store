import React, { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";

const ProductCardPopup = ({ setOpen, data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  // const [select, setSelect] = useState(false);

  console.log("data.shop.shop_avatar.url", data.shop.shop_avatar.url);

  const handleMessageSubmit = () => {};

  return (
    <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
      <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
        <RxCross1
          size={35}
          className="absolute right-3 top-3 z-50 cursor-pointer hover:bg-gray-100 hover:text-[red] rounded-full p-2 transform hover:scale-125 focus:scale-100 focus:bg-gray-50 focus:outline-none"
          onClick={() => setOpen(false)}
        />
        <div className="block w-full 800px:flex ">
          <div className="w-full 800px:w-[50%]">
            <img src={data.image_Url[0].url} alt="" />
            <div className="flex items-center">
              <img
                src={data.shop.shop_avatar.url}
                alt=""
                className="w-[50px] h-[50px] rounded-full mr-2"
              />
              <div>
                <h3 className={`${styles.shop_name} pb-1`}>{data.shop.name}</h3>
                <h5 className="pb-1 text-[15px]">
                  {data.shop.ratings} Ratings
                </h5>
              </div>
            </div>
            <div
              className={`${styles.button} bg-[#000] mt-4 rounded h-11`}
              onClick={handleMessageSubmit}
            >
              <span className="text-[#fff] flex items-center">
                Send Message <AiOutlineMessage className="ml-1 " />
              </span>
            </div>
            <h5 className="text-[16px] text-[red] mt-5">
              ({data.total_sell}) Sold out
            </h5>
          </div>
          <div className="w-full 800px:w-[50%] pt-8 pl-[5px] pr-[5px]">
            <h1 className={`${styles.productTitle} text-[20px] `}>
              {data.name}
            </h1>
            <p className="text-justify mt-1">{data.description}</p>
            <div className="flex pt-3">
              <h4 className={`${styles.productDiscountPrice}`}>
                {data.discount_price}$
              </h4>
              <h3 className={`${styles.price}`}>
                {data.price ? data.price + "$" : null}
              </h3>
            </div>

            <div className="flex mt-12 items-center justify-between pr-3">
              <div className="flex">
                <button
                  className="text-white text-[20px] font-bold bg-gradient-to-r from-teal-500 to-teal-500 rounded-l shadow-lg hover:opacity-75 px-4 py-2 transition duration-300 ease-in-out"
                  onClick={() =>
                    setCount((prevState) => {
                      if (prevState > 1) {
                        return prevState - 1;
                      }
                      return prevState;
                    })
                  }
                >
                  -
                </button>
                <span className="text-gray-800 font-medium bg-gray-200 px-4 py-[11px]">
                  {count}
                </span>
                <button
                  className="text-white text-[20px] font-bold bg-gradient-to-r from-teal-500 to-teal-500 rounded-r shadow-lg hover:opacity-75 px-4 py-2 transition duration-300 ease-in-out"
                  onClick={() => setCount((prevState) => prevState + 1)}
                >
                  +
                </button>
              </div>
              <div>
                {click ? (
                  <AiFillHeart
                    size={40}
                    className="cursor-pointer hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
                    onClick={() => setClick((prevState) => !prevState)}
                    color="red"
                    title="Remove from wishlist"
                  />
                ) : (
                  <AiOutlineHeart
                    size={40}
                    className="cursor-pointer hover:bg-gray-100 p-1 hover:scale-110 rounded-full"
                    onClick={() => setClick((prevState) => !prevState)}
                    color="#333"
                    title="Add to wishlist"
                  />
                )}
              </div>
            </div>

            <div
              className={`${styles.button} mt-6 rounded h-11 flex items-center`}
            >
              <span className="text-[#fff] flex items-center">
                Add to cart <AiOutlineShoppingCart className="ml-1" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardPopup;
