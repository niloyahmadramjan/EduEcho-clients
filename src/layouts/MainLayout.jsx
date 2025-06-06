import React from "react";
import { createBrowserRouter } from "react-router";
import Routes from "../routes/Routes";
import Home from "../pages/Home/Home";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Routes,
    children: [
        {
            index: true,
            Component: Home,
        }
    ]
  },
]);

export default router;
