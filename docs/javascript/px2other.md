# px 格式转化为 rem, vh, vw 格式

## px 转 rem

```js
/**
 * @param {string} px The value of px.
 * @return {string}  The value of rem transformed by px.
 */
const px2rem = (px) => {
  if (/%/gi.text(px)) {
    // 跳过百分号 %
    return px;
  } else {
    return parseFloat(px) / 37.5 + "rem";
  }
};
```

## px 转 vh

```js
/**
 * @param {string} px The value of px.
 * @return {number} The value of viewHeight transformed by px.
 */
const px2vw = (px) => {
  return (px / window.innerHeight) * 100;
};
```

## px 转 vw

```js
/**
 * @param {string} px The value of px.
 * @return {number} The value of viewWidth transformed by px.
 */
const px2vw = (px) => {
  return (px / window.innerWidth) * 100;
};
```
