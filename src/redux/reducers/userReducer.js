import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: true,
};

export const userReducer = createReducer(initialState, {
  LoadUserRequest: (state) => {
    state.loading = true;
  },
  LoadUserSuccess: (state, action) => {
    state.isAuthenticated = true;
    state.loading = false;
    state.user = action.payload;
  },
  LoadUserFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },
  UpdateUserData: (state, action) => {
    state.user = action.payload;
  },
  AddAddressOfUser: (state, action) => {
    state.user.addresses = action.payload.addresses;
  },
  RemoveAddressOfUser: (state, action) => {
    state.user.addresses = action.payload.addresses;
  },
  UpdateOrderStatus: (state, action) => {
    state.user.orders = state.user.orders.map((order) => {
      if (order._id === action.payload.orderId) {
        return { ...order, status: action.payload.newStatus };
      } else {
        return order;
      }
    });
  },
  LogoutUser: (state) => {
    state.isAuthenticated = false;
    state.user = null;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
