import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isShopAuthenticated: false,
};

export const shopReducer = createReducer(initialState, {
  LoadShopRequest: (state) => {
    state.loading = true;
  },
  LoadShopSuccess: (state, action) => {
    state.isShopAuthenticated = true;
    state.shopLoading = false;
    state.shop = action.payload;
  },
  LoadShopFail: (state, action) => {
    state.shopLoading = false;
    state.shopError = action.payload;
    state.isShopAuthenticated = false;
  },
  LogoutShop: (state) => {
    state.isShopAuthenticated = false;
    state.shop = null;
  },
  clearShopErrors: (state) => {
    state.shopError = null;
  },
});
