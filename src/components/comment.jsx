function Comment({ body, email }) {
  return (
    <div className="w-fit  rounded-xl bg-slate-100 p-4">
      <p className="font-medium">{email}</p>
      <p>{body}</p>
    </div>
  );
}
export default Comment;
