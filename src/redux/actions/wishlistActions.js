import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const addItemToWishlist = (productId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      "/wishlists/",
      { productId },
      { withCredentials: true }
    );

    dispatch({
      type: "AddItemToWishlist",
      payload: res.data.body,
    });
    toast.success("Product added to wishlist");
  } catch (err) {
    toast.error(err.response.data.message);
    throw err;
  }
};

export const removeItemFromWishlist = (itemId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(`/wishlists/${itemId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "RemoveItemFromWishlist",
      payload: res.data.body,
    });
    toast.success("Product removed from wishlist");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const fromWishlistToCart = (itemId) => async (dispatch) => {
  try {
    const res = await axiosInstance.patch(
      `/wishlists/wishlist-item-to-cart`,
      { itemId: itemId },
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "AddItemToCart",
      payload: res.data.body.cartItem,
    });

    dispatch({
      type: "RemoveItemFromWishlist",
      payload: res.data.body.wishlistItem,
    });
    toast.success("Item has been added to cart");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const loadWishlistItems = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/wishlists/", {
      withCredentials: true,
    });
    dispatch({
      type: "WishlistItemsSucc",
      payload: res.data.body,
    });
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({
      type: "WishlistItemsFailed",
      payload: err.response.data.message,
    });
  }
};
