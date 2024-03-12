---
outline: deep
---

# iframe

## 同源

同源策略 (如果两个 URL 具有相同的协议、域和端口，那么他们是同源的) 会限制窗口和 frame 之间的通信

同源策略规定：

- 如果我们有对另一个窗口的引用 (`window.open` || `iframe`)，并且该窗口是同源的，那么我们就具有对该窗口的全部访问权限
- 如果不是同源的，我们就不能访问窗口中的内容：变量，文档，任何东西。唯一例外是 `location`: 我们可以修改它，使用它进行重定向。但是我们无法读取 `location`. 因此，我们无法看到用户当前所处的位置，也就不会泄露任何信息。

## iframe

`iframe` 标签承载了一个单独的嵌入的窗口，它有自己的 document 和 window:

- `iframe.contentWindow` 来获取 中的 window
- `iframe.contentDocument` 来获取 中的 document

::: code-group

```html [main.html]
<body>
  <div>这里是主文档</div>
  <iframe src="http://127.0.0.1:8000/side.html" name="i1"></iframe>

  <script>
    function hello() {
      console.log("this is main html");
    }

    const iframe = document.getElementsByTagName("iframe")[0];

    iframe.onload = function () {
      // 输出: this is iframe html
      console.log(iframe.contentWindow.hello());

      // 输出 iframe 的 location 对象
      console.log("contentWindow.location", iframe.contentWindow.location);
    };

    // 可以直接修改 iframe 地址, 不受同源策略的限制。 有的网站不支持被iframe引用, 所以会报错。 注意区分错误信息。
    iframe.contentWindow.location = "http://www.360doc.com";
  </script>
</body>
```

```html [iframe.html]
<body>
  <div>这里是iframe</div>
  <script>
    function hello() {
      console.log("this is iframe html");
    }
  </script>
</body>
```

:::

## window.frames

获取 `<iframe>` 的方式:

- `window.frames[0]` 通过索引获取
- `window.frames.iframeName` 通过名称获取

## iframe 通信

`postMessage` 主页面:

```javascript
const iwin = windows.frames.iframeName;
iwin.postMessage("message", "http://127.0.0.1:8080");
```

`onmessage` 目标窗口:

```javascript
window.addEventListener("message", (event) => {
  /**
   * event 通信事件对象
   *
   * data: postMessage 传递的数据
   * origin: 发送方的源
   * source 对发送方窗口的引用, 可以通过 source.postMessage(...) 立即回传数据
   */
  console.log(event);
});
```
