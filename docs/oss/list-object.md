# 通过 listV2 方法列举文件

```js
import { getCurrentClient } from "#imports";

async function list(prefix, pageSize, continuationToken) {
  const client = getCurrentClient();

  // 不带任何参数, 默认最多返回100个文件。
  const result = await client.listV2({
    "max-keys": pageSize, // 指定个数
    prefix, // 指定前缀
    "continuation-token": continuationToken, // 分页信息
  });
  console.log(result);
}
```
