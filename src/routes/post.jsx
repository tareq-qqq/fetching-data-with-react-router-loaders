import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getComments } from "../api/comments-api";
import { getPost } from "../api/posts-api";
import PostElement from "../components/post-element";
import PostSkeleton from "../components/skeletons/post-skeleton";
import BackButton from "../components/ui/back-button";

function Post() {
  const { postId } = useParams();

  // This won't refresh if the user clicks the NavLink in the same route
  // ex:
  // clicking on Posts in the root "/" or the "/posts" routes
  // won't refetch the data, because the query dependencies haven't changed
  // therefore it's bets to use react query with react router's loaders and actions

  const { isPending, isError, error, data } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => Promise.all([getPost(postId), getComments(postId)]),
  });

  if (isPending) {
    return <PostSkeleton comments={true} />;
  }

  if (isError) {
    throw error;
  }

  const [post, comments] = data;

  return (
    <>
      <PostElement post={post} comments={comments} />
      <BackButton className={" ml-auto mr-0 mt-2  block"} />
    </>
  );
}
export default Post;
