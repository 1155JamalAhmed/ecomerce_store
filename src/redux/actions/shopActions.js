import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadShop = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadShopRequest",
    });
    const res = await axiosInstance.get(`/shops/get-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadShopSuccess",
      payload: res.data.body,
    });
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
