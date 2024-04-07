# 移动端适配

使用 `pxtorem` 插件

## 安装

```sh
yarn add postcss-pxtorem -D
```

`postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": { // [!code ++]
      rootValue: 37.5, // [!code ++]
      propList: ["*"], // [!code ++]
    },
  },
};
```

## 配套使用 to-rem.js

通过动态修改 `font-size` 的值来实现页面自适应布局

`to-rem.js`

```js
import { reactive, watch } from "vue";
import { useWindowSize } from "@vueuse/core";

const WIDTH = 992;
const initialState = reactive({
  isBrowser: true,
  device: "desktop",
});

const { width } = useWindowSize();
watchEffect(() => {
  const device = width.value - 1 < WIDTH ? "mobile" : "desktop";
  // 视图变化了才切换，防止频繁操作
  if (device !== initialState.device) {
    initialState.device = device;
    initialState.isBrowser = device === "desktop" ? true : false;
  }
});

// 设置 rem 函数
function setRem() {
  // 375 默认大小37.5px; 375px = 10rem ; 每个元素px基础上/37.5
  const htmlWidth =
    document.documentElement.clientWidth || document.body.clientWidth;
  // 得到html的Dom元素
  const htmlDom = document.getElementsByTagName("html")[0];

  // 设置根元素字体大小
  if (htmlWidth < 992) {
    htmlDom.style.fontSize = htmlWidth / 10 + "px";
  } else {
    htmlDom.style.fontSize = "37.5px";
  }
}

// 初始化, 监听是否是浏览器端打开
watch(
  () => initialState.isBrowser,
  () => {
    setRem();
  },
  { immediate: true }
);

// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem();
};
```

在 `main.js(ts)` 中引入这个文件