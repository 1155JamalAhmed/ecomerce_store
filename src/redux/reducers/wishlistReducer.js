import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  wlItemsIsLoading: true,
  wlItems: [],
  wlItemsHasError: null,
};

export const wishlistReducer = createReducer(initialState, {
  LoadingWlItems: (state) => {
    state.wlItemsIsLoading = true;
  },
  WishlistItemsSucc: (state, action) => {
    state.wlItems = action.payload;
    state.wlItemsIsLoading = false;
  },
  WishlistItemsFailed: (state, action) => {
    state.wlItemsIsLoading = false;
    state.wlItemsHasError = action.payload;
  },

  AddItemToWishlist: (state, action) => {
    state.wlItems.push(action.payload);
  },
  RemoveItemFromWishlist: (state, action) => {
    state.wlItems = state.wlItems.filter(
      (item) => item._id !== action.payload._id
    );
  },
});
