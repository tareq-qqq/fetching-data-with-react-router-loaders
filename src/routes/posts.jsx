import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPosts } from "../api/posts-api";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import PaginatedPostsListSkeleton from "../components/skeletons/paginated-posts-list-skeleton";
import { useInvalidateOnNavigation } from "../hooks/useInvalidateOnNavigation";

function Posts() {
  const postsQuery = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  useInvalidateOnNavigation(["posts"]);

  if (postsQuery.isPending) {
    return <PaginatedPostsListSkeleton />;
  }

  if (postsQuery.isError) {
    throw postsQuery.error;
  }

  return <PaginatedPostsList posts={postsQuery.data} />;
}
export default Posts;
