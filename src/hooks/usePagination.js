import { useState } from "react";

export function usePagination({ itemsPerPage, data }) {
  const [pageIndex, setPageIndex] = useState(0);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  data = data.slice(pageIndex * itemsPerPage, itemsPerPage * (pageIndex + 1));

  function onNext() {
    if (pageIndex < totalPages - 1) {
      setPageIndex(pageIndex + 1);
    }
  }
  function onPrevious() {
    if (pageIndex > 0) {
      setPageIndex(pageIndex - 1);
    }
  }

  return {
    onNext,
    onPrevious,
    totalPages,
    pageIndex,
    data,
    setPageIndex,
  };
}
