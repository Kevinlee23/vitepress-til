# RN 的组件

## 核心组件 (from react-native)

- `View`
- `Button`
- `FlatList, SectionList`
- `RefreshControl`
- `Text`
- `TextInput`
- `Image`
- `Modal`
- `ScrollView`
- `VirtualizedList`
- `Switch`
- `StatusBar`
- ...

## 自定义组件

用户自己定义的组件

## 社区组件

从社区下载的第三方 `UI` 库

## 区分 RN 运行环境

:::code-group

```jsx [definition.jsx]
import { Platform } from "react-native";

const judegePlatform = () => {
  return <>{Platform.OS === "ios" ? <Text>IOS</Text> : <Text>Android</Text>}</>;
};
```

```jsx [select.jsx]
const Component = Platform.select({
  ios: () => require("ComponentIOS"),
  android: () => require("ComponentAndroid"),
})();

<Component />;

const Component2 = Platform.select({
  native: () => require("ComponentForNative"),
  default: () => require("ComponentForWeb"),
})();

<Component2 />;
```

```jsx [android-version.jsx]
import { Platform } from "react-native";

if (Platform.Version === 25) {
  console.log("Running on Nougat!");
}
```

```jsx [ios-version.jsx]
import { Platform } from "react-native";

const majorVersionIOS = parseInt(Platform.Version, 10);
if (majorVersionIOS <= 9) {
  console.log("Work around a change in behavior");
}
```

:::
