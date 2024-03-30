---
outline: deep
---

<script setup>
import { ref, computed, onMounted } from 'vue'

/* 三月数据 */
const MAR = ref(new Array(31).fill(0))
const marMax = ref(0)
const marDate = [12, 13, 13, 14, 15, 15, 16, 18, 19, 20, 20, 25, 26, 26, 26, 26, 27, 27, 27, 27, 27, 28, 28, 28, 28, 30]

/**
 * 月份数据转化成 color: 
 * 深灰色(不属于这个月的数据)
 * 浅灰色(文章数为 0 的日期)
 * 浅绿(小于每日平均文章数且不等于 0 的日期)
 * 次绿(大于每日平均文章数的日期)
 * 深绿(最大文章数的日期)
 */
const monColor = computed(() => {
  return (firstDay, lastDay, MON, monDate, monMax) => {
    const fDay = new Date(firstDay).getDay()
    const prefixLength = fDay === 0 ? 6 : fDay - 1
    const prefixArr = new Array(prefixLength).fill('#c2c4c3')

    const lDay = new Date(lastDay).getDay()
    const suffixLength = lDay === 0 ? 0 : 7 - lDay
    const suffixArr = new Array(suffixLength).fill('#c2c4c3')

    const arr = new Array(31).fill(null)
    const fillDay = (new Set(monDate)).size
    MON.map((num, index) => {
      if (num === 0) {
        arr[index] = '#ebedf0'
      } else if (num === monMax) {
        arr[index] = '#407d53'
      } else if (num > monDate.length / fillDay) {
        arr[index] = '#83cbac'
      } else {
        arr[index] = '#c6dfc8'
      }
    })
    
    return [...prefixArr, ...arr, ...suffixArr]
  }
})

// 月份初始化
const monthInit = (MON, monMax) => {
  marDate.map(day => {
    MON.value[day-1]++
  })
  MON.value.map(num => {
    monMax.value = Math.max(monMax.value, num)
  })
}

onMounted(() => {
  monthInit(MAR, marMax) // 初始化三月
})
</script>

# 归档

记录从 2024 年 3 月 12 日建站后的笔记

## 标签

[Javascript](/javascript/event-loop) &nbsp;
[JS Code](/javascript/wapper-for-websocket-vue3) &nbsp;
[Typescript](/typescript/basic-object-and-function) &nbsp;
[CSS](/css/gradient-color) &nbsp;
[类型编程](/typescript/internal-tool-type) &nbsp;
[HTTP](/http/HTTP-request-and-response-header) <Badge type="tip" text="前端基础" />

[Vue3](/vue3/get-component-instance-in-setup) &nbsp;
[React](/react/avoid-mutation) <Badge type="tip" text="框架" />

[Git](/git/01-git-pull-repository) &nbsp;
[SQL](/sql/my-sql-single-table-operation) &nbsp;
[OSS](/oss/get-sts) <Badge type="tip" text="工具" />

[mockJs](/3-party-library/how-to-use-mockjs) <Badge type="tip" text="第三方库" />

[Config](/config/off-hibernate) &nbsp;
[Error Fix](/fix/nvm-president-problem-for-mac) <Badge type="tip" text="杂项" />

[Ordinary](/ordinary/What-marriage-brings-to-me) <Badge type="tip" text="杂谈" />

## 2024

### 三月

<div :class="$style['block-container']">
  <div
    v-for="item in monColor('2024-03-01', '2024-03-31', MAR, marDate, marMax)"
    :class="$style.block" :style="{backgroundColor: item}"
  >
  </div>
</div>

[tailwind 常用写法](/css/tailwind-basic) <Badge type="warning" text="beta" /> `/` [CSS](/css/gradient-color) `/` `2024-03-30`

[Vite-config](/vue3/vite-config) `/` [Vue3](/vue3/get-component-instance-in-setup) `/` `2024-03-28`

[JSDoc 小记](/javascript/JSDoc) `/` [Javascript](/javascript/event-loop) `/` `2024-03-28`

[页面特殊事件](/javascript/special-event) `/` [Javascript](/javascript/event-loop) `/` `2024-03-28`

[oss-分片上传](/oss/part-upload) `/` [OSS](/oss/get-sts) `/` `2024-03-28`

`vite 配置代理` <Badge type="danger" text="merged" /> `/` [Vue3](/vue3/get-component-instance-in-setup) `/` `2024-03-27`

[读取加密文件](/oss/read-encryption-file) `/` [OSS](/oss/get-sts) `/` `2024-03-27`

[列举文件](/oss/list-object) `/` [OSS](/oss/get-sts) `/` `2024-03-27`

[删除文件](/oss/delete-object) `/` [OSS](/oss/get-sts) `/` `2024-03-27`

[客户端直传文件](/oss/client-direct-upload) `/` [OSS](/oss/get-sts) `/` `2024-03-27`

[生成客户端对象](/oss/create-client) `/` [OSS](/oss/get-sts) `/` `2024-03-26`

[获取 STS 临时凭证](/oss/get-sts) `/` [OSS](/oss/get-sts) `/` `2024-03-26`

[获取服务器时间](/javascript/get-server-time) `/` [JS Code](/javascript/wapper-for-websocket-vue3) `/` `2024-03-26`

[vue3 中的类型标注](/vue3/vue3-and-typescript) `/` [Vue3](/vue3/get-component-instance-in-setup) `/` `2024-03-26`

[构建 monorepo](/config/create-monorepo) `/` [Config](/config/off-hibernate) `/` `2024-03-25`

[Canvas 基础](/css/canvas-basic) `/` [CSS](/css/gradient-color) `/` `2024-03-20`

[JsCode 更新](/javascript/wapper-for-websocket-vue3) `/` [JS Code](/javascript/wapper-for-websocket-vue3) `/` `2024-03-20`

[令人惊讶的颜色](/css/amazing-color) `/` [CSS](/css/gradient-color) `/` `2024-03-19`

[修复 Naive UI 中的潜在的样式冲突](/config/fix-naive-css-bug) `/` [Config](/config/off-hibernate) `/` `2024-03-18`

[My Vitesse](/vue3/my-vitesse) <Badge type="warning" text="beta" /> `/` [Vue3](/vue3/get-component-instance-in-setup) `/` `2024-03-16`

[纵轴进度条](/css/vertical-progress-bar) `/` [CSS](/css/gradient-color) `/` `2024-03-15`

[图片设计](/css/picture-design) `/` [CSS](/css/gradient-color) `/` `2024-03-15`

[mockJs 基本使用](/3-party-library/how-to-use-mockjs) `/` [mockJs](/3-party-library/how-to-use-mockjs) `/` `2024-03-14`

[pinia-plugin-persistedstate](/vue3/pinia-plugin-persistedstate) `/` [Vue3](/vue3/get-component-instance-in-setup) `/` `2024-03-13`

[熊家菜谱(新增利村牛肉)](/ordinary/cook-menu) `/` [Ordinary](/ordinary/What-marriage-brings-to-me) `/` `2024-03-13`

[vitepress-deploy-in-github-page](/config/vitepress-deploy-in-github-page) `/` [Config](/config/off-hibernate) `/` `2024-03-12`

<style module>
.block-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  margin-top: 10px;
  width: 108px;
}

.block {
  width: 12px;
  height: 12px;
}
</style>
