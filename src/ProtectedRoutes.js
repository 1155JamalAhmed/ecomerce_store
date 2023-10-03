import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated, children, role }) => {
  if (!isAuthenticated) {
    return (
      <Navigate
        to={`${role === "User" ? "/users/login" : "/shops/login-shop"}`}
        replace
      />
    );
  }
  return children;
};

export const OrderDetailProtect = ({ children }) => {
  const { from } = useLocation().state;
  const { isShopAuthenticated } = useSelector((state) => state.shop);
  const { isAuthenticated } = useSelector((state) => state.user);

  if (from === "user" && !isAuthenticated) {
    return <Navigate to="/users/login" />;
  } else if (from === "shop" && !isShopAuthenticated) {
    return <Navigate to="/shops/login-shop" />;
  }

  return children;
};

export default ProtectedRoutes;
