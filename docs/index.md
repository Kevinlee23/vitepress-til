---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  actions:
    - theme: brand
      text: 归档 Mark
      link: /mark/mark-timeline-2025
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
const skillLinkNo1 = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=js,ts,scss,tailwind,vue,vite`)
const skillLinkNo2 = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=nuxtjs,nestjs,pinia,git,mongodb,nodejs`)
const skillLinkNo3 = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=npm,pnpm,yarn`)

const toolLink = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=apple,github,gitlab,vscode,gmail,md`)
const learningLink = computed(() => `https://skillicons.dev/icons?theme=${isDark.value ? 'light' : 'dark'}&i=mysql,docker`)
</script>

<new-blogs />

快速入口：

- [颜色选择](/css/amazing-color)
- [第三方库归档](/3-party-library/marked-library)
- [vscode 配置](/config/setting-vscode)

**技术栈：**

  <img :src="skillLinkNo1" class="mb-[20px]" />
  <img :src="skillLinkNo2" class="mb-[20px]" />
  <img :src="skillLinkNo3" />

**使用工具：**

<img  :src="toolLink" />

**正在学习：**

<img  :src="learningLink" />

**主要技术熟练度：**

> 掌握 / 熟练 / 精通

语言：

- JavaScript: 熟练
- TypeScript: 掌握

框架：

- Vue3: 精通
- Nuxt: 掌握
- NestJS: 熟练

其他：

- Git: 熟练
- Tailwind: 熟练
- CSS, SCSS: 熟练
- MongoDB (Mongoose): 掌握
