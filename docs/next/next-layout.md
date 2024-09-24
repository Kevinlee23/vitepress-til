# Next 中的布局组件

## Shared Route

```txt
-- app
-- -- dashboard
-- -- -- layout.js
-- -- -- page.js
-- -- -- settings
-- -- -- -- page.js
```

上述例子中，布局组件将在 `/dashboard` 和 `/dashboard/settings` 两个路由中共享

## Props

```jsx
export default function Layout({
  children, // required, same as vue3: <RouteLink />
  params, // optional: app/dashboard/[team]/layout.js <=> 	{ team: '1' }
}) {
  // logical
}
```

## Metadata

元数据可以通过在 `layout.js` 或 `page.js` 文件中导出 `metadata` 对象或 `generateMetadata` 函数来定义。

```jsx
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: 'Next.js',
}
 
export default function Page() {
  return '...'
}
```

## 布局无法访问 Pathname

`替代方案`

[examples](https://nextjs.org/docs/app/building-your-application/routing/layouts-and-templates#examples)

```jsx
"use client ";

// 将依赖 pathname 的逻辑放到客户端组件中
import { usePathname } from "next/navigation";
const ClientComponent = () => {
  const pathname = usePathname();
  return <>{pathname}</>;
};

export default function Layout({ children }) {
  return (
    <>
      <ClientComponent />
      <main>{children}</main>
    </>
  );
}
```
