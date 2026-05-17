export const getOssThumb = (url, width) => {
  if (url && url.startsWith(__CDN__) && !url.includes("?x-oss-process")) {
    return `${url}?x-oss-process=image/resize,w_${width}`;
  }
  return url;
};

export const getOssSquare = (url, size) => {
  if (url && url.startsWith(__CDN__) && !url.includes("?x-oss-process")) {
    return `${url}?x-oss-process=image/resize,m_fill,w_${size},h_${size}`;
  }
  return url;
};