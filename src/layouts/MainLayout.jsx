import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router";
import Routes from "../routes/Routes";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import NotFound from "../pages/NotFound/NotFound";
import FeaturedArticles from "../pages/AllArticles/FeaturedArticles";
import PostArticle from "../pages/PostArticle/PostArticle";
import MyArticles from "../pages/MyArticles/myArticles";
import PrivateRoutes from "../components/PrivateRoute/PrivateRoutes";
import About from "../pages/About/About";
import ArticleDetails from "../pages/ArticleDetails/ArticleDetails";
import LoadingAnimation from "../pages/loadingPage/LoadingAnimation";
import CategoryArticle from "../pages/CategoriesSection/CategoryArticle";

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
        Component: FeaturedArticles,
      },
      {
        path: "/postArticle",
        element: (
          <PrivateRoutes>
            <PostArticle></PostArticle>
          </PrivateRoutes>
        ),
      },
      {
        path: "/myArticles",
        element: (
          <PrivateRoutes>
            <MyArticles></MyArticles>
          </PrivateRoutes>
        ),
      },
      {
        path: "aboutUs",
        Component: About,
      },
      {
        path: "/readMore/:id",
        loader: ({ params }) =>
          fetch(`https://eduecho-server.vercel.app/articles/${params.id}`),
        element: (
          <PrivateRoutes>
            <ArticleDetails></ArticleDetails>
          </PrivateRoutes>
        ),
        hydrateFallbackElement: <LoadingAnimation></LoadingAnimation>,
      },
      {
        path: "/categoryArticle/:id",
        loader: ({ params }) =>
          fetch(
            `https://eduecho-server.vercel.app/articlesCategory/${params.id}`
          ),
        element: <CategoryArticle></CategoryArticle>,
        hydrateFallbackElement: <LoadingAnimation></LoadingAnimation>,
      },
    ],
  },
]);

export default router;
