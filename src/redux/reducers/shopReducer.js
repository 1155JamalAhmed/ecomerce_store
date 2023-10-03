import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isShopAuthenticated: false,
  shopLoading: true,
  shopError: null,
  shop: null,
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
  UpdateShopData: (state, action) => {
    state.shop = action.payload;
  },
  UpdateOrderStatus: (state, action) => {
    state.shop.orders = state.shop.orders.map((order) => {
      if (order._id === action.payload.orderId) {
        return { ...order, status: action.payload.newStatus };
      } else {
        return order;
      }
    });
  },
  clearShopErrors: (state) => {
    state.shopError = null;
  },
});
