# 使用网络

## 外部访问容器 - 端口映射

`-p/P` 标记，支持格式：`ip:hostPort:containerPort | ip::containerPort | hostPort:containerPort`

可以多次使用绑定多个端口

### 映射所有接口地址

`hostPort:containerPort`

```sh
$ docker run -d -p 80:80 nginx:alpine
```

### 映射到指定地址的指定端口

`ip:hostPort:containerPort`

```sh
$ docker run -d -p 127.0.0.1:80:80 nginx:alpine
```

### 映射到指定地址的任意端口

`ip::containerPort`

本机会自动分配一个端口

```sh
$ docker run -d -p 127.0.0.1::80
```

### 查看端口配置

```sh
$ docker port [ID]
```

## 容器互联

...

## 配置 DNS

...
