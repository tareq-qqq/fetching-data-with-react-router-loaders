import { Skeleton } from "@nextui-org/skeleton";
import PaginatedPostsListSkeleton from "./paginated-posts-list-skeleton";

function UserSkeleton() {
  return (
    <div className="mt-2 space-y-4">
      <div className="space-y-2">
        <Skeleton
          className={"flex h-6 max-w-56 rounded-sm bg-gray-300 "}
          classNames={{ base: "before:via-gray-400" }}
        />
        <Skeleton
          className={"flex h-4 max-w-40 rounded-full bg-gray-300 "}
          classNames={{ base: "before:via-gray-400" }}
        />
      </div>
      <PaginatedPostsListSkeleton number={4} />
    </div>
  );
}
export default UserSkeleton;
