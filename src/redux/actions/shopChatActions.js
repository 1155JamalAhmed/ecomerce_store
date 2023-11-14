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
      type: "LoadShopChatError",
      payload: err.response.data.message,
    });
  }
};

export const selectedShopChatHandler = (selectedChat) => async (dispatch) => {
  dispatch({
    type: "ChangeSelectedShopChat",
    payload: selectedChat,
  });
};

export const getShopMessagesForChat = (chatId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(
      `/messages/get-messages-by-shop/${chatId}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: "LoadMessagesForShopChat",
      payload: res.data.body,
    });
  } catch (err) {
    throw err;
  }
};
