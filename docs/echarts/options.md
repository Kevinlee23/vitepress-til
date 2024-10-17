---
outline: deep
---

# 常用配置速查

## xAxis / yAxis

`x | y` 轴配置

- `type`: 坐标轴类型 (`value` 表示为数值轴)
- `axisTick: {}`: 坐标轴刻度相关设置
- `axisLine: {}`: 坐标轴轴线相关设置
- `axisPointer: {}`: 坐标轴指示器配置项
- `boundaryGap: [0, 1] | Boolean`: 坐标轴两边留白策略
- `data: []`: 类目数据，在类目轴 `(type: 'catagory')` 中有效

## series

数据形状配置

### line

- `{ type: 'line' }`
- `name`: 线段名
- `xAxisIndex`: `x` 轴的 `index`, 在单个图标实例存在多个 `x` 轴的时候有用
- `yAxisIndex`: `y` 轴的 `index`, 在单个图标实例存在多个 `y` 轴的时候有用
- `smooth`: 是否开启平滑处理
- `emphasis: {}`: 高亮状态
- `select: {}`: 选中状态
- `markPoint: {}`: 图标记点
- `endLabel: {}`: 折线端点的标签
- `labelLayout: {}`: 标签的统一布局配置
  - `.moveOverlap: 'shiftX' | 'shiftY`: 标签重叠时是否挪动标签位置（水平/垂直方向依次位移）
- `data: []`: 数据

### bar

- `{ type: 'bar' }`
- `label: {} | String`: 柱状图标签
- `data: [{ stack: '90%' }]`: 堆叠柱状图
- `data: [{ stack: 'typeName'}]`: 堆叠归属某一类
- `barWidth`: 柱状图宽度
- `markPoint: {}`: 图标记点
- `markLine: {}`: 图标记线

### pie

- `{ type: 'pie' }`
- `radius: String | []`: 为字符串时是实心饼图，为二元组时表示内外半径的环形饼图
- `center: []`: 圆心坐标（横坐标，纵坐标）
- `padAngle (0-360)`: 扇区之间的间隔
- `minShowLabelAngle (0-369)`: 小于这个角度的扇区，不显示标签
- `startAngle, endAngle`: 起止弧度
- `selectMode`: 选择模式
- `select: {}`: 选择模式开启后的选择样式

### radar

- `{ type: 'radar' }`
- `data: [{ symbol: String, symbolSize: Number }]`: 标记符号
- `data: [{ lineStyle: {} }]`: 连线样式

`option.radar`:

```json
{
  "indicator": [{ "name": "String", "max": "Number" }],
  "shape": "polygon | circle",
  "splitArea": {} // 划分区域
}
```

### map

- `{ type: 'map' }`
- `roam`: 是否可拖动和放缩
- `map`: 注册的地图名称
- `nameMap: {}`: 自定义地图的名称映射

## 数据集: dataset

### 常用形式

```js
const option = {
  dataset: [
    {
      // 二维数组形式
      source: [
        ["product", "2015", "2016", "2017"],
        ["Matcha Latte", 43.3, 85.8, 93.7],
        ["Milk Tea", 83.1, 73.4, 55.1],
        ["Cheese Cocoa", 86.4, 65.2, 82.5],
        ["Walnut Brownie", 72.4, 53.9, 39.1],
      ],
    },
    {
      // 对象数组形式
      source: [
        { product: "Matcha Latte", 2015: 43.3, 2016: 85.8, 2017: 93.7 },
        { product: "Milk Tea", 2015: 83.1, 2016: 73.4, 2017: 55.1 },
        { product: "Cheese Cocoa", 2015: 86.4, 2016: 65.2, 2017: 82.5 },
        { product: "Walnut Brownie", 2015: 72.4, 2016: 53.9, 2017: 39.1 },
      ],
    },
  ],
};
```

### dimension

> 维度

在二维数组中，每一列就是一个维度:

```js
const option = {
  dataset: {
    dimension: [
      { name: "product", type: "ordinal" },
      { name: "2015", type: "ordinal" },
      { name: "2016", type: "ordinal" },
      { name: "2017", type: "ordinal" },
    ],
  },
};
```

`type` 可以是:

- `number`
- `ordinal`: 对于类目，文本这些 `string` 类型的数据，如果需要能子啊数轴上使用，必须是 `ordinal`
- `time`
- `float`
- `int`

