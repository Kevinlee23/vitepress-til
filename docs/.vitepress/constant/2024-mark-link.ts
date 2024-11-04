import { type Link, TagName } from "../utils/createTag";

type Month =
  | "DEC"
  | "NOV"
  | "OCT"
  | "SEPT"
  | "AUG"
  | "JUL"
  | "JUN"
  | "MAY"
  | "APRI"
  | "MAR"
  | "FEB"
  | "JAN";

type MarkDate = {
  [K in Month]?: number[];
};

type MarkData = {
  [K in Month]?: Link[];
};

export const allMonthShort: Month[] = [
  "DEC",
  "NOV",
  "OCT",
  "SEPT",
  "AUG",
  "JUL",
  "JUN",
  "MAY",
  "APRI",
  "MAR",
  "FEB",
  "JAN",
];

export const markDate: MarkDate = {
  NOV: [4],
  OCT: [8, 10, 11, 17],
  SEPT: [5, 9, 9, 12, 24, 25, 27],
  AUG: [1, 2, 2, 2, 5, 6, 8, 12, 15, 16, 20, 21],
  JUL: [3, 3, 4, 4, 8, 10, 11, 11, 12, 15, 15, 15, 18, 23, 31],
  JUN: [3, 5, 5, 14, 20, 21, 26],
  MAY: [6, 9, 10, 11, 13, 15, 16, 17, 17, 29, 31, 31, 31],
  APRI: [
    1, 2, 3, 7, 8, 9, 10, 10, 11, 15, 16, 17, 17, 18, 18, 19, 20, 20, 20, 23,
    24, 24, 24, 25, 25, 26, 29, 30,
  ],
  MAR: [
    12, 13, 13, 14, 15, 15, 16, 18, 19, 20, 20, 25, 26, 26, 26, 26, 27, 27, 27,
    27, 27, 28, 28, 28, 28, 30,
  ],
};

