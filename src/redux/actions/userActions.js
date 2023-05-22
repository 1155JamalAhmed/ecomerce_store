import axios from "axios";
import { server } from "../../server";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const res = await axios.get(`${server}/users/get-user`, {
      withCredentials: true,
    });
    console.log("res", res);
    dispatch({
      type: "LoadUserSuccess",
      payload: res.data.user,
    });
  } catch (err) {
    console.log("err", err);
    dispatch({
      type: "LoadUserFail",
      payload: err.response.data.message,
    });
  }
};
