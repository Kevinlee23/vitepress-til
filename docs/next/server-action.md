# Serve Action

## 概念

- 服务端调用的形式来进行数据推送/更新
- 一般以 `action.js` 命名
- 文件内顶端使用 `'use server'` 声明

## 形式

`#1. form action` 基本形式:

```js
function serverAction(data) {}
```

`#2. form action + useFormState` :

```js
function serverAction(prevState, data) {}
```

`#3. 直接调用`:

```jsx
async function createDirectly(value) {
  const form = new FormData();
  form.append("key", value);
  return serverAction(form);
}

export default function serverPage({ children }) {
  const handleClick = async () => {
    const data = await createDirectly("something...");

    // res
    console.log(JSON.stringify(data));
  };

  return (
    <>
      <button>{children}</button>
    </>
  );
}
```

## 重新验证

`Server Action` 修改数据后，一定要注意重新验证数据，否则数据不会及时更新:

```js
import { revalidatePath } from "next/cache";

export function serverAction(formData) {
  // data format...
  const data = formData.get("key");

  revalidatePath("/routes");

  // return new data
  return data;
}
```

## 错误处理

`Server Action` 中错误处理有两种方式:

- 返回错误信息 `{ message: 'something error' }`
- 抛出错误，由最近的 `error.js` 捕获

## 乐观更新

实验性 `api`, 见:

- [react: useOptimistic](<https://react.docschina.org/reference/react/useOptimistic#noun-labs-1201738-(2)>)
- [掘金文章：乐观更新](https://juejin.cn/post/7347957960884355113)
