# docker 换源配置

```bash
sudo vim /etc/docker/daemon.json

# 修改后, 重启 docker 服务

sudo systemctl daemon-reload
sudo systemctl restart docker
```

`daemon.json`

```json
{
  "registry-mirrors": [
    "https://dockerproxy.com",
    "https://docker.mirrors.ustc.edu.cn",
    "https://docker.nju.edu.cn"
  ]
}
```
