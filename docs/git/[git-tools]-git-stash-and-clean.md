# git 工具: Stash and Clean

## 场景

试想一种场景，在团队开发工作中，你需要完成一项长期工作的开发，假设在 `issue #53` 分支上开发

你首先切换到了分支: `git checkout issue#53`

然后你进行了部分工作的开发，假设修改了文件: `file1.vue` 和 `file2.vue`，此时你需要紧急去修复另一个 bug, 可是你的工作还未完成，你又不想临时提交未完成的工作。

此时，你需要一个工具来临时保存这些未完成的工作内容，这时候就应该使用 `git stash`

## git stash

运行 `git stash | git stash push`

贮藏未跟踪文件: `git stash --include-untracked`

然后使用 `git stash list`, 可以看到刚才暂存的文件:

```txt
stash @{0}: WIP on master: xxx(上一次的提交记录)
```

应用贮藏: `git apply | git apply stash@{n}`

移除贮藏: `git stash drop stash@{n}`

贮藏创建一个分支: `git stash branch <new branchname>`

## git clean

对于工作目录中一些工作或文件，你想做的也许不是贮藏而是移除. `git clean` 命令就是用来干这个的。

`git clean` 默认情况下，该命令只会删除没有忽略的未跟踪文件

移除工作目录中所有未追踪的文件以及空的子目录: `git clean -d -f`

查看 `clean` 指令会删除哪些文件 (清除演练): `git clean -n`

交互式标记清除: `git clean -x -i`
