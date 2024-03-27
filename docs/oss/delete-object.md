# 删除文件

## 删除单个文件

```js
import { getCurrentClient } from "#imports";

// filePath包含文件完整路径，不能包含bucket名称
async function deleteObject(filePath) {
  const client = getCurrentClient();

  try {
    const result = await client.delete(filePath);
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}
```

## 批量删除指定名称的文件

```js
import { getCurrentClient } from "#imports";

async function deleteMulti(list) {
  const client = getCurrentClient();
  try {
    const result = await client.deleteMulti(list, { quiet: true });
  } catch (error) {
    console.error(error);
  }
}
```

## 删除指定前缀下的多个文件

```js
import { getCurrentClient } from "#imports";

// 处理请求失败的情况, 防止promise.all中断, 并返回失败原因和失败文件名
async function handleDel(name) {
  const client = getCurrentClient();

  try {
    await client.delete(name);
  } catch (error) {
    error.failObjectName = name;
    return error;
  }
}

// 删除多个文件
async function deletePrefix(prefix) {
  const client = getCurrentClient();
  const list = await client.list({
    prefix: prefix,
  });

  list.objects = list.objects || [];
  const result = await Promise.all(list.objects.map((v) => handleDel(v.name)));
  console.log(result);
}

// 如果您需要删除所有前缀为src的文件, 则prefix设置为src
// 设置为src后，所有前缀为src的非目录文件、src目录以及目录下的所有文件均会被删除
deletePrefix("src");
```
