# 移动端适配

使用 `pxtorem` 插件，媒体查询以及自己定制的函数

## 安装 pxtorem 插件

```sh
yarn add postcss-pxtorem -D
```

`postcss.config.js`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    "postcss-pxtorem": {
      // [!code ++]
      rootValue: 37.5, // [!code ++]
      propList: ["*"], // [!code ++]
    },
  },
};
```

插件配置:

```js
export default {
  plugins: {
    "postcss-pxtorem": {
      // 750设计标准
      rootValue: 75,
      // 转换成的rem后，保留小数点后几位
      unitPrecision: 5,
      /**
       * 将会被转换的css属性列表，
       * 设置为*表示全部，['*','*position*','!letter-spacing','!font*']
       * *position* 表示所有包含 position 的属性
       * !letter-spacing 表示非 letter-spacing 属性
       * !font* 表示非font-size font-weight ... 等的属性
       * */
      propList: ["*", "!letter-spacing"],
      // 不会被转换的class选择器名，支持正则
      selectorBlackList: [".rem-"],
      replace: true,
      // 允许在媒体查询中转换`px`
      mediaQuery: false,
      // 小于1px的将不会被转换
      minPixelValue: 1,
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

const WIDTH = 992; // 设置的 desktop 和 mobile 的分界线
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

## 媒体查询

进行多端开发的时候，需要利用 `css` - 媒体查询的能力来在移动端和桌面端之间切换样式，例如:

```css
@media (min-width: 991px) {
  /* desktop style */
}

@media (max-width: 991px) {
  /* mobile style */
}
```

## function of px to rem

有些地方的尺寸不受 `pxtorem` 插件的影响，需要我们自己根据情况计算 `rem`

```js
function px2rem(px) {
  if (/%/gi.test(px)) {
    // 有百分号%，特殊处理，表述pc是一个有百分号的数，比如：90%
    return px;
  } else {
    return parseFloat(px) / 37.5 + "rem"; // 这里的37.5，和rootValue值对应
  }
}
```
