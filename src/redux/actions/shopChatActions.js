import axiosInstance from "../../utils/axiosInstance";

export const loadShopChats = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/chats/get-chats-by-shop`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadShopChatsSuccess",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "LoadShopError",
      payload: err.response.data.message,
    });
  }
};

export const selectedShopChatHandler = (selectedChat) => async (dispatch) => {
  dispatch({
    type: "ChangeSelectedChat",
    payload: selectedChat,
  });
};
