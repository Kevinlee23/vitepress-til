# React 中渲染列表

## 官方例子

```jsx
const people = [
  {
    id: 0,
    name: "凯瑟琳·约翰逊",
    profession: "数学家",
    accomplishment: "...",
  },
  {
    id: 1,
    name: "马里奥·莫利纳",
    profession: "化学家",
    accomplishment: "...",
  },
  {
    id: 2,
    name: "穆罕默德·阿卜杜勒·萨拉姆",
    profession: "物理学家",
    accomplishment: "...",
  },
  {
    id: 3,
    name: "珀西·莱温·朱利亚",
    profession: "化学家",
    accomplishment: "...",
  },
  {
    id: 4,
    name: "苏布拉马尼扬·钱德拉塞卡",
    profession: "天体物理学家",
    accomplishment: "...",
  },
];

export default function List() {
  const chemists = people.filter((person) => person.profession === "化学家");
  const listItems = chemists.map((person) => (
    // 在 jsx 中使用 map 渲染列表, key 值是必须的.
    // 用作 key 的值应该在数据中提前就准备好，而不是在运行时才随手生成:
    <li key={person.id}>
      <img src={getImageUrl(person)} alt={person.name} />
      <p>
        <b>{person.name}:</b>
        {" " + person.profession + " "}因{person.accomplishment}而闻名世界
      </p>
    </li>
  ));
}
```

## 为每个列表显示多个 DOM 节点

简写 `<></>` 无法接受 key 值，所以要么使用 `<div>标签` 包裹，要么使用明确的 `<Fragment>标签`

```jsx
import { Fragment } from "react";

// ...

const listItems = people.map((person) => (
  <Fragment key={person.id}>
    <h1>{person.name}</h1>
    <p>{person.bio}</p>
  </Fragment>
));
```
