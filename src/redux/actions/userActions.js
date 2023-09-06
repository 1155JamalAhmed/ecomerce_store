import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

export const loadUser = () => async (dispatch) => {
  try {
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

export const updateUserData =
  ({ currentPassword, name, phoneNumber }) =>
  async (dispatch) => {
    try {
      const res = await axiosInstance.patch(
        `/users/update-user-data`,
        {
          currentPassword,
          name,
          phoneNumber,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "UpdateUserData",
        payload: res.data.body,
      });
      toast.success("Profile updated successful!");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

export const addUserAddress = (data) => async (dispatch) => {
  try {
    const res = await axiosInstance.patch(`/users/add-user-address`, data, {
      withCredentials: true,
    });
    dispatch({
      type: "AddAddressOfUser",
      payload: res.data.body,
    });
    toast.success("Address Added successfully");
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};

export const removeUserAddress = (addressId) => async (dispatch) => {
  try {
    const res = await axiosInstance.delete(
      `/users/delete-user-address/${addressId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "RemoveAddressOfUser",
      payload: res.data.body,
    });
    toast.success("Address removed successfully");
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
