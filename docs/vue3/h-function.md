# h 函数

`h` 函数用于创建虚拟 `DOM` 节点 `(vnode)`

## 参数签名

```js
function h(
  type: string | Component,
  props?: object | null,
  children?: Children | Slot | Slots
): VNode
```

## 用法

```js
// 一般用法, class 和 style 可以像在模板中一样使用
h("div", { class: "bar", style: { color: "red" } }, "hello, js");

// 事件监听器应以 onXxx 的形式书写
h("div", { onClick: () => {} });

// 传入多个子节点, 没有 prop 的时候可以省略不写
h("div", [h("span", null, "hello,"), h("span", null, "js")]);

// 传递单个默认插槽
h(Foo, () => "default slot");

// 传递具名插槽
// 注意，需要使用 `null` 来避免
// 插槽对象被当作是 prop
h(MyComponent, null, {
  default: () => "default slot",
  foo: () => h("div", "foo"),
  bar: () => [h("span", "one"), h("span", "two")],
});
```
