import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root, {loader as rootLoader, action as rootAction} from "./routes/root";
import ErrorPage from "./erro-page";
import Blog, {loader as blogLoader, action as blogAction} from "./routes/blog";
import AllBlogs from "./routes/allBlogs";
import AllBlogRequests, {loader as allBlogRequestLoader, action as allBlogRequestAction} from "./routes/allBlog-requests";
import CreateBlogRequest, {action as createBlogRequestAction} from "./routes/new-request";
import BlogRequest , {loader as blogRequestloader} from "./routes/request-blog";
import Index ,{loader as indexLoader} from "./routes";
import SignUp , {action as signUpAction}  from "./routes/auth-routes/signUp";
import LogIn, {action as logInAction} from "./routes/auth-routes/logIn";
import ProtectedRoute from "./routes/ProtectedRoute";
import Author, {loader as authorLoader} from "./routes/author";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        index: true,
        element: <Index />,
        loader: indexLoader,
      },
      {
        path: 'authenticate/signUp',
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: 'authenticate/logIn',
        element: <LogIn />,
        action: logInAction
      },
      {
        path: "client/blog/:blogId",
        element: <Blog></Blog>,
        loader: blogLoader,
        action: blogAction,
      },
      {
        path: "client/allBlogPosts",
        element: <AllBlogs />,
      },
      {
        path:"client/allBlogRequests",
        element: <AllBlogRequests />,
        loader: allBlogRequestLoader,
        action: allBlogRequestAction,
      },
      {
        path:"client/requestBlog/:reqId",
        element: <BlogRequest />,
        loader: blogRequestloader,
      },
      {
        path: 'blogger/:authorId',
        element: < Author />,
        loader: authorLoader
      },
      {
        element: <ProtectedRoute />,
        children:[
          
          {
            path: "client/requestBlog",
            element: <CreateBlogRequest />,
            action: createBlogRequestAction,
          },
          
        ]
      },
    ]
  },
  
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);