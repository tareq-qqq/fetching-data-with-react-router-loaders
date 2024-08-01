import { useLoaderData, defer, Await, useNavigation } from "react-router-dom";
import { getPosts } from "../api/posts-api";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import { Suspense, useEffect } from "react";
import AsyncErrorElement from "../components/errors/async-error-element";
import PaginatedPostsListSkeleton from "../components/skeletons/paginated-posts-list-skeleton";

export async function loader(props) {
  console.log("posts are loading");
  return defer({ posts: getPosts() });
}

function Posts() {
  const { posts } = useLoaderData();

  const navigation = useNavigation();
  const loading = navigation.location?.pathname === "/posts";

  return (
    <>
      {/* 
        The suspense fallback will only show when you navigate to this route
        with different params, so it won't show on refresh,
        that's to keep submitting forms from rendering the fallback 
      */}
      {loading ? (
        <PaginatedPostsListSkeleton />
      ) : (
        <Suspense fallback={<PaginatedPostsListSkeleton />}>
          <Await resolve={posts} errorElement={<AsyncErrorElement />}>
            {(posts) => {
              return <PaginatedPostsList posts={posts} />;
            }}
          </Await>
        </Suspense>
      )}
    </>
  );
}
export default Posts;
