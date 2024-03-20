# 文件大小转化

```js
/**
 * @param {number} size The size of file.
 * @return {string} The string after transfer e.g. 512MB.
 */
const filterSize = (size) => {
  if (!size) return "-";
  if (size < Math.pow(1024, 1)) return size + " B";
  if (size < Math.pow(1024, 2))
    return (size / Math.pow(1024, 1)).toFixed(2) + " KB";
  if (size < Math.pow(1024, 3))
    return (size / Math.pow(1024, 2)).toFixed(2) + " MB";
  if (size < Math.pow(1024, 4))
    return (size / Math.pow(1024, 3)).toFixed(2) + " GB";
  return (size / Math.pow(1024, 4)).toFixed(2) + " TB";
};
```
