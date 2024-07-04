# pm2 基本操作

以 `nest` 项目的持久化为例

```shell
$ pm2 start dist/main.js --name app_name

# 先杀死进程再重启新进程
$ pm2 restart app_name
# 先创建新进程，等创建成功后关闭旧进程
$ pm2 reload app_name
# 停止应用进程，但会保存在列表中
$ pm2 stop app_name
# 停止并从列表中删除进程
$ pm2 delete app_name

$ pm2 list/ls

# 查看运行项目的日志
$ pm2 logs []
```
