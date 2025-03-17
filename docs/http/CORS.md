# CORS（跨域资源共享）

`CORS` 话题涉及的内容有：同源策略，简单请求，预检请求

## 什么是 CORS

`CORS` 机制允许 `web` 应用服务器进行跨源访问控制，使数据传输得以安全进行

e.g.:

运行在 `https://domain-a.com` 上的 `js` 代码，发起 `XMLHTTPRequest` 请求访问 `https://domain-a.com/data.json` 时没有跨域，是同源的

而访问 `https://domain-b.com/data.json` 时是跨域的

### 同源

同源的定义：两个 `URL` 的`协议 (HTTP/HTTPS)`、`端口(port)`和`主机(host)`都相同

## 简单请求

简单请求：不会触发 `CORS` 预检请求的 `请求`，需要满足以下条件：

- 使用 `GET`, `HEAD`, `POST` 方法
- 只能使用允许人为设置的标头字段集合 (`Accept`, `Accept-Language`, `Content-Language`, `Content-Type`, `Range`)
- `Content-Type` 只被允许为：`text/plain`, `multipart/form-data`, `application/x-www-form-urlencoded`
- `Range` 只允许简单的范围标头值，e.g.: `bytes=256-`, `bytes=127-255`
- 请求中没有使用 `ReadbleStream` 对象

## 预检请求

非简单请求 `（需预检的请求）` 发送前，预先发送到服务器的 `OPTIONS` 请求，用于检查服务器是否支持 `CORS`

```txt
OPTIONS /resource/foo
Access-Control-Request-Method: DELETE
Access-Control-Request-Headers: origin, x-requested-with
Origin: https://foo.bar.org
```

以上为发送 `DELETE` 请求前的预检请求，如果服务器允许，它就会响应这个预检请求：

```txt
HTTP/1.1 200 OK
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: https://foo.bar.org
Access-Control-Allow-Methods: POST, GET, OPTIONS, DELETE
Access-Control-Max-Age: 86400
```

## CORS | 预检请求相关的字段头

### HTTP 响应标头字段

服务器为访问控制请求返回的 `HTTP` 响应头：

- `Access-Control-Allow-Origin: <origin> | *` 允许访问资源的来源
- `Access-Control-Max-Age: <delta-seconds>` 指定预检请求的结果被缓存多久
- `Access-Control-Allow-Credentials` 指定了当浏览器的 `credentials` 设置为 `true` 时是否允许浏览器读取 `response` 的内容
- `Access-Control-Allow-Methods: <method>[, <method>]*` 访问资源时允许使用的请求方法
- `Access-Control-Allow-Headers` 对预检请求的响应，知名实际请求中允许携带的标头字段

### HTTP 请求标头字段

- `Access-Control-Request-Method: <method>` 该标头字段用于预检请求，将实际请求所使用的的方法告诉服务器
- `Access-Control-Request-Headers: <field-name>[, <field-name>]*` 用于预检请求，将实际请求所携带的标头字段告诉服务器
