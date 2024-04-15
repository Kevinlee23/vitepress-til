<script lang="ts" setup>
import type { PropType } from "vue";
import type { TagGroup } from "../../utils/createTag";

defineProps({
  tagGroups: { type: Object as PropType<Array<TagGroup>> },
});

const hostpath = "/vitepress-til";
</script>

<template>
  <div v-for="group in tagGroups" class="tag-group">
    <template v-for="(item, index) in group.items">
      <a class="tag-item" :href="`${hostpath}${item.link}`">
        {{ item.title }}
      </a>
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
  padding: 8px 0;
  .tag-item {
    padding-right: 12px;
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
      color: white;
    }
  }
}
</style>
