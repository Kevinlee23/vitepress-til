---
title: SSE 流式传输
date: 2024-10-17
---

# SSE 流式传输

> 服务器 -> 客户端的单向长连接
> 
> 适用于简单的服务器推送的场景

## 服务端 / 客户端示例

响应头格式:

```json {2}
{
  "Content-Type": "text/event-stream",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive"
}
```

`express` 响应示例:

```js
app.get("/events", function (req, res) {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  let startTime = Date.now();

  const sendEvent = () => {
    // 检查是否已经发送了10秒
    if (Date.now() - startTime >= 10000) {
      res.write("event: close\ndata: {}\n\n"); // 发送一个特殊事件通知客户端关闭
      res.end(); // 关闭连接
      return;
    }

    const data = { message: "Hello World", timestamp: new Date() };
    res.write(`data: ${JSON.stringify(data)}\n\n`); // 每隔2秒发送一次消息

    setTimeout(sendEvent, 2000);
  };

  sendEvent();
});
```

客户端代码:

```js
const sse = new EventSource("/events");

sse.onmessage = function (event) {
  const eventObject = JSON.parse(event.data);

  // logic...
};
```

`EventSource` 实例的属性/方法/事件:

- `.readyState`: 表示连接状态的数字 `(connecting 0; open: 1; closed: 2)`
- `.url`: 事件源的 `url`
- `.withCredentials`: 表示是否开启跨域资源共享
- `.close()`: 关闭连接
- `event.error`
- `event.message`
- `event.open`

## 服务端响应格式

```json
// 字段之间用单个换行符分隔，而事件之间用两个换行符分隔
{
  "data": "事件的数据",
  "id": "事件的唯一标志符，客户端可以凭借这个来恢复事件流",
  "event": "自定义事件类型",
  "retry": "建议的重新连接时间（毫秒）"
}
```

## 客户端完整示例

```js
function connectSSE() {
  const sse = new EventSource("http://example.com/events");

  sse.onopen = () => {
    console.log("连接已建立");
  };

  sse.addEventListener("message", (e) => {
    console.log("接收到消息:", e.data);
  });

  sse.addEventListener("error", (err) => {
    if (sse.readyState === EventSource.CLOSED) {
      console.log("连接已关闭");
    } else {
      console.error("发生错误:", err);
      // 可以在这里实现重连逻辑
      // 服务端返回的数据中带有 id 字段和 retry 字段会自动进行重连尝试
      setTimeout(connectSSE, 5000); // 5秒后重连
    }
  });

  // 自定义具名事件，要为每种类型的事件添加一个监听器
  sse.addEventListener("notice", (e) => {
    // logic...
  })

  sse.addEventListener("update", (e) => {
    // logic...
  })
}

// 初始调用
connectSSE();
```

## 第三方库扩展

默认的浏览器 `EventSource API` 具有限制:
- 只能传递 `url` 和 `withCredentials`
- 不能传递请求正文：必须在 `URL` 中对执行请求所需的所有信息进行编码
- 不能输入自定义请求标头
- 只能提出 `GET` 请求，无法指定其他方法
- 如果连接被切断，无法控制重试策略：浏览器会默默地为您重试几次，然后停止

建议使用 `fetch-event-source`:

```sh
$ npm install @microsoft/fetch-event-source
```

[参考](https://github.com/Azure/fetch-event-source)