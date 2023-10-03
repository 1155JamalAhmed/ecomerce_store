import React from "react";
import ProtectedRoutes from "../ProtectedRoutes";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

import {
  ShopDashboard,
  ShopDiscountCodes,
  ShopInbox,
  ShopWithDrawMoney,
  ShopEvents,
  ShopCreateProduct,
  ShopOrders,
  ShopProducts,
  ShopSettings,
  ShopHomePage,
  CreateShopPage,
  ShopActivationPage,
  LoginShopPage,
  ShopCreateEvent,
  ShopDashboardMain,
} from "../pagesCollections/shopPagesCollection";

const ShopRoutes = () => {
  const { isShopAuthenticated } = useSelector((state) => state.shop);

  return (
    <Routes>
      <Route path="create-shop" element={<CreateShopPage />} />
      <Route path="login-shop" element={<LoginShopPage />} />
      <Route
        path="activation/:activation_token"
        element={<ShopActivationPage />}
      />
      <Route path=":id" element={<ShopHomePage />} />
      <Route
        path="dashboard/*"
        element={
          <ProtectedRoutes isAuthenticated={isShopAuthenticated} role="Shop">
            <ShopDashboard />
          </ProtectedRoutes>
        }
      >
        <Route path="" element={<ShopDashboardMain />} />
        <Route path="products" element={<ShopProducts />} />
        <Route path="orders" element={<ShopOrders />} />
        <Route path="create-product" element={<ShopCreateProduct />} />
        <Route path="events" element={<ShopEvents />} />
        <Route path="create-event" element={<ShopCreateEvent />} />
        <Route path="withdraw-money" element={<ShopWithDrawMoney />} />
        <Route path="inbox" element={<ShopInbox />} />
        <Route path="coupon-codes" element={<ShopDiscountCodes />} />
        <Route path="settings" element={<ShopSettings />} />
      </Route>
    </Routes>
  );
};

export default ShopRoutes;
