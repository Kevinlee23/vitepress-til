---
outline: deep
---

# react 状态管理

## 状态提升 - 组件间共享状态

当想要整合两个组件时，将它们的 `state` 移动到父组件中，
然后在父组件通过 `props` 将信息传递下去，
最后，向下传递事件处理程序，以便子组件可以改变父组件的 `state`

这种模式下叫做受控组件：

- 受控组件 (由 `props`) 驱动
- 非受控组件 (由 `state`) 驱动

## UI 树同位置 - 状态保留

处在相同 `UI` 树位置的组件，将保留其中的 `state`

修改组件输入时重置 `state`: 给组件定义一个**唯一的** `key`

## 通过 context 向深层节点透传 props

`定义 Context`

```jsx
import { createContext } from "react";
export const SomeContext = createContext(1);
```

`获取 Context`

```jsx
const level = useContext(SomeContext);
```

`传递 Context`

```jsx
import { SomeContext } from "./app-context.js";

export default function Father({ level, children }) {
  return (
    <SomeContext.Provider value={level}>
      <Child />
    </SomeContext.Provider>
  );
}
```

与 `vue` 中的 `provider/inject` 的区别：

- 语法和使用方式：
  - `Context:`
    React 使用 `createContext()` 创建 `Context` 对象，通过 `Provider` 提供值，`Consumer` 或 `useContext` 消费值
  - `provide/inject:`
    Vue 直接在组件中使用 provide 提供数据，在子组件中使用 `inject` 注入数据
- 响应性：
  - `Context:`
    `Context` 的值变化会触发使用该 `Context` 的组件重新渲染
  - `provide/inject:`
    默认情况下不是响应式的。但如果提供的是可监听对象，其属性仍然是响应式的
- 使用范围：
  - `Context:`
    适用于多层级组件间共享数据，但过度使用可能影响组件复用性
  - `provide/inject:`
    主要用于祖先组件向后代组件传递数据，使用相对简单
- 默认值设置：
  - `Context:`
    在 `createContext()` 时可以设置默认值
  - `provide/inject:`
    在 `vue 2.5.0+` 版本中，`inject` 可以通过设置默认值使其成为可选项
- 组件耦合：
  - `Context:`
    使用 `Context` 可能会使组件与特定 `Context` 耦合，影响复用性
  - `provide/inject:`
    相对来说，`provide/inject` 的使用不会严重影响组件的独立性和复用性

使用 `Context` 前，先考虑 直接使用 `props` 或 抽象组件将 `jsx` 作为 `children` 传递是否更适用

### 与 Context 优化相关的：React.memo; Rect.useMemo()

更新 `context` 时，所有使用该上下文的组件都被重新渲染，为了防止不必要的重新渲染，我们可以：

- `#1` 创建多个 `context` 想相关的数据分开存储 
- `#2` 拆分组件并传递所需的值，将子组件包装在 `React.memo` 中，通过 `prop` 分发 `context` 的属性 
- `#3` 使用 `React.useMemo()`, 并将 `context` 属性作为依赖项，只有当属性修改时才出发回调函数重新渲染 

`#2`

```jsx
const Card = () => {
  const appContextValue = useContext(AppContext);
  const theme = appContextValue.theme;

  return (
    <div>
      <CardTitle theme={theme} />
      <CardDescription theme={theme} />
    </div>
  );
};

const CardTitle = React.memo(({ theme }) => {
  return <h2 style={{ color: theme.text }}>2024 年巴黎奥运会 </h2>;
});

const CardDescription = React.memo(({ theme }) => {
  return (
    <p style={{ color: theme.text }}>
      2024 年巴黎奥运会是第 33 届夏季奥林匹克运动会
    </p>
  );
});
```

`#3`

```jsx
const Card = () => {
  const appContextValue = useContext(AppContext);
  const theme = appContextValue.theme;

  return useMemo(
    () => (
      <div>
        <CardTitle theme={theme} />
        <CardDescription theme={theme} />
      </div>
    ),
    [theme]
  );
};

const CardTitle = ({ theme }) => {
  return <h2 style={{ color: theme.text }}>2024 年巴黎奥运会 </h2>;
};

const CardDescription = ({ theme }) => {
  return (
    <p style={{ color: theme.text }}>
      2024 年巴黎奥运会是第 33 届夏季奥林匹克运动会
    </p>
  );
};
```

## 全局状态管理

`zustand` （目前最流行的 `react` 状态管理库）:

- [github](https://github.com/pmndrs/zustand)
- [document](https://docs.pmnd.rs/zustand/getting-started/introduction)
