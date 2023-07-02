import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const res = await axios.get(`${server}/users/get-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: res.data.user,
    });
  } catch (err) {
    dispatch({
      type: "LoadUserFail",
      payload: err.response.data.message,
    });
  }
};

export const logoutUser = (logoutCurrentUser) => async (dispatch) => {
  try {
    const res = await axios.get(`${server}/users/logout-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LogoutUser",
    });
    logoutCurrentUser(res);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
