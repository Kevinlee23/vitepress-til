# 数组扁平化

实现数组扁平化，要求在原数组上操作，不生成新数组

```js
/**
 * @param {any[]} array The array that can contains any values, and maybe its represented by n-dimensions.
 * @return {any[]} Flat array, means its one-dimensional.
 */
const flat = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] instanceof Array) {
      let resArr = flat(array[i]);
      array.splice(i, 1, ...resArr);
    }
  }

  return array;
};
```
