import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import Home from "../components/Home";
import LandingPage from "../components/LandingPage";
import RegisterPage from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";
import OtpVerify from "../pages/OtpVerify";
import UpdatePassword from "../pages/UpdatePassword";
const OutletData = () => {
  const router = createBrowserRouter([
    { path: "/", element: <LandingPage /> },
    { path: "/register", element: <RegisterPage />},
    {path:"/forgot-password", element:<ForgetPassword/>},
    {path: "/verify-otp", element: <OtpVerify/>},
    {path:"/update-password", element: <UpdatePassword/>},
    { path: "/home", element: <Home /> },
  ]);
  return <RouterProvider router={router} />;
};

export default OutletData;
