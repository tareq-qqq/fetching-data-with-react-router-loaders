import BASE_URL from "./BASE_URL";

export async function getComments(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return await res.json();
}
