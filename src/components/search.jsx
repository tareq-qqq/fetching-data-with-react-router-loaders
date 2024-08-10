import { Search as SearchIcon } from "lucide-react";
import { useRef, useState } from "react";
import cn from "../utils/cn";

function Search() {
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="search"
        className="relative w-full  rounded border-2 border-gray-400 p-1 pl-8 outline-none focus-visible:border-black "
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        placeholder="Search posts..."
      />
      <SearchIcon
        className={cn("absolute left-1 top-1 text-gray-500", {
          "text-black": focus,
        })}
        strokeWidth={1}
      />
    </div>
  );
}
export default Search;
