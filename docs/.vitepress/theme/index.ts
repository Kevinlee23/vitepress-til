import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import asideTop from "./components/asideTop.vue"
import './fira_code.css'

export default {
  ...DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      "aside-top": () => h(asideTop),
    })
  }
}
