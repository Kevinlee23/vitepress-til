# js api - AbortController

`AbortController` 接口表示一个控制器对象，允许你根据需要终止一个或多个 `Web` 请求

## 用法

高频接口在上一次请求未执行完，触发下一次时，终止上一次请求

```js
// 这里使用 axios
const apiRequest = (data, controller) => {
  return request({
    url: 'xxx',
    method: 'get/post',
    data,
    signal: controller.signal,
  });
};

let controller = null;
const getList = useDebounceFn(() => {
  // 取消请求
  if (controller) {
    controller.abort();
    controller = null;
  }
  controller = new AbortController();

  apiRequest({ ...data }, controller)
    .then((res) => {
      // logic
    })
    .catch(() => {});
}, 500);
```
