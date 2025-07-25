<script lang="ts" setup>
import { type PropType, computed } from "vue";
import {
  type TagItem,
  type Link,
  tagStatusMap as statusMap,
} from "../../utils/createTag";

const props = defineProps({
  model: { type: Object as PropType<Link>, required: true },
  tagsMap: { type: Object as PropType<Array<TagItem>>, required: true },
});

const hostpath = "/vitepress-til";
const tagLink = computed(() =>
  props.tagsMap.find((item) => item.title === props.model.tagName)
);
</script>

<template>
  <div class="link-card">
    <a :href="`${hostpath}${model.link}`" target="_blank">
      {{ model.title }}
      <span class="link-icon">↗</span>
    </a>
    <Badge
      v-if="model.tagStatus"
      :type="statusMap[model.tagStatus].type"
      :text="statusMap[model.tagStatus].text"
    />
    /
    <a :href="`${hostpath}${tagLink?.link ?? '/'}`" target="_blank">
      {{ model.tagName }}
      <span class="link-icon">↗</span>
    </a>
    /
    <span class="link-create">{{ model.createDate }}</span>
  </div>
</template>
<style lang="scss">
.link-card {
  @apply px-0 py-[8px];

  .link-icon {
    @apply absolute top-[-4px] right-0 text-[12px] hidden;
  }

  a {
    @apply relative p-[4px] text-[14px] rounded-[8px] no-underline;
    &:hover {
      @apply pr-[8px] bg-[#eeeeee];

      .link-icon {
        @apply inline;
      }
    }
  }
}

.link-create {
  @apply px-[6px] py-[3px] text-[12px] rounded-[4px] text-[#2c9678] bg-[#eeeeee];
}

.dark {
  .link-card {
    a {
      &:hover {
        color: #2c9678 !important;
      }
    }
  }

  .link-create {
    @apply text-white bg-[#2c9678];
  }
}
</style>
