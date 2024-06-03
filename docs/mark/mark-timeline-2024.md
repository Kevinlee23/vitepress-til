---
outline: deep
---

<script lang="ts" setup>
import MarkPage from '../.vitepress/theme/views/markPage.vue'
import TagGroupPage from '../.vitepress/theme/components/tagGroup.vue'
import { type TagGroup, type TagItem, type Link, createTag } from '../.vitepress/utils/createTag'
import { markDate, markData } from '../.vitepress/constant/2024-mark-link.ts'

/* 三月数据 */
const marDate: number[] = markDate.MAR 
const marLink: Link[] = markData.MAR
/* 四月数据 */
const apriDate:number[] = markDate.APRI
const apriLink: Link[] = markData.APRI
/* 五月数据 */
const mayDate:number[] = markDate.MAY
const mayLink:Link[] = markData.MAY
/* 六月数据 */
const junDate:number[] = markDate.JUN
const junLink:Link[] = markData.JUN

// 标签组
const tagGroups: TagGroup[] = createTag()
// 一维标签组, 将所有类型的标签组压平
let tagsMap: TagItem[] = []
tagGroups.map(group => {
  group.items.map(item => tagsMap.push(item))
})
</script>

# 归档

记录从 `2024 年 3 月 12 日` 建站后的笔记

## 标签

<TagGroupPage :tagGroups="tagGroups" />

## 2024

### 六月

<MarkPage :monthLink="junLink" :markedDate="junDate" :tagsMap="tagsMap" :year="2024" :month="6" :length="30" />

### 五月

<MarkPage :monthLink="mayLink" :markedDate="mayDate" :tagsMap="tagsMap" :year="2024" :month="5" :length="31" />

### 四月

<MarkPage :monthLink="apriLink" :markedDate="apriDate" :tagsMap="tagsMap" :year="2024" :month="4" :length="30" />

### 三月

<MarkPage :monthLink="marLink" :markedDate="marDate" :tagsMap="tagsMap" :year="2024" :month="3" :length="31" />
