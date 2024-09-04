import { h } from "vue";
import DefaultTheme from "vitepress/theme";
import asideTop from "./components/asideTop.vue";
import backTop from "./components/backTop.vue";
import "./fira_code.css";
import "./tailwind.postcss.css";
import 'virtual:group-icons.css'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "aside-top": () => h(asideTop),
      "aside-outline-after": () => h(backTop),
    });
  },
};
