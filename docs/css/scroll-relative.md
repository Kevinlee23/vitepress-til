# 滚动相关 api

> `animation-timeline (Scroll-driven Animations)`, `scrollend`, `scrollIntoView`, `scrollbar-(color, width)`

## Scroll-driven Animations, 滚动驱动动画

`Can i use?`:

![can i use](/images/animation-timeline.png)

```css
/* 滚动元素 */
.c-scroll {
  .scrollbar-container {
    scroll-timeline-name: --my-custom-timeline;
  }
}

/* 动画元素 */
.animation-element {
  animation-timeline: --my-custom-timeline;
  animation: animation-name 3s linear;
}
```

具体实现，见[链接:实现二](/css/vertical-progress-bar#实现二-纯-css-实现方法)

## scrollend 事件

处理滚动行为时，由于滚动事件太频繁，所以都会用 `setTimeout` 来进行优化处理，现在浏览器支持了 `scrollend` 事件

`Can i use?`:

![can i use](/images/scrollend.png)

```js
window.addEventListener("scrollend", (event) => {
  // 滚动结束
});

element.addEventListener("scrollend", (event) => {
  // 滚动结束
});

// polyfill
if ("onscrollend" in window) {
  document.onscrollend = callback;
} else {
  document.onscrollend = (event) => {
    clearTimeout(window.scrollEndTimer);
    window.scrollEndTimer = setTimeout(callback, 100);
  };
}
```

## scrollIntoView 滚动至视图

```js
scrollIntoView();
// alignToTop: if true, equal to { scrollIntoViewOptions: {block: "start", inline: "nearest"} }
// else, equal to { scrollIntoViewOptions: {block: "end", inline: "nearest"} }
scrollIntoView(alignToTop);
// scrollIntoViewOptions: { behavior, block, inline }
// behavior: smooth, instant, auto
// block: start(default), center, end, nearest
// inline: nearest(default), start, center, end
scrollIntoView(scrollIntoViewOptions);
```

## scrollbar-(color, width), 标准滚动条控制规范

标准规范:

```css
.scroll-box {
  scrollbar-color: thumb-color, track-color;
  scrollbar-width: auto | thin | none;
}
```

非标准规范:

- `::-webkit-scrollbar`
- `::-webkit-scrollbar-button`
- `::-webkit-scrollbar-thumb`
- `::-webkit-scrollbar-track`
- `::-webkit-scrollbar-track-piece`
- `::-webkit-scrollbar-corner`
- `::-webkit-resizer`

如图:

![rt](/images/-webkit-scrollbar.png)
