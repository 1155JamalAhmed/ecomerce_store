import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";
import { socketForShop } from "../../utils/socketIO";

export const loadShop = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/shops/get-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadShopSuccess",
      payload: res.data.body,
    });
    socketForShop.emit("setup shop", res.data.body);
  } catch (err) {
    dispatch({
      type: "LoadShopFail",
      payload: err.response.data.message,
    });
  }
};

export const loginShop =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      const res = await axiosInstance.post(
        `/shops/login-shop`,
        {
          email,
          password,
          rememberMe,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "LoadShopSuccess",
        payload: res.data.body,
      });
      toast.success("Shop login successful!");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: "LoadShopFail",
        payload: error.response.data.message,
      });
    }
  };

export const logoutShop = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/shops/logout-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutShop",
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

export const updateOrderStatusByShop =
  ({ orderId, newStatus }) =>
  async (dispatch) => {
    try {
      await axiosInstance.patch(
        `/orders/update-order-by-shop`,
        {
          orderId,
          newStatus,
        },
        {
          withCredentials: true,
        }
      );

      dispatch({
        type: "UpdateOrderStatus",
        payload: { orderId, newStatus },
      });

      toast.success("Order status updated to " + newStatus);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

export const updateShopData =
  ({ currentPassword, name, phoneNumber }) =>
  async (dispatch) => {
    try {
      const res = await axiosInstance.patch(
        `/shops/update-shop-data`,
        {
          currentPassword,
          name,
          phoneNumber,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "UpdateShopData",
        payload: res.data.body,
      });
      toast.success("Shop profile updated successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
