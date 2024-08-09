# useEffect

React 的两种逻辑:

- 渲染逻辑代码
- 事件处理程序

除此之外，可能还需要另一种逻辑：指定不能再渲染中发生的事件 (例如修改 Dom)

**Effect 允许你指定由渲染本身，而不是特定事件引起的副作用**

## 什么时候需要 Effect

> 不要随意在你的组件中使用 `Effect`. 记住, `Effect` 通常用于暂时“跳出” `React` 代码并与一些 外部 系统进行同步。这包括浏览器 API、第三方小部件，以及网络等等。如果你想用 `Effect` 仅根据其他状态调整某些状态，那么 你可能不需要 `Effect`

## 声明 Effect

```jsx
function MyComponent {
  useEffect(() => {
    // 每次渲染后都会执行此处的代码
  })

  return <div />
}
```

## 指定依赖

```jsx
function MyComponent {
  useEffect(() => {
    // 每次渲染后都会执行此处的代码
  }, []) // 不能为空, 且不能随意选择依赖项 (依赖项要和 Effect 代码匹配)

  return <div />
}
```

## 按需添加 cleanup 函数

- 订阅事件中应该在清理函数中退订事件
- 在 `Effact` 中加入了动画，也应该在清理函数中将动画重置
- 如果 `Effect` 将会获取数据，清理函数应该要么 中止该数据获取操作，要么忽略其结果

```jsx
useEffect(() => {
  const connection = createConnection();
  connection.connect();
  return () => {
    connection.disconnect();
  }; // 每次重新执行 Effect 之前，React 都会调用清理函数；组件被卸载时，也会调用清理函数
}, []);
```

## 初始化应用时不需要使用 effect 的情形

把逻辑放在组件之外

```jsx
if (typeof window !== "undefined") {
  // 检查是否在浏览器中运行
  checkAuthToken();
  loadDataFromLocalStorage();
}

function App() {
  // ……
}
```
