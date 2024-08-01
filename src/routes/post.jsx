import { Await, defer, useLoaderData } from "react-router-dom";
import { getComments } from "../api/comments-api";
import BackButton from "../components/ui/back-button";
import { Suspense } from "react";
import PostElement from "../components/post-element";
import AsyncErrorElement from "../components/errors/async-error-element";
import { getPost } from "../api/posts-api";
import PostSkeleton from "../components/skeletons/post-skeleton";

export async function loader({ params }) {
  const postAndCommentsPromise = Promise.all([
    getPost(params.postId),
    getComments(params.postId),
  ]);

  return defer({ postAndCommentsPromise });
}

function Post() {
  const { postAndCommentsPromise } = useLoaderData();

  return (
    <>
      <Suspense fallback={<PostSkeleton comments={true} />}>
        <Await
          resolve={postAndCommentsPromise}
          errorElement={<AsyncErrorElement />}
        >
          {([post, comments]) => (
            <PostElement post={post} comments={comments} />
          )}
        </Await>
      </Suspense>

      <BackButton className={" ml-auto mr-0 mt-2  block"} />
    </>
  );
}
export default Post;
