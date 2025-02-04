import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import LoginPage from "../components/LoginPage";
import Browse from "../components/Browse";

const OutletData = () => {
  const router = createBrowserRouter([
    { path: "/", element: <LoginPage /> },
    { path: "/browse", element: <Browse /> },
  ]);
  return <RouterProvider router={router} />;
};

export default OutletData;
