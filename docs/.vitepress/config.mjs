import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-til/",
  title: "Vitepress-TIL",
  description: "A VitePress Site",
  head: [["link", { rel: "icon", href: "/vitepress-til/assets/favion.ico" }]],
  themeConfig: {
    logo: "/assets/cola.svg",

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "首页", link: "/" },
      {
        text: "前端基础",
        items: [
          { text: "Javascript", link: "/javascript/event-loop" },
          { text: "JS Code", link: "/javascript/wapper-for-websocket-vue3" },
          { text: "Typescript", link: "/typescript/basic-object-and-function" },
          { text: "CSS", link: "/css/gradient-color" },
          { text: "类型编程", link: "/typescript/internal-tool-type" },
          { text: "HTTP", link: "/http/HTTP-request-and-response-header" },
        ],
      },
      {
        text: "框架",
        items: [
          { text: "Vue3", link: "/vue3/get-component-instance-in-setup" },
          { text: "React", link: "/react/avoid-mutation" },
          { text: "Nuxt", link: "..." },
          { text: "NestJs", link: "..." },
          { text: "qiankun", link: "..." },
        ],
      },
      {
        text: "工具",
        items: [
          { text: "Git", link: "/git/01-git-pull-repository" },
          { text: "webpack", link: "..." },
          { text: "SQL", link: "/sql/my-sql-single-table-operation" },
          { text: "OSS", link: "/oss/get-sts" },
        ],
      },
      {
        text: "第三方类库",
        items: [{ text: "mockJs", link: "/3-party-library/how-to-use-mockjs" }],
      },
      { text: "杂项", link: "/others-map" },
    ],

    sidebar: {
      "/": [
        {
          text: "大纲",
          items: [
            { text: "前端基础", link: "/front-end-map" },
            { text: "框架", link: "/framework-map" },
            { text: "工具", link: "/tools-map" },
            { text: "第三方类库", link: "/3-party-map" },
            { text: "杂项", link: "/others-map" },
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
            { text: "web-worker ", link: "/javascript/web-worker" },
            { text: "special-event", link: "/javascript/special-event" },
          ],
        },
        {
          text: "JS Code",
          items: [
            {
              text: "websocket ",
              link: "/javascript/wapper-for-websocket-vue3",
            },
            { text: "download", link: "/javascript/download" },
            { text: "p-limit", link: "/javascript/p-limit" },
            { text: "flat", link: "/javascript/flat" },
            { text: "repeat", link: "/javascript/repeat" },
            { text: "px2rem", link: "/javascript/px2rem" },
            { text: "px2vw", link: "/javascript/px2vw" },
            { text: "px2vh", link: "/javascript/px2vh" },
            { text: "hex2rgba", link: "/javascript/hex2rgba" },
            { text: "filterSize", link: "/javascript/filterSize" },
            { text: "filterSizeList", link: "/javascript/filterSizeList" },
            { text: "type-validate", link: "/javascript/type-validate" },
            { text: "get-server-time", link: "/javascript/get-server-time" },
          ],
        },
        { text: "返回上层", link: "/front-end-map" },
      ],
      "/typescript/": [
        {
          text: "Typescript Basic",
          items: [
            { text: "类型标注", link: "/typescript/basic-object-and-function" },
            { text: "类型声明文件", link: "/typescript/declare-and-[.d.ts]" },
            { text: "类型断言", link: "/typescript/type-declare" },
            {
              text: "TopType-to-BottomType",
              link: "/typescript/top-type-to-bottom-type",
            },
            { text: "索引类型", link: "/typescript/index-and-mapping" },
            { text: "类型逻辑运算", link: "/typescript/extend-and-infer" },
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
        { text: "返回上层", link: "/front-end-map" },
      ],
      "/css/": [
        {
          text: "CSS",
          items: [
            { text: "gradient-color", link: "/css/gradient-color" },
            { text: "style 初始化", link: "/css/style-init" },
            { text: "带搜索栏的 tabs", link: "/css/search-tab-transform" },
            { text: "布局实例一", link: "/css/layout-1" },
          ],
        },
        {
          text: "一些很好看的设计",
          items: [
            { text: "Amazing Color", link: "/css/amazing-color" },
            { text: "图片设计", link: "/css/picture-design" },
            { text: "纵轴进度条", link: "/css/vertical-progress-bar" },
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
          ],
        },
        {
          text: "Vite",
          items: [
            { text: "my-vitesse [beta]", link: "/vue3/my-vitesse" },
            { text: "proxy", link: "/vue3/vite-proxy" },
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
          items: [{ text: "useSortable", link: "/vue3/useSortable" }],
        },
        { text: "返回上层", link: "/framework-map" },
      ],
      "/react/": [
        {
          text: "react",
          items: [
            { text: "avoid-mutation", link: "/react/avoid-mutation" },
            { text: "render-list", link: "/react/render-list" },
            { text: "side-effect", link: "/react/side-effect" },
            { text: "slot", link: "/react/slot" },
          ],
        },
        { text: "返回上层", link: "/framework-map" },
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
              text: "将 js 文件 当做 shell 脚本执行",
              link: "/config/using-js-as-shell-script",
            },
            {
              text: "修复 Naive UI 中的潜在的样式冲突",
              link: "/config/fix-naive-css-bug",
            },
            { text: "monorepo 构建", link: "/config/create-monorepo" },
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
          ],
        },
        { text: "返回上层", link: "/others-map" },
      ],
      "/mark/": [
        {
          text: "时间线",
          items: [{ text: "2024", link: "/mark/mark-timeline-2024" }],
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
            {
              text: "熊家菜谱",
              link: "/ordinary/cook-menu",
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
            { text: "git标签", link: "/git/05-git-tag" },
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
          ],
        },
        {
          text: "返回上层",
          link: "/tools-map",
        },
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
        { text: "返回上层", link: "/tools-map" },
      ],
      "/3-party-library/": [
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
    },

    // https://vitepress.dev/zh/reference/default-theme-config#sociallinks
    socialLinks: [
      { icon: "github", link: "https://github.com/Kevinlee23/TIL" },
    ],

    // https://github.com/lucaong/minisearch/
    search: {
      provider: "local",
    },
  },
  cleanUrls: true,
  lastUpdated: true,
});
