# 设置 git 别名

通过设置 `git alias` (别名) 的方式，可以让我们快速方便的进行 `git` 相关的操作

## 常规设置

```sh
git config --global alias.last 'log -1'
git config --global alias.ci commit
git config --global alias.br branch

# ...
```

## 带参数的 git alias

通过 `shell` 运行

```txt
[alias]
    example = !sh -c 'ls $2 $1' -
```

封装为 `bash` 函数 `f`:

```txt
[alias]
	ll = "!f() { git log --pretty=oneline $1; }; f"
```