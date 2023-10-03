import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { shopReducer } from "./reducers/shopReducer";
import { productReducer } from "./reducers/productReducer";
import { eventReducer } from "./reducers/eventReducer";
import { couponReducer } from "./reducers/couponReducer";
import { cartReducer } from "./reducers/cartReducer";
import { wishlistReducer } from "./reducers/wishlistReducer";
import { shopChatsReducer } from "./reducers/shopChatsReducer";
import { userChatsReducer } from "./reducers/userChatsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    shop: shopReducer,
    products: productReducer,
    events: eventReducer,
    coupons: couponReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shopChats: shopChatsReducer,
    userChats: userChatsReducer,
  },
});

export default store;
