import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./components/errors/error-element";
import NotFound from "./components/errors/not-found";
import Friends from "./routes/friends";
import Post from "./routes/post";
import Posts from "./routes/posts";
import Root from "./routes/root";
import User, { loader as userLoader } from "./routes/user";

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorElement />,
    children: [
      {
        errorElement: <ErrorElement />,
        children: [
          { index: true, element: <Posts /> },
          {
            path: "/posts",
            element: <Posts />,
          },
          {
            path: "/post/:postId",
            element: <Post />,
            id: "post",
          },
          {
            path: "/friends",
            element: <Friends />,
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
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
      </QueryClientProvider>
    </>
  );
}

export default App;
