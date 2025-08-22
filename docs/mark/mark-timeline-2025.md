---
outline: deep
noComment: true
---

<script lang="ts" setup>
import { ref } from 'vue'
import MarkPage from '../.vitepress/theme/views/markPage.vue'
import TagGroupPage from '../.vitepress/theme/components/tagGroup.vue'
import TagFilter from '../.vitepress/theme/components/tagFilter.vue'
import { type TagGroup, type TagItem, type Link, createTag } from '../.vitepress/utils/createTag'
import { markDate, markData } from '../.vitepress/constant/2025-mark-link.ts'

/* 五月数据 */
const mayDate:number[] = markDate.MAY
const mayLink:Link[] = markData.MAY
/* 六月数据 */
const junDate:number[] = markDate.JUN
const junLink:Link[] = markData.JUN
// /* 七月数据 */
const julyDate: number[] = markDate.JUL
const julyLink: Link[] = markData.JUL
/* 八月数据 */
const augDate: number[] = markDate.AUG
const augLink: Link[] = markData.AUG
// /* 九月数据 */
// const septDate: number[] = markDate.SEPT
// const septLink: Link[] = markData.SEPT
// /* 十月数据 */
// const octDate: number[] = markDate.OCT
// const octLink: Link[] = markData.OCT
// /* 十一月数据 */
// const novDate: number[] = markDate.NOV
// const novLink: Link[] = markData.NOV
// /* 十二月数据 */
// const decDate: number[] = markDate.DEC
// const decLink: Link[] = markData.DEC

// 标签组
const tagGroups: TagGroup[] = createTag()
// 一维标签组，将所有类型的标签组压平
let tagsMap: TagItem[] = []
tagGroups.map(group => {
  group.items.map(item => tagsMap.push(item))
})

const filterTag = ref<string>('')
</script>

# 归档

2025 年笔记

## 标签

<TagGroupPage :tagGroups="tagGroups" />

## 2025

<TagFilter :filterTag="filterTag" @update="(value) => filterTag = value" />

<!-- ### 十二月 -->

<!-- <MarkPage :filterValue="filterTag" :monthLink="decLink" :markedDate="decDate" :tagsMap="tagsMap" :year="2024" :month="12" :length="31" /> -->

<!-- ### 十一月 -->

<!-- <MarkPage :filterValue="filterTag" :monthLink="novLink" :markedDate="novDate" :tagsMap="tagsMap" :year="2024" :month="11" :length="30" /> -->

<!-- ### 十月 -->

<!-- <MarkPage :filterValue="filterTag" :monthLink="octLink" :markedDate="octDate" :tagsMap="tagsMap" :year="2024" :month="10" :length="31" /> -->

<!-- ### 九月 -->

<!-- <MarkPage :filterValue="filterTag" :monthLink="septLink" :markedDate="septDate" :tagsMap="tagsMap" :year="2024" :month="9" :length="30" /> -->

### 八月

<MarkPage :filterValue="filterTag" :monthLink="augLink" :markedDate="augDate" :tagsMap="tagsMap" :year="2024" :month="8" :length="31" />

### 七月

<MarkPage :filterValue="filterTag" :monthLink="julyLink" :markedDate="julyDate" :tagsMap="tagsMap" :year="2024" :month="7" :length="31" />

### 六月

<MarkPage :filterValue="filterTag" :monthLink="junLink" :markedDate="junDate" :tagsMap="tagsMap" :year="2025" :month="6" :length="30" />

### 五月

<MarkPage :filterValue="filterTag" :monthLink="mayLink" :markedDate="mayDate" :tagsMap="tagsMap" :year="2025" :month="5" :length="31" />

