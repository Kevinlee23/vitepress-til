# ssh 公钥生成

```sh
# 查看用户名和邮箱是否配置
$ git config --global --list

# 配置用户名和邮箱
$ git config --global user.name "your username"
$ git config --global user.email "your email"

# 生成秘钥
$ ssh-keygen -t rsa -C "xxx@xxx.com"
```

生成秘钥后, `cd ~/.ssh` 进入 ssh 目录下

使用 `cat ~/.ssh/id_rsa.pub` 复制公钥内容到 `github` 或者 `gitlab` 等代码托管网站配置你的 `ssh key`
