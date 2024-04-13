<script lang="ts" setup>
import { type PropType } from "vue";
import MonthDisplay from "../components/monthDisplay.vue";
import MarkLink from "../components/markLink.vue";
import { type TagItem, type Link } from "../../utils/createTag";

defineProps({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  length: { type: Number, required: true },
  monthLink: { type: Object as PropType<Array<Link>>, required: true },
  monthDate: { type: Array<number>, required: true },
  markedDate: { type: Array<number>, required: true },
  tagsMap: { type: Object as PropType<Array<TagItem>>, required: true },
});
</script>

<template>
  <!-- 月份笔记监视视图 -->
  <MonthDisplay
    :markedDate="monthDate"
    :year="year"
    :month="month"
    :length="length"
  />

  <MarkLink
    v-for="link in monthLink"
    :model="link"
    :tagsMap="tagsMap"
  ></MarkLink>
</template>
