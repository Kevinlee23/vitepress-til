---
outline: deep
---

# 副作用

## What's the side-effect

**某些事物** 在特定情况下不得不发生改变，这些变动包括：

- 更新屏幕
- 启动动画
- 更改数据等

它们被称作 **副作用**

`react` 中的副作用通常只发生在时间处理程序，这些函数 `(handle-function)` 无需是纯函数
如果你无法为副作用找到合适的事件处理程序，那可以调用 `useEffect` 方法将其附加到返回的 `JSX` 中，这会告诉 `React` 在渲染结束后执行它

## 纯函数

`React` 中的组件是纯粹的，这意味着它必须是一个纯函数：

- **只负责自己的任务**：它不会更改在该函数调用前就已存在的对象或变量
- **输入相同，则输出相同**：给定相同的输入，组件应该总是返回相同的 `JSX`

## 错误案例修改

### (1) 直接修改 DOM

:::code-group

```jsx [wrong]
export default function Clock({ time }) {
  let hours = time.getHours();
  if (hours >= 0 && hours <= 6) {
    document.getElementById("time").className = "night";
  } else {
    document.getElementById("time").className = "day";
  }
  return <h1 id="time">{time.toLocaleTimeString()}</h1>;
}
```

```jsx [correct]
export default function Clock({ time }) {
  let hours = time.getHours();
  let className;
  if (hours >= 0 && hours <= 6) {
    className = "night";
  } else {
    className = "day";
  }
  return (
    <h1 id="time" className>
      {time.toLocaleTimeString()}
    </h1>
  );
}
```

:::

直接修改 `DOM` 是副作用，你可以计算 `className`, 并将其包含在渲染的输出中

### (2) 组件间通信不通过 prpos

:::code-group

```jsx [wrong]
import Panel from "./Panel.js";
import { getImageUrl } from "./utils.js";

let currentPerson;

export default function Profile({ person }) {
  currentPerson = person;
  return (
    <Panel>
      <Header />
      <Avatar />
    </Panel>
  );
}

function Header() {
  return <h1>{currentPerson.name}</h1>;
}

function Avatar() {
  return (
    <img
      className="avatar"
      src={getImageUrl(currentPerson)}
      alt={currentPerson.name}
      width={50}
      height={50}
    />
  );
}
```

```jsx [correct]
import Panel from "./Panel.js";
import { getImageUrl } from "./utils.js";

export default function Profile({ person }) {
  return (
    <Panel>
      <Header person={person} />
      <Avatar person={person} />
    </Panel>
  );
}

function Header({ person }) {
  return <h1>{person.name}</h1>;
}

function Avatar({ person }) {
  return (
    <img
      className="avatar"
      src={getImageUrl(person)}
      alt={person.name}
      width={50}
      height={50}
    />
  );
}
```

:::

`Profile` 组件写入了一个预先存在的 `currentPerson` 变量，而 `Header` 和 `Avatar` 组件读取了这个变量。这使得 三个组件都 变得不纯粹且难以预测

**`React` 组件间的通信需要通过 `props` 进行**
