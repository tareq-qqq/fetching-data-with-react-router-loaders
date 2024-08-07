import { useLocation, NavLink } from "react-router-dom";
import cn from "../../utils/cn";
function RootNav({ className }) {
  const path = useLocation().pathname;
  return (
    <nav className={cn("sticky top-0  border-b-2 bg-white", className)}>
      <ul className="wrap flex gap-8 px-4 py-5 ">
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
    </nav>
  );
}
export default RootNav;
