import {
  Await,
  defer,
  useLoaderData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { getUser, getUsers } from "../api/users-api";
import { NavLink } from "react-router-dom";
import cn from "../utils/cn";
import { Suspense } from "react";
import { divider } from "@nextui-org/theme";
import { Spinner } from "@nextui-org/spinner";

export async function loader() {
  return defer({ friends: getUsers() });
}

function Friends() {
  const { friends } = useLoaderData();
  const navigation = useNavigation();
  const loading = navigation.location?.pathname === "/friends";

  return (
    <>
      {loading ? (
        <div className="mt-14 flex w-full place-content-center">
          <Spinner
            classNames={{
              circle1: "border-b-blue-600",
              circle2: "border-b-blue-600",
            }}
          />
        </div>
      ) : (
        <Suspense
          fallback={
            <div className="mt-14 flex w-full place-content-center">
              <Spinner
                classNames={{
                  circle1: "border-b-blue-600",
                  circle2: "border-b-blue-600",
                }}
              />
            </div>
          }
        >
          <Await resolve={friends}>
            {(friends) => (
              <ul className="space-y-2 py-2">
                {friends.map((friend) => {
                  return (
                    <li key={friend.id}>
                      <NavLink
                        className={({ isPending, isTransitioning }) => {
                          return cn({
                            "pointer-events-none": isPending || isTransitioning,
                          });
                        }}
                        to={`/user/${friend.id}`}
                      >
                        <span className="text-lg hover:underline">
                          {friend.name}
                        </span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            )}
          </Await>
        </Suspense>
      )}
    </>
  );
}
export default Friends;
