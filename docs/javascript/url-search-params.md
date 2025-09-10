---
outline: deep
---

# URLSearchParams

> 使用 get 请求或访问页面时，难免会在 url 后面拼接查询字符串
>
> 不好的方案是使用正则或者 split 进行分割
>
> 稳定性更好的方案是使用 js 内置的接口：URLSearchParams

## 一个例子

```js
const urlString = "https://gallery.snowinlut.top/photos?year=2025&location=123";

const searchParams = new URL(urlString).searchParams;

console.log(searchParams.get("year")); // 2025
console.log(searchParams.get("location")); // 123
```

## searchParams 对象方法

### get

读取参数 (没有时返回 null)

### has

检查参数是否存在

### 处理同名参数

```js
// url?tags=react&tags=vue

console.log(searchParams.getAll("tags")); // ["react", "vue"]

searchParams.append("tags", "css"); // 会在已有的后面追加，不会覆盖
```

### .forEach() 或 for...of

迭代参数

### .toString()

转回字符串，接口会自动帮你处理好 url 编码