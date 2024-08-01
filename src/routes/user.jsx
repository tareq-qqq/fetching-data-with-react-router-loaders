import {
  Await,
  defer,
  useLoaderData,
  useRouteLoaderData,
} from "react-router-dom";
import { getUser, getUserPosts } from "../api/users-api";
import Posts from "./posts";
import PaginatedPostsList from "../components/paginated-posts/paginated-posts-list";
import { Suspense } from "react";
import UserSkeleton from "../components/skeletons/user-skeleton";

export async function loader({ params }) {
  const userAndPostsPromise = Promise.all([
    getUser(params.userId),
    getUserPosts(params.userId),
  ]);
  return defer({ userAndPostsPromise });
}

function User() {
  const { userAndPostsPromise } = useLoaderData();

  return (
    <Suspense fallback={<UserSkeleton />}>
      <Await resolve={userAndPostsPromise}>
        {([user, posts]) => (
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-medium">{user.name}</h1>
              <p>@{user.username}</p>
            </div>
            <PaginatedPostsList posts={posts} />
          </div>
        )}
      </Await>
    </Suspense>
  );
}
export default User;
