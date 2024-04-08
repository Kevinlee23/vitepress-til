# 获取 element 的 stlye 对象

```css
 #elem-container{
   position: absolute;
   left:     100px;
   top:      200px;
   height:   100px;
 }
```

```js
const divEl = document.querySelector('#elem-container')
const style = window.getComputedStyle(divEl) // [!code highlight]

console.log(style.position) // absolute
console.log(style.left) // 100px
console.log(style.top) // 200px
console.log(style.height) // 100px
```

返回的 `style` 是一个实时的 `CSSStyleDeclaration` 对象，当元素的样式更改时，它会自动更新本身