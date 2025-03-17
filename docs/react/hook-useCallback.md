# useCallback

> 用来缓存未发生改变的函数

使用场景：

- 很多情况下，我们会将函数作为 `props` 传递给子组件
- 当我们对子组件使用 `memo` 进行缓存时，我们可能期待入参时子组件跳过渲染
- 但是父组件中每次重新渲染时，函数都是变化值，这将导致 `memo` 失效
- 这个时候 `useCallback` 就派上用场了

## 示例

```jsx {11}
import { memo } from "react";

const ShippingForm = memo(function ShippingForm({ onSubmit }) {
  // ...
});

function ProductPage({ productId, referrer, theme }) {
  // ...

  // 在多次渲染中缓存函数
  const handleSubmit = useCallback(
    (orderDetails) => {
      post("/product/" + productId + "/buy", {
        referrer,
        orderDetails,
      });
    },
    [productId, referrer]
  ); // 只要这些依赖没有改变

  return (
    <div className={theme}>
      <ShippingForm onSubmit={handleSubmit} />
    </div>
  );
}
```

## 与 useMemo 关系

优化子组件时，`useCallback` 与 `useMemo` 经常一同出现：

- `useMemo` 缓存函数调用的结果
- `useCallback` 缓存函数本身

## 为循环总每一个列表项调用 useCallback

将单个项目提取成一个组件，单独使用 `useCallback`

```jsx
function ReportList({ items }) {
  return (
    <article>
      {items.map((item) => (
        <Report key={item.id} item={item} />
      ))}
    </article>
  );
}

function Report({ item }) {
  // ✅ 在最顶层调用 useCallback
  const handleClick = useCallback(() => {
    sendReport(item);
  }, [item]);

  return (
    <figure>
      <Chart onClick={handleClick} />
    </figure>
  );
}
```
