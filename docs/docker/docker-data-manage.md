# 数据管理

`docker` 内部及容器之间管理数据，有两种方式：

- 数据卷 `(Vol)`
- 挂载主机目录 `(Bind mounts)`

## 数据卷

数据卷是一个可供一个/多个容器使用的特殊目录，特性：

- 数据卷可以在容器之间共享
- 对数据卷的修改会立马生效
- 对数据卷的更新，不会影响镜像
- 数据卷会一致默认存在，即使镜像删除

### 创建

```sh
# 创建
$ docker volume create my-vol
# 列出
$ docker volume ls
# 查看指定数据卷
$ docker volume inspect my-vol
```

### 启动一个挂载数据卷的容器

```sh
$ docker run -d -P \
    --name web \
    # -v my-vol:/usr/share/nginx/html \
    --mount source=my-vol, target=/usr/share/nginx/html \
    nginx:alpine

# 查看容器挂载数据卷的信息
$ docker inspect web
```

### 删除数据卷

```sh
$ docker volume rm my-vol # 删除数据卷 - my-vol
$ docker volume prune # 删除无主的数据卷
```

## 挂载主机目录

使用 `--mount` 标记可以指定挂载一个`本地主机的目录`到容器中去

```sh
$ docker run -d -P \
    --name web \
    # -v /src/webapp:/usr/share/nginx/html \
    --mount type=bind,source=/src/webapp,target=/usr/share/nginx/html \
    nginx:alpine
```

只读权限：`--mount type=bind,source=/src/webapp,target=/usr/share/nginx/html,readonly`

### 挂载一个本地主机文件作为数据卷

```sh
$ docker run --rm -it \
   # -v $HOME/.bash_history:/root/.bash_history \
   --mount type=bind,source=$HOME/.bash_history,target=/root/.bash_history \
   ubuntu:18.04 \
   bash

root@2affd44b4667:/# history
1  ls
2  diskutil list
```
