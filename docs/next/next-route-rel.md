---
outline: deep
---

# Route 相关接口和概念

## 接口

### imports

```jsx
import Link from "next/link";
import {
  useRouter,
  redirect,
  useParams,
  useSearchParams,
  usePathname,
  useSelectedLayoutSegment,
} from "next/navigation";
```

### Link

```jsx
import Link from "next/link";

export default function Page() {
  return <Link href="/dash">Dash</Link>;
}
```

### redirect

`redirect(path, type)`

notice:

- `type: replace(default), push`
- `default Status Code: 307`
- `Server Action: 303`

### useRouter

`router.push('/dash')`

### useSearchParams

> 等同于查询参数：`blog?year=2024&month=09 => params = { year: '2024', month: '09'}`

[参考 1: URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

[参考 2: pushState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)

[参考 3: replaceState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)

[参考 4: useSearchParams](https://nextjs.org/docs/app/building-your-application/routing/linking-and-navigating#windowhistorypushstate)

```jsx
const searchParams = useSearchParams();
const params = new URLSearchParams(searchParams.toString());

// get, set, delete, etc...

window.history.pushState(null, "", `?${params.toString()}`);
```

### useParams

> `/shop/[tag]/[item] => /shop/shoes/nike-air-97 => params = { tag: 'shoes', item: 'nike-air-97' }`

```jsx
import { useParams } from 'next/navigation'

export default function ExampleClientComponent() {
  const params = useParams<{ tag: string; item: string }>()

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return '...'
}
```

### usePathname

```jsx
export function Page() {
  const pathname = usePathname();

  // replace
  // e.g. '/en/about' or '/fr/contact'
  function switchLocale(locale: string) {
    // e.g. '/en/about' or '/fr/contact'
    const newPath = `/${locale}${pathname}`;
    window.history.replaceState(null, "", newPath);
  }

  // ui logic
  return <></>;
}
```

### useSelectedLayoutSegment

> 返回活动段的路由，如果不存在则返回 `null`

`const segment = useSelectedLayoutSegment(parallelRoutesKey?: string)`

`parallelRoutesKey` 参数是在 `layout` 中使用查看平行路由的活动段，在 `page` 中使用时不需要带参数

[参考链接：Example](https://nextjs.org/docs/app/api-reference/functions/use-selected-layout-segment)

## 概念

### 路由组织 Routes Organization

- 路由由文件嵌套定义，只有 `page.js` 和 `route.js` 最终将路由公开暴露
- 在文件夹前加上下划线，表示创建了私人文件夹，该文件路径不会作为路由暴露
- 用括号将文件夹名字包起来，表示创建了路由组（用于组织目的，不会包含在路由路径中）
- 默认组织策略采取 `app` 包含纯粹的路由目的，其他部分 (`components`, `lib`, `shared`...) 在 `app文件夹` 之外定义

### 路由组 Route Groups

> 用括号封装文件夹名称，即可创建路由组：`(folderName)`, 在不影响 URL 的情况下组织路由，将相关路由放到一起

```plain
- app
-- layout.js
-- (marketing)
-- -- about
-- -- -- page.js
-- -- blog
-- -- -- page.js
-- (shop)
-- -- account
-- -- -- page.js
```

`=> /about, /blog, /account`

### 动态路由 Dynamic Routes

使用方括号包裹文件夹路径，表示动态路由：

```jsx
// /blog/[slug]/page.jsx

export default function Page({ params }) {
  // /blog/javascript <=> { slug: 'javascript' }
  return <div>My Post: {params.slug}</div>;
}
```

在方括号内添加省略号，可以动态分段扩展包含所有后续分段：

```jsx
// /shop/[...slugs]/page.jsx

export default function Page({ params }) {
  // /shop/catA/subCatB <=> catA subCatB
  return (
    <div>
      {params.slugs.map((slug, index) => {
        return (
          <span key={index} class="mx-2">
            {slug}
          </span>
        );
      })}
    </div>
  );
}
```

用双层方括号，表示可选的动态路由：

```jsx
// /blog/[[...slugs]]/page.jsx
export default function Page({ params }) {
  return (
    <div>
      {params.slugs ? `Category: ${params.slugs.join("/")}` : "All blogs"}
    </div>
  );
}
```

`typescript`:

```json
{
  "app/blog/[slug]page.js": { "slug": "string" },
  "app/shop/[...slug]/page.js": { "slug": "string[]" },
  "app/shop/[[...slug]]/page.js": { "slug?": "string[]" },
  "app/[categoryId]/[itemId]/page.js": {
    "categoryId": "string",
    "itemId": "string"
  }
}
```

### 平行路由 Parallel Routes

`@+folderName`:

```plain
-- @team
-- -- page.jsx
-- @analytics
-- -- page.jsx
-- layout.jsx
```

```jsx
// layout.jsx
// 通过 @ + slot 插槽创建平行路由
// ts: { children: React.ReactNode, team: React.ReactNode, ... }
export default function Layout({ children, team, analytics }) {
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}
```

以上，插槽不是路由段，不会影响 `url` 结构，文件结构 `@team/setting` 对应的路由为：`/setting`

定义一个 `default.js` 文件，在初始加载或重新加载时，将作为未匹配插槽的备用文件（提供隐式的回退）:

```plain
-- @team
-- -- page.jsx
-- @analytics
-- -- default.jsx // [!code ++]
-- -- page.jsx
-- layout.jsx
```

搭配 `Hook: useSelectedLayoutSegment` 使用：

```jsx {3}
export default function Layout({ children, team, analytics }) {
  // 导航到 app/@analytics/subFolder 时，segment = subFolder
  const segment = useSelectedLayoutSegment(analytics);
  return (
    <>
      {children}
      {team}
      {analytics}
    </>
  );
}
```

### 路由拦截 Routing Intercepting

> 示例：推特的图片模态框，`xlog/inne博客` 的文章详情，这项技术可以让你在当前布局从应用程序切换到其他部分加载一个路由，通常以模态框的形式展现

`before`以前的做法：

点击 `<Link href='/photo/123' />` => 当页跳转到图片展示链接

`now`当前做法：

点击链接：

- 打开一个模态框展示内容
- 并且当前页面的链接切换到目标路由
- 回退或关闭模态框，返回上一级历史链接

`using`:

- `(.)` 匹配同级路由
- `(..)` 匹配上一级路由
- `(..)(..)` 匹配上两级路由
- `(...)` 从根路由开始匹配

`(..) expample`:

```plain
-- feed
-- -- layout.js
-- -- (..)photo
-- photo
-- -- [id]
-- -- -- page.js
-- -- layout.js
-- page.js
```

[示例 example](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes#modals)

### 路由处理器 Route Handlers

路径：`./api/route.js(ts)`

```js
// support: GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
export async function GET(request) {}
export async function POST(request) {}
```

对 `GET` 方法进行缓存（对其他类型的请求方法无效）:

```js
export const dynamic = "force-static"; // [!code ++]

export async function GET(request) {}
```

`Example`:

```ts
import { headers } from "next/headers";
import { type NextRequest } from "next/server";

// Header:
export async function GET(request: Request) {
  const headersList = headers();
  const referer = headersList.get("referer");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { referer: referer },
  });
}

// Header 2:
export async function GET(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
}

// Dynamic Route Segements:
export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug; // 'a', 'b', or 'c'
}

// Query:
export function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  // query is "hello" for /api/search?query=hello
}

// Request Body:
export async function POST(request: Request) {
  const res = await request.json();
  return Response.json({ res });
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return Response.json({ name, email });
}
```

使用第三方请求类库：

- [SWR](https://swr.vercel.app/zh-CN): 用于数据请求的 `React Hooks` 库
- [ofetch](https://github.com/unjs/ofetch): `A better fetch API, Works on node, browser and workers`

### 中间件 Middleware

中间件的作用包含：

- 进入页面前进行认证和授权
- 服务侧重定向
- 路径重写
- 日志和分析
- 功能标记

[示例 Example](https://nextjs.org/docs/app/building-your-application/routing/middleware)
