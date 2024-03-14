---
outline: deep
---

# p-limit

`p-limit` 是用来处理并发控制的库，常见的并行操作如下:

- `await Promise.all([promise1, promise2])`;
- `await Promise.race([promise1, promise2])`

## 简单实现

### 入口

```js
const pLimit = (concurrency) => {
  const generator = (fn, ...args) => {
    new Promise((resolve) => {
      // next
    });
  };

  return generator;
};
```

### 排队逻辑

```js
const pLimit = (concurrency) => {
  const queue = [];
  let activeCount = 0;

  const enqueue = (fn, resolve, ...args) => {
    queue.push(run.bind(null, fn, resolve, ...args));

    if (activeCount < concurrency && queue.length > 0) {
      queue.shift()();
    }
  };

  const generator = (fn, ...args) => {
    new Promise((resolve) => {
      enqueue(fn, resolve, ...args);
    });
  };

  return generator;
};
```

### 执行逻辑

```js
const pLimit = (concurrency) => {
  // ...

  // 活跃任务数 -1, 执行下一个任务
  const next = () => {
    activeCount--;

    if (queue.length > 0) {
      queue.shift()();
    }
  };

  // 执行逻辑
  const run = async (fn, resolve, ...args) => {
    // 活跃的任务数 +1
    activeCount++;

    const result = (async () => fn(...args))();

    resolve(result);

    try {
      await result;
    } catch {}

    // 下一步处理
    next();
  };
};
```

### 总结

简单来说，实现过程就是：

创建一个`队列`来保存任务，开始时`一次性执行最大并发任务`，然后`每执行完一个`启动一个新的任务。

## tricks

### 传入并发数量的校验

```js
if (
  !(
    (Number.isInteger(concurrency) || concurrency === Infinity) &&
    concurrency > 0
  )
) {
  throw new TypeError("Expected `concurrency` to be a number from 1 and up");
}
```

### 并发数量的准确控制

```js
const enqueue = (fn, resolve, ...args) => {
  queue.push(run.bind(null, fn, resolve, ...args));

  if (activeCount < concurrency && queue.length > 0) {
    queue.shift()();
  }
};
```

这里对并发数量的判断并不准确，因为 `activeCount--` 是在任务执行完毕后才执行的。万一任务没有执行完，这里是不准确的

所以为了保证并发数量能控制准确，要等全部的微任务执行完再拿 `activeCount`

`增加一个微任务:`

```js
const enqueue = (fn, resolve, ...args) => {
  queue.push(run.bind(null, fn, resolve, ...args));

  (async () => {
    await Promise.resolve();

    if (activeCount < concurrency && queue.length > 0) {
      queue.shift()();
    }
  })();
};
```

### 将函数内私有变量暴露出去, 并提供额外方法

```js
const pLimit = (concurrency) => {
  // definition before

  const generator = (fn, ...args) => {
    new Promise((resolve) => {
      // next
    });
  };

  Obejct.defineProperties(generator, {
    // activeCount, pendingCount 只定义 get 函数, 这样就是只读的
    activeCount: {
      get: () => activeCount,
    },
    pendingCount: {
      get: () => queue.length,
    },
    // 提供一个方法 clearQueue 来清空任务队列
    clearQueue: {
      value: () => {
        queue.length = 0;
      },
    },
  });
};
```

## test

:::code-group

```js [test]
import pLimit from "./p-limit.js";

const limit = pLimit(2);

function asyncFun(value, delay) {
  return new Promise((resolve) => {
    console.log("start " + value);
    setTimeout(() => resolve(value), delay);
  });
}

(async function () {
  const arr = [
    limit(() => asyncFun("aaa", 2000)),
    limit(() => asyncFun("bbb", 3000)),
    limit(() => asyncFun("ccc", 1000)),
    limit(() => asyncFun("ccc", 1000)),
    limit(() => asyncFun("ccc", 1000)),
  ];

  const result = await Promise.all(arr);
  console.log(result);
})();
```

```txt [result]
# 立即执行
start aaa
start bbb

# 2s 后
start ccc

# 1s 后
start ccc
start ccc
```

:::
