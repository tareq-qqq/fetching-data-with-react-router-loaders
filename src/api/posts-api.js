import BASE_URL from "./BASE_URL";

export async function getPosts() {
  const res = await fetch(`${BASE_URL}/posts`);
  return await res.json();
}

export async function getPost(postId) {
  const res = await fetch(`${BASE_URL}/posts/${postId}`);
  return await res.json();
}
