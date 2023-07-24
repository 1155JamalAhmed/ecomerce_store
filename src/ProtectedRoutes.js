import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoutes = ({ isAuthenticated, children, role }) => {
  if (!isAuthenticated) {
    return (
      <Navigate to={`${role === "User" ? "/login" : "/login-shop"}`} replace />
    );
  }
  return children;
};

export default ProtectedRoutes;
