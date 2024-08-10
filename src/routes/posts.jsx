import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/posts-api";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import PaginatedPostsListSkeleton from "../components/skeletons/paginated-posts-list-skeleton";
import { useInvalidateOnNavigation } from "../hooks/useInvalidateOnNavigation";
import { useSearchParams } from "react-router-dom";
import { matchSorter } from "match-sorter";

function Posts() {
  const postsQuery = useQuery({ queryKey: ["posts"], queryFn: getPosts });
  useInvalidateOnNavigation(["posts"]);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  if (postsQuery.isPending) {
    return <PaginatedPostsListSkeleton />;
  }

  if (postsQuery.isError) {
    throw postsQuery.error;
  }

  const posts = postsQuery.data;

  return (
    <PaginatedPostsList
      posts={
        query
          ? matchSorter(posts, query, {
              keys: ["title", "body"],
            })
          : posts
      }
    />
  );
}
export default Posts;
