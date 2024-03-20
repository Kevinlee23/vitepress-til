# px 转 vw

```js
/**
 * @param {string} px The value of px.
 * @return {number} The value of viewWidth transformed by px.
 */
const px2vw = (px) => {
  return (px / window.innerWidth) * 100;
};
```
