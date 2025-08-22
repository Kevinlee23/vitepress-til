import { defineConfig } from "vitepress";
import {
  groupIconMdPlugin,
  groupIconVitePlugin,
} from "vitepress-plugin-group-icons";
import { createSidebar } from "./utils/createSideBar";
import { buildBlogRSS } from "./utils/rss";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-til/",
  title: "麓下雪",
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
          { text: "JS Code", link: "/javascript/download" },
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
          { text: "React", link: "/react/create" },
          { text: "NestJs", link: "/nest/nest-basic" },
          { text: "Nuxt", link: "/nuxt/nuxt-config" },
        ],
      },
      {
        text: "工具",
        items: [
          { text: "Git", link: "/git/01-git-pull-repository" },
          { text: "vim", link: "/vim/direct" },
          { text: "SQL", link: "/sql/my-sql-single-table-operation" },
          { text: "OSS", link: "/oss/get-sts" },
          { text: "mongodb", link: "/mongodb/mongo-basic" },
          { text: "Redis", link: "/redis/redis-basic" },
          { text: "Docker", link: "/docker/docker-basic" },
          { text: "Echarts", link: "/echarts/options" },
        ],
      },
      {
        text: "第三方库",
        items: [
          { text: "归档", link: "/3-party-library/marked-library" },
          { text: "mockJs", link: "/3-party-library/how-to-use-mockjs" },
        ],
      },
      { text: "项目管理", items: [{ text: "PMP", link: "/pmp/answer-trick" }] },
      {
        text: "杂项",
        items: [
          { text: "配置", link: "/config/off-hibernate" },
          { text: "运维", link: "/ops/create-monorepo" },
          { text: "FIX", link: "/fix/nvm-president-problem-for-mac" },
        ],
      },
      { text: "更新记录", link: "/update" },
      {
        text: "🔥RSS",
        link: "https://kevinlee23.github.io/vitepress-til/feed.xml",
      },
      {
        text: "❄关于生活",
        link: "https://snowinlu.top",
      },
    ],

    outline: {
      label: "Outline 📂",
    },

    // @ts-ignore
    sidebar: createSidebar(),

    // https://vitepress.dev/zh/reference/default-theme-config#sociallinks
    socialLinks: [
      { icon: "github", link: "https://github.com/Kevinlee23/vitepress-til" },
    ],

    // https://github.com/lucaong/minisearch/
    search: { provider: "local" },
  },
  cleanUrls: true,
  lastUpdated: true,
  markdown: {
    config(md) {
      md.use(groupIconMdPlugin);
    },
  },
  buildEnd: buildBlogRSS,
  vite: {
    server: {
      host: "0.0.0.0",
      port: 8080,
    },
    plugins: [groupIconVitePlugin()],
  },
});
