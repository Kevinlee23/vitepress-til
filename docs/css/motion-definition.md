# Css 动画定义

## 动画样式

- `Fade` 渐入/渐出
- `Slide` 滑入/滑出
- `Focus` 聚焦
- `Blur` 模糊
- `Bounce` 反弹
- `Expand` 扩展
- `Shrink` 收缩
- `Pop` 弹出
- `Compress` 压缩
- `Shake` 摇摆
- `Confetti` 彩带
- `Typewriter` 打字机模式

## 动画附加条件

- `delay` 延时
- `duration` 时长
- `translate-x, translate-y` 平移
- `scale` 尺寸
- `rotate` 旋转
- `in` 进入动画
- `out` 离开动画

## Css 动画属性

animation, 包括：

- animation-name 指定动画
- animation-duration 动画持续时间
- animation-timing-function 动画执行函数
  - (linear, ease-in, ease-out, ease-in-out, steps(x,end), cubic-bezier)
- animation-delay 动画开始时延
- animation-iteration-count 动画播放次数
- animation-fill-mode 动画在执行之前和之后如何将样式应用于其目标 
  - (none, forwards, backwards, both)
- animation-direction 动画播放方向
  - (normal, reverse, alternate, alternate-reverse)
- animation-play-state 动画执行状态 (paused, runing)

## 动画关键帧

from-to:

```css
@keyframes slidein {
  /* 开始 */
  from {
    transform: translateX(0%);
  }
  /* 结束 */
  to {
    transform: translateX(100%);
  }
}
```

many frames:

```css
/* 多个帧节点 */
@keyframes manyFrames {
  0% {
    top: 0;
    left: 0;
  }
  30% {
    top: 50px;
  }
  68%,
  72% {
    left: 50px;
  }
  100% {
    top: 100px;
    left: 100%;
  }
}
```