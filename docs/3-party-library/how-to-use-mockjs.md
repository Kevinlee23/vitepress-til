# mockJs 使用 & 简单范例

## 安装

```sh
npm install mockjs
```

## 简单使用

:::code-group

```js [template]
Mock.mock({
  // 生成一个长度 1-10的数组,
  "list|1-10": [
    {
      // 属性 id 是一个自增数, 起始值为 1, 每次增加 1
      "id|+1": 1,
    },
  ],
});
```

```json [result]
{
  "list": [
    {
      "id": 1
    },
    {
      "id": 2
    },
    {
      "id": 3
    }
  ]
}
```

:::

## 使用占位符

:::code-group

```js [template]
Mock.mock({
  "province|1-10": ["@province"],
});

Mock.mock({
  "user|3": [
    {
      name: "@name",
      city: "@city(true)",
      birthday: '@datetime("yyyy-MM-dd")',
    },
  ],
});
```

```json [result]
{
  "province": [
    "福建省",
    "云南省",
    "台湾",
    "陕西省",
    "浙江省",
    "山西省",
    "山东省",
    "香港特别行政区"
  ]
}

{
  "user": [
    { "name": "Nancy Wilson", "city": "陕西省 渭南市", "birthday": "1998-08-06" },
    { "name": "Patricia Perez", "city": "辽宁省 本溪市", "birthday": "1982-06-24" },
    { "name": "Betty Hall", "city": "福建省 漳州市", "birthday": "1976-01-20" }
  ]
}
```

:::

## 拦截 Ajax 请求

```js
import Mock from "mockjs";
Mock.mock(rurl, template);
/**
 * 拦截匹配 rurl 的请求, 将回调函数的执行结果作为相应数据返回
 * rtype: get, post, put, delete...
 * options: url, type, body
 */
Mock.mock(rurl, function(options));
Mock.mock(rurl, rtype, template);
Mock.mock(rurl, rtype, function(options));
```

配合拦截 Ajax 请求的行为, 设置模拟接口的响应时间

`Mock.setup({ timeout: 400 })`

## 速查

[官方样例查阅](http://mockjs.com/examples.html){target="_blank"}
