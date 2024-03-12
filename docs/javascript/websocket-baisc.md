### Websocket
WebSocket是一种在单个TCP连接上进行全双工通信的协议, 它允许服务器主动向客户端发送数据

### 基本使用
#### 创建对象
`const socket = new WebSocket('ws://example.com/socket')`

#### 处理事件
常见的事件
- `open`: 连接建立时触发
- `message`: 收到消息时触发
- `close`: 连接关闭时触发
- `error`: 出现错误时触发

```javascript
socket.addEventListener('open', (event) => {
  console.log('WebSocket连接已建立');
});

socket.addEventListener('message', (event) => {
  const message = event.data;
  console.log('收到消息：', message);
});

socket.addEventListener('close', (event) => {
  if (event.wasClean) {
    console.log('WebSocket连接已关闭');
  } else {
    console.error('WebSocket连接异常断开');
  }
});

socket.addEventListener('error', (error) => {
  console.error('WebSocket连接错误：', error);
});
```

#### 发送数据
`socket.send(data)`
data 可以是字符串, Blob, ArrayBuffer 等

#### 关闭连接
`socket.close(code, reason)`
code 和 reason 都是可选项
code(0 - 999 未使用, 1000 正常关闭, 1001 终端离开, 1002 协议错误 ...)