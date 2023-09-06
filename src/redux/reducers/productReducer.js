import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isProductsLoading: true,
  productsError: null,
  products: [],
};

export const productReducer = createReducer(initialState, {
  LoadingProducts: (state) => {
    state.isProductsLoading = true;
  },
  ProdsLoadedSucc: (state, action) => {
    state.isProductsLoading = false;
    state.products = action.payload;
  },
  ProdsLoadedFailed: (state, action) => {
    state.isProductsLoading = false;
    state.productsError = action.payload;
  },

  CreateProduct: (state, action) => {
    state.products.push(action.payload);
  },
  DeleteProduct: (state, action) => {
    state.products = state.products.filter((product) => {
      return product._id !== action.payload._id;
    });
  },
  UpdateProduct: (state, action) => {
    const index = state.products.findIndex(
      (product) => product.id === action.payload._id
    );
    if (index !== -1) state.products[index] = action.payload;
  },
});

