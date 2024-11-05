# 类型声明文件

+ 导入一个没有类型定义的npm包
+ 导入一些非代码文件
+ 项目运行时动态注入了一些全局变量

以上三个场景导致TS报错，可以通过类型声明来解决：<u>通过额外的类型声明文件 `(.d.ts)`, 在核心代码文件以外去提供对类型的进一步补全</u>



## Fix problem 1

例如在ts项目中引入了树结构处理包 tree-tool, 我们想使用列表转树形结构的方法 fromList

- 方法1. 安装 `@type/xxx` 的 npm 包
- 方法2. 对于没有提供 type 包的类库，自己创建一个类型声明文件 `tree-tool.d.ts`

```typescript
declare module 'tree-tool' {
	interface Config {
        id?: string,
        pid?: string,
        children?: string
    }
    
    export const fromList: <T>(list: T[], config?: Config) => T[]
}
```

如果需要使用其他的方法，继续在声明中追加定义

## Fix problem 2

假设我们希望导入一个 `.md` 文件

```typescript
// index.ts
import raw from './note.md';

const content = raw.replace('NOTE', `NOTE${new Date().getDay()}`);

// declare.d.ts
declare module '*.md' {
  const raw: string;
  export default raw;
}
```



## Fix problem 3

显式的添加方法/属性到 `Window` 接口中， 利用同名接口合并的特性，我们可以重新声明一个Window接口

```typescript
interface Window {
    userTracker: (...args: any[]) => Promise<void>;
}

window.userTracker("click")
```



