import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadCouponsByShop = (shopId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `/coupons/get-all-coupons-shop/${shopId}`
    );
    dispatch({
      type: "CouponsLoadedSucc",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "CouponsLoadedFailed",
      payload: err.response.data.message,
    });
  }
};

export const createCoupon = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.post("/coupons/create-coupon", data, {
      withCredentials: true,
    });
    dispatch({
      type: "CreateCoupon",
      payload: res.data.body,
    });
    toast.success("Coupon Created Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
    throw err;
  }
};

export const deleteCoupon = (couponId) => async (dispatch) => {
  try {
    const res = await axiosInstance.post(
      "/coupons/delete-coupon",
      { couponId },
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "DeleteCoupon",
      payload: res.data.body,
    });
    toast.success("Coupon Deleted Successfully 😎");
  } catch (err) {
    toast.error(err.response.data.message);
  }
};
