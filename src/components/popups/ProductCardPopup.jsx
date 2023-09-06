import React, { useEffect, useState } from "react";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import styles from "../../styles/styles";
import { CloseButton } from "../ui/Button";
import Backdrop from "../ui/Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { backend_url } from "../../server";
import { Link } from "react-router-dom";
import { Button, CircularProgress } from "@mui/material";
import { addItemToCart } from "../../redux/actions/cartActions";
import store from "../../redux/store";
import { useSelector } from "react-redux";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/actions/wishlistActions";

const ProductCardPopup = ({ setOpen, data, open }) => {
  const [count, setCount] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleMessageSubmit = () => {};

  const addToCartClickHandler = async () => {
    setAddingToCart(true);
    await store.dispatch(
      addItemToCart({ productId: data._id, incrementQuantityBy: count })
    );
    setAddingToCart(false);
  };

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

  return (
    <AnimatePresence>
      {open && (
        <Backdrop>
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center w-full h-[100vh]"
          >
            <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative top-4 p-4">
              <CloseButton
                size={35}
                setOpen={() => setOpen(false)}
                contClasses="absolute right-3 top-3 z-50"
              />
              <div className="block w-full 800px:flex pt-8">
                <div className="w-full 800px:w-[50%]">
                  <div className="w-[100%] h-[300px] overflow-hidden rounded-md ">
                    <img
                      src={`${backend_url}/${data.images[0]}`}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <br />
                  <Link
                    className="flex items-center"
                    to={`/shops/${data.shop._id}`}
                  >
                    <img
                      src={`${backend_url}/${data.shop.avatarImage}`}
                      alt=""
                      className="w-[50px] h-[50px] rounded-full mr-2"
                    />
                    <div>
                      <h3 className={`${styles.shop_name} pb-1`}>
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-1 text-[15px]">
                        {data?.shop?.ratings} Ratings
                      </h5>
                    </div>
                  </Link>
                  <Button
                    endIcon={<AiOutlineMessage size={20} />}
                    variant="contained"
                    color="tertiary"
                    onClick={handleMessageSubmit}
                    className="!mt-2"
                  >
                    Send Message
                  </Button>
                  <h5 className="text-[16px] text-[red] mt-5">
                    ({data.sold_out}) Sold out
                  </h5>
                </div>
                <div className="w-full pl-0 800px:w-[50%] 800px:pl-5 ">
                  <h1 className={`${styles.productTitle} text-[20px] `}>
                    {data.name}
                  </h1>
                  <p className="text-justify mt-1">{data.description}</p>
                  <div className="flex pt-3">
                    <h4 className={`${styles.productDiscountPrice}`}>
                      {data.discountPrice}$
                    </h4>
                    <h3 className={`${styles.price}`}>
                      {data.originalPrice ? data.originalPrice + "$" : null}
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
                      {itemIsInWishlist ? (
                        <AiFillHeart
                          size={40}
                          className="cursor-pointer hover:bg-gray-100 hover:scale-110 p-1 rounded-full"
                          onClick={removeFromWishListHandler}
                          color="red"
                          title="Remove from wishlist"
                        />
                      ) : (
                        <AiOutlineHeart
                          size={40}
                          className="cursor-pointer hover:bg-gray-100 p-1 hover:scale-110 rounded-full"
                          onClick={addToWishlistHandler}
                          color="#333"
                          title="Add to wishlist"
                        />
                      )}
                    </div>
                  </div>

                  <Button
                    variant="contained"
                    color="tertiary"
                    onClick={addToCartClickHandler}
                    className="!mt-4"
                    endIcon={
                      addingToCart && (
                        <CircularProgress color="inherit" size={20} />
                      )
                    }
                    disabled={addingToCart}
                  >
                    Add to cart <AiOutlineShoppingCart size={20} />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};

export default ProductCardPopup;
