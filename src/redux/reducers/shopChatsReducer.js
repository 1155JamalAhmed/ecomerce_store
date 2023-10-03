import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isShopChatsLoading: true,
  shopChatsHasError: null,
  shopChats: null,
  selectedShopChat: null,
};

export const shopChatsReducer = createReducer(initialState, {
  LoadShopChats: (state) => (state.isShopChatsLoading = false),
  LoadShopChatsSuccess: (state, action) => {
    state.isShopChatsLoading = false;
    state.shopChats = action.payload;
  },
  LoadShopError: (state, action) => {
    state.isShopChatsLoading = false;
    state.shopChatsHasError = action.payload;
  },
  ChangeSelectedChat: (state, action) => {
    state.selectedShopChat = action.payload;
  },
});
