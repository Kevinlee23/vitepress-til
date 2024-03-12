```javascript:line-numbers=1
import modal from "@/plugins/modal";
const baseURL = import.meta.env.VITE_APP_BASE_WS;
const EventTypes = ["open", "close", "message", "error", "reconnect"]; // WebSocket响应事件
const DEFAULT_CHECK_TIME = 55 * 1000; // 心跳检测的默认时间
const DEFAULT_CHECK_COUNT = 3; // 心跳检测默认失败重连次数
const DEFAULT_CHECK_DATA = { Type: 1, Parameters: ["alive"] }; // 心跳检测的默认参数 - 【跟后端协商的】
const CLOSE_ABNORMAL = 1006; // WebSocket非正常关闭code码

class EventMap {
  deps = new Map();
  depend(eventType, callback) {
    this.deps.set(eventType, callback);
  }
  notify(eventType, event) {
    if (this.deps.has(eventType)) {
      this.deps.get(eventType)(event);
    }
  }
}

class Socket extends WebSocket {
  heartCheckData = DEFAULT_CHECK_DATA;
  heartCheckTimeout = DEFAULT_CHECK_TIME;
  heartCheckInterval = null;
  heartCheckCount = DEFAULT_CHECK_COUNT;
  constructor(options, dep, reconnectCount = 0) {
    let _baseURL = baseURL;
    /**
     * url 要连接的 WebSocket URL
     * protocols 一个协议字符串或者一个包含协议字符串的数组
     * query 可以通过URL传递给后端的查询参数
     * greet 心跳检测的打招呼信息
     * customBase 自定义的baseURL 否则使用环境变量 env.VITE_APP_BASE_WS
     */
    const {
      url,
      protocols,
      query = {},
      greet = null,
      customBase = null,
    } = options;
    const _queryParams = Object.keys(query).reduce((str, key) => {
      if (typeof query[key] !== "object" && typeof query[key] !== "function") {
        return (str +=
          str.length > 0 ? `&${key}=${query[key]}` : `${key}=${query[key]}`);
      } else {
        return str;
      }
    }, "");
    if (customBase) {
      _baseURL = customBase;
    }
    super(`${_baseURL}${url}?${_queryParams}`, protocols);
    this._currentOptions = options;
    this._dep = dep; // 依赖收集的字典对象
    this._reconnectCount = reconnectCount;
    greet &&
      Object.assign(this, {
        heartCheckData: greet,
      });
    this.initSocket();
  }

  // 初始化WebSocket
  initSocket() {
    // 监听webSocket的事件
    this.onopen = function (e) {
      this._dep.notify("open", e);
      this.heartCheckStart();
    };
    this.onclose = function (e) {
      this._dep.notify("close", e);
      // 如果WebSocket是非正常关闭 则进行重连
      if (e.code === CLOSE_ABNORMAL) {
        if (this._reconnectCount this.heartCheckCount) {
          this._reconnectCount++;
          const _socket = new Socket(
            this._currentOptions,
            this._dep,
            this._reconnectCount
          );
          this._dep.notify("reconnect", _socket);
        } else {
          return modal.msgError("WebSocket重连失败, 请联系技术客服!");
        }
      }
    };
    this.onerror = function (e) {
      this._dep.notify("error", e);
    };
    this.onmessage = function (e) {
      // 如果后端返回的是二进制数据
      if (e.data instanceof Blob) {
        const reader = new FileReader();
        reader.readAsArrayBuffer(e.data);
        reader.onload = (ev) => {
          if (ev.target.readyState === FileReader.DONE) {
            this._dep.notify("message", ev.target?.result);
          }
        };
      } else {
        // 处理普通数据
        try {
          const _parseData = JSON.parse(e.data);
          this._dep.notify("message", _parseData);
        } catch (error) {
          console.log(error);
        }
      }
    };
  }

  // 订阅事件
  subscribe(eventType, callback) {
    if (typeof callback !== "function")
      throw new Error("The second param is must be a function");
    if (!EventTypes.includes(eventType))
      throw new Error("The first param is not supported");
    this._dep.depend(eventType, callback);
  }

  // 发送消息
  sendMessage(data, options = {}) {
    const { transformJSON = true } = options;
    let result = data;
    if (transformJSON) {
      result = JSON.stringify(data);
    }
    this.send(result);
  }

  // 关闭WebSocket
  closeSocket(code, reason) {
    this.close(code, reason);
  }

  // 开始心跳检测
  heartCheckStart() {
    this.heartCheckInterval = setInterval(() => {
      if (this.readyState === this.OPEN) {
        let transformJSON = typeof this.heartCheckData === "object";
        this.sendMessage(this.heartCheckData, { transformJSON });
      } else {
        this.clearHeartCheck();
      }
    }, this.heartCheckTimeout);
  }

  // 清除心跳检测
  clearHeartCheck() {
    clearInterval(this.heartCheckInterval);
  }

  // 重置心跳检测
  resetHeartCheck() {
    clearInterval(this.heartCheckInterval);
    this.heartCheckStart();
  }
}
// 默认的配置项
const defaultOptions = {
  url: "",
  protocols: "",
  query: {},
};

export const useSocket = (options = defaultOptions) => {
  if (!window.WebSocket)
    return modal.msgWarning("您的浏览器不支持WebSocket, 请更换浏览器!");
  const dep = new EventMap();
  const reconnectCount = 0; // 记录 WebSocket 重连的次数
  return new Socket(options, dep, reconnectCount);
};
```
