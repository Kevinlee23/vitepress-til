# 数组扁平化

实现数组扁平化，要求在原数组上操作，不生成新数组

```js
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
