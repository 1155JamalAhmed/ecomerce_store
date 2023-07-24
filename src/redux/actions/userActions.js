import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const res = await axiosInstance.get(`/users/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "LoadUserFail",
      payload: err.response.data.message,
    });
  }
};

export const loginUser =
  ({ email, password, rememberMe }) =>
  async (dispatch) => {
    try {
      const res = await axiosInstance.post(
        `/users/login-user`,
        {
          email,
          password,
          rememberMe,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "LoadUserSuccess",
        payload: res.data.body,
      });
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.response.data.message);
      dispatch({
        type: "LoadUserFail",
        payload: error.response.data.message,
      });
    }
  };

export const logoutUser = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/users/logout-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutUser",
    });
    toast.success(res.data.message);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
