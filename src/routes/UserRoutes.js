import React from "react";
import ProtectedRoutes from "../ProtectedRoutes";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import EnterShippingAddress from "../pages/userPages/EnterShippingAddress";
import EnterPaymentInfo from "../pages/userPages/EnterPaymentInfo";

import {
  LoginPage,
  SingupPage,
  ActivationPage,
  ProfilePage,
  InboxPage,
  CheckoutPage,
  OrderSuccessPage,
  PaymentPage,
  OrderDetailPage,
} from "../pagesCollections/userPagesCollection";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  "pk_test_51NohzTIc53cPkDWMbHwMxsVEMOD6NqdWTwlsXrUDdo62XTkUHyasFjTC3KGiiu4WgTNey2oF8fGCc9hTG2OtTnRo00wzaXjjyz"
);
const appearance = {
  theme: "stripe",
  variables: {
    fontFamily: "Roboto, sans-serif",
  },
};

const UserRoutes = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  const stripeOptions = {
    appearance,
  };

  const options = {
    "client-id":
      "AeARNmB6nLWPSPtzITkcfVqjueDuwfPSYkV2qcquQ23zhn-z07e-RdAPgypoRjth_jXzt7qXVm-VCPhO",
    currency: "USD",
    intent: "capture",
  };

  return (
    <Routes>
      <Route path="login" element={<LoginPage />} />
      <Route path="sign-up" element={<SingupPage />} />

      <Route
        path="checkout/*"
        element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
            <Elements stripe={stripePromise} options={stripeOptions}>
              <PayPalScriptProvider options={options}>
                <CheckoutPage />
              </PayPalScriptProvider>
            </Elements>
          </ProtectedRoutes>
        }
      >
        <Route path="enter-shipping-info" element={<EnterShippingAddress />} />
        <Route path="enter-payment-info" element={<EnterPaymentInfo />} />
      </Route>

      <Route path="payment" element={<PaymentPage />} />
      <Route path="orders/placed-successfully" element={<OrderSuccessPage />} />
      <Route
        path="profile"
        element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
            <ProfilePage />
          </ProtectedRoutes>
        }
      />
      <Route
        path="profile/orders/:orderId"
        element={
          <ProtectedRoutes isAuthenticated={isAuthenticated} role="User">
            <OrderDetailPage />
          </ProtectedRoutes>
        }
      />
      <Route path="inbox" element={<InboxPage />} />
      <Route path="activation/:activation_token" element={<ActivationPage />} />
    </Routes>
  );
};

export default UserRoutes;
