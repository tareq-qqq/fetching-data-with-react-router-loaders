import { NavLink } from "react-router-dom";
import Comment from "./comment";
import cn from "../utils/cn";

function PostElement({ post, comments }) {
  const { id, title, body } = post;
  return (
    <div className="mx-auto  max-w-xl rounded bg-gray-200 p-5 shadow-lg">
      <h2 className="text-lg font-medium">
        <NavLink
          to={`/post/${id}`}
          className={cn("hover:underline", {
            "pointer-events-none":
              navigation.location?.pathname === `/post/${id}`,
          })}
        >
          {title}
        </NavLink>
      </h2>
      <p className="mb-4">{body}</p>

      <span className="block text-end">PostId: {id}</span>

      {comments && (
        <div>
          <h3 className="mb-2 font-medium">Comments:</h3>
          <div className="space-y-2">
            {comments.map((comment) => {
              return (
                <Comment
                  body={comment.body}
                  email={comment.email}
                  key={comment.id}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
export default PostElement;
