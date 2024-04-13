<script lang="ts" setup>
import { type PropType, computed } from "vue";
import { type TagItem, tagStatusMap as statusMap } from "../../utils/createTag";

interface Link {
  title: string;
  link: string;
  tagName: string;
  createDate: string;
}

type StautsItem = "BETA" | "MERGED" | "UPDATED" | "";

const props = defineProps({
  model: { type: Object as PropType<Link>, required: true },
  tagsMap: { type: Object as PropType<Array<TagItem>>, required: true },
  tagStatus: { type: String as PropType<StautsItem>, default: "" },
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
      v-if="tagStatus"
      :type="statusMap[tagStatus].type"
      :text="statusMap[tagStatus].text"
    />
    /
    <a :href="`${hostpath}${tagLink?.link}`" target="_blank">
      {{ model.tagName }}
      <span class="link-icon">↗</span>
    </a>
    /
    <span class="link-create">{{ model.createDate }}</span>
  </div>
</template>
<style lang="scss">
.link-card {
  padding: 8px 0px;

  .link-icon {
    position: absolute;
    top: -4px;
    right: 0px;
    display: none;
    font-size: 12px;
  }

  a {
    position: relative;
    padding: 4px;
    font-size: 14px;
    border-radius: 8px;
    text-decoration: none;
    &:hover {
      padding-right: 8px;
      color: #2c9678;
      background-color: rgba(142, 150, 170, 0.14);

      .link-icon {
        display: inline;
      }
    }
  }
}

.link-create {
  padding: 3px 6px;
  font-size: 12px;
  border-radius: 4px;
  color: rgb(52, 81, 178);
  background-color: rgba(142, 150, 170, 0.14);
}
</style>
