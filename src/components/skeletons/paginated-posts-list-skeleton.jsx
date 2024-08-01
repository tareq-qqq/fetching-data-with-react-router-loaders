import cn from "../../utils/cn";
import classes from "../../components/paginated-posts/paginated-posts-list.module.css";
import PostSkeleton from "./post-skeleton";

function PaginatedPostsListSkeleton({ number = 8, comments }) {
  const range = Array.from(Array(number));
  return (
    <div className={cn("mb-4", classes.posts)}>
      {range.map((e, i) => (
        <PostSkeleton key={i} comments={comments} />
      ))}
    </div>
  );
}
export default PaginatedPostsListSkeleton;
