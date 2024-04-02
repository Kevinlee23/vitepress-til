# Docker 和 Compose 的区别

`Docker` 和 `Docker Compose` 都是实现容器化工具，用途和概念不同

## Docker

`Docker` 关注的是单个容器的构建、运行和管理，核心概念:

- `image` （镜像）：类
- `container` （容器）：类的实例

## Docker Compose

`Docker Compose` 专注于简化多容器应用程序的部署和管理，它使用一个单独的 `YAML` 文件来配置应用程序的服务、网络和存储等，核心概念:

- `service` （服务）：一个应用的容器
- `project` （项目）：由一组关联的应用容器组成的一个完整业务单元，在 `docker-compose.yml` 文件中定义

`Docker Compose` 实际上是调用了 `Docker` 服务的 `API` 来对容器进行管理，所以操作平台只要支持 `Docker API`, 就可以利用 `Compose` 来进行编排管理