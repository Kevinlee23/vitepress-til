# 文件大小转化, 数组表示

```js
/**
 * @param {number} size The size of file.
 * @return {number[]} The array of fileSize, and from index [0] to [4] means B, KB, MB, GB and TB.
 */
const filterSizeList = (size) => {
  let temp = size;
  const units = [0, 0, 0, 0, 0]; // B, KB, MB, GB, TB

  for (let i = 4; i >= 1; i--) {
    if (temp >= Math.pow(1024, i)) {
      units[i] = Math.floor(temp / Math.pow(1024, i));
      temp = temp % Math.pow(1024, i);
    }
  }

  units[0] = temp
  return units
};
```
