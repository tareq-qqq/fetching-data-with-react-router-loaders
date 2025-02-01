import Pagination from "../pagination";
import { usePagination } from "../../hooks/usePagination";
import cn from "../../utils/cn";
import classes from "./paginated-posts-list.module.css";
import PostElement from "../post-element";
import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  useNavigation,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import Mark from "mark.js";
import { matchSorter } from "match-sorter";

const PaginatedPostsList = forwardRef(function PaginatedPostsList(
  { posts },
  ref,
) {
  const { searchRef, postsContainerRef } = useOutletContext();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [searchIsFocused, setIsSearchFocused] = useState(false);
  const scrollMarginRef = useRef(
    document.getElementById("root-nav").offsetHeight,
  );

  useLayoutEffect(() => {
    scrollMarginRef.current = document.getElementById("root-nav").offsetHeight;
  });

  const visiblePosts = useMemo(() => {
    if (query) {
      return matchSorter(posts, query, {
        keys: ["title", "body"],
        threshold: matchSorter.rankings.CONTAINS,
      });
    }
    return posts;
  }, [query, posts]);

  const markerRef = useRef(null);

  const { totalPages, data, setPageIndex, pageIndex } = usePagination({
    itemsPerPage: 8,
    data: visiblePosts,
  });

  useEffect(() => {
    let q = query;
    if (!markerRef.current && postsContainerRef.current) {
      markerRef.current = new Mark(postsContainerRef.current, {
        acrossElements: true,
      });
    }
    if (markerRef.current && q && searchIsFocused) {
      markerRef.current.mark(q, {
        exclude: ["#not-found"],
      });
    }

    return () => {
      markerRef.current?.unmark(q);
    };
  }, [query, pageIndex, searchRef, searchIsFocused, postsContainerRef]);

  useEffect(() => {
    const searchElem = searchRef.current;
    let q = query;
    function onBlur(e) {
      setIsSearchFocused(false);
      if (postsContainerRef.current && markerRef.current) {
        markerRef.current.unmark();
      }
    }

    function onFocus(e) {
      setIsSearchFocused(true);
      postsContainerRef.current.scrollIntoView({ behavior: "smooth" });
      if (q && markerRef.current) {
        markerRef.current.mark(q);
      }
    }

    searchElem?.addEventListener("blur", onBlur);
    searchElem?.addEventListener("focus", onFocus);

    return () => {
      searchElem?.removeEventListener("blur", onBlur);
      searchElem?.removeEventListener("focus", onFocus);
    };
  }, [searchRef, query, postsContainerRef]);

  return (
    <>
      <div
        id="posts-container"
        ref={postsContainerRef}
        className={cn("mb-4 ", classes.posts)}
        style={{ scrollMarginTop: `calc(${scrollMarginRef.current}px + 1rem)` }}
      >
        {data.length > 0 ? (
          data.map((post) => <PostElement key={post.id} post={post} />)
        ) : (
          <div id="not-found">No posts were found</div>
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
});

export default PaginatedPostsList;
