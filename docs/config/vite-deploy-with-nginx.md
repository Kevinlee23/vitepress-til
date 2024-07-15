# vite 项目配合 nginx 简单部署

> 这里选择了 `docker` 打包的方式

## dockerfile

```dockerfile
FROM nginx
COPY ./dist/ /usr/share/nginx/html/
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
```

## nginx.conf

```txt
server {
    listen 5173;
    server_name localhost;
    location / {
        root /usr/share/nginx/html;
        index index.html index.htm;
        try_files $uri $uri/ /index.html;
    }
}
```

## docker 打包并运行

```bash
# 打包
docker build -t vite-app .

# 运行 docker 容器
# 将容器的 5173 端口 映射到主机的 5173端口
docker run -d -p 5173:5173
```

## 解决 nginx 跨域的问题

```nginx.conf
server {
  // 对特定路径的请求启用跨域
  location /server/ {
      if ($request_method = 'OPTIONS') {
          add_header 'Access-Control-Allow-Origin' '*';
          add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
          add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';
          add_header 'Access-Control-Max-Age' 1728000;
          add_header 'Content-Type' 'text/plain charset=UTF-8';
          add_header 'Content-Length' 0;
          return 204;
      }

      add_header 'Access-Control-Allow-Origin' '*';
      add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
      add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization';

      // 重写请求路径, 去掉请求头
      rewrite ^/server/(.*)$ /$1 break;

      // 跨域地址
      proxy_pass http://47.98.246.12:9090;
  }
}
```
