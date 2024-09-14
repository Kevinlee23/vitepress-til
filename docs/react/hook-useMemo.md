# useMemo

> 类似于 `vue` 中的 `computed`, 用来缓存状态之间的计算结果

## 示例

```jsx
import { useMemo } from "react";

function TodoList({ todos, tab }) {
  const visibleTodos = useMemo(() => filterTodos(todos, tab), [todos, tab]);
  // ...
}
```

## 解释

`useMemo(calculateValue, dependencies)`

`calculateValue` 是一个箭头函数，返回依赖的状态间计算的结果
`dependencies` 是一个依赖数组，当组件渲染时，依赖修改了才去重新计算

与 `computed` 的区别点:

- `useMemo` 是当重新渲染时依赖修改了则重新计算，而 `computed` 是当依赖修改时重新计算,
- `useMemo` 的定义方式是 `hook` 函数, 而 `computed` 是组件选项
- `useMemo` 的缓存机制是依赖项数组内元素变化触发重新计算，而 `computed` 是响应式依赖变化触发重新计算

## 增补: api - memo

> `memo` 允许你的组件在 `props` 没有改变的情况下跳过重新渲染

使用 `memo` 将组件包装起来，以获得该组件的一个记忆化版本:

- `const MemoizedComponent = memo(SomeComponent, arePropsEqual?)`
- 默认情况下不需要指定 `arePropsEqual` 函数, `React` 将使用 `Object.is` 比较新/旧 `props`
- 记忆化指的是 `props` 是否修改
- 组件自身内部的状态发生变化时仍会重新渲染
- 当其使用的 `context` 发生变化时，它仍将重新渲染
- 最小化 `props` 变化: 确保组件在其 `props` 中接受必要的最小信息而不是整个对象