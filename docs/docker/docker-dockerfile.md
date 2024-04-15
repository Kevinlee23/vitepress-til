# 基础 - 使用 Dockerfile 来定制镜像

## FROM 指定基础镜像

一般我们定制镜像是从官方镜像中找到一些高质量的服务类/语言类/操作系统镜像定制我们自己想要的功能
如: `nginx`, `redis`, `mongo`, `mysql`, `php`, `tomcat`; `node`, `python`, `ruby`, `golang`; `ubuntu`, `centos`, `alpine` 等

e.g.: `FROM nginx`

如果想从第一层开始自己建立, 使用空白镜像: `FROM scratch`

## RUN 执行命令

`RUN` 指令时用来执行命令的，有两种格式:

- shell 格式 `RUN <命令>`
- exec 格式 `RUN ["可执行文件", "options"]`

e.g.:

```sh
FROM debian:stretch

RUN apt-get update
RUN apt-get install -y gcc libc6-dev make wget
RUN wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz"
RUN mkdir -p /usr/src/redis
RUN tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1
RUN make -C /usr/src/redis
RUN make -C /usr/src/redis install
```

每 `RUN` 一次，就会建立一层，上面的例子创建了 7 层镜像, `docker` 的层数是有限制的，上面的例子可以改写为:

```sh
FROM debian:stretch

RUN set -x; buildDeps='gcc libc6-dev make wget' \
    && apt-get update \
    && apt-get install -y $buildDeps \
    && wget -O redis.tar.gz "http://download.redis.io/releases/redis-5.0.3.tar.gz" \
    && mkdir -p /usr/src/redis \
    && tar -xzf redis.tar.gz -C /usr/src/redis --strip-components=1 \
    && make -C /usr/src/redis \
    && make -C /usr/src/redis install \
    && rm -rf /var/lib/apt/lists/* \
    && rm redis.tar.gz \
    && rm -r /usr/src/redis \
    && apt-get purge -y --auto-remove $buildDeps
```

## build | 构建镜像

在 `Dockerfile` 所在的文件目录执行: `docker build [options] <上下文路径/URL/->`

### 镜像构建上下文

上下文路径：在将本地文件复制进镜像时，告诉 `docker` 服务端用到的内容路径, e.g.:

```docker
COPY ./package.json /app/
```

打包时，一般将 `dockerfile` 空目录下/项目根目录下。如果该目录下没有所需的文件，应该复制一份过来

不需要的打包的文件，可以通过 `.dockerignore` 来定义

### 构建方式

除了从文件目录进行构建，还支持多种构建方式:
- 从 `GIT repo`
- 从 `tar` 压缩包
- 从标准输入中

```sh
$ docker build -t hello-world https://github.com/docker-library/hello-world.git#master:amd64/hello-world

$ docker build http://server/context.tar.gz

cat Dockerfile | docker build -

$ docker build - < context.tar.gz
```