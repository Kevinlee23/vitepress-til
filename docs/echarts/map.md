# Echarts - 地图导入

[地图数据](https://github.com/tower1229/echarts-world-map-jeojson)

```js
// keyJson: {"China": "中国"}
const data = Object.keys(keyJson).map((key) => {
  return { name: key, value: 10 };
});

// 这里注册的名字要和 series.map 对应上
echarts.registerMap("Map", mapJson);

const option = {
  title: {
    text: "Wolrd Map",
    left: "right",
  },
  // 做地图颜色渲染
  visualMap: {
    show: false,
    min: 0,
    max: 10,
    color: ["#31369520"],
    // inRange.color: [min-color, lower-color, ..., higher-color, max-color]
    // text: [maxText, minText]
    // calcuable: true
  },
  toolbox: {
    show: true,
    left: "left",
    top: "top",
    feature: {
      restore: {},
      saveAsImage: {},
    },
  },
  series: [
    {
      name: "World Map",
      // label format
      label: {
        formatter: (params) => {
          return keyJson[params.name];
        },
      },
      type: "map",
      roam: true, // 是否可以拖动和放缩
      map: "Map",
      // 选中状态
      select: {
        label: {
          color: "white",
        },
        itemStyle: {
          areaColor: "#313695",
        },
      },
      // hover 状态
      emphasis: {
        label: {
          color: "white",
        },
        itemStyle: {
          areaColor: "#313695",
        },
      },
      data,
    },
  ],
};
```
