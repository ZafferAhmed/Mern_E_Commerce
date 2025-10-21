import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  const path = location.pathname;

  if (!isAuthenticated) {
    if (path.includes("/login") || path.includes("/register")) {
      return children;
    }
    return <Navigate to="/auth/login" replace />;
  }

  if (path.includes("/login") || path.includes("/register")) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    }
    if (user?.role === "user") {
      return <Navigate to="/shopping/home" replace />;
    }
  }

  if (user?.role === "admin") {
    if (path.startsWith("/shopping")) {
      return <Navigate to="/admin/dashboard" replace />;
    }
  } else if (user?.role === "user") {
    if (path.startsWith("/admin")) {
      return <Navigate to="/unauth-page" replace />;
    }
  }
  return children;
};

export default CheckAuth;
