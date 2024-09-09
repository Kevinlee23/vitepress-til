# RN 中图片资源的引用方式

## Static Image

```jsx
// Good
const icon = <Image source={require("./my-icon.png")} />;

// Good
const icon = this.props.active
  ? require("./my-icon-active.png")
  : require("./my-icon-inactive.png");
<Image source={icon} />;
```

## NetWork Image

```jsx
// Good, 网络图片需要手动定义宽高
<Image
  source={{ uri: "https://reactjs.org/logo-og.png" }}
  style={{ width: 400, height: 400 }}
/>
```

## Hybrid App's Resources

```jsx {3,9}
// xcode or android drawable folder
<Image
  source={{uri: 'app_icon'}}
  style={{width: 40, height: 40}}
/>

// android assets
<Image
  source={{uri: 'asset:/app_icon.png'}}
  style={{width: 40, height: 40}}
/>
```

## URI Data Images

```jsx
// include at least width and height!
<Image
  style={{
    width: 51,
    height: 51,
    resizeMode: "contain",
  }}
  source={{
    uri: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg==",
  }}
/>
```

## Other Static Resources

[支持的静态文件类型](https://github.com/facebook/metro/blob/main/packages/metro-config/src/defaults/defaults.js#L14-L44)