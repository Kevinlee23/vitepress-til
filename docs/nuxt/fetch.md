# $fetch 和 useFetch 的区别

## $fetch

$fetch 是底层 http 请求方法：

- 全局可用
- 不支持自动缓存和请求状态管理
- 适合简单的 http 请求场景，尤其是不需要 ssr 预取或自动缓存的请求

## useFetch

useFetch 是 nuxt 中提供的一个组合式函数：

- 集成了 useAsyncData 和 $fetch 的功能，是一个更高层次的数据获取工具
- 支持服务器端渲染
- 自动处理加载状态，错误状态和数据缓存
- 适合页面中需要 ssr 支持和状态管理的数据请求场景