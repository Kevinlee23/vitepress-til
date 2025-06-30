# monorepo 构建

## 什么是 monorepo

`monorepo` 可以管理在一个工作区管理多个项目

## 初始化

- 使用 `pnpm init` 创建 `package.json`
- 根目录的 `package` 文件中写入：`"private": true`
- 根目录创建 `.npmrc` 文件，写入：`shamefully-hoist = true # 关闭 pnpm 幽灵依赖`
- 根目录创建 `pnpm-workspace.yaml` 文件，将项目添加进组中：

```yaml
packages:
  - common # 公共包
  - package-A # 包 1
  - package-B # 包 2
```

## 安装公共依赖

`e.g.`: `pnpm i typescript -w`

## 工作区文件共享

通过指令：`pnpm install @monorepoSpace/common -w` 来共享依赖

:::code-group
```json [common]
{
  "name": "@monorepoSpace/common"
}
```

```json [package-A]
{
  "dependencies": { "@monorepoSpace/common": "workspace:*" }
}
```
:::

## monorepo 分包示例

> 示例为前端监测库：web-see

![monorepo](/images/monorepo.png)

如图所示仓库分了几个包：
- @websee/common
- @websee/core
- @websee/performance
- @websee/recordscreen
- @websee/types
- @websee/utils

在最顶层的 `pnpm-workspace.yaml` 中设置：

```yaml
packages:
  - 'packages/*'
```

由于 core 这个分包是核心，引用了三个子包，所以在它的目录下的 package 设置：

```json
{
  "dependencies": {
    "@websee/common": "workspace:*",
    "@websee/types": "workspace:*",
    "@websee/utils": "workspace:*"
  }
}
```

如此，就可以在 core 包的代码下使用其他包的内容：

```js
import { SDK_VERSION, SDK_NAME, EVENTTYPES } from '@websee/common';
import { InitOptions, VueInstance, ViewModel } from '@websee/types';
```