# 客户端直传（通过 STS 暂时凭证）

`STS` 凭证上传的方式，适用于客户端直传，分片上传大文件，分片断点续传等多个场景

以下是简单情况下的`客户端直传`方式上传文件对象

```js
import { getCurrentClient } from "#imports";

async function upload(file) {
  const client = getCurrentClient();
  const path = "images/"; // 上传到规定的文件夹下
  const result = await client.put(path + file.name, file);
}
```
