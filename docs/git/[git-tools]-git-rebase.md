# rebase: 使用变基来重塑历史

## git-add --patch

这个指令会在 `rebase` 中使用到，它的含义是把一个 `commit` 切分成好几次 `commit`

执行 `git add --patch` 指令后, `git` 系统会问你文件中的哪些改动需要在这次放入暂存区，可以有条件的选择，这样就可以将一个文件的改动分几条记录 `commit`

## rebase 用法一：调整顺序

使用指令 `git rebase -i <xxx>`
特别指出:

- `<xxx>` 指从哪一个节点往后开始重塑 git 历史
- `-i` 的意思是使用交互模式开始调整 `<xxx>` 之后的 `commit`

随后进入 `vim` 编辑模式开始调整，调换顺序保存即可

## rebase 用法二：删除 commit

`git rebase -i <xxx>` 进入编辑模式后，将想要删除的节点的 `pick` 改为 `drop`

## rebase 用法三：修改 message

`git rebase -i <xxx>` 进入编辑模式后，将想要修改 `message` 的节点的 `pick` 改为 `reword`

随后会有进一步提示要求你输入新的 `message`

## rebase 用法四：合并 commit

将 `pick` 改为 `squash`, 代表想把这个节点和上一个节点合并，会要求你输入新的 `message`

## rebase 用法五：拆分 commit

将 `pick` 改为 `edit`, `git` 遇到 `edit` 指令时会停下来，这时可以输入: `git reset HEAD^`

意思是回退所有内容到上一个版本，指令会将提交的文件修改重新弹出来

我们可以重新提交，起到拆分的效果

拆分完毕后需要执行 `git rebase --continue` 继续重塑

## 补充知识点：可能用到的 vim 指令

可能用到以下指令:

- `a, i` 向光标后、前插入文本
- `A` 在当前行插入文本
- `dd` 删除整行
- `yy` 将当前行的内容放入临时缓冲区
- `p, P` 将临时缓冲区中的文本放入光标后、前
- `:w` 保存文件但不退出
- `:wq` 保存文件并退出
- `q` 不保存文件，退出
