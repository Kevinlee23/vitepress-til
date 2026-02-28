export interface IItems {
  text: string;
  link?: string;
  collapsed?: boolean;
  items?: IItems[];
}

export interface ISideBar {
  [MY_TAB.LAYOUT]: IItems[];
  [MY_TAB.JAVASCRIPT]: IItems[];
  [MY_TAB.TYPESCRIPT]: IItems[];
  [MY_TAB.CSS]: IItems[];
  [MY_TAB.VUE3]: IItems[];
  [MY_TAB.REACT]: IItems[];
  [MY_TAB.NEST]: IItems[];
  [MY_TAB.NUXT]: IItems[];
  [MY_TAB.CONFIG]: IItems[];
  [MY_TAB.FIX]: IItems[];
  [MY_TAB.MARK]: IItems[];
  [MY_TAB.ORIDINARY]: IItems[];
  [MY_TAB.HTTP]: IItems[];
  [MY_TAB.GIT]: IItems[];
  [MY_TAB.VIM]: IItems[];
  [MY_TAB.SQL]: IItems[];
  [MY_TAB.MONGODB]: IItems[];
  [MY_TAB.REDIS]: IItems[];
  [MY_TAB.OSS]: IItems[];
  [MY_TAB.DOCKER]: IItems[];
  [MY_TAB.THREE_PARTY_LIBRARY]: IItems[];
  [MY_TAB.OPS]: IItems[];
  [MY_TAB.PMP]: IItems[];
  [MY_TAB.ECHARTS]: IItems[];
}

export enum MY_TAB {
  LAYOUT = "/",
  JAVASCRIPT = "/javascript/",
  TYPESCRIPT = "/typescript/",
  CSS = "/css/",
  VUE3 = "/vue3/",
  REACT = "/react/",
  NEST = "/nest/",
  NUXT = "/nuxt/",
  CONFIG = "/config/",
  FIX = "/fix/",
  MARK = "/mark/",
  ORIDINARY = "/ordinary/",
  HTTP = "/http/",
  GIT = "/git/",
  VIM = "/vim/",
  SQL = "/sql/",
  MONGODB = "/mongodb/",
  REDIS = "/redis/",
  OSS = "/oss/",
  DOCKER = "/docker/",
  THREE_PARTY_LIBRARY = "/3-party-library/",
  OPS = "/ops/",
  PMP = "/pmp/",
  ECHARTS = "/echarts/",
}

