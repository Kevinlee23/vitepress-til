# React 中插槽的用法

## 1. 默认插槽 (children)

`Father`

```jsx
import Child from "./child";
export default function Father() {
  return (
    <div>
      <div>我是父组件</div>
      <div>---</div>
      <Child>
        <div>我是一个插槽</div>
      </Child>
    </div>
  );
}
```

`Child`

```jsx
export default function Child({ children }) {
  return (
    <div>
      <div>我是子组件</div>
      {children}
    </div>
  );
}
```

默认插槽会通过 `props` 对象中的 `children` 属性传递

## 2. 具名插槽 (named)

具名插槽的用法是：将插槽内容通过 `props` 传递

`Father`

```jsx
export default function Father() {
  const title = <div>我是标题</div>;
  const content = <div>我是一个具名插槽</div>;

  return (
    <div>
      <div>我是父组件</div>
      <div>---</div>
      <Child title={title} content={content}></Child>
    </div>
  );
}
```

`Child`

```jsx
export default function Child({title, content}) {
  return (
    <div>我是子组件</div>
    {title}
    {content}
  )
}
```
