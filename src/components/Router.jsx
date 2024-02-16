import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import App from "./App";
import Navbar from "./Navbar";
import PostPage from "./PostPage";
import ErrorPage from "./ErrorPage";
import { useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import PostCreate from "./PostCreate";

function Layout({ setToken }) {
  return (
    <>
      <Navbar setToken={setToken} />
      <Outlet />
    </>
  );
}

const Router = () => {
  const [token, setToken] = useState(localStorage.getItem("jwt-token"));

  const router = createBrowserRouter([
    {
      element: <Layout setToken={setToken} />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <App />,
          errorElement: <ErrorPage />,
        },

        {
          path: "posts/:postid",
          element: <PostPage />,
          errorElement: <ErrorPage />,
        },
        {
          path: "login",
          element: <LoginPage setToken={setToken} />,
          errorElement: <ErrorPage />,
        },
        {
          path: "posts/create",
          element: <PostCreate />,

          errorElement: <ErrorPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
