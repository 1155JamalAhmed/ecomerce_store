import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const addItemToCart =
  ({ productId, incrementQuantityBy }) =>
  async (dispatch) => {
    try {
      const res = await axiosInstance.post(
        "/carts/",
        { productId, incrementQuantityBy },
        { withCredentials: true }
      );

      dispatch({
        type: "AddItemToCart",
        payload: res.data.body,
      });
      toast.success("Product added to cart");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

export const incrementQuantityByOne = (cartItemId) => async (dispatch) => {
  try {
    const res = await axiosInstance.patch(
      "/carts/incrementCartItem",
      { cartItemId },
      { withCredentials: true }
    );

    dispatch({
      type: "IncrementQuantityByOne",
      payload: res.data.body,
    });
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
export const decrementQuantityByOne = (cartItemId) => async (dispatch) => {
  try {
    const res = await axiosInstance.patch(
      "/carts/decrementCartItem",
      { cartItemId },
      { withCredentials: true }
    );

    dispatch({
      type: "DecrementQuantityByOne",
      payload: res.data.body,
    });
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
export const deleteItemFromCart = (cartItemId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(`/carts/${cartItemId}`, {
      withCredentials: true,
    });

    dispatch({
      type: "DeleteItemFromCart",
      payload: res.data.body,
    });
  } catch (err) {
    toast.error(err.response.data.message);
  }
};

export const loadCartitems = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get("/carts/", { withCredentials: true });
    dispatch({
      type: "CartItemsSucc",
      payload: res.data.body,
    });
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({
      type: "CartItemFailed",
      payload: err.response.data.message,
    });
  }
};
