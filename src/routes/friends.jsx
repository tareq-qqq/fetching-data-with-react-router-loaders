import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { getUsers } from "../api/users-api";
import FriendsLoader from "../components/skeletons/friends-loader";
import cn from "../utils/cn";

function Friends() {
  const friendsQuery = useQuery({ queryKey: ["friends"], queryFn: getUsers });

  if (friendsQuery.isPending) {
    return <FriendsLoader />;
  }

  if (friendsQuery.isError) {
    throw friendsQuery.error;
  }

  return (
    <ul className="space-y-2 py-2">
      {friendsQuery.data.map((friend) => {
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
              <span className="text-lg hover:underline">{friend.name}</span>
            </NavLink>
          </li>
        );
      })}
    </ul>
  );
}
export default Friends;
