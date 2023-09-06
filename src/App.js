import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// ** IMPORTING PAGES
import {
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailPage,
} from "./pagesCollections/pagesCollection";

// ** REDUX
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import { useSelector } from "react-redux";
import { loadShop } from "./redux/actions/shopActions";
import Loader from "./components/layout/Loader";
import ShopRoutes from "./routes/ShopRoutes";
import UserRoutes from "./routes/UserRoutes";
import { loadProductsByShop } from "./redux/actions/productActions";
import { loadEventsByShop } from "./redux/actions/eventActions";
import { loadCouponsByShop } from "./redux/actions/couponActions";
import { loadCartitems } from "./redux/actions/cartActions";
import { loadWishlistItems } from "./redux/actions/wishlistActions";

const App = () => {
  const { loading, user } = useSelector((state) => state.user);
  const { shopLoading, shop } = useSelector((state) => state.shop);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadShop());
  }, []);

  useEffect(() => {
    if (shop?._id) {
      store.dispatch(loadProductsByShop(shop._id));
      store.dispatch(loadEventsByShop(shop._id));
      store.dispatch(loadCouponsByShop(shop._id));
    }
  }, [shop]);

  useEffect(() => {
    if (user?._id) {
      store.dispatch(loadCartitems());
      store.dispatch(loadWishlistItems());
    }
  }, [user]);

  return (
    <>
      {loading || shopLoading ? (
        <Loader />
      ) : (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:name" element={<ProductDetailPage />} />
            <Route path="/best-selling" element={<BestSellingPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/users/*" element={<UserRoutes />} />
            <Route path="/shops/*" element={<ShopRoutes />} />
          </Routes>

          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </BrowserRouter>
      )}
    </>
  );
};

export default App;
