# hex 转 rgba

```js
/**
 * @param {string} hex The value of hex.
 * @param {number} transparency Transparency value.
 * @return {string} The color value represented by rgba.
 */
const hex2rgba = (hex, transparency = 0.8) => {
  let red = 0;
  let green = 0;
  let blue = 0;

  let h = hex.substring(1);
  if (h.length === 3) h = [...h].map((x) => x + x).join("");

  const hexValues = h.split("").map((item) => parseInt(item, 16));

  red = hexValues[0] * 16 + hexValues[1];
  green = hexValues[2] * 16 + hexValues[3];
  blue = hexValues[4] * 16 + hexValues[5];

  return `rgba(${red}, ${green}, ${blue}, ${transparency})`;
};
```
