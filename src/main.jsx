import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import ErrorPage from "./erro-page";
import Blog, {loader as blogLoader} from "./routes/blog";
import AllBlogs, {loader as allBlogLoader} from "./routes/allBlogs";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "client/blog/:blogId",
        element: <Blog></Blog>,
        loader: blogLoader,
      },
      {
        path: "client/allBlogPosts",
        element: <AllBlogs />,
        loader: allBlogLoader,
      }
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);