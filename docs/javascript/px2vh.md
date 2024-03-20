# px 转 vh

```js
/**
 * @param {string} px The value of px.
 * @return {number} The value of viewHeight transformed by px.
 */
const px2vw = (px) => {
  return (px / window.innerHeight) * 100;
};
```
