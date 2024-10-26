---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  actions:
    - theme: brand
      text: 归档 Mark
      link: /mark/mark-timeline-2024
    - theme: alt
      text: 杂谈 Ordinary
      link: /ordinary/What-marriage-brings-to-me

features:
  - title: 前端基础
    icon: 📘
    details: 如书本熟记的知识
    link: /front-end-map
  - title: 框架
    icon: 🔪
    details: 锋利如刀
    link: /framework-map
  - title: 工具
    icon: 🧰
    details: 解决问题的百宝箱
    link: /tools-map
  - title: 第三方库
    icon: ⚙️
    details: 项目开发中关键的齿轮
    link: /3-party-map
---

<script setup>
import { computed } from 'vue'
import { useData } from 'vitepress'
import NewBlogs from './.vitepress/theme/views/newBlogs.vue'

const { isDark } = useData()
const skillLink = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=js,ts,scss,tailwind,vue,vite,nuxtjs,pinia,git,mongodb,nodejs,npm,pnpm,yarn`)
const toolLink = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=apple,github,gitlab,vscode,gmail,md`)
const learningLink = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=react,next,nestjs,mysql,docker`)
</script>

<new-blogs />

**技术栈:**

<img  :src="skillLink" />

**使用工具:**

<img  :src="toolLink" />

**正在学习:**

<img  :src="learningLink" />
