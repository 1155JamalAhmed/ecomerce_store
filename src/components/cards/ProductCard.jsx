import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCardPopup from "../popups/ProductCardPopup";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";

const ProductCard = ({ data }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);

  const product_name = data.name.replace(/\s+/g, "-");

  return (
    <div>
      <div className="w-full h-[370px] bg-white rounded-lg shadow-md p-3 relative cursor-pointer">
        <Link to={`/products/${product_name}`}>
          <img
            src={data.image_Url[0].url}
            alt=""
            className="w-full h-[170px] object-contain"
          />
        </Link>
        <Link to="/">
          <h5 className={`${styles.shop_name}`}>{data.shop.name}</h5>
        </Link>
        <Link to={`/products/${product_name}`}>
          <h4 className="pb-3 font-[500]">
            {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
          </h4>
          <div className="flex">
            {[...Array(5)].map((star, index) => {
              if (index < data.rating) {
                return (
                  <AiFillStar
                    className="mr-2 cursor-pointer text-[#f6ba00]"
                    size={20}
                    key={index + 1}
                  />
                );
              }
              return (
                <AiOutlineStar
                  className="mr-2 cursor-pointer text-[#f6ba00]"
                  size={20}
                  key={index + 1}
                />
              );
            })}
          </div>
          <div className="py-2 flex items-center justify-between">
            <div className="flex">
              <h5 className={`${styles.productDiscountPrice}`}>
                {data.price === 0 ? data.price : data.discount_price}$
              </h5>
              <h4 className={`${styles.price}`}>
                {data.price ? data.price + "$" : null}
              </h4>
            </div>
            <div className="font-[400] text-[17px] text-[#68d284]">
              {data?.total_sell} sold
            </div>
          </div>
        </Link>

        {/* SIDE OPTIONS */}
        <div>
          {click ? (
            <AiFillHeart
              size={30}
              className="cursor-pointer absolute right-2 top-2 hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
              onClick={() => setClick((prevState) => !prevState)}
              color="red"
              title="Remove from wishlist"
            />
          ) : (
            <AiOutlineHeart
              size={30}
              className="cursor-pointer absolute right-2 top-2 hover:bg-gray-100 p-1 hover:scale-110 rounded-full"
              onClick={() => setClick((prevState) => !prevState)}
              color="#333"
              title="Add to wishlist"
            />
          )}
          <AiOutlineEye
            size={30}
            className="cursor-pointer absolute right-2 top-10 hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
            onClick={() => setOpen((prevState) => !prevState)}
            color="#333"
            title="Quick view"
          />
          <AiOutlineShoppingCart
            size={30}
            className="cursor-pointer absolute right-2 top-[72px] hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
            // onClick={() => setOpen((prevState) => !prevState)}
            color="#444"
            title="Add to cart"
          />
        </div>
      </div>
      {open && <ProductCardPopup setOpen={setOpen} data={data} />}
    </div>
  );
};

export default ProductCard;
