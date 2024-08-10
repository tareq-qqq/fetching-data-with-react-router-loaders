import { Search as SearchIcon, SendToBack } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import cn from "../utils/cn";
import {
  Form,
  useLocation,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

const Search = forwardRef(function Search(props, ref) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { pathname } = useLocation();

  useEffect(() => {
    setValue(query);
  }, [query]);

  const debouncedSubmit = useDebouncedCallback((value) => {
    submit(value);
  }, 300);

  return (
    <Form action={pathname} className="relative w-full max-w-sm">
      <input
        ref={ref}
        type="search"
        className={cn(
          "relative w-full  rounded border border-gray-400 p-1 pl-8 outline-none focus-visible:border-black ",
          {
            "border-2": focus,
          },
        )}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Search posts..."
        name="q"
        value={value || ""}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
          debouncedSubmit(e.target.form, { replace: !(query == null) });
        }}
      />
      <SearchIcon
        className={cn("absolute left-1 top-1 text-gray-500", {
          "text-black": focus,
        })}
        strokeWidth={1}
      />
    </Form>
  );
});
export default Search;
