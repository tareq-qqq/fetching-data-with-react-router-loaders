import { Pagination as NextPagination } from "@nextui-org/pagination";
function Pagination({ total, setPageIndex, pageIndex }) {
  return (
    <div className="flex items-center justify-center ">
      <NextPagination
        page={pageIndex + 1}
        showControls
        total={total}
        onChange={(page) => {
          setPageIndex(page - 1);
          // Scroll to top of document after the pagination animation finishes
          // setTimeout(() => {
          //   document.body.scrollIntoView();
          // }, 250);
        }}
        radius="full"
        color="primary"
        loop
      />
    </div>
  );
}
export default Pagination;
