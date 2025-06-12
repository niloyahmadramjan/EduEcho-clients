import React from "react";
import { createBrowserRouter } from "react-router";
import Routes from "../routes/Routes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import FeaturedArticles from "../pages/AllArticles/FeaturedArticles";
import PostArticle from "../pages/PostArticle/PostArticle";
import MyArticles from "../pages/MyArticles/myArticles";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Routes,
    children: [
      {
        path: "*",
        Component: NotFound,
      },
      {
        index: true,
        Component: Home,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/featuredArticles",
        Component: FeaturedArticles
      },
      {
        path: "/postArticle",
        Component: PostArticle,
      },
      {
        path: "/myArticles",
        Component: MyArticles,
      }
    ],
  },
]);

export default router;
