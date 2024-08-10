import { Search as SearchIcon, SendToBack } from "lucide-react";
import { useEffect, useState } from "react";
import cn from "../utils/cn";
import { Form, useLocation, useSubmit } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const submit = useSubmit();
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const query = searchParams.get("q");

  useEffect(() => {
    setValue(query);
    console.log(`setting value to ${query}`);
  }, [query]);

  const debouncedSubmit = useDebouncedCallback((value) => {
    submit(value);
  }, 500);

  return (
    <Form action="/" className="relative w-full max-w-sm">
      <input
        type="search"
        className="relative w-full  rounded border-2 border-gray-400 p-1 pl-8 outline-none focus-visible:border-black "
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Search posts..."
        name="q"
        value={value || ""}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
          submit(e.target.form, { replace: !(query == null) });
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
}
export default Search;
