import { useLocation, NavLink, useNavigation } from "react-router-dom";
import cn from "../../utils/cn";
import { useIsFetching } from "@tanstack/react-query";
import { Progress } from "@nextui-org/progress";
import Search from "../../components/search";
import { forwardRef, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const RootNav = forwardRef(function RootNav({ className, containerRef }, ref) {
  const path = useLocation().pathname;
  // since we're using deferred data in our router loaders the navigation won't be in loading state for long
  // so the deferred promises would still be pending even though the navigation is in the idle state
  const navigation = useNavigation();
  const numOfFetching = useIsFetching();
  const isFetching = numOfFetching > 0 || navigation.state === "loading";
  const onPosts = path === "/" || path === "/posts" || path.includes("/user");
  const mql = window.matchMedia("(max-width: 37.5rem)");
  const [searchIsOpen, setSearchIsOpen] = useState(false);
  const [onMobile, setOnMobile] = useState(mql.matches);

  useEffect(() => {
    function onResize() {
      if (mql.matches) {
        setOnMobile(true);
      } else {
        setOnMobile(false);
      }
    }

    addEventListener("resize", onResize);
    return () => {
      removeEventListener("resize", onResize);
    };
  }, [mql.matches]);

  return (
    <nav id="root-nav" className={cn("sticky top-0 z-10 bg-white", className)}>
      <div className="container mx-auto flex items-center px-4 ">
        {(!onMobile || !searchIsOpen || !onPosts) && (
          <ul className="wrap mr-8 flex space-x-6 py-5 ">
            <li>
              <NavLink
                to={"/posts"}
                state={{ previousPathname: path }}
                className={({ isActive, isTransitioning, isPending }) => {
                  return cn(
                    " underline-offset-4 transition-colors hover:text-blue-600 active:text-black",
                    {
                      "underline decoration-blue-600": isActive || path === "/",
                      "underline decoration-blue-400 opacity-75":
                        isTransitioning || isPending,
                      "pointer-events-none": isTransitioning || isPending,
                    },
                  );
                }}
              >
                {" Posts"}
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/friends"}
                state={{ previousPathname: path }}
                className={({ isActive, isPending, isTransitioning }) => {
                  return cn(
                    " underline-offset-4 transition-colors hover:text-blue-600 active:text-black",
                    {
                      "underline decoration-blue-600": isActive,
                      "underline decoration-blue-400 opacity-75":
                        isTransitioning || isPending,
                      "pointer-events-none": isTransitioning || isPending,
                    },
                  );
                }}
              >
                {" Friends"}
              </NavLink>
            </li>
          </ul>
        )}
        <AnimatePresence>
          {onPosts && (
            <Search
              onMobile={onMobile}
              expanded={searchIsOpen}
              setExpanded={setSearchIsOpen}
              ref={ref}
              className={"w-full"}
              containerRef={containerRef}
            />
          )}
        </AnimatePresence>
      </div>

      {!isFetching && <div className="h-[1.75px] w-full bg-gray-200"></div>}
      {isFetching && (
        <Progress
          aria-label="Loading..."
          color="primary"
          radius="none"
          isIndeterminate={isFetching}
          classNames={{ track: "h-[1.75px]" }}
        />
      )}
    </nav>
  );
});
export default RootNav;
