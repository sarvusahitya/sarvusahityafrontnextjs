export function convertToWebP(url) {
  // Check if the URL already ends with .webp, if not, replace the extension
  if (!url.endsWith(".webp")) {
    return url.replace(/\.(jpg|jpeg|png)/, ".webp");
  }
  return url;
}

export function generateUniqueKey(str) {
  return `${str.charAt(0)}_${Math.random()}`;
}
