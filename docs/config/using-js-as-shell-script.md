# 将 js 文件 当做 shell 脚本执行

## 执行

:::code-group

```js [javascript]
// 表示由 `nodejs` 解析
`#! /usr/bin/env node`;

// script content
```

```sh [shell]
# 赋予脚本文件执行权限
$ chmod +x /home/usr/bin/scriptName.js

# 创建一个软链文件，将脚本与终端命令连接
$ sudo ln -s /home/user/bin/scriptName.js /usr/local/bin/cmdName
```

:::

## 结果

处理完毕后，我们就能在任何目录下使用 `cmdName` 这个命令
