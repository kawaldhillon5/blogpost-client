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
import AllBlogRequests, {loader as allBlogRequestLoader, action as allBlogRequestAction} from "./routes/allBlog-requests";
import CreateBlogRequest, {action as createBlogRequestAction} from "./routes/new-request";
import BlogRequest , {loader as blogRequestloader} from "./routes/request-blog";

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
      },
      {
        path:"client/allBlogRequests",
        element: <AllBlogRequests />,
        loader: allBlogRequestLoader,
        action: allBlogRequestAction,
      },
      {
        path: "client/requestBlog",
        element: <CreateBlogRequest />,
        action: createBlogRequestAction,
      },
      {
        path:"client/requestBlog/:reqId",
        element: <BlogRequest />,
        loader: blogRequestloader,
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);