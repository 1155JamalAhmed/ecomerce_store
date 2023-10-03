import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCardPopup from "../popups/ProductCardPopup";
import RatingWithFeedback from "../forms/RatingWithFeedback";
import {
  AiFillHeart,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { backend_url } from "../../server";
import { Skeleton } from "@mui/material";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/actions/wishlistActions";
import { addItemToCart } from "../../redux/actions/cartActions";

const ProductCard = ({ data }) => {
  const [open, setOpen] = useState(false);
  const { wlItems } = useSelector((state) => state.wishlist);

  const [itemIsInWishlist, setItemIsInWishlist] = useState(
    !!wlItems.find((item) => item.product._id === data?._id)
  );

  useEffect(() => {
    setItemIsInWishlist(
      !!wlItems.find((item) => item.product._id === data?._id)
    );
  }, [wlItems, setItemIsInWishlist, data?._id]);

  const addToWishlistHandler = async () => {
    try {
      await store.dispatch(addItemToWishlist(data?._id));
      setItemIsInWishlist(true);
    } catch (err) {
      console.log("err", err);
    }
  };
  const removeFromWishListHandler = async () => {
    try {
      await store.dispatch(
        removeItemFromWishlist(
          wlItems.find((item) => item.product._id === data?._id)._id
        )
      );
      setItemIsInWishlist(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  const addToCartClickHandler = async () => {
    await store.dispatch(
      addItemToCart({ productId: data._id, incrementQuantityBy: 1 })
    );
  };

  return (
    <div>
      <div className="w-full bg-white rounded-lg shadow-md p-3 relative cursor-pointer">
        {data ? (
          <Link
            to={`/products/${data.slug}`}
            className="block overflow-hidden rounded-md w-full"
          >
            <img
              src={`${backend_url}/${data.images[0]}`}
              alt=""
              className="w-full h-[170px] object-cover"
            />
          </Link>
        ) : (
          <Skeleton width={"100%"} height={170} variant="rectangular" />
        )}
        {data ? (
          <Link to="/">
            <h5 className={`${styles.shop_name}`}>{data.name}</h5>
          </Link>
        ) : (
          <Skeleton width="30%" />
        )}
        {data ? (
          <Link to={`/products/${data.slug}`}>
            <h4 className="pb-3 font-[500]">
              {data.description.length > 40
                ? data.description.slice(0, 40) + "..."
                : data.name}
            </h4>
            <div className="flex">
              <RatingWithFeedback value={data.avgRating} disabled={true} />
            </div>
            <div className="py-2 flex items-center justify-between">
              <div className="flex">
                <h5 className={`${styles.productDiscountPrice}`}>
                  {data.discountPrice ? data.discountPrice + "$" : null}
                </h5>
                <h4 className={`${styles.price}`}>
                  {data.originalPrice ? data.originalPrice + "$" : null}
                </h4>
              </div>
              <div className="font-[400] text-[17px] text-[#68d284]">
                {data?.sold_out} sold
              </div>
            </div>
          </Link>
        ) : (
          <Skeleton width={"90%"} />
        )}

        {/* SIDE OPTIONS */}
        {data ? (
          <div className="bg-[#ffffff67] w-[40px] h-[110px] absolute right-[12px] top-3 flex justify-center">
            {itemIsInWishlist ? (
              <AiFillHeart
                size={30}
                className="cursor-pointer absolute top-2 hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
                onClick={removeFromWishListHandler}
                color="red"
                title="Remove from wishlist"
              />
            ) : (
              <AiOutlineHeart
                size={30}
                className="cursor-pointer absolute top-2 hover:bg-gray-100 p-1 hover:scale-110 rounded-full"
                onClick={addToWishlistHandler}
                color="#333"
                title="Add to wishlist"
              />
            )}
            <AiOutlineEye
              size={30}
              className="cursor-pointer absolute top-10 hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
              onClick={() => setOpen((prevState) => !prevState)}
              color="#333"
              title="Quick view"
            />
            <AiOutlineShoppingCart
              size={30}
              className="cursor-pointer absolute top-[72px] hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
              color="#444"
              onClick={addToCartClickHandler}
              title="Add to cart"
            />
          </div>
        ) : (
          <Skeleton width={"40%"} height={70} />
        )}
      </div>
      <ProductCardPopup setOpen={setOpen} data={data} open={open} />
    </div>
  );
};

export default ProductCard;
