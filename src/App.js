import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoutes from "./ProtectedRoutes";
import "./App.css";

// ** IMPORTING PAGES
import {
  LoginPage,
  SingupPage,
  ActivationPage,
  HomePage,
  ProductsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProductDetailPage,
  ProfilePage,
  InboxPage,
  CheckoutPage,
  CreateShopPage,
  ShopActivationPage,
  LoginShopPage,
  ShopHomePage,
} from "./routes.js";

// ** REDUX
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import { useSelector } from "react-redux";
import { loadShop } from "./redux/actions/shopActions";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const { isShopAuthenticated } = useSelector((state) => state.shop);

  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(loadShop());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:name" element={<ProductDetailPage />} />
          <Route path="/best-selling" element={<BestSellingPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/sign-up" element={<SingupPage />} />
          <Route
            path="/checkout"
            element={
              <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
                <CheckoutPage />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
          <Route path="/inbox" element={<InboxPage />} />
          <Route
            path="/users/activation/:activation_token"
            element={<ActivationPage />}
          />
          <Route path="/create-shop" element={<CreateShopPage />} />
          <Route
            path="/shops/activation/:activation_token"
            element={<ShopActivationPage />}
          />
          <Route path="/login-shop" element={<LoginShopPage />} />
          <Route
            path="/shops/:id"
            element={
              <ProtectedRoutes
                isAuthenticated={isShopAuthenticated}
                role="Shop"
              >
                <ShopHomePage />
              </ProtectedRoutes>
            }
          />
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
    </>
  );
};

export default App;
