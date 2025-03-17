---
outline: deep
---

# 服务端组件和客户端组件

## 局限

- 服务端组件能够在渲染时直接调用接口获取数据，客户端组件需要通过 `useEffect` 函数
- 服务端组件不能使用状态和生命周期 (`useState`, `useEffect` 等)
- 服务端组件不能添加交互和事件侦听器
- 服务端组件不能使用使用浏览器 `api`
- 服务器组件不能使用依赖状态、效果或仅限浏览器 `api` 的自定义 `hook`
- 服务端组件不能使用 `React Context`

## 渲染

- 服务端组件只会在服务端渲染（这意味着只能在命令台看到输出）
- 客户端组件会在服务端渲染一次，在客户端渲染一次

## 最佳实践

### 服务端组件

> 实际开发中需要交替使用两种组件，客户端组件不能导入服务端组件

`#1.` 要在客户端组件使用服务端组件，需要以 `prop.chilren` 的方式传入，也就是插槽：

```jsx
"use client";

import { useState } from "react";

export default function ClientComponent({ children }) {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>{count}</button>
      {children}
    </>
  );
}
```

`#2.` 共享数据，在 `get` 请求中，多次服务端组件调用时，除第一次外都会使用缓存数据

`#3.` 要想组件只在服务端使用，可以安装 `server-only`:

```js {7}
import "server-only";

export async function getData() {
  const res = await fetch("https://external-service.com/data", {
    headers: {
      // only for server, preventing leaks secret
      authorization: process.env.API_KEY,
    },
  });

  return res.json();
}
```

`#4.` 使用第三方包时，如果他是一个客户端组件，为了防止勿用，可以套一层 `use client` 的组件：

```jsx
"use client";

// this is a client with useing useState
import { Carousel } from "acme-carousel";

export default Carousel;
```

导入第三方库报 `document is not defined、window is not defined` 错误，[请参考](https://juejin.cn/post/7352342892785352755)

### 客户端组件

`#1.` 客户端组件尽量下移

`#2.` 从服务端组件到客户端组件传递的数据需要序列化：以 `props` 形式传递的数据需要在服务端组件做序列化，然后在客户端组件做反序列化
