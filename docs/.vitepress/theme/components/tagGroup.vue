<script lang="ts" setup>
import type { PropType } from "vue";
import type { TagGroup } from "../../utils/createTag";
import { getTagNums, type TagNums } from "../../constant/2024-mark-link";
import { type TagName } from "../../utils/createTag";

defineProps({ tagGroups: { type: Object as PropType<Array<TagGroup>> } });

const hostpath = "/vitepress-til";
const tagNums: TagNums = getTagNums();
</script>

<template>
  <div v-for="group in tagGroups" class="tag-group">
    <template v-for="(item, index) in group.items">
      <span class="tag-item">
        <a :href="`${hostpath}${item.link}`">
          {{ item.title }}
        </a>
        <sup>{{ tagNums[item.title as TagName] }}</sup>
      </span>
      <Badge
        v-if="index === group.items.length - 1"
        type="tip"
        :text="group.groupName"
      />
    </template>
  </div>
</template>

<style lang="scss">
.tag-group {
  @apply px-0 py-[8px];
  .tag-item {
    @apply relative mr-[12px];

    &:before {
      content: "";
      @apply w-full absolute left-auto right-0 top-auto bottom-0 border-b-[1px] border-b-black;
      transition: all 336ms cubic-bezier(0.48, 0.04, 0.52, 0.96);

      &:hover {
        @apply w-0;
      }
    }

    &:after {
      content: "";
      @apply w-0 absolute left-0 top-auto bottom-0 border-b-[1px] border-b-[#2c9678];
      transition: all 336ms cubic-bezier(0.48, 0.04, 0.52, 0.96) 200ms;

      &:hover {
        @apply w-full;
      }
    }
  }

  a {
    text-decoration: none;
    &:hover {
      color: #2c9678;
    }
  }
}

.dark {
  a {
    &:hover {
      color: #2c9678 !important;

      transition: all 336ms cubic-bezier(0.48, 0.04, 0.52, 0.96) 200ms;
    }
  }

  .tag-item {
    @apply relative mr-[12px];

    &:before {
      @apply border-b-white;
    }

    &:after {
      @apply border-b-[#2c9678];
    }
  }
}
</style>
