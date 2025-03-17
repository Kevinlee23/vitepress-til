---
outline: deep
---

# HSL Color

一般我们使用颜色的方法有：

- `Static` - `white`
- `hex` - `#000000`
- `rgb / rgba` - `rgb(0, 0, 0) / rgba(0, 0, 0, 0)`
- `HSL Color` - `hsl(196, 73%, 62%)`

这篇笔记是关于 `hsl` 表示颜色的用法

## H, S, L

`H` 指的是颜色盘角度

例如 `240°` 左右是颜色 - `Blue`, `120°` 左右是颜色 - `Green`

![color](/images/2-hsl-colors-css.avif)

`S` 指的是 `Saturation` （饱和度）, `0%` 是空的，`unsaturation`, `100%` 是 `fully saturated`

![color](/images/5-hsl-colors-css.avif)

`L` 指的是 `Lightness` （亮度）, 从 `0% - 100%` 由 `black to white`

![color](/images/6-hsl-colors-css.avif)

使用 `HSL` 表示颜色的好处在于：同一饱和度和亮度的不同颜色，能实际感受到它们的相关性，也就是说，通过改变 `颜色角度`，我们就能创建一组相关的颜色，这在定制页面的主题颜色的时候是非常易于理解和操作的

`hsl(221, 73%, 62%)`, `hsl(126, 73%, 62%)`, `hsl(12, 73%, 62%)`:

<div class="hsl-group">
  <div class="hsl-color-red hsl-group-item">RED</div>
  <div class="hsl-color-green hsl-group-item">GREEN</div>
  <div class="hsl-color-blue hsl-group-item">BLUE</div>
</div>

## Cases

### Hover 状态下颜色的改变

通过增加/减少 `饱和度 (S)` 来体现 `hover` 前后的对比

```scss
.hsl-case-button {
  color: white;
  background-color: hsl(221, 73%, 62%);

  &:hover {
    background-color: hsl(221, 53%, 62%);
  }
}
```

<div class="hsl-case-box">
  <div class="hsl-case-button">Try to hover!</div>
</div>

### 主题颜色组合

如上所述

### 按钮组

<div class="hsl-button-group">
  <div class="same-group-button">
    <div class="hsl-color-red hsl-group-item hsl-button-item">Primary</div>
    <div class="hsl-color-red hsl-color--secondary hsl-group-item hsl-button-item">Secondary</div>
    <div class="hsl-color-red hsl-color-red--ghost hsl-group-item hsl-button-item">Ghost</div>
  </div>
  <div class="same-group-button">
    <div class="hsl-color-green hsl-group-item hsl-button-item">Primary</div>
    <div class="hsl-color-green hsl-color--secondary hsl-group-item hsl-button-item">Secondary</div>
    <div class="hsl-color-red hsl-color-green--ghost hsl-group-item hsl-button-item">Ghost</div>
  </div>
  <div class="same-group-button">
    <div class="hsl-color-blue hsl-group-item hsl-button-item">Primary</div>
    <div class="hsl-color-blue hsl-color--secondary hsl-group-item hsl-button-item">Secondary</div>
    <div class="hsl-color-red hsl-color-blue--ghost hsl-group-item hsl-button-item">Ghost</div>
  </div>
</div>

```scss
:root {
  --primary-hr: 12;
  --primary-hg: 126;
  --primary-hb: 221;
  --primary-s: 73%;
  --primary-l: 62%;
}

.hsl-color-red {
  background-color: hsl(var(--primary-hr), var(--primary-s), var(--primary-l));

  &:hover {
    --primary-s: 53%;
  }
}

.hsl-color-green {
  background-color: hsl(var(--primary-hg), var(--primary-s), var(--primary-l));
  &:hover {
    --primary-s: 53%;
  }
}

.hsl-color-blue {
  background-color: hsl(var(--primary-hb), var(--primary-s), var(--primary-l));
  &:hover {
    --primary-s: 53%;
  }
}

.hsl-color--secondary {
  --primary-l: 90%;
  color: #222;

  &:hover {
    --primary-s: 53%;
  }
}

.hsl-color-red--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hr), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(
      var(--primary-hr),
      var(--primary-s),
      var(--primary-l)
    );
  }
}

.hsl-color-green--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hg), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(
      var(--primary-hg),
      var(--primary-s),
      var(--primary-l)
    );
  }
}

.hsl-color-blue--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hb), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(
      var(--primary-hb),
      var(--primary-s),
      var(--primary-l)
    );
  }
}
```

