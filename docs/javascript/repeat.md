# repeat

实现一个 repeat 方法，要求如下：

```js
// 实现repat方法, 使func方法重复执行times次, 每次间隔wait秒
function repeat(func, times, wait) {
  // empty
}

const sayHello = (name) => {
  console.log(`hello, ${name}`);
};

const repeatFunc = repeat(sayHello, 4, 1000);
repeatFunc("kevin");
```

:::code-group

```js [实现一]
const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const repeat = (func, times, wait) => {
  return async (...args) => {
    for (let i = 0; i < times; i++) {
      func(...args);
      await sleep(wait);
    }
  };
};
```

```js [实现二]
const repeat = (func, times, wait) => {
  let num = 0;
  return (args) => {
    function run() {
      func(args);
      num++;
      if (num < times) {
        setTimeout(run, wait);
      }
    }

    run();
  };
};
```

:::
