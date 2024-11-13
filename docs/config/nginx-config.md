# nginx 配置

## 简单示例

```nginx
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

## 负载均衡

```nginx
http {
    #设定负载均衡的服务器列表
    upstream load_balance_server {
        #weigth参数表示权值，权值越高被分配到的几率越大
        server 192.168.1.11:80   weight=5;
        server 192.168.1.12:80   weight=1;
        server 192.168.1.13:80   weight=6;
    }

   #HTTP服务器
   server {
        #侦听80端口
        listen       80;

        #定义使用www.xx.com访问
        server_name  www.helloworld.com;

        #对所有请求进行负载均衡请求
        location / {
            root        /root;                 #定义服务器的默认网站根目录位置
            index       index.html index.htm;  #定义首页索引文件的名称
            proxy_pass  http://load_balance_server ;#请求转向load_balance_server 定义的服务器列表

            #以下是一些反向代理的配置(可选择性配置)
            #proxy_redirect off;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $remote_addr;
            #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_connect_timeout 90;    
            #后端服务器数据回传时间(代理发送超时)      
            proxy_send_timeout 90;        
            #连接成功后，后端服务器响应时间(代理接收超时)     
            proxy_read_timeout 90;             
            #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffer_size 4k;              
            #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
            proxy_buffers 4 32k;      
            #高负荷下缓冲大小（proxy_buffers*2）         
            proxy_busy_buffers_size 64k;      
            #设定缓存文件夹大小，大于这个值，将从upstream服务器传 
            proxy_temp_file_write_size 64k;    

            #允许客户端请求的最大单文件字节数
            client_max_body_size 10m;          
            #缓冲区代理缓冲用户端请求的最大字节数
            client_body_buffer_size 128k;      
        }
    }
}
```

负载均衡策略：
- 轮询 （all weight default 1）
- 加权轮询 (set weight, other default 1)
- 最少连接 (least_conn;)
- 加权最少连接 (least_conn; set weight)
- IP hash (ip_hash;)
- 普通 hash (hash $request_uri;)

## 网址有多个 webapp

> 例如: 
> 
> snowinlu.top/blog
> 
> snowinlu.top/home
> 
> snowinlu.top/memo

配置:

```nginx
http {
	#此处省略一些基本配置

	upstream home_server{
		server snowinlu.top:8081;
	}

	upstream blog_server{
		server snowinlu.top:8082;
	}

	upstream memo_server{
		server snowinlu.top:8083;
	}

	server {
		#此处省略一些基本配置
		#默认指向 home 的 server
		location / {
			proxy_pass http://home_server;
		}

		location /home/{
			proxy_pass http://home_server;
		}

		location /blog/ {
			proxy_pass http://blog_server;
		}

		location /memo/ {
			proxy_pass http://memo_server;
		}
	}
}
```

## 跨域配置

设置 cors:

```nginx
# allow origin list
set $ACAO '*';

# set single origin
if ($http_origin ~* (www.helloworld.com)$) {
  set $ACAO $http_origin;
}

if ($cors = "trueget") {
	add_header 'Access-Control-Allow-Origin' "$http_origin";
	add_header 'Access-Control-Allow-Credentials' 'true';
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
	add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}

if ($request_method = 'OPTIONS') {
  set $cors "${cors}options";
}

if ($request_method = 'GET') {
  set $cors "${cors}get";
}

if ($request_method = 'POST') {
  set $cors "${cors}post";
}
```

在服务器中引用:

```nginx
upstream front_server{
  server www.helloworld.com:9000;
}
# 后端接口地址
upstream api_server{
  server www.helloworld.com:8080;
}

server {
  listen       80;
  server_name  www.helloworld.com;

  location ~ ^/api/ {
    # 引用 cors
    include enable-cors.conf;
    proxy_pass http://api_server;
    rewrite "^/api/(.*)$" /$1 break;
  }

  location ~ ^/ {
    proxy_pass http://front_server;
  }
}
```