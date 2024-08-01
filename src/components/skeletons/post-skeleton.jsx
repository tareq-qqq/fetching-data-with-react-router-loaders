import { Skeleton } from "@nextui-org/skeleton";

function PostSkeleton({ comments }) {
  return (
    <div className="mx-auto w-full max-w-xl space-y-4 rounded bg-gray-200 p-5 shadow-lg">
      <div className="space-y-2 ">
        <Skeleton
          className={"flex h-5 w-4/6 rounded-full bg-gray-300 "}
          classNames={{ base: "before:via-gray-400" }}
        />
        <Skeleton
          classNames={{ base: "before:via-gray-400" }}
          className="flex h-5 w-5/12 rounded-full bg-gray-300 "
        />
      </div>
      <div className="space-y-2 pb-10">
        <Skeleton
          classNames={{ base: "before:via-gray-400" }}
          className="flex h-4 w-full rounded-full bg-gray-300 "
        />

        <Skeleton
          classNames={{ base: "before:via-gray-400" }}
          className="flex h-4 w-full rounded-full bg-gray-300 "
        />
        <Skeleton
          classNames={{ base: "before:via-gray-400" }}
          className="flex h-4 w-full rounded-full bg-gray-300 "
        />
        <Skeleton
          classNames={{ base: "before:via-gray-400" }}
          className="flex h-4 w-5/6 rounded-full bg-gray-300 "
        />
      </div>
      {comments && (
        <div className="space-y-2">
          <Skeleton
            className="bg-slate-100"
            classNames={{
              base: "min-h-32 w-full max-w-[25rem] rounded-xl  before:via-gray-200",
            }}
          />

          <Skeleton
            className="bg-slate-100"
            classNames={{
              base: "min-h-20 w-full max-w-[20rem] rounded-xl  before:via-gray-200",
            }}
          />

          <Skeleton
            className="bg-slate-100"
            classNames={{
              base: "min-h-20 w-full max-w-sm rounded-xl  before:via-gray-200",
            }}
          />
        </div>
      )}
    </div>
  );
}

export default PostSkeleton;
