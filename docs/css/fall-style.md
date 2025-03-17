# 简单的瀑布流布局实现

## 预览

![layout](/images/fall-style.gif)

## 参数设置

```vue
<script setup>
const props = defineProp({
  col: { type: number, default: 3 },
  gap: { type: number, default: 30 }, // 项目之间的间距
  innerPadding: { type: number, defalut: 20 }, // 项目的内边距
  textContent: { type: number, default: 0 }, // 如果项目还有固定的文字行，填写高度
});

const state = reative({
  isFinish: false, // 是否结束瀑布流
  page: 1, // 分页页数
  pageSize: 3, // 每页项目数
  cardWidth: 0, // 瀑布流卡片宽度
  cardList: [], // 项目 list
  cardPos: [], // 项目位置
  colHeight: new Array(props.col).fill(0), // 每列的高度
});
</script>
```

## 模拟数据拉取

```js
const mockData = require("...");

const loading = ref(false);
const request = (page, pageSize) => {
  loading.value = true;
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = mockData.slice((page - 1) * pageSize, page * pageSize);

      loading.value = false;
      resolve(data);
    }, 1000);
  });
};

const getCardList = async (page, pageSize) => {
  if (state.isFinish) return;
  let list = await request(page, pageSize);

  state.page++;
  if (!list.length) {
    state.isFinish = true;
    return;
  }

  // 这里使用了 @vue/use 中的方法来获取图片原始尺寸
  // 将图片原始尺寸记录下来，后面计算图片缩略后高度用到
  // 定宽，缩略后高度 = 原始高度 / 原始宽度 * 定宽
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let { execute } = useImage({ src: item.picSrc });
    let loading = await execute();
    if (loading === undefined) {
      loading = new Image();
    }

    item.width = loading?.width;
    item.height = loading?.height;
  }

  state.cardList = [...state.cardList, ...list];
  computedCardPos(list); // 根据请求的数据计算卡片位置
};
```

## 核心：计算项目的位置

```js
// 最小列、最大列计算
const minCol = computed(() => {
  let minIndex = -1;
  let minHeight = Infinity;

  state.colHeight.map((item, index) => {
    if (item < minHeight) {
      minHeight = item;
      minIndex = index;
    }
  });

  return { minIndex, minHeight };
});
const maxCol = computed(() => {
  let maxHeight = 0;
  state.colHeight.map((item) => {
    maxHeight = Math.max(item, maxHeight);
  });

  return maxHeight;
});

// 计算卡片的摆放位置
const computedCardPos = (list) => {
  list.forEach((item, index) => {
    // 原始高度 / 原始宽度 = 缩略后高度 / 缩略后宽度
    const cardHeight =
      Math.floor(
        (item.height * (state.cardWidth - innerPadding)) / item.width
      ) + props.textContent;

    // 第一行
    if (index < props.col && state.cardList.length < state.pageSize) {
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x: index % props.col !== 0 ? index * (state.cardWidth + props.gap) : 0,
        y: 0,
      });
      state.colHeight[index] = cardHeight + props.gap;
    } else {
      // 后续增补进来的项目
      // 获取最短的那一列，向那一列增加项目
      const { minIndex, minHeight } = minCol.value;
      state.cardPos.push({
        width: state.cardWidth,
        height: cardHeight,
        x:
          minIndex % props.col !== 0
            ? minIndex * (state.cardWidth + props.gap)
            : 0,
        y: minHeight,
      });
      state.colHeight[minIndex] += cardHeight + props.gap;
    }
  });
};
```

## 滚动检测

```js
const { scrollEl } = usePageScroll();
// 如果页面有页脚，加上页脚的 offset
const { arrivedState } = useScroll(scrollEl, {
  offset: { bottom: bottomOffset },
});

const { bottom } = toRefs(arrivedState);
watch(bottom, () => {
  if (bottom.value && !state.isFinish) {
    !loading.value && getCardList(state.page, state.pageSize);
  }
});
```

## 初始化

```js
let containerWidth;
onMounted(() => {
  containerWidth = listEl.value.clientWidth;
  state.cardWidth = Math.floor(
    (containerWidth - props.gap * (props.col - 1)) / props.col
  );

  getCardList(1, state.pageSize);
});
```

## HTML 结构

```html
<div class="relative" :style="{ height: `${maxCol}px` }" ref="listEl">
  <div class="w-full relative">
    <template v-if="state.cardWidth">
      <div
        v-for="(item, index) in state.cardList"
        :key="item.id"
        class="card-container p-[30px] bg-white rounded-[20px] absolute box-border"
        :style="{
            width: `${state.cardPos[index].width}px`,
            height: `${state.cardPos[index].height}px`,
            top: `${state.cardPos[index].y}px`,
            left: `${state.cardPos[index].x}px`
          }"
      ></div
    ></template>
  </div>
</div>
```