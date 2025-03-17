# 使用镜像

## 拉取镜像 | Pull Image from Docker Hub

```sh
$ docker pull [options] [Docker registry-address[:port/]repositoryName[:tag]]
```

`registry-address: ip:port` 默认地址是 `Docker Hub(docker.io)`

`repositoryName: username/softwareName` 如果不给出 `username`, 则默认是 library（官方镜像）

e. g.

```sh
# full address: docker.io/library/ubuntu:18.04
$ docker pull ubuntu:18:04
```

## 运行镜像 | Run Image

```sh
$ docker run [options] image [opstions]

# e.g.
$ docker run -it --rm ubuntu:18.04 bash
```

- `-it`: `-i` 是交互式操作，`-t` 是终端操作
- `--rm`: 设置容器退出后自动删除
- `bash`: 放在镜像名后面的是命令，交互式 `shell` 使用 `bash`

## 列出镜像 |s List Images

```sh
$ docker image ls

# 仓库名               标签                 镜像 ID              创建时间             占用空间
REPOSITORY           TAG                 IMAGE ID            CREATED             SIZE
redis                latest              5f515359c7f8        5 days ago          183 MB
nginx                latest              05a60462f8ba        5 days ago          181 MB
mongo                3.2                 fe9198c04d62        5 days ago          342 MB
<none>               <none>              00285df0df87        5 days ago          342 MB
ubuntu               18.04               329ed837d508        3 days ago          63.3MB
ubuntu               bionic              329ed837d508        3 days ago          63.3MB

# 虚悬镜像：官方维护后版本升级了，旧版本名称被取消
<none>               <none>              00285df0df87        5 days ago          342 MB

# 列出部分镜像，e.g.:
$ docker image ls ubuntu
$ docker image ls ubuntu:18.04
# --filter / -f
$ docker image ls -f since=...
```

## 删除本地镜像 | Delete Local Image

```sh
# 可以使用 镜像 id / 镜像名 / 镜像摘要来删除
$ docker image rm <image-id> / <image-name> / <sha-xxx>

# 删除虚悬镜像

$ docker image prune
```
