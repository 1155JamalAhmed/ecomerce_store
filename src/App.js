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
} from "./routes.js";

// ** REDUX
import store from "./redux/store";
import { loadUser } from "./redux/actions/userActions";
import { useSelector } from "react-redux";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    store.dispatch(loadUser());
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
            path="/profile"
            element={
              <ProtectedRoutes isAuthenticated={isAuthenticated}>
                <ProfilePage />
              </ProtectedRoutes>
            }
          />
          <Route path="/inbox" element={<InboxPage />} />
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
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
