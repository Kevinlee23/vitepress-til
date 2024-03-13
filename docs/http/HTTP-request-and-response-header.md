---
outline: deep
---

# 请求头和响应头

## 请求头 HTTP request header

### Accept

浏览器可以接受服务器回发的类型

`Accept: text/html | */*`

### Accept-Encoding

浏览器申明自己接收的编码方法，通常指定压缩方法、是否支持解压

`Accept-Encoding: gzip, deflate`

### Accept-Language

浏览器申明自己接收的语言

`Accept-Language:zh-CN,zh;q=0.9`

### Connection

`keep-alive`: 服务器和客户端之间用于传输 `HTTP` 数据的 `TCP` 链接不会关闭

`close`: 当 `request` 完成后，客户端再次发送 `request` 时，需要重新建立 `TCP` 连接

### Content-Type

当客户端向服务端发起 HTTP 的 POST 请求时，客户端告诉服务端，我们发送的数据类型
常见的有:

- `application/x-www-form-urlencoded` 原生 `Form 表单`
- `multipart/form-data` 将表单的数据处理为一条消息，以标签为单元，用分隔符分开。它既可以上传键值对，也可以上传文件，甚至多个文件
- `application/json` `JSON` 字符串
- `text/xml` `XML` 格式
- `binary` 二进制文件类型

### Host

用于指定被请求资源的 Internet 主机和端口号，它通常从 `HTTP URL` 中提取出来的

### Origin

指示了请求来自于哪个站点，该字段仅指示服务器名称，不包含任何路径信息，除了不包含路径信息，该字段与 `Referer` 首部字段相似，浏览器自动添加到 http 请求 `Header` 中，无需手动设置

### Referer

告诉服务器是从哪个页面链接过来的

### Cache-Control

- `Cache-Control:private` 私有缓存
- `Cache-Control:public` 响应会被缓存，并且在多用户间共享
- `Cache-Control:no-cache` 响应不会被缓存
- `Cache-Control:max-age=10` 设置缓存最大有效时间，单位：秒
- `Cache-Control: no-store` 任何条件下，响应都不会被缓存，并且不会被写入到客户端的磁盘里

### Cookie

`Cookie` 是用来存储一些用户信息以便让服务器辨别用户身份的

### Range (用于断点续传)

`Range:bytes=0-5` 指定第一个字节的位置和最后一个字节的位置，用于告诉服务器自己想取对象的哪部分

## 响应头 HTTP response headers

### Cache-Control

对应请求中的 `Cache-Control`

- `Cache-Control:private` 默认为 `private` 响应只能够作为私有的缓存，不能再用户间共享
- `Cache-Control:public`  浏览器和缓存服务器都可以缓存页面信息
- `Cache-Control:must-revalidate` 对于客户机的每次请求，代理服务器必须想服务器验证缓存是否过时
- `Cache-Control:no-cache` 浏览器和缓存服务器都不应该缓存页面信息
- `Cache-Control:max-age=10`  是通知浏览器 10 秒之内不要烦我，自己从缓冲区中刷新
- `Cache-Control:no-store`  请求和响应的信息都不应该被存储在对方的磁盘系统中

### Content-Type

`text/html;charset=UTF-8`
告诉客户端，资源文件的类型还有字符编码

### Content-Encoding

`gzip `
告诉客户端压缩方式

### Expires

跟缓存相关，储存的是时间，告诉客户端在这个时间前，可以直接访问缓存副本

### Last-Modified

所请求对象的最后修改日期

### Connection

`keep-alive`

对客户端 `Connection: keep-alive` 的回复，告诉客户端服务器的 `TCP` 连接是一个长连接

### Etag

一个资源对象的标识值，如果资源对象被修改了, `Etag `也会修改，用于判断服务器资源是否发生了修改

### Access-Control-Allow-Origin

跨域资源共享的设置

### Access-Control-Allow-Methods

`Access-Control-Allow-Methods：GET, POST, PUT, DELETE`
允许哪些方法来访问

### Content-Range

`Content-Range: bytes 0-5/7877`
指请求的实体资源的长度范围，描述响应覆盖的范围和整个实体长度
