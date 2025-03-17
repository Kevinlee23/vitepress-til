# 文字颜色自动适配背景颜色

## 关键点

`from` 关键字：`rgb(from color r g b / alpha)`

例如：

- `calc: red -> green` : `color: rgba(from rgb(255,0,0)) calc(r - 255) calc(g + 255) b); `
- `from hex` : `color: rgba(from #ff0000) r g b);`
- `from hsl` : `color: rgb(from hsl(0deg, 100%, 50%) r g b);`
- `from var` : `color: rgb(from var(--hotpink) r g b);`

## 使用 css 相对颜色，实现同一按钮点击背景切换

通过 `hsl` 色相、饱和度、亮度法表示颜色，通过调整亮度来改变背景色

```scss
div {
  --bg: #fc0;
  background: var(--bg);
  transition: 0.3s all;
}

div:hover {
  background: hsl(from var(--bg) h s calc(l * 1.2));
}
div:active {
  background: hsl(from var(--bg) h s calc(l * 0.8));
}
```

`e.g.:`

<div class="from-button">
  button
</div>

<style lang="scss">
.from-button {
  --bg: #fc0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 100px;
  padding: 4px 0;

  border-radius: 10px;

  color: #fff;
  background: var(--bg);
  transition: 0.3s all;

  cursor: pointer;

  &:hover {
    background: hsl(from var(--bg) h s calc(l * 1.2));
  }

  &:active {
    background: hsl(from var(--bg) h s calc(l * 0.8));
  }
}
</style>

## 利用 css 相对颜色，反转颜色

```scss
p {
  /** 任意背景色 **/
  --bg: #ffcc00;
  background: var(--bg);

  color: rgb(
    from var(--bg) calc(1 - r) calc(1 - g) calc(1 - b)
  ); /** 基于背景反转颜色 **/
}
```

`e.g.:`

![ex1](/images/from-to-change-color.gif)

存在两个问题：

- 如果颜色恰好是在 `#808080` 灰色附近，它的反色，其实还是它自己！会导致在灰色背景下，前景文字不可见；
- 绝大部分情况虽然可以正常展示，但是并不是非常美观好看

## 利用 color-contrast(), 选择高对比度颜色

```scss
p {
  /** 任意背景色 **/
  --bg: #ffcc00;
  background: var(--bg);

  color: color-contrast(
    var(--bg) vs #fff,
    #000
  ); /** 基于背景色，自动选择对比度更高的颜色 **/
}
```
