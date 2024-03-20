# js 中类型的校验

```js
const isEmpty = (val) => {
  val == null || !(Object.keys(val) || val).length;
};
```

```js
const isArray = (val) => {
  if (typeof Array.isArray === "undefined") {
    return Object.prototype.toString.call(val) === "[object Array]";
  }
  return Array.isArray(val);
};
```
