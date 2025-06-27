# tailwind 中 @layer 的使用

> @layer 用于自定义 css 规则
> 
> 使用 @layer 可以将生成的样式组织为三个层级：base, components, utilities

## 三个层级的定义

- `base` 用于重置规则或应用于纯 HTML 元素的默认样式
- `components` 用于定义可复用的组件级样式
- `utilities` 用于定义单一功能的**原子类**, 这些类应始终优先于任何其他样式 

## tailwind 样式的生成顺序

@layer `base` -> @layer `components` -> @layer `utiliies` -> 未分层的样式

后生成的样式优先级更高

## 示例

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  h1 {
    @apply text-2xl;
  }
  h2 {
    @apply text-xl;
  }
  /* ... */
}

@layer components {
  .btn-primary {
    @apply py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
  }
  /* ... */
}

@layer utilities {
  .text-shadow {
    text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
  }
  /* ... */
}
```

tips:

- utilities 基本是不使用 @apply 的，它用于生成单一原子类
- 也可以使用 theme 函数来引用主题中的值