export const markData: MarkData = {
  NOV: [
    {
      title: "ts 类型保护",
      link: "/typescript/type-protect",
      tagName: TagName.Typescript,
      createDate: "2024-11-04",
    },
  ],
  OCT: [
    {
      title: "SSE 流式传输",
      link: "/javascript/sse-trans",
      tagName: TagName.Javascript,
      createDate: "2024-10-17",
    },
    {
      title: "将自定义字体作为 css 文件引入",
      link: "/css/font-file-to-css",
      tagName: TagName.CSS,
      createDate: "2024-10-11",
    },
    {
      title: "基本配置",
      link: "/echarts/options",
      tagName: TagName.Echarts,
      createDate: "2024-10-10",
    },
    {
      title: "Server Action",
      link: "/next/server-action",
      tagName: TagName.Next,
      createDate: "2024-10-08",
    },
  ],
  SEPT: [
    {
      title: "服务端组件和客户端组件",
      link: "/next/server-and-client-component",
      tagName: TagName.Next,
      createDate: "2024-09-27",
    },
    {
      title: "Route 相关接口",
      link: "/next/next-route-rel",
      tagName: TagName.Next,
      createDate: "2024-09-25",
    },
    {
      title: "Next 中的布局组件",
      link: "/next/next-layout",
      tagName: TagName.Next,
      createDate: "2024-09-24",
    },
    {
      title: "滚动相关 api",
      link: "/css/scroll-relative",
      tagName: TagName.CSS,
      createDate: "2024-09-12",
    },
    {
      title: "RN 中的组件",
      link: "/react-native/rn-components",
      tagName: TagName.ReactNative,
      createDate: "2024-09-09",
    },
    {
      title: "RN 中图片资源的引用方式",
      link: "/react-native/images",
      tagName: TagName.ReactNative,
      createDate: "2024-09-09",
    },
    {
      title: "3.5 新特性",
      link: "/vue3/3.5-new-features",
      tagName: TagName.Vue3,
      createDate: "2024-09-05",
    },
  ],
  AUG: [
    {
      title: "state-with-zustand",
      link: "/react/state-with-zustand",
      tagName: TagName.React,
      createDate: "2024-08-21",
    },
    {
      title: "state-keep-or-not",
      link: "/react/state-keep-or-not",
      tagName: TagName.React,
      createDate: "2024-08-20",
    },
    {
      title: "前端角度的 SEO",
      link: "/ops/seo-front",
      tagName: TagName.OPs,
      createDate: "2024-08-16",
    },
    {
      title: "安全概念 - 2FA and TOTP",
      link: "/ops/2FA-and-TOTP",
      tagName: TagName.OPs,
      createDate: "2024-08-15",
    },
    {
      title: "Ts 概念举例",
      link: "/typescript/example",
      tagName: TagName.Typescript,
      createDate: "2024-08-12",
    },
    {
      title: "useEffect",
      link: "/react/useEffect",
      tagName: TagName.React,
      createDate: "2024-08-08",
    },
    {
      title: "解题技巧",
      link: "/pmp/answer-trick",
      tagName: TagName.PMP,
      createDate: "2024-08-06",
    },
    {
      title: "多选题错题",
      link: "/pmp/dual-wq",
      tagName: TagName.PMP,
      createDate: "2024-08-05",
    },
    {
      title: "Github Actions 中的工作流定时执行",
      link: "/ops/github-workflow-timeset",
      tagName: TagName.OPs,
      createDate: "2024-08-02",
    },
    {
      title: "snippets - markdown",
      link: "/config/markdown-snippets",
      tagName: TagName.Config,
      createDate: "2024-08-02",
    },
    {
      title: "过程组错题",
      link: "/pmp/process-wq",
      tagName: TagName.PMP,
      createDate: "2024-08-02",
    },
    {
      title: "敏捷错题",
      link: "/pmp/agile-wq",
      tagName: TagName.PMP,
      createDate: "2024-08-01",
    },
  ],
  JUL: [
    {
      title: "锚点定位",
      link: "/css/anchor",
      tagName: TagName.CSS,
      createDate: "2024-07-31",
    },
    {
      title: "nuxt 路由",
      link: "/nuxt/nuxt-route",
      tagName: TagName.Nuxt,
      createDate: "2024-07-23",
    },
    {
      title: "Nest 环境变量/打包参考",
      link: "/nest/nest-script",
      tagName: TagName.NestJs,
      createDate: "2024-07-18",
    },
    {
      title: "docker 换源配置",
      link: "/docker/docker-registry-config",
      tagName: TagName.Docker,
      createDate: "2024-07-15",
    },
    {
      title: "vite 项目配合 nginx 简单部署",
      link: "/config/vite-deploy-with-nginx",
      tagName: TagName.Config,
      createDate: "2024-07-15",
    },
    {
      title: "vitepress 在 gibhub page 部署",
      link: "/config/vitepress-deploy-in-github-page",
      tagName: TagName.Config,
      tagStatus: "UPDATED",
      createDate: "2024-07-15",
    },
    {
      title: "提交更新并推送到远程仓库",
      link: "/git/02-git-add-and-push",
      tagName: TagName.Git,
      tagStatus: "UPDATED",
      createDate: "2024-07-11",
    },
    {
      title: "页面不能正常识别换行符",
      link: "/fix/correctly-identify-line-breaks",
      tagName: TagName.ErrorFix,
      createDate: "2024-07-11",
    },
    {
      title: "购物车图片放大效果",
      link: "/css/enlarge-image",
      tagName: TagName.CSS,
      createDate: "2024-07-10",
    },
    {
      title: "纵轴进度条",
      link: "/css/vertical-progress-bar",
      tagName: TagName.CSS,
      tagStatus: "UPDATED",
      createDate: "2024-07-08",
    },
    {
      title: "pm2 基本操作",
      link: "/ops/pm2",
      tagName: TagName.OPs,
      createDate: "2024-07-04",
    },
    {
      title: "api - AbortController",
      link: "/javascript/AbortController",
      tagName: TagName.Javascript,
      createDate: "2024-07-03",
    },
    {
      title: "横向走马灯",
      link: "/css/horizontal-slider",
      tagName: TagName.CSS,
      createDate: "2024-07-03",
    },
  ],
  JUN: [
    {
      title: "nuxt 目录结构",
      link: "/nuxt/nuxt-menu",
      tagName: TagName.Nuxt,
      tagStatus: "BETA",
      createDate: "2024-06-26",
    },
    {
      title: "Vercel 部署的前端服务与不同源后端服务器的通信",
      link: "/fix/vercel-server-to-connect-not-same-port",
      tagName: TagName.ErrorFix,
      createDate: "2024-06-21",
    },
    {
      title: "Mongo 中的多表联查",
      link: "/mongodb/muti-document-query",
      tagName: TagName.MongoDB,
      createDate: "2024-06-20",
    },
    {
      title: "带进度条的 tabs",
      link: "/css/tabs-with-progress",
      tagName: TagName.CSS,
      createDate: "2024-06-14",
    },
    {
      title: "vitepress 中集成 tailwind",
      link: "/config/vitepress-starter-tailwind",
      tagName: TagName.Config,
      createDate: "2024-06-05",
    },
    {
      title: "给项目加上禁用遮罩",
      link: "/css/item-mask",
      tagName: TagName.CSS,
      createDate: "2024-06-05",
    },
    {
      title: "给图片加上阴影遮罩",
      link: "/css/mask-image",
      tagName: TagName.CSS,
      createDate: "2024-06-03",
    },
  ],
  MAY: [
    {
      title: "px-to-other",
      link: "/javascript/px2other",
      tagName: TagName.JSCode,
      tagStatus: "UPDATED",
      createDate: "2024-05-31",
    },
    {
      title: "get-text-width(height)",
      link: "/javascript/get-text-width(height)",
      tagName: TagName.Javascript,
      createDate: "2024-05-31",
    },
    {
      title: "博客类应用中点击查看更多的设计",
      link: "/css/see-more",
      tagName: TagName.CSS,
      createDate: "2024-05-31",
    },
    {
      title: "h-function",
      link: "/vue3/h-function",
      tagName: TagName.Vue3,
      createDate: "2024-05-29",
    },
    {
      title: "nuxt config",
      link: "/nuxt/nuxt-config",
      tagName: TagName.Nuxt,
      tagStatus: "BETA",
      createDate: "2024-05-17",
    },
    {
      title: "部署环境配置",
      link: "/config/env-config",
      tagName: TagName.Config,
      createDate: "2024-05-17",
    },
    {
      title: "一些按钮",
      link: "/css/some-buttons",
      tagName: TagName.CSS,
      createDate: "2024-05-16",
    },
    {
      title: "文字颜色自动适配背景颜色",
      link: "/css/text-color-fit-to-bg",
      tagName: TagName.CSS,
      createDate: "2024-05-15",
    },
    {
      title: "下划线装饰",
      link: "/css/under-decoration",
      tagName: TagName.CSS,
      createDate: "2024-05-13",
    },
    {
      title: "圆形 pulse 动画",
      link: "/css/circle-animation",
      tagName: TagName.CSS,
      createDate: "2024-05-11",
    },
    {
      title: "使用组合式函数缓存数据",
      link: "/vue3/use-composable-to-cache-data",
      tagName: TagName.Vue3,
      createDate: "2024-05-10",
    },
    {
      title: "简单的瀑布流实现",
      link: "/css/fall-style",
      tagName: TagName.CSS,
      createDate: "2024-05-09",
    },
    {
      title: "好用的 vscode 插件",
      link: "/config/usefull-vscode-plugins",
      tagName: TagName.Config,
      createDate: "2024-05-06",
    },
  ],
  APRI: [
    {
      title: "品牌宫格图",
      link: "/css/brand-grid",
      tagName: TagName.CSS,
      createDate: "2024-04-30",
    },
    {
      title: "矩阵操作",
      link: "/javascript/matrix-function",
      tagName: TagName.JSCode,
      tagStatus: "BETA",
      createDate: "2024-04-29",
    },
    {
      title: "使用 HSL 表示颜色",
      link: "/css/use-hsl-to-represent-color",
      tagName: TagName.CSS,
      createDate: "2024-04-26",
    },
    {
      title: "vu3 中引入静态文件",
      link: "/vue3/import-static-file",
      tagName: TagName.Vue3,
      createDate: "2024-04-25",
    },
    {
      title: "vue3-vite-ts 报错汇总",
      link: "/fix/fix-vue3-ts-error",
      tagName: TagName.ErrorFix,
      tagStatus: "UPDATED",
      createDate: "2024-04-25",
    },
    {
      title: "NestJs - Swagger 接入",
      link: "/nest/swagger",
      tagName: TagName.NestJs,
      createDate: "2024-04-24",
    },
    {
      title: "NestJs - 数据传输校验",
      link: "/nest/validation-pipe",
      tagName: TagName.NestJs,
      createDate: "2024-04-24",
    },
    {
      title: "NestJs - 使用 jwt 进行身份验证",
      link: "/nest/jwt-for-auth",
      tagName: TagName.NestJs,
      createDate: "2024-04-24",
    },
    {
      title: "移动端适配",
      link: "/css/mobile-adaptation",
      tagName: TagName.CSS,
      createDate: "2024-04-23",
      tagStatus: "UPDATED",
    },
    {
      title: "NestJs - intercept 拦截器",
      link: "/nest/intercept",
      tagName: TagName.NestJs,
      createDate: "2024-04-20",
    },
    {
      title: "NestJs - pipe 管道",
      link: "/nest/pipe",
      tagName: TagName.NestJs,
      createDate: "2024-04-20",
    },
    {
      title: "NestJs - 项目结构",
      link: "/nest/structure",
      tagName: TagName.NestJs,
      createDate: "2024-04-20",
    },
    {
      title: "NestJs - 执行上下文",
      link: "/nest/context",
      tagName: TagName.NestJs,
      createDate: "2024-04-19",
    },
    {
      title: "基于 RBAC 的授权",
      link: "/nest/RBAC-role",
      tagName: TagName.NestJs,
      createDate: "2024-04-18",
    },
    {
      title: "Nestjs - 基础概念",
      link: "/nest/nest-basic",
      tagName: TagName.NestJs,
      createDate: "2024-04-18",
    },
    {
      title: "NestJs - 4种常用的http数据传输方式",
      link: "/nest/data-send-by-http",
      tagName: TagName.NestJs,
      createDate: "2024-04-17",
    },
    {
      title: "NestJs - dto 映射",
      link: "/nest/dto-map",
      tagName: TagName.NestJs,
      createDate: "2024-04-17",
    },
    {
      title: "CORS （跨域资源共享）",
      link: "/http/CORS",
      tagName: TagName.HTTP,
      createDate: "2024-04-16",
    },
    {
      title: "Docker 系列 6篇基础笔记",
      link: "/docker/docker-basic",
      tagName: TagName.Docker,
      createDate: "2024-04-15",
    },
    {
      title: "StyleSheet",
      link: "/react-native/styleSheet",
      tagName: TagName.ReactNative,
      createDate: "2024-04-11",
    },
    {
      title: "windicss to tailwindcss",
      link: "/css/windicss-to-tailwindcss",
      tagName: TagName.CSS,
      createDate: "2024-04-10",
    },
    {
      title: "tailwind 自定义颜色",
      link: "/css/tailwind-customizing-colors",
      tagName: TagName.CSS,
      createDate: "2024-04-09",
    },
    {
      title: "获取 element 的 style 对象",
      link: "/css/get-computed-style",
      tagName: TagName.CSS,
      createDate: "2024-04-08",
    },
    {
      title: "移动端适配",
      link: "/css/mobile-adaptation",
      tagName: TagName.CSS,
      createDate: "2024-04-07",
    },
    {
      title: "vue3-vite-ts 报错汇总",
      link: "/fix/fix-vue3-ts-error",
      tagName: TagName.ErrorFix,
      createDate: "2024-04-03",
    },
    {
      title: "docker 和 compose 的区别",
      link: "/docker/docker-and-compose",
      tagName: TagName.Docker,
      createDate: "2024-04-02",
    },
    {
      title: "创建文件临时路径",
      link: "/javascript/create-object-url",
      tagName: TagName.Javascript,
      createDate: "2024-04-01",
    },
  ],
  MAR: [
    {
      title: "tailwind 常用写法",
      link: "/css/tailwind-basic",
      tagName: TagName.CSS,
      createDate: "2024-03-30",
      tagStatus: "BETA",
    },
    {
      title: "Vite-config",
      link: "/vue3/vite-config",
      tagName: TagName.Vue3,
      createDate: "2024-03-28",
      tagStatus: "BETA",
    },
    {
      title: "JSDoc 小记",
      link: "/javascript/JSDoc",
      tagName: TagName.Javascript,
      createDate: "2024-03-28",
    },
    {
      title: "页面特殊事件",
      link: "/javascript/special-event",
      tagName: TagName.Javascript,
      createDate: "2024-03-28",
    },
    {
      title: "oss-分片上传",
      link: "/oss/part-upload",
      tagName: TagName.OSS,
      createDate: "2024-03-28",
    },
    {
      title: "vite 配置代理",
      link: "#",
      tagName: TagName.Vue3,
      createDate: "2024-03-27",
      tagStatus: "MERGED",
    },
    {
      title: "读取加密文件",
      link: "/oss/read-encryption-file",
      tagName: TagName.OSS,
      createDate: "2024-03-27",
    },
    {
      title: "列举文件",
      link: "/oss/list-object",
      tagName: TagName.OSS,
      createDate: "2024-03-27",
    },
    {
      title: "删除文件",
      link: "/oss/delete-object",
      tagName: TagName.OSS,
      createDate: "2024-03-27",
    },
    {
      title: "客户端直传文件",
      link: "/oss/client-direct-upload",
      tagName: TagName.OSS,
      createDate: "2024-03-27",
    },
    {
      title: "生成客户端对象",
      link: "/oss/create-client",
      tagName: TagName.OSS,
      createDate: "2024-03-26",
    },
    {
      title: "获取 STS 临时凭证",
      link: "/oss/get-sts",
      tagName: TagName.OSS,
      createDate: "2024-03-26",
    },
    {
      title: "获取服务器时间",
      link: "/javascript/get-server-time",
      tagName: TagName.JSCode,
      createDate: "2024-03-26",
    },
    {
      title: "vue3 中的类型标注",
      link: "/vue3/vue3-and-typescript",
      tagName: TagName.Vue3,
      createDate: "2024-03-26",
    },
    {
      title: "构建 monorepo",
      link: "/config/create-monorepo",
      tagName: TagName.Config,
      createDate: "2024-03-25",
    },
    {
      title: "Canvas 基础",
      link: "/css/canvas-basic",
      tagName: TagName.CSS,
      createDate: "2024-03-20",
    },
    {
      title: "JsCode 更新",
      link: "/javascript/wapper-for-websocket-vue3",
      tagName: TagName.JSCode,
      createDate: "2024-03-19",
    },
    {
      title: "令人惊讶的颜色",
      link: "/css/amazing-color",
      tagName: TagName.CSS,
      createDate: "2024-03-19",
    },
    {
      title: "修复 Naive UI 中的潜在的样式冲突",
      link: "/fix/fix-naive-css-bug",
      tagName: TagName.ErrorFix,
      createDate: "2024-03-18",
    },
    {
      title: "My Vitesse",
      link: "/vue3/my-vitesse",
      tagName: TagName.Vue3,
      createDate: "2024-03-16",
      tagStatus: "BETA",
    },
    {
      title: "纵轴进度条",
      link: "/css/vertical-progress-bar",
      tagName: TagName.CSS,
      createDate: "2024-03-15",
    },
    {
      title: "图片设计",
      link: "/css/picture-design",
      tagName: TagName.CSS,
      createDate: "2024-03-15",
    },
    {
      title: "mockJs 基本使用",
      link: "/3-party-library/how-to-use-mockjs",
      tagName: TagName.mockJs,
      createDate: "2024-03-14",
    },
    {
      title: "插件: pinia-plugin-persistedstate",
      link: "/vue3/pinia-plugin-persistedstate",
      tagName: TagName.Vue3,
      createDate: "2024-03-13",
    },
    {
      title: "熊家菜谱(新增利村牛肉)",
      link: "/ordinary/cook-menu",
      tagName: TagName.Ordinary,
      createDate: "2024-03-13",
      tagStatus: "UPDATED",
    },
    {
      title: "vitepress-deploy-in-github-page",
      link: "/config/vitepress-deploy-in-github-page",
      tagName: TagName.Config,
      createDate: "2024-03-12",
    },
  ],
};

const showNum: number = 5;

export const getNewNBlogs = (n: number = showNum): Link[] => {
  let res: number = n;
  let list: Link[] = [];

  allMonthShort.map((mon) => {
    let data: Link[] = markData[mon] || [];
    if (res !== 0) {
      if (data.length > res) {
        list.push(...data.slice(0, res));
        res = 0;
      } else {
        list.push(...data);
        res -= data.length;
      }
    }
  });

  return list;
};

export type TagNums = {
  [K in TagName]?: number;
};
export const getTagNums = (): TagNums => {
  const tagNums: TagNums = {};
  Object.keys(markData).map((key) => {
    markData[key as Month]?.map((blog) => {
      if (tagNums[blog.tagName]) {
        (tagNums[blog.tagName] as number)++;
      } else {
        tagNums[blog.tagName] = 1;
      }
    });
  });

  return tagNums;
};
