# 获取 git 仓库

## 初始化本地目录为 git 仓库

`git init` 指令会在项目目录下创建一个名为 `.git` 的子目录，这个子目录含有你初始化的 `git` 仓库中所有必须的文件

初始提交:

```cmd
$ git add *.c
$ git add LICENSE
$ git commit -m 'initial project version'
```

## 克隆现有的仓库

`git clone https://github.com/repositoryName`

`git` 支持多种数据传输协议，以上使用的是 `https` 协议，也可以使用 `git://` 协议或 `ssh` 传输协议
