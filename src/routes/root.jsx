import { Outlet, ScrollRestoration, useNavigation } from "react-router-dom";
import RootNav from "../pages/root/root-nav";

function Root() {
  return (
    <>
      <div className="mx-auto px-4 pt-10 ">
        <h1 className="mb-4 text-2xl font-medium">
          Fetching data in <span>React</span>
        </h1>
      </div>
      <RootNav />

      {/* You need to use react router defer to dislay localized loading ui instead of this madness */}

      {/* {pathname === "/posts" || pathname === "/" ? (
        "Posts are loading..."
      ) : pathname === "/friends" ? (
        "Friends are loading..."
      ) : pathname?.includes("/user") ? (
        "User is loading"
      ) : pathname?.includes("/post") ? (
        "Post is loading..."
      ) : ( */}
      <div className="container mx-auto my-4 px-4">
        <Outlet />
      </div>
      {/* )} */}

      <ScrollRestoration
        // this keeps the scroll position on "/posts", and "/"
        // so it doesn't scroll to the top whenever you navigate to them no matter how you navigate to them
        // ( back button, or clicking on a NavLink)
        // all the other pathnames will scroll to the top always
        getKey={(location) => {
          const paths = ["/posts", "/"];
          return paths.includes(location.pathname) &&
            location.pathname != location.state?.previousPathname
            ? location.pathname
            : location.key;
        }}
      />
    </>
  );
}

export default Root;
