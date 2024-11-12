# nginx 配置

> 简单示例

```conf
server {
    listen 80; # 监听 80 端口
    server_name snowinlu.top; // 服务器地址
    return 301 https://$host$request_uri; # HTTP 重定向到 HTTPS
}

server {
    listen 443 ssl; // 监听 https 端口
    server_name snowinlu.top; // 服务器地址

    ssl_certificate /etc/nginx/cert/memos.snowinlu.top.pem; // ssl 证书
    ssl_certificate_key /etc/nginx/cert/memos.snowinlu.top.key; // ssl 私钥

    ssl_protocols TLSv1.2 TLSv1.3; # 支持的协议版本
    ssl_ciphers HIGH:!aNULL:!MD5; # 加密套件

    location / {
        root /usr/local/project/hexo-stellar-archiv; // 项目地址
        index index.html index.htm; // 入口文件
        try_files $uri $uri/ =404;
    }
}

```