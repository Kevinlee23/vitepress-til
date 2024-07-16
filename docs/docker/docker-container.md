# 操作容器

## 启动容器

### 新建并启动 | from New Image

```sh
$ docker run ubuntu:18.04 /bin/echo 'Hello world'
Hello world

$ docker run -t -i ubuntu:18.04 /bin/bash
root@af8bae53bdd3:/#
```

当利用 `docker run` 来创建容器时，`Docker` 在后台运行的标准操作包括：

- 检查本地是否存在指定的镜像，不存在就从`registry` 下载
- 利用镜像创建并启动一个容器
- 分配一个文件系统，并在只读的镜像层外面挂载一层可读写层
- 从宿主主机配置的网桥接口中桥接一个虚拟接口到容器中去
- 从地址池配置一个 `ip` 地址给容器
- 执行用户指定的应用程序
- 执行完毕后容器被终止

### 从终止状态的容器重新启动 | from Exited Container

```sh
$ docker container start <container-name>
```

## 后台运行

启动容器时，通过增加 `option: -d` 参数来实现让 `Docker` 在后台运行

通过 `docker container ls` 来查询容器唯一 `id`, 加上 `-a` 参数额外查询停止的容器

通过 `docker container logs [ID or NAMES]` 来获取容器的输出信息

## 终止容器

```sh
$ exit
$ Ctrl + d
$ docker container stop # [ID or NAMES]
```

## 进入容器

```sh
# 从这个 stdin 中 exit, 会致使容器停止
$ docker attach <container-id>

# 从这个 stdin 中 exit, 容器不会停止
$ docker exec -it <container-id> [bash]
```

## 导出 / 导入容器

```sh
$ docker export # [ID or NAMES]

$ cat container.tar | docker import - name:tag
```

## 删除容器

```sh
# 删除容器
$ docker container rm
# 删除正在运行中的容器
$ docker container rm -f
# 清除所有处于终止状态的容器
$ docker container prune
```
