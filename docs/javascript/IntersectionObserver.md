---
noComment: true
---

# IntersectionObserver (交叉观察器)

> 检测一个元素是否可见或者两个元素是否相交

## 使用

```js
const callback = (entries, observer) => {
  // 追踪目标元素观测点的交叉变化
  entries.forEach((entry) => {
    // 每个条目描述一个目标元素观测点的交叉变化：
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
}

let options = {
  root: document.querySelector("#scrollArea"), // 视口元素，如果未指定或者为 null, 则默认为浏览器视口
  rootMargin: "0px", // root 周围的边距，默认为 0 0 0 0
  // 阈值，一个数字或者数组
  // 当为数字时，比如：0.5, 则每次能见度超过 25% 时都会执行回调
  // 当为数组时，比如：[0, 0.25, 0.5, 0.75, 1] 则每次能见度超过 25% 时就会执行回调
  threshold: 1.0, 
};

let observer = new IntersectionObserver(callback, options);

// 定位要观察的元素
let target = document.querySelector("#listItem");
observer.observe(target);
```

## 实例

> 配合 `tailwindcss-motion` 来实现：当元素第一次进入视口时执行动效

```js
// 第一次进入视口增加 motion class
function handleVision(element, motion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // 在这里可以执行相应的操作
        motion.map((item) => {
          entry.target.classList.add(item)
          return item
        })
        observer.unobserve(entry.target) // 取消观察
      }
    })
  })

  observer.observe(element)
}

handleVision('#motion-element', ['motion-preset-slide-up', 'motion-duration-2000'])
```
[例子 1](https://developer.mozilla.org/zh-CN/docs/Web/API/Intersection_Observer_API#%E7%BB%93%E6%9E%9C)
          
[例子 2](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API/Timing_element_visibility#result)