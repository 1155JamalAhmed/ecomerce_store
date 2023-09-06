import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cartItemsIsLoading: true,
  cartItemsError: null,
  cartItems: [],
  grandTotal: 0,
};

export const cartReducer = createReducer(initialState, {
  LoadingCartItems: (state) => {
    state.cartItemsIsLoading = true;
  },
  CartItemsSucc: (state, action) => {
    state.cartItems = action.payload.cartData;
    state.grandTotal = action.payload.grandTotal;
    state.cartItemsIsLoading = false;
  },
  CartItemFailed: (state, action) => {
    state.cartItemsError = action.payload;
    state.cartItemsIsLoading = false;
  },

  AddItemToCart: (state, action) => {
    const itemIndex = state.cartItems.findIndex(
      (item) => item._id === action.payload._id
    );
    if (itemIndex === -1) {
      state.grandTotal =
        state.grandTotal +
        action.payload.product.discountPrice * action.payload.quantity;
      state.cartItems.push(action.payload);
    } else {
      state.grandTotal =
        state.grandTotal +
        action.payload.product.discountPrice *
          (action.payload.quantity - state.cartItems[itemIndex].quantity);
      state.cartItems[itemIndex] = action.payload;
    }
  },

  IncrementQuantityByOne: (state, action) => {
    const matcheditem = state.cartItems.findIndex(
      (item) => item._id === action.payload._id
    );
    state.cartItems[matcheditem].quantity += 1;
    state.grandTotal += action.payload.product.discountPrice;
  },
  DecrementQuantityByOne: (state, action) => {
    state.cartItems = state.cartItems.reduce((newCartItems, item) => {
      if (item._id === action.payload._id && item.quantity > 1) {
        item.quantity -= 1;
        newCartItems.push(item);
        state.grandTotal -= item.product.discountPrice;
      } else if (item._id === action.payload._id && item.quantity === 1) {
        state.grandTotal -= item.product.discountPrice;
      } else {
        newCartItems.push(item);
      }
      return newCartItems;
    }, []);
  },
  DeleteItemFromCart: (state, action) => {
    let deductionAmount = 0;
    state.cartItems = state.cartItems.filter((item) => {
      if (item._id === action.payload._id) {
        deductionAmount =
          action.payload.product.discountPrice * action.payload.quantity;
        return false;
      } else {
        return true;
      }
    });
    state.grandTotal -= deductionAmount;
  },
});
