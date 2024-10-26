import { h } from "vue";
import DefaultTheme from "vitepress/theme-without-fonts";
import asideTop from "./components/asideTop.vue";
import backTop from "./components/backTop.vue";
import copyright from "./components/copyright.vue";
import comment from "./components/comment.vue";
import Wallpage from "./components/wallpage.vue";
import "./styles/lxgw.font.css";
import "./styles/fira_code.css";
import "./styles/tailwind.postcss.css";
import "./styles/my-fonts.css";
import "./styles/custom.css";
import "virtual:group-icons.css";

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "home-hero-before": () => h(Wallpage),
      "aside-top": () => h(asideTop),
      "aside-outline-after": () => h(backTop),
      "layout-bottom": () => h(copyright),
      "doc-after": () => h(comment),
    });
  },
};
