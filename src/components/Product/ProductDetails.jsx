import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineMessage,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import ProductDetailInfo from "./ProductDetailInfo";
import { backend_url } from "../../server";
import { Button, CircularProgress } from "@mui/material";
import Store from "../../redux/store";
import { addItemToCart } from "../../redux/actions/cartActions";
import { useSelector } from "react-redux";
import store from "../../redux/store";
import {
  addItemToWishlist,
  removeItemFromWishlist,
} from "../../redux/actions/wishlistActions";
import axiosInstance from "../../utils/axiosInstance";

const ProductDetails = ({ data }) => {
  const [count, setCount] = useState(1);
  const { wlItems } = useSelector((state) => state.wishlist);
  const [itemIsInWishlist, setItemIsInWishlist] = useState(
    !!wlItems.find((item) => item.product._id === data._id)
  );
  const [select, setSelect] = useState(0);
  const navigate = useNavigate();
  const [addingToCart, setAddingToCart] = useState(false);
  const [creatingChat, setCreatingChat] = useState(false);

  useEffect(() => {
    setItemIsInWishlist(
      !!wlItems.find((item) => item.product._id === data._id)
    );
  }, [wlItems, setItemIsInWishlist, data._id]);

  const handleMessageSubmit = async () => {
    setCreatingChat(true);

    axiosInstance
      .post(
        `/chats/create-chat`,
        {
          shopId: data.shop._id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.body);
        navigate("/users/profile");
      })
      .catch((err) => console.log("Err", err.response.data.message))
      .finally(() => {
        setCreatingChat(false);
      });
  };

  const addToCartClickHandler = async () => {
    setAddingToCart(true);
    await Store.dispatch(
      addItemToCart({ productId: data._id, incrementQuantityBy: count })
    );
    setAddingToCart(false);
  };

  const addToWishlistHandler = async () => {
    try {
      await store.dispatch(addItemToWishlist(data._id));
      setItemIsInWishlist(true);
    } catch (err) {
      console.log("err", err);
    }
  };
  const removeFromWishListHandler = async () => {
    try {
      await store.dispatch(
        removeItemFromWishlist(
          wlItems.find((item) => item.product._id === data._id)._id
        )
      );
      setItemIsInWishlist(false);
    } catch (err) {
      console.log("err", err);
    }
  };

  return (
    <div className="bg-white">
      <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
        <div className="w-full py-5">
          <div className="block w-full 800px:flex">
            <div className="w-full 800px:w-[50%]">
              <div className="w-[90%] h-[350px] m-auto mb-4">
                <img
                  src={`${backend_url}/${data.images[select]}`}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full flex">
                {data.images.map((image, index) => (
                  <div
                    key={index}
                    className={`${
                      select === index &&
                      " outline outline-offset-2 outline-1 outline-blue-500"
                    } cursor-pointer flex-1 mr-2 overflow-hidden rounded-md h-[150px]`}
                  >
                    <img
                      src={`${backend_url}/${image}`}
                      alt=""
                      className="w-full h-full object-cover"
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
                  {data.discountPrice}$
                </h4>
                <h3 className={`${styles.price}`}>
                  {data.originalPrice && data.originalPrice + "$"}
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
                size="large"
                onClick={addToCartClickHandler}
                className="!mt-4"
                endIcon={
                  addingToCart && <CircularProgress color="inherit" size={20} />
                }
                disabled={addingToCart}
              >
                Add to cart <AiOutlineShoppingCart size={20} />
              </Button>
              <div className="flex items-center mt-12">
                <img
                  src={`${backend_url}/${data.shop.avatarImage}`}
                  alt=""
                  className="w-[50px] h-[50px] rounded-full mr-2"
                />
                <div>
                  <h3 className={`${styles.shop_name}`}>{data.shop.name}</h3>
                  <h5 className="text-[15px]">{data.shop.ratings} Ratings</h5>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleMessageSubmit}
                  className="!mt-4 !ml-3"
                  endIcon={
                    creatingChat && (
                      <CircularProgress color="inherit" size={20} />
                    )
                  }
                  disabled={creatingChat}
                >
                  Send Message <AiOutlineMessage size={20} />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailInfo data={data} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ProductDetails;
