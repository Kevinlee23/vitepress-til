# 博客类应用中点击查看更多的设计

## 效果预览

![see-more](/images/see-more.gif)

## 实现

```vue
<template>
  <div class="relative w-full px-[30px] rounded-[20px] overflow-hidden">
    <div class="mb-[10px] font-medium text-[20px]">
      {{ model.title }}
    </div>
    <div class="mb-[20px]" :class="[isMobile ? 'text-[14px]' : 'text-[16px]']">
      {{ model.content }}
    </div>
    <div
      class="flex flex-col gap-y-[10px]"
      :style="{ maxHeight: showMore ? 'max-content' : maxHeight + 'px' }"
    >
      <r-image
        v-for="(item, index) in model.images.split(',')"
        class="w-full"
        :key="index"
        :src="item"
      ></r-image>
    </div>

    <div v-if="!showMore" class="read-more">
      <div class="more-title" @click="showMore = true">展开阅读全文</div>
    </div>
  </div>
</template>

<script>
const route = useRoute();
const id = route.params.id;
const maxHeight = ref(300);
const model = ref();

// 拉取数据
getInfo(id).then(async (res) => {
  model.value = res.data;
  // 只有一张图片时不做省略
  if (model.value.images.split(",").length === 1) {
    showMore.value = true;
  }

  // 获取第一张图片的高度
  let { execute } = useImage({ src: model.value.images.split(",")[0] });
  let imgLoading = await execute();
  if (imgLoading === undefined) {
    imgLoading = new Image();
  }

  let srcWidth = imgLoading?.width;
  let srcHeight = imgLoading?.height;

  // 在第一张图片高度的基础上+100px, 作为可见内容的高度
  maxHeight.value =
    Math.floor((srcHeight * (props.isMobile ? 355 : 798)) / srcWidth) + 100;
});
</script>

<style lang="scss" scoped>
.read-more {
  @apply absolute bottom-0 w-full text-center z-[80];
  background-image: linear-gradient(
    0deg,
    #fff,
    70px,
    rgba(255, 255, 255, 0) 100%
  );

  .more-title {
    @apply inline-block mt-[80px] py-[25px] text-[#dd5800] cursor-pointer;
  }
}
</style>
```
