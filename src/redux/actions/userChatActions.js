import axiosInstance from "../../utils/axiosInstance";

export const loadUserChats = () => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/chats/get-chats-by-user`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserChatsSuccess",
      payload: res.data.body,
    });
  } catch (err) {
    dispatch({
      type: "LoadUserChatError",
      payload: err.response.data.message,
    });
  }
};
export const getUserMessagesForChat = (chatId) => async (dispatch) => {
  try {
    const res = await axiosInstance.get(`/messages/get-messages-by-user/${chatId}`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadMessagesForChat",
      payload: res.data.body,
    });
  } catch (err) {
    throw err;
  }
};