export function createSidebar() {
  const res: ISideBar = {
    "/": [
      {
        text: "目录",
        items: [
          { text: "前端基础", link: "/front-end-map" },
          { text: "框架", link: "/framework-map" },
          { text: "工具", link: "/tools-map" },
          { text: "第三方库", link: "/3-party-map" },
          { text: "杂项", link: "/others-map" },
          { text: "更新记录", link: "/update" },
        ],
      },
    ],
    "/javascript/": [
      {
        text: "Javascript",
        items: [
          { text: "event-loop", link: "/javascript/event-loop" },
          { text: "iframe", link: "/javascript/iframe" },
          { text: "jsx-in-vue3", link: "/javascript/jsx-in-vue3" },
          {
            text: "regular-expression ",
            link: "/javascript/regular-expression",
          },
          { text: "special-event", link: "/javascript/special-event" },
          { text: "JSDoc", link: "/javascript/JSDoc" },
          { text: "web-worker ", link: "/javascript/web-worker" },
          { text: "SSE", link: "/javascript/sse-trans" },
          { text: "BroadcastChannel", link: "/javascript/BroadcastChannel" },
        ],
      },
      {
        text: "JS API",
        items: [
          { text: "AbortController", link: "/javascript/AbortController" },
          {
            text: "createObjectUrl",
            link: "/javascript/create-object-url",
          },
          {
            text: "Element.getBoundingClientRect",
            link: "/javascript/getBoundingClientRect",
          },
          {
            text: "IntersectionObserver",
            link: "/javascript/IntersectionObserver",
          },
          {
            text: "URLSearchParams",
            link: "/javascript/url-search-params",
          },
        ],
      },
      {
        text: "JS Code",
        items: [
          { text: "download", link: "/javascript/download" },
          { text: "p-limit", link: "/javascript/p-limit" },
          { text: "flat", link: "/javascript/flat" },
          { text: "repeat", link: "/javascript/repeat" },
          { text: "hex2rgba", link: "/javascript/hex2rgba" },
          { text: "filterSize", link: "/javascript/filterSize" },
          { text: "filterSizeList", link: "/javascript/filterSizeList" },
          { text: "type-validate", link: "/javascript/type-validate" },
          { text: "get-server-time", link: "/javascript/get-server-time" },
          { text: "matrix-function", link: "/javascript/matrix-function" },
          {
            text: "get-text-width(height)",
            link: "/javascript/get-text-width(height)",
          },
          { text: "px-to-other", link: "/javascript/px2other" },
          {
            text: "websocket 封装",
            link: "/javascript/wapper-for-websocket-vue3",
          },
          { text: "axios 封装", link: "/javascript/axios-wrap" },
        ],
      },
      { text: "返回上层", link: "/front-end-map" },
    ],
    "/typescript/": [
      {
        text: "Typescript Basic",
        items: [
          { text: "类型标注", link: "/typescript/basic-object-and-function" },
          {
            text: "TopType-to-BottomType",
            link: "/typescript/top-type-to-bottom-type",
          },
          { text: "类型声明文件", link: "/typescript/declare-and-[.d.ts]" },
          { text: "类型断言", link: "/typescript/type-declare" },
          { text: "类型保护", link: "/typescript/type-protect" },
          { text: "索引类型", link: "/typescript/index-and-mapping" },
          { text: "类型逻辑运算", link: "/typescript/extend-and-infer" },
          { text: "概念举例", link: "/typescript/example" },
        ],
      },
      {
        text: "类型编程",
        items: [
          { text: "内置工具类型", link: "/typescript/internal-tool-type" },
          {
            text: "类型编程进阶 一",
            link: "/typescript/tool-type-advance-01",
          },
        ],
      },
      {
        text: "trick",
        items: [
          {
            text: "迭代中正确使用对象键",
            link: "/typescript/how-to-iterate-over-object-keys",
          },
        ],
      },
      { text: "返回上层", link: "/front-end-map" },
    ],
    "/css/": [
      {
        text: "杂项",
        items: [
          { text: "gradient-color", link: "/css/gradient-color" },
          { text: "常用片段", link: "/css/snippets" },
          { text: "style 初始化", link: "/css/style-init" },
          { text: "移动端适配", link: "/css/mobile-adaptation" },
          { text: "获取元素的 style", link: "/css/get-computed-style" },
          {
            text: "使用 HSL 表示颜色",
            link: "/css/use-hsl-to-represent-color",
          },
          {
            text: "文字颜色自动适配背景颜色",
            link: "/css/text-color-fit-to-bg",
          },
          { text: "css 函数速查", link: "/css/css-function-table" },
          { text: "滚动相关 api", link: "/css/scroll-relative" },
          {
            text: "将自定义字体作为 css 文件引入",
            link: "/css/font-file-to-css",
          },
          {
            text: "动画的定义",
            link: "/css/motion-definition",
          },
          {
            text: "较少使用的 css 属性",
            link: "/css/less-used-property",
          },
        ],
      },
      {
        text: "tailwindcss",
        items: [
          { text: "tailwind 常用的写法", link: "/css/tailwind-basic" },
          {
            text: "tailwind 自定义颜色",
            link: "/css/tailwind-customizing-colors",
          },
          {
            text: "tailwind 中 @layer 的使用",
            link: "/css/tailwind-layer",
          },
          {
            text: "windicss to tailwindcss",
            link: "/css/windicss-to-tailwindcss",
          },
          {
            text: "动画库：tailwindcss-motion",
            link: "/css/motion-library",
          },
        ],
      },
      {
        text: "一些 css 设计",
        items: [
          { text: "Amazing Color", link: "/css/amazing-color" },
          { text: "图片设计", link: "/css/picture-design" },
          { text: "纵轴进度条", link: "/css/vertical-progress-bar" },
          { text: "带搜索栏的 tabs", link: "/css/search-tab-transform" },
          { text: "带进度条的 tabs", link: "/css/tabs-with-progress" },
          { text: "布局实例<一>", link: "/css/layout-1" },
          { text: "品牌宫格图", link: "/css/brand-grid" },
          { text: "简单的瀑布流实现", link: "/css/fall-style" },
          { text: "圆形 pulse 动画", link: "/css/circle-animation" },
          { text: "一些按钮", link: "/css/some-buttons" },
          { text: "博客类应用中点击查看更多的设计", link: "/css/see-more" },
          { text: "给图片加上阴影遮罩", link: "/css/mask-image" },
          { text: "给项目加上禁用遮罩", link: "/css/item-mask" },
          { text: "横向走马灯", link: "/css/horizontal-slider" },
          { text: "购物车图片放大效果", link: "/css/enlarge-image" },
          { text: "锚点定位", link: "/css/anchor" },
          { text: "图层显隐效果", link: "/css/filter-mask" },
          { text: "sticky 滑动效果", link: "/css/sticky-over" },
          {
            text: "作为图像（img）使用的 SVG 黑色路径变成白色",
            link: "/css/svg-color-black-to-white",
          },
          { text: "example: mask", link: "/css/mask-ex" },
          { text: "example: mix-blend-mode", link: "/css/mix-blend-mode-ex" },
        ],
      },
      {
        text: "未来有用的新特性",
        items: [
          { text: "全属性 attr", link: "/css/all-property-attr" },
          {
            text: "现代 css 特性：@property",
            link: "/css/@property",
          },
        ],
      },
      {
        text: "Canvas",
        items: [{ text: "Canvas 基础", link: "/css/canvas-basic" }],
      },
      { text: "返回上层", link: "/front-end-map" },
    ],
    "/vue3/": [
      {
        text: "Vue3",
        items: [
          {
            text: "getCurrentInsatance",
            link: "/vue3/get-component-instance-in-setup",
          },
          { text: "global-properties", link: "/vue3/global-properties" },
          { text: "v-bind-in-style", link: "/vue3/v-bind-in-style" },
          { text: "v-model", link: "/vue3/v-model" },
          { text: "watchEffect", link: "/vue3/watchEffect" },
          { text: "vue3-and-typescript", link: "/vue3/vue3-and-typescript" },
          { text: "import-static-file", link: "/vue3/import-static-file" },
          {
            text: "use-composable-to-cache-data",
            link: "/vue3/use-composable-to-cache-data",
          },
          {
            text: "h-function",
            link: "/vue3/h-function",
          },
          {
            text: "list-ref",
            link: "/vue3/list-ref",
          },
          {
            text: "vue3-vite-ts 报错汇总",
            link: "/vue3/fix-vue3-ts-error",
          },
        ],
      },
      {
        text: "版本更新",
        items: [{ text: "3.5 新特性", link: "/vue3/3.5-new-features" }],
      },
      {
        text: "Vite",
        items: [
          { text: "my-vitesse", link: "/vue3/my-vitesse" },
          { text: "vite-config", link: "/vue3/vite-config" },
        ],
      },
      {
        text: "pinia",
        items: [
          { text: "pinia-basic", link: "/vue3/pinia-basic" },
          {
            text: "presistedstate",
            link: "/vue3/pinia-plugin-persistedstate",
          },
        ],
      },
      {
        text: "VueUse",
        items: [
          { text: "useSortable", link: "/vue3/useSortable" },
          { text: "useLocalStorage", link: "/vue3/useLocalStorage" },
          { text: "useImage", link: "/vue3/useImage" },
          { text: "useEventListener", link: "/vue3/useEventListener" },
        ],
      },
      { text: "返回上层", link: "/framework-map" },
    ],
    "/react/": [
      {
        text: "react",
        items: [
          { text: "vite-create", link: "/react/create" },
          { text: "mutation", link: "/react/mutation" },
          { text: "list-render", link: "/react/list-render" },
          { text: "useEffect", link: "/react/useEffect" },
          { text: "side-effect", link: "/react/side-effect" },
          { text: "state", link: "/react/state" },
          { text: "state-keep-or-not", link: "/react/state-keep-or-not" },
          { text: "state-with-zustand", link: "/react/state-with-zustand" },
          { text: "slot", link: "/react/slot" },
        ],
      },
      {
        text: "api & hook",
        items: [
          {
            text: "useImperativeHandle",
            link: "/react/hook-useImperativeHandle",
          },
          {
            text: "useMemo",
            link: "/react/hook-useMemo",
          },
          {
            text: "useCallback",
            link: "/react/hook-useCallback",
          },
        ],
      },
      { text: "返回上层", link: "/framework-map" },
    ],
    "/nest/": [
      {
        text: "NestJs",
        items: [
          { text: "基本概念", link: "/nest/nest-basic" },
          { text: "项目结构", link: "/nest/structure" },
          {
            text: "4 种常用的 http 数据传输方式",
            link: "/nest/data-send-by-http",
          },
          { text: "执行上下文", link: "/nest/context" },
          { text: "装饰器", link: "/nest/decorator" },
          { text: "元数据和反射", link: "/nest/metadata-and-reflector" },
          { text: "中间件", link: "/nest/middleware" },
          { text: "守卫", link: "/nest/guard" },
          { text: "管道", link: "/nest/pipe" },
          { text: "拦截器", link: "/nest/intercept" },
          { text: "异常过滤器", link: "/nest/filter" },
        ],
      },
      {
        text: "core",
        items: [{ text: "动态注入", link: "/nest/active-inject" }],
      },
      {
        text: "应用",
        items: [
          { text: "基于 RBAC 的授权", link: "/nest/RBAC-role" },
          { text: "使用 jwt 进行身份验证", link: "/nest/jwt-for-auth" },
          { text: "通行证", link: "/nest/passport" },
          { text: "常见的通行证策略", link: "/nest/passport-strategy" },
          {
            text: "前后端鉴权示例",
            link: "/nest/authentication-from-end-to-front",
          },
          { text: "定时任务", link: "/nest/cron-job" },
          {
            text: "OpenAPI - swagger 接入",
            link: "/nest/swagger",
          },
        ],
      },
      {
        text: "数据处理",
        items: [
          { text: "dto 映射类型", link: "/nest/dto-map" },
          { text: "序列化", link: "/nest/serializer" },
        ],
      },
      {
        text: "config",
        items: [
          { text: "Nest 环境变量/打包参考", link: "/nest/nest-script" },
          { text: "接入 mongodb", link: "/nest/mongoose-connect" },
        ],
      },
      { text: "返回上层", link: "/framework-map" },
    ],
    "/nuxt/": [
      {
        text: "Nuxt",
        items: [
          { text: "nuxt 配置", link: "/nuxt/nuxt-config" },
          { text: "nuxt 目录结构", link: "/nuxt/nuxt-menu" },
          { text: "nuxt 路由", link: "/nuxt/nuxt-route" },
          { text: "nuxt 链接预取 [3.13]", link: "/nuxt/nuxt-prefetch" },
          { text: "fetch 方法", link: "/nuxt/fetch" },
        ],
      },
      {
        text: "返回上层",
        link: "/framework-map",
      },
    ],
    "/config/": [
      {
        text: "配置",
        items: [
          {
            text: "关闭 windows 系统的休眠指令",
            link: "/config/off-hibernate",
          },
          { text: "vscode 配置", link: "/config/setting-vscode" },
          {
            text: "vitepress 部署",
            link: "/config/vitepress-deploy-in-github-page",
          },
          {
            text: "vitepress 中集成 tailwind",
            link: "/config/vitepress-starter-tailwind",
          },
          {
            text: "将 js 文件 当做 shell 脚本执行",
            link: "/config/using-js-as-shell-script",
          },

          {
            text: "好用的 vscode 插件",
            link: "/config/usefull-vscode-plugins",
          },
          {
            text: "vite 环境配置",
            link: "/config/env-config",
          },
          {
            text: "vite 项目配合 nginx 简单部署",
            link: "/config/vite-deploy-with-nginx",
          },
          {
            text: "markdown 片段",
            link: "/config/markdown-snippets",
          },
          {
            text: "vscode 中 json 文件的注释支持",
            link: "/config/vscode-json",
          },
        ],
      },

      { text: "返回上层", link: "/others-map" },
    ],
    "/fix/": [
      {
        text: "错误修复",
        items: [
          {
            text: "MacOs 中设置 node 默认版本",
            link: "/fix/nvm-president-problem-for-mac",
          },
          { text: "MacOs 中 svn 的证书问题", link: "/fix/svn-ssh-problem" },
          {
            text: "修复 Naive UI 中的潜在的样式冲突",
            link: "/fix/fix-naive-css-bug",
          },
          {
            text: "Vercel 部署的前端服务与不同源后端服务器的通信",
            link: "/fix/vercel-server-to-connect-not-same-port",
          },
          {
            text: "页面不能正常识别换行符",
            link: "/fix/correctly-identify-line-breaks",
          },
          {
            text: "解决 typescript 中 image 的导入报错",
            link: "/fix/image-import-fix",
          },
          {
            text: "解决 windows 系统下部分 css 动画失效的问题",
            link: "/fix/windows-motion-disable",
          },
        ],
      },
      { text: "返回上层", link: "/others-map" },
    ],
    "/mark/": [
      {
        text: "时间线",
        items: [
          { text: "2025", link: "/mark/mark-timeline-2025" },
          { text: "2024", link: "/mark/mark-timeline-2024" },
        ],
      },
      { text: "返回上层", link: "/" },
    ],
    "/ordinary/": [
      {
        text: "时间线",
        items: [
          {
            text: "结婚带给我的 🔝",
            link: "/ordinary/What-marriage-brings-to-me",
          },
          { text: "短评", link: "/ordinary/short-comment" },
          {
            text: "熊家菜谱",
            link: "/ordinary/cook-menu",
          },
          {
            text: "我的精酿地图",
            link: "/ordinary/my-craft-beer-map",
          },
          {
            text: "2024 目标",
            link: "/ordinary/2024-goals.md",
          },
        ],
      },
      {
        text: "返回上层",
        link: "/",
      },
    ],
    "/http/": [
      {
        text: "http",
        items: [
          {
            text: "请求头和响应头",
            link: "/http/HTTP-request-and-response-header",
          },
          {
            text: "CORS",
            link: "/http/CORS",
          },
        ],
      },
      { text: "返回上层", link: "/front-end-map" },
    ],
    "/git/": [
      {
        text: "Git 基础",
        items: [
          { text: "获取现有仓库内容", link: "/git/01-git-pull-repository" },
          {
            text: "提交更新并推送到远程仓库",
            link: "/git/02-git-add-and-push",
          },
          { text: "查看提交历史", link: "/git/03-git-log-history" },
          { text: "分支操作", link: "/git/04-git-merge" },
          { text: "git 标签", link: "/git/05-git-tag" },
        ],
      },
      {
        text: "Git 工具",
        items: [
          { text: "git-rebase", link: "/git/[git-tools]-git-rebase" },
          { text: "git-reset", link: "/git/[git-tools]-git-reset" },
          {
            text: "git-stash-and-clean",
            link: "/git/[git-tools]-git-stash-and-clean",
          },
        ],
      },
      {
        text: "Git 配置及问题解决",
        items: [
          { text: "github 连接超时问题", link: "/git/connect-timeout" },
          { text: "推送时 message 规范", link: "/git/git-push-standard" },
          { text: "ssh 公钥生成", link: "/git/ssh-pubKey-generate" },
          { text: "git-alias", link: "/git/git-alias" },
        ],
      },
      {
        text: "最佳实践",
        items: [
          {
            text: "git 合并与变基最佳实践",
            link: "/git/git-merge-and-rebase-best-practice",
          },
        ],
      },
      {
        text: "返回上层",
        link: "/tools-map",
      },
    ],
    "/vim/": [
      { text: "vim 基础", items: [{ text: "基本指令", link: "/vim/direct" }] },
      { text: "返回上层", link: "/tools-map" },
    ],
    "/sql/": [
      {
        text: "my-sql",
        items: [
          {
            text: "单表查询操作",
            link: "/sql/my-sql-single-table-operation",
          },
          {
            text: "外键和关联查询",
            link: "/sql/my-sql-foreign-key-and-join-on",
          },
          {
            text: "多对多表的设计",
            link: "/sql/my-sql-multi-to-multi-table-design",
          },
        ],
      },
      { text: "返回上层", link: "/tools-map" },
    ],
    "/mongodb/": [
      {
        text: "MongoDB",
        items: [
          { text: "Mongo 基础操作", link: "/mongodb/mongo-basic" },
          { text: "Mongo 中的多表联查", link: "/mongodb/multi-document-query" },
          { text: "Mongo 数据迁移", link: "/mongodb/mongo-migrate" },
        ],
      },
    ],
    "/redis/": [
      {
        text: "Redis",
        items: [{ text: "Redis 基础", link: "/redis/redis-basic" }],
      },
      { text: "返回上层", link: "/tools-map" },
    ],
    "/oss/": [
      {
        text: "ali-cloud: oss",
        items: [
          { text: "获取 STS 临时凭证", link: "/oss/get-sts" },
          { text: "创建 oss 对象", link: "/oss/create-client" },
          { text: "客户端直传文件", link: "/oss/client-direct-upload" },
          { text: "删除文件", link: "/oss/delete-object" },
          { text: "列举文件", link: "/oss/list-object" },
          { text: "读取加密文件", link: "/oss/read-encryption-file" },
          { text: "分片上传", link: "/oss/part-upload" },
        ],
      },
      {
        text: "优化",
        items: [
          { text: "获取 oss 图片时的压缩和优化", link: "/oss/compression" },
        ],
      },
      { text: "返回上层", link: "/tools-map" },
    ],
    "/docker/": [
      {
        text: "docker 入门",
        items: [
          {
            text: "Docker 基础",
            link: "/docker/docker-basic",
          },
          {
            text: "Docker 使用镜像",
            link: "/docker/docker-image",
          },
          {
            text: "Docker 操作容器",
            link: "/docker/docker-container",
          },
          {
            text: "Docker 数据管理",
            link: "/docker/docker-data-manage",
          },
          {
            text: "Docker 使用网络",
            link: "/docker/docker-network",
          },
          {
            text: "Dockerfile",
            link: "/docker/docker-dockerfile",
          },
          {
            text: "docker 和 compose 的区别",
            link: "/docker/docker-and-compose",
          },
        ],
      },
      {
        text: "config",
        items: [
          { text: "docker 换源配置", link: "/docker/docker-registry-config" },
        ],
      },
      { text: "返回上层", link: "/tools-map" },
    ],
    "/3-party-library/": [
      {
        text: "3pt-library",
        items: [
          { text: "第三方库归档", link: "/3-party-library/marked-library" },
        ],
      },
      {
        text: "mockJs",
        items: [
          {
            text: "基本使用",
            link: "/3-party-library/how-to-use-mockjs",
          },
          { text: "范式", link: "/3-party-library/mockjs-DTD" },
          { text: "占位符", link: "/3-party-library/mockjs-DPD" },
        ],
      },
      { text: "返回上层", link: "/3-party-map" },
    ],
    "/ops/": [
      {
        text: "运维",
        items: [
          { text: "monorepo 构建", link: "/ops/create-monorepo" },
          { text: "pm2 的基本操作", link: "/ops/pm2" },
          {
            text: "Github Actions 中的工作流定时执行",
            link: "/ops/github-workflow-timeset",
          },
          {
            text: "nginx 配置",
            link: "/ops/nginx-config",
          },
          {
            text: "linux 速查",
            link: "/ops/linux-memo",
          },
        ],
      },
      {
        text: "知识点",
        items: [
          { text: "安全概念 - 2FA and TOTP", link: "/ops/2FA-and-TOTP" },
          { text: "前端角度的 SEO", link: "/ops/seo-front" },
        ],
      },
      {
        text: "返回上层",
        link: "/others-map",
      },
    ],
    "/pmp/": [
      {
        text: "PMP",
        items: [
          { text: "解题技巧", link: "/pmp/answer-trick" },
          { text: "PMP 中的工具和技术 T&M", link: "/pmp/pmp-t&M" },
          { text: "敏捷错题", link: "/pmp/agile-wq" },
          { text: "过程组错题", link: "/pmp/process-wq" },
          { text: "多选题错题", link: "/pmp/dual-wq" },
          { text: "2024-08 考试结果", link: "/pmp/pmp-result" },
        ],
      },
      {
        text: "返回上层",
        link: "/",
      },
    ],
    "/echarts/": [
      {
        text: "echarts",
        items: [
          { text: "常用配置速查", link: "/echarts/options" },
          { text: "地图导入", link: "/echarts/map" },
        ],
      },
      {
        text: "返回上层",
        link: "/tools-map",
      },
    ],
  };

  return res;
}
