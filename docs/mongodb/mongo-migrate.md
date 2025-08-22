# mongodb 数据迁移

> 使用官方工具 mongodump 和 mongorestore

## 安装

如果在安装 mongodb 时没有安装工具，前往 [链接](https://www.mongodb.com/try/download/database-tools)下载

## 简单使用

- 在命令行中输入 mongodump
- 默认情况下在当前面目录生成 /dump 文件夹，在里面挑选自己想要迁移的 database
- 将文件夹压缩，传输到目标机器
- 解压缩后，使用命令：mongorestore /dump

## 完整指令

- mongodump
  - _`--host`_ xx
  - _`--username`_ xx
  - _`--password`_ xx
  - _`--authenticationDatabase`_ xx
  - _`--out`_ xx
- --host: 源 MongoDB 的地址和端口。
- --username / --password: 有备份权限的用户名和密码。
- --authenticationDatabase: 认证数据库，通常是 admin。
- --out 或 -o: 指定备份文件的输出目录。执行后，所有数据库的数据和索引都会以 BSON 格式保存在这个目录下。

- mongorestore --host <目标主机名：端口> --username <用户名> --password <密码> --authenticationDatabase admin <备份文件路径>
