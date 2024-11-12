# 解决 typescript 中 image 的导入报错

新增 image.d.ts 文件:

```typescript
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
```