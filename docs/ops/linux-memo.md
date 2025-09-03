---
outline: deep
---

# linux (ubuntu, macOs) 速查

> 日拱一卒，功不唐捐

## 数据类

### 【数据库】mongoDB 路径

| 项目                | 标准路径                    | 查看方法                                         |
| ------------------- | --------------------------- | ------------------------------------------------ |
| 可执行文件 (mongod) | /usr/bin/mongod             | which mongod, dpkg -L                            |
| 配置文件            | /etc/mongod.conf            | dpkg -L, ps 命令，db.serverCmdLineOpts()         |
| 数据目录 (dbPath)   | /var/lib/mongodb            | 查看 mongod.conf 文件，或 db.serverCmdLineOpts() |
| 日志文件            | /var/log/mongodb/mongod.log | 查看 mongod.conf 文件                            |

### 【数据库】：修改 mongo server 出口

服务器上的 mongo server 只能够在本地连接

但是修改出口地址为 0.0.0.0 后，可以从外部使用工具连接服务器上的 db server 进行调试

```shell
$ sudo vim /etc/mongod.conf

# bindIp: 0.0.0.0  # 原来是 127.0.0.1，修改为 0.0.0.0 表示监听所有网络接口
```

### 解压缩

- _`zip`_ unzip xxx.zip
- _`tar.gz`_ tar -xzvf file.tar.gz
- _`.tar.bz2`_ tar -xjvf file.tar.bz2
- _`rar`_ unrar x file.rar（需要安装：sudo apt install unrar）
- _`7z`_ 7z x file.7z（需要安装：sudo apt install p7zip-full）

## 指令类

### 查看当前文件夹所有文件（夹）

- ls
- ls -a (包括隐藏文件) 

### 查看端口占用

- sudo netstat -tulnp | grep :3000
- sudo lsof -i :3000
- sudo ss -tlnp | grep :3000
- 查看 pm2 应用占用：
  - pm2 logs <你的应用名> --lines 50
  - 在日志里查找 `listening on port 3000`、`Server started` 或任何错误信息

### 关闭应用

`killall appName`

## nginx

### 重启

- sudo nginx -s reload

## docker 

### 查看所有容器（包括已关闭的）

docker ps -a

### 重启关闭的容器

docker start（不能使用 docker run, run 是创建一个新容器）