import Pagination from "../pagination";
import { usePagination } from "../../hooks/usePagination";
import cn from "../../utils/cn";
import classes from "./paginated-posts-list.module.css";
import PostElement from "../post-element";
import { useRef } from "react";

function PaginatedPostsList({ posts }) {
  const { totalPages, data, setPageIndex } = usePagination({
    itemsPerPage: 8,
    data: posts,
  });

  const paginationContainerRef = useRef(null);

  return (
    <>
      <div ref={paginationContainerRef} className={cn("mb-4", classes.posts)}>
        {data.map((post) => (
          <PostElement key={post.id} post={post} />
        ))}
      </div>
      {totalPages > 1 && (
        <Pagination total={totalPages} setPageIndex={setPageIndex} />
      )}
    </>
  );
}
export default PaginatedPostsList;
