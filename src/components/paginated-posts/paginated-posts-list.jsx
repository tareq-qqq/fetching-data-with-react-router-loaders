import Pagination from "../pagination";
import { usePagination } from "../../hooks/usePagination";
import cn from "../../utils/cn";
import classes from "./paginated-posts-list.module.css";
import PostElement from "../post-element";
import { useEffect, useRef } from "react";

function PaginatedPostsList({ posts }) {
  const { totalPages, data, setPageIndex, pageIndex } = usePagination({
    itemsPerPage: 8,
    data: posts,
  });

  console.log(pageIndex);
  const paginationContainerRef = useRef(null);

  return (
    <>
      <div ref={paginationContainerRef} className={cn("mb-4", classes.posts)}>
        {data.length > 0 ? (
          data.map((post) => <PostElement key={post.id} post={post} />)
        ) : (
          <div>No posts were found</div>
        )}
      </div>
      {totalPages > 1 && (
        <Pagination
          total={totalPages}
          setPageIndex={setPageIndex}
          pageIndex={pageIndex}
        />
      )}
    </>
  );
}
export default PaginatedPostsList;
