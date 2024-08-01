import BASE_URL from "./BASE_URL";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return await res.json();
}

export async function getUser(userId) {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  return await res.json();
}

export async function getUserPosts(userId) {
  const res = await fetch(`${BASE_URL}/posts/?userId=${userId}`);
  return await res.json();
}
