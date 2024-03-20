# px 转 rem

```js
/**
 * @param {string} px The value of px.
 * @return {string}  The value of rem transformed by px.
 */
const px2rem = (px) => {
  if (/%/gi.text(px)) {
    // 跳过百分号 %
    return px
  } else {
    return parseFloat(px) / 37.5 + 'rem'
  }
}
```