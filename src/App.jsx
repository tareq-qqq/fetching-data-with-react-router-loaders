import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import Post from "./routes/post";
import Posts, { loader as postsLoader } from "./routes/posts";
import { loader as postLoader } from "./routes/post";
import { loader as userLoader } from "./routes/user";
import { loader as friendsLoader } from "./routes/friends";
import User from "./routes/user";
import Friends from "./routes/friends";
import ErrorElement from "./components/errors/error-element";
import NotFound from "./components/errors/not-found";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import queryClient from "./vendors/query-client";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          { index: true, element: <Posts />, loader: postsLoader },
          {
            path: "/posts",
            element: <Posts />,
            loader: postsLoader,
          },
          {
            path: "/post/:postId",
            element: <Post />,
            loader: postLoader,
            id: "post",
          },
          {
            path: "/friends",
            element: <Friends />,
            loader: friendsLoader,
          },
          {
            path: "/user/:userId",
            element: <User />,
            loader: userLoader,
          },
          {
            path: "*",
            element: <NotFound />,
          },
          // { path: "/friends", element: <Friends /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ReactQueryDevtools client={queryClient} />
    </>
  );
}

export default App;
