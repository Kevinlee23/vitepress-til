import type { Link } from '../utils/createTag'

type Month = 'DEC' | 'NOV' | 'OCT' | 'SEPT' | 'AUG' | 'JUL' | 'JUN' | 'MAY' | 'APRI' | 'MAR' | 'FEB' | 'JAN'

type MarkDate = {
  [K in Month]?: number[]
}

type MarkData = {
  [K in Month]?: Link[]
}


export const markDate: MarkDate = {
  'MAR': [12, 13, 13, 14, 15, 15, 16, 18, 19, 20, 20, 25, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 30],
  'APRI': [1, 2, 3, 7, 8, 9, 10, 10, 11]
}

export const markData: MarkData = {
  'APRI': [
    { title: 'StyleSheet', link: '/react-native/styleSheet', tagName: 'React Native', createDate: '2024-04-11' },
    { title: 'windicss to tailwindcss', link: '/css/windicss-to-tailwindcss', tagName: 'CSS', createDate: '2024-04-10' },
    { title: 'tailwind 自定义颜色', link: '/css/tailwind-customizing-colors', tagName: 'CSS', createDate: '2024-04-09' },
    { title: '获取 element 的 style 对象', link: '/css/get-computed-style', tagName: 'CSS', createDate: '2024-04-08' },
    { title: '移动端适配', link: '/css/mobile-adaptation', tagName: 'CSS', createDate: '2024-04-07' },
    { title: 'vue3-vite-ts 报错汇总', link: '/fix/fix-vue3-ts-error', tagName: 'Error Fix', createDate: '2024-04-03' },
    { title: 'docker 和 compose 的区别', link: '/docker/docker-and-compose', tagName: 'Docker', createDate: '2024-04-02' },
    { title: '创建文件临时路径', link: '/javascript/create-object-url', tagName: 'Javascript', createDate: '2024-04-01' },
  ],
  'MAR': [
    { title: 'tailwind 常用写法', link: '/css/tailwind-basic', tagName: 'CSS', createDate: '2024-03-30', tagStatus: 'BETA' },
    { title: 'Vite-config', link: '/vue3/vite-config', tagName: 'Vue3', createDate: '2024-03-28', tagStatus: 'BETA' },
    { title: 'JSDoc 小记', link: '/javascript/JSDoc', tagName: 'Javascript', createDate: '2024-03-28' },
    { title: '页面特殊事件', link: '/javascript/special-event', tagName: 'Javascript', createDate: '2024-03-28' },
    { title: 'oss-分片上传', link: '/oss/part-upload', tagName: 'OSS', createDate: '2024-03-28' },
    { title: 'vite 配置代理', link: '#', tagName: 'Vue3', createDate: '2024-03-27', tagStatus: 'MERGED' },
    { title: '读取加密文件', link: '/oss/read-encryption-file', tagName: 'OSS', createDate: '2024-03-27' },
    { title: '列举文件', link: '/oss/list-object', tagName: 'OSS', createDate: '2024-03-27' },
    { title: '删除文件', link: '/oss/delete-object', tagName: 'OSS', createDate: '2024-03-27' },
    { title: '客户端直传文件', link: '/oss/client-direct-upload', tagName: 'OSS', createDate: '2024-03-27' },
    { title: '生成客户端对象', link: '/oss/create-client', tagName: 'OSS', createDate: '2024-03-26' },
    { title: '获取 STS 临时凭证', link: '/oss/get-sts', tagName: 'OSS', createDate: '2024-03-26' },
    { title: '获取服务器时间', link: '/javascript/get-server-time', tagName: 'JS Code', createDate: '2024-03-26' },
    { title: 'vue3 中的类型标注', link: '/vue3/vue3-and-typescript', tagName: 'Vue3', createDate: '2024-03-26' },
    { title: '构建 monorepo', link: '/config/create-monorepo', tagName: 'Config', createDate: '2024-03-25' },
    { title: 'Canvas 基础', link: '/css/canvas-basic', tagName: 'CSS', createDate: '2024-03-20' },
    { title: 'JsCode 更新', link: '/javascript/wapper-for-websocket-vue3', tagName: 'JS Code', createDate: '2024-03-19' },
    { title: '令人惊讶的颜色', link: '/css/amazing-color', tagName: 'CSS', createDate: '2024-03-19' },
    { title: '修复 Naive UI 中的潜在的样式冲突', link: '/fix/fix-naive-css-bug', tagName: 'Error Fix', createDate: '2024-03-18' },
    { title: 'My Vitesse', link: '/vue3/my-vitesse', tagName: 'Vue3', createDate: '2024-03-16', tagStatus: 'BETA' },
    { title: '纵轴进度条', link: '/css/vertical-progress-bar', tagName: 'CSS', createDate: '2024-03-15' },
    { title: '图片设计', link: '/css/picture-design', tagName: 'CSS', createDate: '2024-03-15' },
    { title: 'mockJs 基本使用', link: '/3-party-library/how-to-use-mockjs', tagName: 'mockJs', createDate: '2024-03-14' },
    { title: '插件: pinia-plugin-persistedstate', link: '/vue3/pinia-plugin-persistedstate', tagName: 'Vue3', createDate: '2024-03-13' },
    { title: '熊家菜谱(新增利村牛肉)', link: '/ordinary/cook-menu', tagName: 'Ordinary', createDate: '2024-03-13', tagStatus: 'UPDATED' },
    { title: 'vitepress-deploy-in-github-page', link: '/config/vitepress-deploy-in-github-page', tagName: 'Config', createDate: '2024-03-12' },
  ],
}

export const allMonthShort: Month[] = ['DEC', 'NOV', 'OCT', 'SEPT', 'AUG', 'JUL', 'JUN', 'MAY', 'APRI', 'MAR', 'FEB', 'JAN']

const showNum: number = 10

let res: number = showNum
let list: Link[] = []
allMonthShort.map(mon => {
  let data: Link[] = markData[mon] || []
  if (res !== 0) {
    if (data.length > res) {
      list.push(...data.slice(0, res))
      res = 0
    } else {
      list.push(...data)
      res -= data.length
    }
  }
})

console.log(list)