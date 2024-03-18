`app.vue`

```js
// 修复 Naive UI 和 Tailwind 样式优先级引起的样式错误问题
useMutationObserver(
  document.head,
  () => {
    const naiveStyles = Array.from(
      document.head.querySelectorAll("style[cssr-id]")
    );

    if (
      naiveStyles.find((style) =>
        style.nextElementSibling
          ? !style.nextElementSibling.hasAttribute("cssr-id")
          : false
      )
    ) {
      naiveStyles.forEach((style) => {
        document.head.appendChild(style);
      });
    }
  },
  {
    childList: true,
  }
);
```
