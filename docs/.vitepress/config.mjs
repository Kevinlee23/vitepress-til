import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/vitepress-til/",
  title: "Vitepress-TIL",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Home", link: "/" }],

    sidebar: {
      "/": [
        {
          text: "大纲",
          items: [
            { text: "前端基础", link: "/front-end-map" },
            { text: "框架", link: "/framework-map" },
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
          ],
        },
        {
          text: "Source Code",
          items: [
            { text: "download", link: "/javascript/download" },
            {
              text: "wapper-for-websocket-vue3 ",
              link: "/javascript/wapper-for-websocket-vue3",
            },
          ],
        },
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
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/Kevinlee23/TIL" },
    ],
  },
  cleanUrls: true,
});
