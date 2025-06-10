import React from "react";
import { createBrowserRouter } from "react-router";
import Routes from "../routes/Routes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";

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
        {
          path: '/register',
          Component: Register,
        },
        
        {
          path: "*",
          Component: NotFound
        }
    ]
  },
]);

export default router;
