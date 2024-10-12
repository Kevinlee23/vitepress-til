<script lang="ts" setup>
import { type PropType, computed } from "vue";
import MonthDisplay from "../components/monthDisplay.vue";
import MarkLink from "../components/markLink.vue";
import { type TagItem, type Link } from "../../utils/createTag";

const props = defineProps({
  year: { type: Number, required: true },
  month: { type: Number, required: true },
  length: { type: Number, required: true },
  monthLink: { type: Object as PropType<Array<Link>>, required: true },
  markedDate: { type: Array<number>, required: true },
  tagsMap: { type: Object as PropType<Array<TagItem>>, required: true },
  filterValue: { type: String, default: "" },
});

const filterLink = computed<Array<Link>>(() => {
  if (props.filterValue) {
    return props.monthLink.filter((link) => {
      if (link.tagStatus === props.filterValue) {
        return link;
      }
    });
  } else {
    return props.monthLink;
  }
});
</script>

<template>
  <!-- 月份笔记监视视图 -->
  <MonthDisplay
    :markedDate="markedDate"
    :year="year"
    :month="month"
    :length="length"
  />

  <MarkLink
    v-for="link in filterLink"
    :model="link"
    :tagsMap="tagsMap"
  ></MarkLink>

  <div
    class="w-full py-[10px] border-b-[1px] border-[#666] border-dashed"
  ></div>
</template>
