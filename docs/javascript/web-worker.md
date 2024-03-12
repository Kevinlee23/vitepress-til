---
outline: deep
---

# Web worker

Web Worker 是 HTML5 标准的一部分，这一规范定义了一套 API，允许我们在 js 主线程之外开辟新的 Worker 线程，并将一段 js 脚本运行其中，它赋予了开发者利用 js 操作多线程的能力。

## 使用

### 创建 worker

`const work = new Worker(path, options)`

- `path`: 有效的脚本地址，必须遵守同源策略
- `option.type` 可以指定 worker 类型, 可以是 `classic` (默认) 和 `module`
- `option.credentials` 可以指定 worker 的凭证
- `option.name` 表示 worker 的 scope 的一个 `DOMString` 值

### js 主线程与 worker 线程数据传递

主线程和 worker 线程都是通过 `postMessage` 方法来发送消息，以及通过监听 `message` 事件来接受消息:

```javascript
// main.js
const myWorker = new Worker("/worker.js");

myWorker.addEvenListener("message", (e) => {
  console.log(e.data);
});

// or
myWorker.onmessage = (e) => {
  console.log(e.data);
};

myWork.postMessage("Hello, world [from main.js]");

// worker.js
self.addEvenListener("message", (e) => {
  console.log("e.data");
  self.postMessage("Hello, world [from worker.js]");
});
```

### 监听错误信息

web worker 提供两个事件监听错误，`error` 和 `messageerror`

- `error`: 当 worker 内部出现错误时触发
- `messageerror`: 当 message 事件接收到无法被反序列化的参数时触发

```javascript
// main.js
myWorker.addEvenListener("error", (err) => {
  console.log(err.message);
});

myWorker.addEvenListener("error", (err) => {
  console.log(err.message);
});

// worker.js
self.addEvenListener("error", (err) => {
  console.log(err.message);
});

self.addEvenListener("error", (err) => {
  console.log(err.message);
});
```

### 关闭 worker 线程

```javascript
// main.js
myWorker.terminate();

// worker.js
self.close();
```

无论是主线程关闭，还是 woker 线程内部关闭，worker 线程当前的事件循环 (Event Loop) 中的任务会继续执行。下一个事件循环的任务会直接被忽略

区别在于：

- 主线程关闭，主线程 与 worker 线程之间的连接会被立刻停止，主线程不会再接收到 worker 线程当前事件循环发送的信息
- 在 worker 线程中关闭，不会直接断开与主线程的连接，而是等 worker 线程中当前的事件循环所有任务执行完再关闭。主线程还能收到 worker 线程通过 `postMessage()` 发送的信息

### worker 线程中引用其他 js 文件

```javascript
// utils.js
const add = (a, b) => a + b;

// worker.js
importScript("./utils.js");
console.log(add(1, 2));
```

`ESModule` 模式：项目的 js 文件采用 ESModule 模式时，创建 worker 时采用 module 方式

```javascript
// main.js
const worker = new Worker("/worker.js", {
  type: "module",
});

// worker.js
import add from "./utils.js";

self.addEvenListener("message", (e) => {
  postMessage(e.data);
});

add(1, 2);

export default self; // 把顶级对象self暴露出去
```

## 主线程和 worker 线程可以传递哪些数据

`postMessage()` 传递的数据可以是由结构化克隆算法处理的任何值或 JavaScript 对象，包括循环引用。

### 不能处理的数据

- `Error` 和 `Function` 对象
- `DOM 节点`
- 对象的某些特定参数不会被保留：`RegExp` 对象的 `lastIndex` 字段；属性描述符，`setters`, `getters`
- 原型链上的属性也不会被追踪以及赋值

### 支持的数据类型

- 所有原始类型 (`symbols` 除外)
- `Boolean` `对象，String` 对象，`Date` `对象，RegExp` 对象
- `Blob`
- `File`
- `FileList`
- `ArrayBuffer`
- `ArrayBufferView`
- `ImageData`
- `Array`
- `Object`
- `Map`, `Set`
