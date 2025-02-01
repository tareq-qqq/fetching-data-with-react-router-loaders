import { ArrowLeft, Search as SearchIcon, SendToBack } from "lucide-react";
import { forwardRef, useEffect, useState } from "react";
import cn from "../utils/cn";
import {
  Form,
  useLocation,
  useNavigate,
  useOutletContext,
  useSearchParams,
  useSubmit,
} from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { motion, useAnimate } from "framer-motion";

const Search = forwardRef(function Search(
  { onMobile, expanded, setExpanded, className, containerRef },
  ref,
) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  const submit = useSubmit();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const { pathname } = useLocation();
  const [scope, animate] = useAnimate();
  const navigate = useNavigate();

  useEffect(() => {
    setValue(query);
    if (expanded) {
      ref.current.style.display = "initial";
    }
  }, [query, expanded]);

  const debouncedSubmit = useDebouncedCallback((value) => {
    submit(value);
  }, 300);

  /**
   *
   * @param {MouseEvent} e
   */
  async function handleClick(e) {
    e.preventDefault();
    if (!expanded || value === "" || !value) {
      setExpanded(true);
      ref.current.focus();
      ref.current.style.display = "initial";
    }

    console.log(containerRef.current);
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("clicked");
  }

  /**
   *
   * @param {MouseEvent} e
   */
  async function hideSearchBar(e) {
    e.preventDefault();
    setExpanded(false);
    ref.current.style.display = "none";
    navigate(-1);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={cn("flex justify-end", className)}
    >
      <Form
        action={pathname}
        className={cn(
          "flex w-full justify-end rounded  focus-visible:outline-none has-[input:focus-visible]:outline has-[input:focus-visible]:outline-2",
          {
            "border-2": focus,
            "border-none": onMobile && !expanded,
            "border border-gray-400 ": expanded || !onMobile,
            "my-4": onMobile,
            "max-w-sm": !onMobile,
          },
        )}
        ref={scope}
      >
        {!(!onMobile || !expanded) && (
          <button
            aria-controls="#search"
            className={cn(
              " group top-0 flex aspect-square h-10  w-10 shrink-0 items-center justify-center rounded-full transition-colors hover:!bg-black/10 focus-visible:bg-gray-300/40 focus-visible:outline-none",
            )}
            onClick={hideSearchBar}
            type="button"
          >
            <ArrowLeft
              className={cn("text-gray-500 group-focus:text-black ", {
                "text-black": focus,
              })}
              strokeWidth={1}
            />
          </button>
        )}

        <motion.input
          ref={ref}
          id="search"
          type="search"
          className={cn(
            "h-10 w-full flex-grow origin-right rounded px-4 outline-none",
            {
              hidden: onMobile,
            },
          )}
          aria-expanded={expanded}
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

        <button
          aria-controls="#search"
          className={cn(
            " group top-0 flex aspect-square h-full shrink-0 items-center justify-center focus-visible:outline-none",
            {
              "h-10 w-10 rounded-full transition-colors hover:!bg-black/10 focus-visible:bg-gray-300/40":
                onMobile,
            },
          )}
          onClick={handleClick}
          type="submit"
        >
          <SearchIcon
            className={cn("text-gray-500 group-focus:text-black ", {
              "text-black": focus,
            })}
            strokeWidth={1}
          />
        </button>
      </Form>
    </motion.div>
  );
});
export default Search;
