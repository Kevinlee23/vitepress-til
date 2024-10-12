import { h } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import asideTop from "./components/asideTop.vue";
import backTop from "./components/backTop.vue";
import copyright from "./components/copyright.vue";
import comment from "./components/comment.vue";
import "./lxgw.font.css";
import "./fira_code.css";
import "./tailwind.postcss.css";
import "virtual:group-icons.css";
import "./my-fonts.css";
import "./custom.css";

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "aside-top": () => h(asideTop),
      "aside-outline-after": () => h(backTop),
      "layout-bottom": () => h(copyright),
      "doc-after": () => h(comment),
    });
  },
};