### 动态的褪色效果

<div class="hsl-section"></div>
<div class="hsl-section-2"></div>
<div class="hsl-section-3"></div>

```scss
.hsl-section {
  margin-top: 20px;
  width: 400px;
  height: 100px;

  background: linear-gradient(
    to left,
    hsl(var(--primary-hr), var(--primary-s), var(--primary-l)),
    hsl(var(--primary-hr), var(--primary-s), 95%)
  );
}

.hsl-section-2 {
  margin-top: 20px;
  width: 400px;
  height: 100px;

  background: linear-gradient(
    to left,
    hsl(var(--primary-hg), var(--primary-s), var(--primary-l)),
    hsl(var(--primary-hg), var(--primary-s), 95%)
  );
}

.hsl-section-3 {
  margin-top: 20px;
  width: 400px;
  height: 100px;

  background: linear-gradient(
    to left,
    hsl(var(--primary-hb), var(--primary-s), var(--primary-l)),
    hsl(var(--primary-hb), var(--primary-s), 95%)
  );
}
```

<style lang="scss">
.hsl-case-box {
  margin-top: 20px;
}

.hsl-case-button {
  width: 120px;
  height: 50px;
  color: white;
  border-radius: 4px;
  background-color: hsl(221, 73%, 62%);

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  
  &:hover {
    background-color: hsl(221, 53%, 62%);
  }
}

.hsl-group {
  display: flex;
  column-gap: 10px;
}

.hsl-button-group {
  margin-top: 20px;
  display: flex;
  column-gap: 20px;
}

.hsl-group-item {
  display: flex;
  align-items: center;
  justify-content: center;

  color: white;
  width: 100px;
  height: 50px;

  border-radius: 4px;
}

.same-group-button {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.hsl-button-item {
  border-radius: 999px;
  cursor: pointer;
}

:root {
  --primary-hr: 12;
  --primary-hg: 126;
  --primary-hb: 221;
  --primary-s: 73%;
  --primary-l: 62%
}

.hsl-color-red {
  background-color: hsl(var(--primary-hr), var(--primary-s), var(--primary-l));
  &:hover {
    --primary-s: 53%;
  }
}
.hsl-color-green {
  background-color: hsl(var(--primary-hg), var(--primary-s), var(--primary-l));
  &:hover {
    --primary-s: 53%;
  }
}
.hsl-color-blue {
  background-color: hsl(var(--primary-hb), var(--primary-s), var(--primary-l));
  &:hover {
    --primary-s: 53%;
  }
}

.hsl-color--secondary {
  --primary-l: 90%;

  color: #222;

  &:hover {
    --primary-s: 53%;
  }
}
.hsl-color-red--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hr), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(var(--primary-hr), var(--primary-s), var(--primary-l));
  }
}
.hsl-color-green--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hg), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(var(--primary-hg), var(--primary-s), var(--primary-l));
  }
}
.hsl-color-blue--ghost {
  --primary-l: 90%;
  background-color: transparent;
  border: 3px solid hsl(var(--primary-hb), var(--primary-s), var(--primary-l));
  color: #222;

  &:hover {
    background-color: hsl(var(--primary-hb), var(--primary-s), var(--primary-l));
  }
}

.hsl-section {
  margin-top: 20px;
  width: 400px;
  height: 100px;
  
  background: 
    linear-gradient(to left, hsl(var(--primary-hr), var(--primary-s), var(--primary-l)), hsl(var(--primary-hr), var(--primary-s), 95%));
}

.hsl-section-2 {
  margin-top: 20px;
  width: 400px;
  height: 100px;
  
  background: 
    linear-gradient(to left, hsl(var(--primary-hg), var(--primary-s), var(--primary-l)), hsl(var(--primary-hg), var(--primary-s), 95%));
}

.hsl-section-3 {
  margin-top: 20px;
  width: 400px;
  height: 100px;
  
  background: 
    linear-gradient(to left, hsl(var(--primary-hb), var(--primary-s), var(--primary-l)), hsl(var(--primary-hb), var(--primary-s), 95%));
}
</style>
