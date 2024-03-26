# monorepo 构建

## 什么是 monorepo

`monorepo` 可以管理在一个工作区管理多个项目

## 初始化

- 使用 `pnpm init` 创建 `package.json`
- 根目录的 `package` 文件中写入: `"private": true`
- 根目录创建 `.npmrc` 文件, 写入: `shamefully-hoist = true # 关闭 pnpm 幽灵依赖`
- 根目录创建 `pnpm-workspace.yaml` 文件, 将项目添加进组中：

```yaml
packages:
  - common # 公共包
  - package-1 # 包1
  - package-2 # 包2
```

## 安装公共依赖

`e.g.`: `pnpm i typescript -w`

## 工作区文件共享

:::code-group
```json [common]
{
  "name": "@workspace-name/common"
}
```

```json [package-1]
{
  "dependencies": { "common": "workspace:*" }
}
```
:::

