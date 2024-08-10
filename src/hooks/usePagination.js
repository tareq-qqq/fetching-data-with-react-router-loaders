import { useEffect, useState } from "react";

export function usePagination({ itemsPerPage, data }) {
  const [pageIndex, setPageIndex] = useState(0);
  // const [prevData, setPrevData] = useState(data);

  // if (data !== prevData) {
  //   console.log("data is changing");
  //   setPrevData(data);
  //   setPageIndex(0);
  // }
  console.log(data);

  useEffect(() => {
    setPageIndex(0);
  }, [data]);

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
