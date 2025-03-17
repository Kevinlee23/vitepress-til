# 作为图像（img）使用的 SVG 黑色路径变成白色

> 作为图像（img）使用的 SVG, 不方便修改 path 的情况下，将黑色路径修改为白色路径

```css
img {
  filter: brightness(0) invert(1); /* 将黑色变为白色 */
}
```
