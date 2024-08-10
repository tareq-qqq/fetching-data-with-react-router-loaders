import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/posts-api";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import PaginatedPostsListSkeleton from "../components/skeletons/paginated-posts-list-skeleton";
import { useInvalidateOnNavigation } from "../hooks/useInvalidateOnNavigation";
import Fuse from "fuse.js";
import { useSearchParams } from "react-router-dom";

function Posts() {
  const postsQuery = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  useInvalidateOnNavigation(["posts"]);
  const [searchParams, setSearchParams] = useSearchParams();

  if (postsQuery.isPending) {
    return <PaginatedPostsListSkeleton />;
  }

  if (postsQuery.isError) {
    throw postsQuery.error;
  }

  const posts = postsQuery.data;
  const fuse = new Fuse(posts, {
    keys: ["title", "body"],
  });
  return <PaginatedPostsList posts={posts} />;
}
export default Posts;
