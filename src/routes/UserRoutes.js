import React from "react";
import ProtectedRoutes from "../ProtectedRoutes";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {
  LoginPage,
  SingupPage,
  ActivationPage,
  ProfilePage,
  InboxPage,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
} from "../pagesCollections/userPagesCollection";

const UserRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="sign-up" element={<SingupPage />} />
      <Route
        path="checkout"
        element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
            <CheckoutPage />
          </ProtectedRoutes>
        }
      />
      <Route path="payment" element={<PaymentPage />} />
      <Route path="order/success/:id" element={<OrderSuccessPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
            <ProfilePage />
          </ProtectedRoutes>
        }
      />
      <Route path="inbox" element={<InboxPage />} />
      <Route
        path="activation/:activation_token"
        element={<ActivationPage />}
      />
    </Routes>
  );
};

export default UserRoutes;
