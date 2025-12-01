/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "./components/ui/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminViewLayout from "./components/admin-view/layout";
import AdminDashBoard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingViewLayout from "./components/shopping-view/layout";
import NotFound from "./pages/not-found/not-found";
import ShoppingViewHome from "./pages/shopping-view/home";
import ShoppingViewListing from "./pages/shopping-view/listing";
import ShoppingViewCheckout from "./pages/shopping-view/checkout";
import ShoppingViewAccount from "./pages/shopping-view/account";
import CheckAuth from "./components/common/check-auth";
import UnAuthPage from "./pages/unauth-page/UnAuthPage";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import Loader from "./components/ui/loader";
import { useToast } from "./hooks/use-toast";

const App = () => {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const [showLoader, setShowLoader] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(checkAuth())
      .unwrap()
      .catch((err) => {
        toast({
          title: "Please log in to continue.",
          description:
            err?.payload?.message ||
            "Unauthorized Access - Invalid or expired token",
          variant: "default",
        });
      });
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [dispatch]);

  if (isLoading || showLoader) {
    return <Loader />;
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white">
        <div className="flex overflow-y-auto flex-grow">
          <Routes>
            <Route
              path="/auth"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AuthLayout />
                </CheckAuth>
              }
            >
              <Route path="login" element={<AuthLogin />} />
              <Route path="register" element={<AuthRegister />} />
            </Route>

            <Route
              path="/admin"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <AdminViewLayout user={user} />
                </CheckAuth>
              }
            >
              <Route path="dashboard" element={<AdminDashBoard />} />
              <Route path="products" element={<AdminProducts />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="features" element={<AdminFeatures />} />
            </Route>

            <Route
              path="/shopping"
              element={
                <CheckAuth isAuthenticated={isAuthenticated} user={user}>
                  <ShoppingViewLayout />
                </CheckAuth>
              }
            >
              <Route path="home" element={<ShoppingViewHome />} />
              <Route path="listing" element={<ShoppingViewListing />} />
              <Route path="checkout" element={<ShoppingViewCheckout />} />
              <Route path="accounts" element={<ShoppingViewAccount />} />
            </Route>

            <Route path="/" element={<Navigate to="/auth/login" replace />} />

            <Route path="unauth-page" element={<UnAuthPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
