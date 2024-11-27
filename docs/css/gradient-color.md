# 渐变色 gradient

## 线性渐变

background: liner-gradient(方向, 颜色1, 颜色2)

默认方向为从上到下

```css
.box {
  display: flex;
  width: 400px;
  height: 400px;
  background: linear-gradient(orange, red);
}
```

![css1-1](/images/css1-1.png)

### 方向设置

to + 方位

linear-gradient(to top, orange, red): 从上到下

linear-gradient(to right, orange, red): 从左到右

linear-gradient(to top right, orange, red): 从右上到左下

```css
.box {
  display: flex;
  width: 400px;
  height: 400px;
  background: linear-gradient(to top right, orange, red);
}
```

![css1-2](/images/css1-2.png)

### 角度表示

linear-gradient(deg, color1, color2, ...)

默认是从上往下，把中间分界线当成 `0deg`, 逆时针旋转 `90deg` 就是向右（从左向右）

- 0deg = to top
- 45deg = to top right
- 90deg = to right
- 145deg = to bottom right

### 颜色设置

三种方式：internal; hex; rgba

## 径向渐变

radital-gradient(形状, 大小, 颜色1, 颜色2)

默认从中间均匀地渐变（椭圆 ellipse）

```css
.box {
  display: flex;
  width: 400px;
  height: 400px;
  background: radial-gradient(ellipse, orange, red);
}
```

![css1-3](/images/css1-3.png)

### 形状设置

ellipse; circle

### 大小设置

- closest-side: 用来设置从中心到最近的边的渐变大小
- closest-corner: 用来设置从中心到最近的角的渐变大小
- farthest-side: 用来设置从中心到最远的边的渐变大小
- farthest-corner:用来设置从中心到最远的角的渐变大小

具体数值用百分比: closest-side at 10% 10%

## 重复渐变

`background: repeating-linear-gradient(to right,orange, red 100px);`

![css1-4](/images/css1-4.png)

## 锥形渐变

conic-gradient

![css1-5](/images/conic-gradient.png)

[例子:](https://juejin.cn/post/7420814883576414259)

![css1-6](/images/conic-gradient.gif)

使用 conic-gradient + animation 设置 5s 动画，从 0° - 360° 白色背景覆盖,

并使用一个遮罩覆盖 border 外的多余部分，完成如图效果

[参考](https://developer.mozilla.org/zh-CN/docs/Web/CSS/gradient/conic-gradient)