---
outline: deep
---

# git 合并与变基最佳实践

背景：

> 从开发分支 (dev) 合并代码到主分支 (main), 那么主分支会比开发分支领先 (1 ahead)

## 1 ahead

在 main 分支上，有 1 个提交是 dev 分支上所没有的。

这个提交就是你刚刚完成的合并提交（Merge Commit）。这个合并提交本身是一个新的提交，它有两个父提交：一个是原来 main 分支的指针，另一个是 dev 分支的指针。它记录了“将 dev 合并到 main”这个事件。

## 从 main 分支变基

让 dev 分支同步最新代码的正确方法是：从 main 分支变基（rebase），而不是合并（merge）

```bash
# sto branch dev
git checkout dev

# then rebase
get rebase main
```

## 最终建议

### main and dev

如果要在主分支展示合并脉络：

- 在你将 dev 合并到 main 之后，如果接下来要继续在 dev 分支上开发新功能，第一件事就是执行 git rebase main。这能确保你的新工作始于一个包含所有已发布代码的最新基础

### better (main, dev, feature-dev)

更好的选择：

- 不在 main 分支上展示线性历史，分支管理采用四类：main 分支，dev 分支，特性开发分支，fix 分支，所有的合并都指向开发分支 (dev)
- 变基合并：dev 向 main 分支同步代码不使用 merge, 而是 rebase
- 代码实践：

#### 分支策略设计

- main 分支：生产代码，强制保持线性历史（无合并提交）
- dev 分支：集成分支，允许合并提交和功能集成
- feature/xxx 分支：功能开发分支
- fix/xxx 分支：bug 修复分支

#### 功能开发

```bash
# 从 dev 创建功能分支
git checkout dev
git pull origin dev
git checkout -b feature/new-feature

# 开发并提交更改
git add .
git commit -m "实现新功能"

# 推送到远程
git push -u origin feature/new-feature
```

#### 合并到 dev 分支

```bash
# 方法1: 创建 Pull Request 合并到 dev（产生合并提交）
# 在 Git 平台界面操作，选择"Create merge commit"选项

# 方法2: 本地合并到 dev
git checkout dev
git pull origin dev
git merge feature/new-feature --no-ff  # 明确创建合并提交
git push origin dev
```

#### 从 dev 分支更新到 main 分支（保持线性）

```bash
# 确保 dev 分支稳定且通过测试
git checkout main
git pull origin main

# 将 dev 分支变基到 main 分支顶端
git checkout dev
git rebase main

# 解决可能的冲突
# git add <解决的文件>
# git rebase --continue

# 切换到 main 分支并快进合并
git checkout main
git merge dev --ff-only
git push origin main

# 更新 dev 分支到与 main 相同的位置
git checkout dev
git merge main --ff-only
git push origin dev
```
