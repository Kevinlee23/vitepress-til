---
outline: deep
---

# 获取 oss 图片时的压缩和优化

OSS 原始图片 URL:

`https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/pic.jpg`

加上特定参数后处理的 URL:

`https://your-bucket.oss-cn-hangzhou.aliyuncs.com/images/pic.jpg?x-oss-process=image/resize,w_400,h_400/quality,Q_80/format,auto`

## 优化策略

### 分场景使用不同规格的图片

场景：

- 列表缩略图
- 全屏大图
- Mobile 端大图

实现方法：

- 前端计算：根据容器尺寸和设备像素比（DPR）来计算需要的最佳图片宽高
- URL 拼接：使用 w_xxx, h_xxx, q_xx 的参数拼接到原始的 OSS URL 上
- 后端 API 响应：后端接口在返回图片数据时，可以直接返回已经构建好的、包含不同尺寸图片 URL 的数组或对象，前端直接使用。

## 智能压缩

> 使用下一代图片格式 webp

- OSS 自动判断：阿里云等 OSS 支持 format,auto 参数，可以自动根据浏览器请求头中的 Accept 字段来判断是否支持 WebP 并自动转换。
- URL 示例：https://.../image.jpg?x-oss-process=image/format,auto (注意：原始图片需要是 JPG/PNG 等高质量格式，OSS 才能进行转换。)

## 使用懒加载

> 有很多现成的方案，不做赘述
