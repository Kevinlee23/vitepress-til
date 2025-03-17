---
outline: deep
---

# 事件循环

## 简述

事件循环的执行流程如下：

```txt:line-numbers=1
宏任务
宏任务执行结束
有可执行的微任务吗，没有的话回到 1, 有则执行 4
执行所有微任务
队列里面所有微任务执行完毕，回到 1
```

按照这个流程，它的执行机制就是：

- 执行一个宏任务，如果遇到微任务就将它放到微任务的事件队列中
- 当宏任务执行完成后，会查看微任务的事件队列，然后将里面的所有微任务依次执行完

## 微任务

属于微任务的有：

- `Promise.then`
- `MutationObserver`
- `Object.observe` , `Proxy`
- `process.nextTick (Node.js)`

## 宏任务

属于宏任务的有：

- `script`
- `setTimeout` / `setInterval`
- `UI rendering`
- `postMessage`, `MessageChannel`
- `setImmediate`、`I/O (Node.js)`

## 例子

```js
async function async1() {
  console.log("async1 start");
  await async2();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

console.log("script start");

setTimeout(function () {
  console.log("settimeout");
});

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");
```

执行分析：

- 执行同步任务打印 `script start`
- 遇到定时器，是个宏任务，先放着不执行
- 进入 `async1()`, 打印 `async1 start`
- 遇到 `await async2()`, 进入 `async2` 函数内打印 `async2`，阻塞 `await` 后面的代码（加入微任务列表）
- 遇到 `new promise`, 直接执行 打印 `promise1`, 遇到 `.then()`, 它是微任务，放到微任务列表等待执行
- 最后一句打印 `script end`, 同步任务执行完成，开始执行微任务列表中的代码
- 执行 `await` 后面的代码，打印 `async1 end`
- 执行 `then` 回调，打印 `promise2`
- 微任务列表清空，执行下一个宏任务，打印 `settimeout`

所以打印顺序为：

`script start` -> `async1 start` -> `async2` -> `promise1` -> `script end` -> `async1 end` -> `promise2` -> `settimeout`