### encode

> 数据映射

`encode`: `{ x: 0, y: 1, tooltip: [0, 1] }`

当使用 `dimensions` 给维度定义名称后，可以直接引用名称:

```json
{
  "series": {
    "type": "xxx",
    "dimensions": ["date", "open", "close", "highest", "lowest"],
    "encode": {
      "x": "date",
      "y": ["open", "close", "highest", "lowest"]
    }
    // encode 还支持: tooltip, seriesName, itemId, itemName
  }
}
```

[配置查阅: encode](https://echarts.apache.org/zh/option.html#series-line.encode)

### 多个 dataset 引用

```js
var option = {
  dataset: [
    {
      // 序号为 0 的 dataset。
      source: [],
    },
    {
      // 序号为 1 的 dataset。
      source: [],
    },
    {
      // 序号为 2 的 dataset。
      source: [],
    },
  ],
  series: [
    {
      // 使用序号为 2 的 dataset。
      datasetIndex: 2,
    },
    {
      // 使用序号为 1 的 dataset。
      datasetIndex: 1,
    },
  ],
};
```

### transform

> 数据转换

`transform: outData = f(inputData)`

其中, `f` 可以是:

- `filter`
- `sort`
- `regression`
- `boxplot`
- `cluster`
- `aggregate(todo)`

`transform` 是依托 `dataset` 实现的，用于生成一个新的 `dataset`, 常用于筛选，过滤或者排序等, 比如:

```js
const option = {
  dataset: [
    {
      source: [],
    },
    {
      // datasetIndex: 1
      transform: {
        type: "filter",
        config: { dimension: "Year", value: 2012 },
      },
    },
  ],
};
```

[transform 参考](https://echarts.apache.org/handbook/zh/concepts/data-transform)

## 多 Y 轴

```json
{
  "yAxis": [
    {
      "type": "value",
      "name": "label01",
      "position": "left", // 位置
      "axisLine": {}, // 坐标轴轴线相关设置
      "axisLabel": {} // 坐标轴标签相关设置
    }
    // ...
  ],
  "legend": {
    "data": ["label01", "label02", "label03"]
  },
  "series": [
    { "name": "label01", "type": "type1" },
    { "name": "label02", "type": "type2", "yAxisIndex": 0 }, // yAxisIndex 表示使用的 y 轴的 index
    { "name": "label03", "type": "type3" }
  ]
}
```

## 变形动画

从两个不同的 `series` 切换时的动画效果:

- `series`:
  - `.animationDurationUpdate`: 数据更新动画的时长
  - `.universalTransition: Boolean | {}`: 全局过渡动画开关

```js
const barOption = {}; // 柱状图配置
const mapOption = {}; // 地图配置

let currentOption = mapOption;
myChart.setOption(mapOption);

// 随时间切换配置
setInterval(function () {
  currentOption = currentOption === mapOption ? barOption : mapOption;
  myChart.setOption(currentOption, true);
}, 4000);
```

初始动画时长: `animationDuration`

## visualMap

> 视觉映射组件

分为连续型 `(continuous)` 和离散型 `(piecewise)`

是否显示 `visualMap-piecewise` 组件: `show`
维度选择: `dimension`, 二维数据下 `(xy)`, 默认选取最后一个维度 `(y)`, `0 => x, 1 => y`
系列数据: `seriesIndex`, 默认选取所有系列

`piecewise` 型:

- `pieces: []`: 分片, `dimension: 0, { lte: 6, color: '#000'}` <=> `x` 轴点数小于等于 `6` 时, `color: #000`
- 比较符号: `lt, gt, lte, gte, "="`

`continuous` 型:

- `{ type: continuous, min: 0, max: 400 }` <=> `y` 的数据最小为 `0`, 最大为 `400`
- `{ type: dimension: 0, min: 0, max: dataList.length-1 }` <=> 覆盖 `x` 轴所有数据点

## dataZoom

> 数据区域缩放

- `type: 'inside' | 'slider'`: 内置型 | 滑动条形
- `start(end)`: 起止（百分比）
- `startValue(endValue)`: 起止（数值）
- `axAxisIndex(yAxisIndex): [] | number`: 区域缩放组件控制的 `x,y` 轴 `index`
- `minSpan(maxSpan)`: 限制窗口最小(最大)百分比
- `minValueSpan(maxValueSpan)`: 限制窗口最小（最大）值