import { defineConfig } from "vitepress";
import { createSidebar } from "./utils/createSideBar";

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
      {
        text: "前端基础",
        items: [
          { text: "Javascript", link: "/javascript/event-loop" },
          { text: "JS Code", link: "/javascript/wapper-for-websocket-vue3" },
          { text: "Typescript", link: "/typescript/basic-object-and-function" },
          { text: "类型编程", link: "/typescript/internal-tool-type" },
          { text: "CSS", link: "/css/gradient-color" },
          { text: "HTTP", link: "/http/HTTP-request-and-response-header" },
        ],
      },
      {
        text: "框架",
        items: [
          { text: "Vue3", link: "/vue3/get-component-instance-in-setup" },
          { text: "React", link: "/react/avoid-mutation" },
          { text: "React Native", link: "/react-native/styleSheet" },
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
          { text: "Docker", link: "/docker/docker-basic" },
        ],
      },
      {
        text: "第三方类库",
        items: [{ text: "mockJs", link: "/3-party-library/how-to-use-mockjs" }],
      },
      { text: "杂项", link: "/others-map" },
    ],

    // @ts-ignore
    sidebar: createSidebar(),

    // https://vitepress.dev/zh/reference/default-theme-config#sociallinks
    socialLinks: [
      { icon: "github", link: "https://github.com/Kevinlee23/vitepress-til" },
    ],

    // https://github.com/lucaong/minisearch/
    search: {
      provider: "local",
    },
  },
  cleanUrls: true,
  lastUpdated: true,
  vite: {
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
  },
});
