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
- `markPoint: {}`: 图标记点
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

## encode

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
  }
}
```

[配置查阅](https://echarts.apache.org/zh/option.html#series-line.encode)

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
