# Axios 中的封装

## 实例创建

```js
let service;

export const request = (
  tokenCallback, // token 回调，返回 token 值
  langCallback, // 国际化回调，返回语言类型 (ex: en, zh-cn)
  loginTimeoutCallback, // 登录状态超时后回调
  baseURL // url 公共部分
) => {
  axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
  // 创建 axios 实例
  service = axios.create({
    // axios 中请求配置有 baseURL 选项，表示请求 URL 公共部分
    baseURL: baseURL || "",
    // 超时
    timeout: 10000,
  });

  // 请求拦截
  service.interceptors.request.use(
    (config) => {},
    (error) => {}
  );
  // 响应拦截
  service.interceptors.response.use(
    (response) => {},
    (error) => {}
  );

  return service;
};
```

## request 拦截

```js
function tansParams(params) {
  let result = "";
  for (const propName of Object.keys(params)) {
    const value = params[propName];
    var part = encodeURIComponent(propName) + "=";
    if (value !== null && value !== "" && typeof value !== "undefined") {
      if (typeof value === "object") {
        for (const key of Object.keys(value)) {
          if (
            value[key] !== null &&
            value[key] !== "" &&
            typeof value[key] !== "undefined"
          ) {
            const params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            result += subPart + encodeURIComponent(value[key]) + "&";
          }
        }
      } else {
        result += part + encodeURIComponent(value) + "&";
      }
    }
  }
  return result;
}

service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false;
    // 接口是否需要携带语言
    const isLang = (config.headers || {}).isLang === false;

    if (tokenCallback() && !isToken) {
      config.headers["Authorization"] = "Bearer " + tokenCallback(); // 让每个请求携带自定义 token 请根据实际情况自行修改
    }

    // get 请求映射 params 参数
    if (config.method === "get" && config.params) {
      let url = config.url + "?" + tansParams(config.params);
      url = url.slice(0, -1);
      config.params = {};
      config.url = url;
    }

    // 给后端提醒语言国际化
    const lang = langCallback();
    if (lang && !isLang) {
      if (config.url.includes("?")) {
        config.url = config.url + `&local=${lang}`;
      } else {
        config.url = config.url + `?local=${lang}`;
      }
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
```

## 错误封装

```js
request.interceptors.response.use(
  (response) => {
    const responseBody = response.data;

    if (responseBody.code === 0) {
      response.data = responseBody.data;
      return response;
    } else {
      // custom error 也可以根据不同的 code 来分流不同的错误
      throw new Error(responseBody.message);
      return Promise.reject(new Error(responseBody.message));
    }
  },
  (error) => {
    // axios error
    return Promise.reject(error);
  }
);
```
