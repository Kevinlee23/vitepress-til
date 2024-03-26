# 获取服务器时间

```js
// 获取服务器当前时间
export const getServerTime = (timestamp = new Date().getTime()) => {
  return new Promise((resolve) => {
    let request = new XMLHttpRequest()
    if (!request) {
      // eslint-disable-next-line no-undef
      request = new ActiveXObject('Microsoft.XMLHTTP')
    }
    request.open('GET', '/' + timestamp, true)

    request.onreadystatechange = () => {
      // if (request.readyState === 4 && request.status === 200) {
      const serverTime = request.getResponseHeader('Date')
      if (serverTime) {
        resolve(new Date(Date.parse(serverTime)))
      } else {
        resolve(new Date()) // 没网情况获取本地时间
      }
      // }
    }
    request.send()
  })
}
```