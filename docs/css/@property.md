---
outline: deep
date: 2024-12-02
---

# 现代 css 特性: @property

> 截止 2024/12/02 止，该特性的浏览器覆盖率为 92% (不要在 fifrefox 浏览器中使用)

@property 是 CSS Houdini API 中的一部分，允许开发者自定义 css 属性

## 如何使用

```css
@property --property-name {
  syntax: "<color>";
  inherits: false;
  initial-value: #EEEEEE;
}
```

### syntax(required)

syntax 描述了自定义属性所允许的语法结构:

- `<length>`: 10px, 1em, 1rem...
- `<number>`: 12, 3.14, -3.14, 0...
- `<string>` 未在 mdn 中提及，实测有效
- `<percentage>`: 50%, 100%, 20%...
- `<length-percentage>`: length or percentage
- `<color>`: #EEEEEE, #ffffff, #000000...
- `<image>`
- `<url>`
- `<integer>`
- `<time>`
- ...

syntax 支持类似于 ts 中的元组和联合类型:

```css
@property --color-blue {
  syntax: "blue | cyan | dodgerblue";
  inherits: true;
  initial-value: blue;
}

@property --lengthOrPercent {
  syntax: "<percentage> | <length>";
  inherits: false;
  initial-value: 10%;
}
```

syntax 可以定义空格隔开(+)和逗号隔开(#)的属性:

```css
// box-shadow
@property --box-shadow-length {
  syntax: "<length>+";
  inherits: false;
  initial-value: 0px 0px 8px 2px;
}

// gradient
@property --bg-gradient{
  syntax: "<image>#";
  inherits: false;
  initial-value: 
    repeating-linear-gradient(to right, blue 10px 12px, transparent 12px 22px), 
    repeating-linear-gradient(to bottom, blue 10px 12px, transparent 12px 22px);
}
```

any type: `{ syntax: "*"; }`

### inherits(required) 

inherits 描述该属性是否能够被继承

### initial-value 

initial-value表示该属性的初始值

## 实际应用

通过 transition, 开发者可以针对一些属性的设置过渡动画，但是有部分的属性切换无法通过 transition 来设置过渡动画，例如: background (gradient)

这个时候可以通过设置 { transition-name: 自定义属性 }的方式来达成:

:::code-group

```css [❌disable.style]
.ex-1-normal {
  --colorA: #fff;
  --colorB: #000;

  background: linear-gradient(45deg, var(--colorA), var(--colorB));
  transition: 1s background;

  &:hover {
    --colorA: yellowgreen;
    --colorB: deeppink;
  }
}
```

```css [✅enable.style]
@property --houni-colorA {
  syntax: '<color>';
  inherits: false;
  initial-value: #fff;
}

@property --houni-colorB {
  syntax: '<color>';
  inherits: false;
  initial-value: #000;
}

.ex-1 {
  background: linear-gradient(45deg, var(--houni-colorA), var(--houni-colorB));
  transition: 1s --houni-colorA, 1s --houni-colorB;

  &:hover {
    --houni-colorA: yellowgreen;
    --houni-colorB: deeppink;
  }
}
```
:::