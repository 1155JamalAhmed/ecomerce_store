import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isShopChatsLoading: true,
  shopChatsHasError: null,
  shopChats: null,
  selectedShopChat: null,
  shopChatMessages: {},
};

export const shopChatsReducer = createReducer(initialState, {
  LoadShopChats: (state) => (state.isShopChatsLoading = false),
  LoadShopChatsSuccess: (state, action) => {
    state.isShopChatsLoading = false;
    state.shopChats = action.payload;
  },
  LoadShopChatError: (state, action) => {
    state.isShopChatsLoading = false;
    state.shopChatsHasError = action.payload;
  },
  ChangeSelectedShopChat: (state, action) => {
    state.selectedShopChat = action.payload;
  },
  LoadMessagesForShopChat: (state, action) => {
    state.shopChatMessages[action.payload[0].chat] = action.payload;
  },
  AddNewMessageToShopChatMessages: (state, action) => {
    state.shopChatMessages[action.payload.chat].unshift(action.payload);
    const updatedChat = state.shopChats.find(
      (chat) => chat._id === action.payload.chat
    );
    state.shopChats = state.shopChats.filter(
      (chat) => chat._id !== action.payload.chat
    );
    updatedChat.latestMessage = action.payload;
    state.shopChats.unshift(updatedChat);
  },
});
