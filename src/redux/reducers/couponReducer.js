import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isCouponsLoading: true,
  couponsError: null,
  coupons: [],
};

export const couponReducer = createReducer(initialState, {
  LoadingCoupons: (state) => {
    state.isCouponsLoading = true;
  },
  CouponsLoadedSucc: (state, action) => {
    state.isCouponsLoading = false;
    state.coupons = action.payload;
  },
  CouponsLoadedFailed: (state, action) => {
    state.isCouponsLoading = false;
    state.couponsError = action.payload;
  },

  CreateCoupon: (state, action) => {
    state.coupons.push(action.payload);
  },
  DeleteCoupon: (state, action) => {
    state.coupons = state.coupons.filter((coupon) => {
      return coupon._id !== action.payload._id;
    });
  },
  UpdateCoupon: (state, action) => {
    const index = state.coupons.findIndex(
      (coupon) => coupon.id === action.payload._id
    );
    if (index !== -1) state.coupons[index] = action.payload;
  },
});
