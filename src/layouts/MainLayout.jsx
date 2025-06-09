import React from "react";
import { createBrowserRouter } from "react-router";
import Routes from "../routes/Routes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Routes,
    children: [
        {
            index: true,
            Component: Home,
        },
        {
          path: '/login',
          Component: Login
        },
    ]
  },
]);

export default router;
