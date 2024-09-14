# useImperativeHandle & forwardRef

用法:

- 向父组件暴露一个自定义的 `ref` 句柄
- 暴露你自己的命令式方法 (通过命令式句柄暴露出来的方法不一定需要完全匹配 `DOM` 节点的方法)

## 示例

:::code-group

```jsx [c-component.jsx]
import { forwardRef, useRef, useImperativeHandle } from "react";

// forwardRef 允许组件使用 ref 将 DOM 节点暴露给父组件
const CComponent = forwardRef(function CComponent(props, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(
    ref,
    () => {
      return {
        focus() {
          inputRef.current.focus();
        },
        scrollIntoView() {
          inputRef.current.scrollIntoView();
        },
      };
    },
    []
  );

  return <input {...props} ref={inputRef} />;
});
```

```jsx [app.jsx]
import { useRef } from "react";
import CComponent from "./CComponent.js";

export default function Form() {
  const ref = useRef(null);

  function handleClick() {
    ref.current.focus();
    ref.current.scrollIntoView();
  }

  return (
    <form>
      <CComponent placeholder="Enter your name" ref={ref} />
      <button type="button" onClick={handleClick}>
        Edit
      </button>
    </form>
  );
}
```

:::
