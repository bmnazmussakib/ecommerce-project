
export function fixImageUrl(url) {
  if (!url) return "";

  let path = "";

  if (url.startsWith("http")) {
    const urlObj = new URL(url);
    path = urlObj.pathname + urlObj.search;
  } else {
    path = url.startsWith("/") ? url : "/" + url;
  }

  return `/api/image-proxy?path=${encodeURIComponent(path)}`;
}
