# 分支操作

## 新建分支

- `git branch` 查看当前仓库分支列表
- `git branch -v` 查看每个分支最后一次提交
- `git branch --merged` 查看已完成合并的分支列表
- `git branch --no-merged` 查看未完成合并的分支列表
- `git ls-remote <remote> / git remote show <remote>` 获取远程分支的信息
- `git branch branch-name` 新建
- `git checkout -b branch-name` 新建并切换

## 分支合并

`将 branch-1 分支的内容合并到 主分支 (master)`

```git
git checkout master
git merge branch-1
```

`将主分支的内容合并到 branch-1 分支`

```git
git checkout branch-1
git merge master
```

## 合并时出现冲突

```git
git merge branch-1

# CONFLICT (content): Merge conflict in index.html // [!code error]
# Automatic merge failed; fix conflicts and then commit the result. // [!code error]

# to fix: 找到发生冲突的文件，解决冲突
git commit -m -a 'xxx' # 重新提交合并
```

## 删除分支

一般来说，完成合并的分支需要及时删除（除非是长期维护的分支）

`git branch -d branch-name` 删除本地的分支 `branch-name`

`git push origin --delete branch-name` 删除远程上的分支 `branch-name`
