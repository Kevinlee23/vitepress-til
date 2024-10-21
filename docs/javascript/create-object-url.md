---
noComment: true
---

# 创建文件临时路径 - createObjectURL

`URL.createObjectURL()` 接口用来创建一个 `DOMString`, 其表示参数中给出的对象的 URL

```js
let objectURL = "";
function createTmpObj(file) {
  objectURL = URL.createObjectURL(file);
}

/* after upload */
// 浏览器在 document 卸载的时候，会自动释放它们
// 但是为了获得最佳性能和内存使用状况, 你应该在安全的时机主动释放掉它们
URL.removeObjectURL(objectURL);
```

通过创建临时对象路径，我们可以在不上传文件的前提下，让用户先预览自己预备上传的文件， 节约服务器资源
