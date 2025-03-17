---
outline: deep
---

# Canvas 基础

## 获取绘画上下文

```html
<html>
  <head>
    <title>Canvas tutorial</title>
    <script type="text/javascript">
      function draw() {
        var canvas = document.getElementById("tutorial");
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
        }
      }
    </script>
    <style type="text/css">
      canvas {
        border: 1px solid black;
      }
    </style>
  </head>
  <body onload="draw();">
    <canvas id="tutorial" width="100" height="100"></canvas>
  </body>
</html>
```

如上代码，`ctx` 就是 `canvas` 绘画上下文

![canvas grid](/images/canvas-basic-01.png)
`Canvas grid`

上图为 canvas 绘画区域，向右的 `x轴` 和向下的 `y轴`

## 绘制图形和路径

### 绘制矩形

`api:`

- `reac(x, y, width, height)` 空心矩形
- `fillRect(...)` 填充矩形
- `strokeRect(...)` 绘制矩形的边框
- `clearReact(...)` 清除指定矩形区域，使区域完全透明

![生成三角形](/images/canvas-basic-02.png)
`生成一个三角形`

### 绘制直线路径

`api:`

- `beginPath` 新建一条路径
- `closePath` 闭合路径
- `stroke` 绘制路径轮廓
- `fill` 填充路径内部
- `moveTo` 移动笔触
- `lineTo` 绘制直线

`e.g.:`

```js
function draw() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.moveTo(50, 0);
    ctx.lineTo(100, 100);
    ctx.lineTo(0, 100);
    ctx.fill();
    ctx.closePath();
  }
}
```

### 绘制圆弧

api:

- `arc(x, y, radius, startAngle, endAngle, anticlockwise)`

> 画一个以`(x, y)`为圆心的以 `radius` 为半径的圆弧（圆），从 `startAngle` 开始到 `endAngle` 结束，
> 按照 `anticlockwise` 给定的方向（默认为顺时针）来生成。

- `arcTo(x1, y1, x2, y2, radius)`

> 给定控制点和半径画一段圆弧，再以直线连接两个控制点

### 贝塞尔曲线

- `quadraticCurveTo(cp1x, cp1y, x, y)` 二次贝塞尔曲线
- `bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)` 三次贝塞尔曲线

`cp1x, cp1y `控制点一

`cp2x, cp2y` 控制点二

`x, y` 为结束点

## 应用样式和颜色

### 颜色

- `fillStyle = color` 填充颜色
- `strokeStyle = color` 轮廓颜色

`color` 可以是字符串、渐变对象或者图案对象

### 线型

- `lineWidth` 线条宽度
- `lineCap` 线条末端样式，{`butt` 齐平，`round` 高度半线宽半圆，`square` 高度半线宽方块}
- `lineJoin` 线条连接处样式 {`round` 磨圆，`bevel`, `miter`}
- `miterLimit *` 限制当两条线相交时交接处最大长度
- `getLineDash *` 当前虚线样式
- `setLineDash *` 设置当前虚线样式
- `lineDashOffset *` 设置虚线样式的起始偏移量

### 渐变

- `createLinearGradient(x1, y1, x2, y2)` 线型渐变
- `createRadialGradient(x1, y1, r1, x2, y2, r2)` 径向渐变
- `addColorStop(postion, color)` 添加色标

`e.g.1:`

```js
function draw() {
  var ctx = document.getElementById("canvas").getContext("2d");

  var lineargradient = ctx.createLinearGradient(0, 0, 150, 150);
  lineargradient.addColorStop(0, "white");
  lineargradient.addColorStop(1, "black");

  ctx.fillStyle = lineargradient;
  ctx.fillRect(10, 10, 130, 130);
}
```

![黑白渐变](/images/canvas-basic-03.png)

### 图案样式

- `createPattern(image, type) type {repeat, repeat-x, repeat-y, no-repeat}` 创建图案样式

### 阴影

- `shadowOffsetX = float`
- `shadowOffsetY = float`

> `x, y` 轴的延伸距离

- `shadowBlur = float` 阴影的模糊程度
- `shadowColor = color` 阴影颜色效果
