// // Fix or ensure image URLs use port 8888
// export function fixImageUrl(url) {
//   if (!url) return "";
//   try {
//     const urlObj = new URL(url);
//     urlObj.port = "8888"; // force port 8888 for images
//     return urlObj.toString();
//   } catch {
//     // If url is relative path, prepend base url
//     return `http://157.230.240.97:8888${url.startsWith("/") ? "" : "/"}${url}`;
//   }
// }



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
