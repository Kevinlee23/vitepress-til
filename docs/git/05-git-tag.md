# git 标签

`Git` 可以给仓库历史中的某一个提交打上标签，以示重要

涉及以下操作：

- `git tag` 列出已有标签
- `git tag -l "v1.8.5"` 查找特定模式的标签
- `git tag -a <tagname> -m <message>` 创建附注标签
- `git tag <tagname>` 创建轻量标签
- `git tag -a <tagname> <xxxxxx>` 后期打标签
- `git show <tagname>` 查看标签信息和与之对应的提交信息
- `git push origin <tagname>` 共享标签
- `git push origin --tags` 共享所有不在远程仓库服务器上的标签
- `git tag -d <tagname>` 删除标签
- `git push origin --delete <tagname>` 删除远程仓库上的标签
