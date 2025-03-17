# 动画库：tailwindcss-motion

## install

> 预先安装 tailwindcss

1. install npm package

```sh
$ yarn add tailwindcss-motion
```

2. add into plugins

```js
/ tailwind.config.js

export default {
     content: [...],
     theme: {
        extend: {...},
     },
     plugins: [require('tailwindcss-motion')],
};
```

3. enjoy it!

## 使用基础类

- Fade In: motion-opacity-in-0
- Slide In:
  - From below: motion-translate-y-in-100
  - From above: -motion-translate-y-in-100
  - From left: -motion-translate-x-100
  - From right: motion-translate-x-100
- Scale In: motion-scale-in-75
- Rotate In:
  - From 180 degrees: motion-rotate-in-180
  - From -90 degrees: -motion-rotate-in-90
- Blur In: motion-blur-in-sm
- Grayscale In: motion-grayscale-in
- Background Color Change: motion-bg-in-red-500
- Text Color Change: motion-text-in-blue-500

## 使用预设类

> 预设类是由基础类组合而来
> 
> [motion-preset-]:

Enter:

- Fade:
- Slide
- Focus
- Blur
- Bounce
- Expand
- Shrink
- Pop
- Compress
- Shake
- Wiggle
- Confetti
- Typewrite
- Flomoji

Loop:

- Pulse
- Wobble
- Seesaw
- Oscillate
- Stretch
- Float
- Spin
- Blink

[具体效果](https://rombo.co/tailwind/)

## 使用修饰类

- motion-duration-x: 动画持续时间
- motion-delay-x: 动画时延
- Timing Function: `detail in below`
- motion-paused, motion-runing: 暂停和结束
- motion-[anime]-in, motion-[anime]-out: 进入动画/离开动画
- motion-[anime]-loop: 循环动画
- motion-[anime]-loop/mirror, motion-[anime]-loop/reset: 循环动画结束时反转方向/重置到起始位置
- motion-loop-twice, motion-loop-once 循环次数

## Timing Function

> [motion-ease-]:

- linear
- spring-smooth
- spring-snappy
- spring-bouncy
- spring-bouncier
- spring-bounciest
- bounce
- out-cubic
- out-quart(default)