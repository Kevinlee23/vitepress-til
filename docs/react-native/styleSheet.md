# RN(React Mative) 中样式的写法

`RN` 中仍遵循 `web` 上的 `css` 命名, 不过需要使用驼峰写法:

`background-color -> backgroundColor`

## 建议写法

`RN` 中建议使用 `StyleSheet.create` 来集中定义组件的样式:

```jsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
  red: {
    color: "red",
  },
});

const StyleConponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.red}>just red</Text>
      <Text style={styles.bigBlue}>just bigBlue</Text>
      <Text style={[styles.bigBlue, styles.red]}>bigBlue, then red</Text>
      <Text style={[styles.red, styles.bigBlue]}>red, then bigBlue</Text>
    </View>
  );
};
```

`styles` 对象定义的 `container`, `bigBlue`, `red` 相当于 `web` 中的 类 `(class)`, 通过在组件中 `style={...}` 的写法来赋值
