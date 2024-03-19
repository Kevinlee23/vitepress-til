---
outline: deep
---

# JSX

## 在 vue3 中引入

安装

`yarn add @vue/babel-plugin-vue-jsx -d`

添加配置

`vite.config.js`

```javascript
import vueJsx from "@vue/babel-plugin-vue-jsx";

export default {
  plugins: [vueJsx()],
};
```

## 语法

### jsx 中禁止返回多个节点的模板

```jsx:line-numbers=1 {7-10}
const = render = () => {
  <div>Fragment</div> // [!code error]
  <span>yees</span> // [!code error]
}

const  render = () => {
  <>
    <div>Fragment</div>
    <span>yees</span>
  </>
}
```

### 传递属性

`vue2`

```jsx
const render = () => {
  <div
    // 传递一个 HTML Attribute，属性名称是 id 属性值是 'foo'
    id="foo"
    // 传递 DOM Property 需要使用前缀 `domProps` 来表示，这里表示传递给 innerHTML 这个 DOM 属性的值为 ‘bar’
    domPropsInnerHTML="bar"
    // 绑定原生事件需要以 `on` 或者 `nativeOn` 为前缀，相当于 click.native
    onClick={this.clickHandler}
    nativeOnClick={this.nativeClickHandler}
    // 绑定自定义事件需要用 `props` + 事件名 的方式
    propsOnCustomEvent={this.customEventHandler}
    // class（类名）、style（样式）、key、slot 和 ref 这些特殊属性写法
    class={{ foo: true, bar: false }}
    style={{ color: "red", fontSize: "14px" }}
    slot="slot"
    key="key"
    ref="ref"
    // 如果是循环生成的 ref（相当于 v-for），那么需要添加 refInFor 这个标识
    // 用来告诉 Vue 将 ref 生成一个数组，否则只能获取到最后一个
    refInFor
  ></div>;
};
```

`vue3`

- `DOM Property`, `HTML Attribute` 直接书写
- `class`, `style` 与 `vue2` 相同
- `ref`: 定义好 `ref` 后使用 `js` 表达式

### 事件绑定

`on` + 大写字母

`onclick, click` :x:

`onClick, onClickChange` :heavy_check_mark:

事件修饰符

`.passive`, `.capture`, `.once` 使用驼峰写法拼接在事件后面:

> `onClickCapture`, `onKeyupOnce`

其余的修饰符需要使用 `withModifiers` 函数

```jsx
import { ref, withModifiers } from "vue";
const count = ref(0);
const render = () => {
  <input
    onClick={withModifiers(
      // 第一个参数是回调函数
      () => count.value++,
      // 第二个参数是修饰符组成的数组
      ["self", "prevent"]
    )}
  />;
};
```

### v-指令

- **v-for** : `map方法`

- **v-if** : `?: or &&`

- **v-show** : `v-show` / `vShow`

- **v-model** : `v-model={}`

### 插槽

`vue3`

:::code-group

```javascript [预留插槽]
export default {
  name: "CustomComponent",
  props: ["message"],
  setup(props, { slots }) {
    return () => (
      <>
        <div>{slots.default ? slots.default() : "Hello"}</div>
        <div>{slots.bar?.()}</div>
        <div>{slots.foo?.({ text: props.message })}</div>
      </>
    );
  },
};
```

```javascript [传入插槽]
const slots = {
  bar: () => <span>bar</span>,
  foo: ({ text }) => <span>Hello, {text}</span>,
};

const render = () => (
  <CustomComponent v-slots={slots}>
    <div>Hello, Wolrd</div>
  </CustomComponent>
);

:::
```
