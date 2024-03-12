### svn 提交时碰到 ssh 报错的问题

错误描述:

`Server SSL certificate verification failed: certificate issued for a different hostname, issuer is not trusted`

翻译过来就是：服务器的 SSL 证书验证失败

解决方法:

进入项目所在页面，执行命令 `svn ls https://project-address`
然后会提示你 ssh 证书的主机不匹配，询问你是否接受，选择 p
然后依次输出电脑密码, svn 账号信息，之后就可以了
