import React, { useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();

  const handleMessageSubmit = () => {
    navigate("/inbox?conversation=090078601telenor");
  };

  return (
    <div className="bg-white">
      {data && (
        <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
          <div className="w-full py-5">
            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={data.image_Url[select].url}
                  alt=""
                  className="w-[80%] "
                />
                <div className="w-full flex">
                  {data?.image_Url.map((image, index) => (
                    <div
                      key={index}
                      className={`${
                        select === index && "border"
                      } cursor-pointer`}
                    >
                      <img
                        src={image.url}
                        alt=""
                        className="h-[200px]"
                        onClick={() => setSelect(index)}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full 800px:w-[50%] pt-5">
                <h1 className={`${styles.productTitle}`}>{data.name}</h1>
                <p className="text-justify">{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discount_price}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price && data.price + "$"}
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
                <div className="flex items-center mt-12">
                  <img
                    src={data.shop.shop_avatar.url}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full mr-2"
                  />
                  <div>
                    <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                    <h5 className="text-[15px]">{data.shop.ratings} Ratings</h5>
                  </div>

                  <div
                    className={`${styles.button}  bg-blue-700 !rounded h-11 ml-8`}
                    onClick={handleMessageSubmit}
                  >
                    <span className="text-[#fff] flex items-center">
                      Send Message <AiOutlineMessage className="ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ProductDetailInfo data={data} />
          <br />
          <br />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
