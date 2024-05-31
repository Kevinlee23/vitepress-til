# 给定内容字数，计算所占元素宽度（高度）

```js
// 计算字长宽度
export const getTextWidth = (text, fontSize) => {
  // fontSize:代表汉字的大小，英文字会自动按照默认值
  var span = document.createElement("span");
  var result = {};
  span.style.visibility = "hidden";
  span.style.fontSize = fontSize;
  span.style.overflow = "hidden";
  span.style.whiteSpace = "nowrap";
  span.style.textOverflow = "ellipsis";
  span.style.position = "absolute";
  document.body.appendChild(span);
  if (typeof span.textContent !== "undefined") {
    span.textContent = text;
  } else {
    span.innerText = text;
  }
  result.width = span.offsetWidth;
  span.parentNode.removeChild(span);
  return result.width;
};

// 计算字长高度
export const getTextHeight = (text, config) => {
  // 元素宽度, 文字字体、大小和行高
  const { width, fontFamily, fontSize, lineHeight } = config;
  var span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.width = width;
  span.style.fontFamily = fontFamily || "'Public Sans', sans-serif";
  span.style.fontSize = fontSize;
  span.style.lineHeight = lineHeight;
  span.style.overflow = "hidden";
  span.style.position = "absolute";
  document.body.appendChild(span);
  if (typeof span.textContent !== "undefined") {
    span.textContent = text;
  } else {
    span.innerText = text;
  }
  const result = span.offsetHeight;
  span.parentNode.removeChild(span);
  return result;
};
```
