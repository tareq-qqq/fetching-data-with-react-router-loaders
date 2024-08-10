import { Search as SearchIcon, SendToBack } from "lucide-react";
import { useState } from "react";
import cn from "../utils/cn";
import { Form, useSubmit } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

function Search() {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const submit = useSubmit();

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
        value={value}
        onChange={(e) => {
          const value = e.target.value;
          setValue(value);
          submit(value);
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
