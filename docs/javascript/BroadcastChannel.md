---
title: 同源多窗口通信接口 - BroadcastChannel
date: 2026-02-28
noComment: true
---

# BroadcastChannel

## 在 vue 中定义

```js
import { onUnmounted } from 'vue'

// 消息类型
export interface BroadcastMessage {
  type: string
  payload: unknown
  timestamp: number
}

// 事件处理器类型
export type MessageHandler = (data: BroadcastMessage) => void

// 选项类型
export interface UseBroadcastChannelOptions {
  channelName?: string
  onMessage?: MessageHandler
  skipCurrentRoute?: string
}

/**
 * 创建结构化的 BroadcastChannel 消息
 * @param type 消息类型
 * @param payload 消息内容
 * @returns 结构化的消息对象
 */
export const createStructuredMessage = (type: string, payload: unknown): BroadcastMessage => {
  return {
    type,
    payload,
    timestamp: Date.now()
  }
}

/**
 * BroadcastChannel Hook
 * 跨页面通信功能
 */
export const useBroadcastChannel = (options: UseBroadcastChannelOptions = {}) => {
  const { channelName = 'EZmaker-channel', onMessage, skipCurrentRoute } = options

  let channel: BroadcastChannel | null = null

  try {
    // 创建 BroadcastChannel 实例
    channel = new BroadcastChannel(channelName)

    // 监听消息
    channel.onmessage = (event) => {
      const { data } = event

      // 如果设置了跳过路由且当前路由匹配，则不处理消息
      if (skipCurrentRoute && typeof window !== 'undefined' && window.location) {
        const currentRoute = window.location.pathname
        if (currentRoute.includes(skipCurrentRoute)) {
          return
        }
      }

      // 处理结构化消息
      if (data && typeof data === 'object' && 'type' in data && 'timestamp' in data) {
        onMessage?.(data as BroadcastMessage)
      } else if (data) {
        console.log('收到非结构化消息：', data)
      }
    }
  } catch (error) {
    console.warn('当前浏览器不支持 BroadcastChannel，跨页面通信功能将不可用', error)
  }

  /**
   * 发送消息
   * @param type 消息类型
   * @param payload 消息内容
   */
  const sendMessage = (type: string, payload: unknown): void => {
    if (!channel) return

    const message = createStructuredMessage(type, payload)
    channel.postMessage(message)
  }

  // 组件卸载时关闭通道
  onUnmounted(() => {
    channel?.close()
  })

  return {
    channel,
    sendMessage
  }
}

export default useBroadcastChannel
```

## 使用

### 页面监听

```js
// 使用自定义 hook 处理 BroadcastChannel 通信
const { sendMessage } = useBroadcastChannel({
  // 跳过监听的路由
  skipCurrentRoute: "skip-route",
  onMessage: (data) => {
    switch (data.type) {
      case "account":
        if (data.payload === "login") {
          console.log("收到弹窗中用户需要登录提示", data.payload);
        }
        if (data.payload === "out") {
          console.log("注销消息");
        }
        break;
      case "jump":
        router.push(data.payload);
        break;
      default:
        console.log("收到未知类型消息：", data);
    }
  },
});
```

### 通信

```js
const { sendMessage } = useBroadcastChannel({
  // ...
});

sendMessage("account", "login");
```
