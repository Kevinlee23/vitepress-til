# react 中 state 的更新

## 对象更新时避免 mutation

改变对象或者数组自身内容时, 就制造了一个 mutation

```jsx
const [position, setPosition] = useState({ x: 0, y: 0 });

position.x = 5; // [!code error] // React state 中存放的对象视为不可变的, 应该替换它的值而不是修改

setPosition({ ...position, x: 5 }); // [!code highlight] // right
```

对于嵌套数组，需要多层使用 `...对象展开语法`

```jsx
const [person, setPerson] = useState({
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
});

// error
person.artwork.city = "New Delhi";

// right
setPerson({
  ...person, // 复制其它字段的数据
  artwork: {
    // 替换 artwork 字段
    ...person.artwork, // 复制之前 person.artwork 中的数据
    city: "New Delhi", // 但是将 city 的值替换为 New Delhi！
  },
});
```

## 数组更新时避免 mutation

避免使用：
增加元素 `push`, `unshift`
删除元素 `pop`, `shift`, `splice`
替换元素 `splice`, `arr[i] = ...`
排序 `reverse`, `sort`

这些方法会在原数组上进行修改

替换为：
增加元素 `concat`, `[...arr, element]`
删除元素 `filter`, `slice`
替换元素 `map`
排序 `先复制一份数组`

`react` 中大多数情况下会使用 `slice`

例子:

```jsx
import { useState } from "react";

const [users, setUsers] = useState(["Bob", "John"]);

// add
setUsers([...users, "snowinlu"]);
setUsers([...users, "lixiuxian"]);

// delete
setUsers(users.filter((u) => u === "Bob"));
setUsers(users.slice(1));

// change
const newArr = [...users];
newArr.reverse();
setUsers(newArr);
```

注意点： 即使你拷贝了数组，你还是不能直接修改其内部的元素

## 使用 Immer 库

`Immer` 库在 `update` 函数中提供 `state` 的 `proxy` 对象, 你可以直接直接在它上面进行修改

```jsx:line-numbers=1 {13-15}
import { useImmer } from "use-immer";

const [person, updatePerson] = useImmer({
  name: "Niki de Saint Phalle",
  artwork: {
    title: "Blue Nana",
    city: "Hamburg",
    image: "https://i.imgur.com/Sd1AgUOm.jpg",
  },
});

// right
updatePerson((draft) => {
  draft.artwork.city = "Lagos";
});
```
