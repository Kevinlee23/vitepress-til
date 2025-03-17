# Vercel 部署的前端服务与不同源后端服务器的通信

## 前提：

`Vercel` 是采用 `https` 来部署的，而我这里后端服务器采用的是阿里云的云服务，公网 `ip` 是 `http`, 前后端不同源且 传输协议不同

## 解决方案：

在前端项目文件夹下新建 `vercel.json` 文件，添加如下规则：

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "http://localhost:3000/:path*"
    }
  ]
}
```

将 `destnation` 地址替换为你的后端服务器地址即可