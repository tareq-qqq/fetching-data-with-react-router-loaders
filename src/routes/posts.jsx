import {
  useQuery,
} from "@tanstack/react-query";
import { getPosts } from "../api/posts-api";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import PaginatedPostsListSkeleton from "../components/skeletons/paginated-posts-list-skeleton";


function Posts() {

  const postsQuery = useQuery({ queryKey: ["posts"], queryFn: getPosts });


  if (postsQuery.isPending) {
    return <PaginatedPostsListSkeleton />;
  }

  if (postsQuery.isError) {
    throw postsQuery.error;
  }

  return <PaginatedPostsList posts={postsQuery.data} />;

}
export default Posts;
