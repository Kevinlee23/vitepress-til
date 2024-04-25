---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "My-TIL"
  text: "Today I Learned"
  tagline: A week is 2% of a year, keep learning
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
  - title: 第三方类库
    icon: ⚙️
    details: 项目开发中关键的齿轮
    link: /3-party-map
---

<script setup>
import NewBlogs from './.vitepress/theme/views/newBlogs.vue'
</script>

<new-blogs />

**技术栈:**

[![My Skills](https://skillicons.dev/icons?i=js,ts,tailwind,vue,vite,nuxtjs,pinia,git,mongodb,nodejs,npm,pnpm,yarn)](https://skillicons.dev)

**使用工具:**

[![My Tools](https://skillicons.dev/icons?i=apple,github,gitlab,vscode,gmail,md)](https://skillicons.dev)

**正在学习:**

[![My Learning](https://skillicons.dev/icons?i=react,nestjs,mysql,docker)](https://skillicons.dev)
