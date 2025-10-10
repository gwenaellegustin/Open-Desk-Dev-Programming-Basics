export async function fetchContent(path, src) {
  const response = await fetch(path + src);
  const data = await response.json();
  return data;
}
