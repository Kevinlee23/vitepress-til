# oss 分片上传

```js
import { getCurrentClient } from "#imports";

/**
 * @param {Object} fileItem 文件对象
 * @param {string} checkpoint 文件上传断点, 当cpt为null时表示文件是新上传
 */
function partUpload(fileItem, checkpoint) {
  const client = getCurrentClient();

  const headers = {
    // 指定该Object被下载时的网页缓存行为。
    "Cache-Control": "no-cache",
    // 指定该Object被下载时的名称。
    "Content-Disposition": "example.txt",
    // 指定该Object被下载时的内容编码格式。
    "Content-Encoding": "utf-8",
    // 指定过期时间，单位为毫秒。
    Expires: "1000",
    // 指定Object的存储类型。
    "x-oss-storage-class": "Standard",
    // 指定Object标签，可同时设置多个标签。
    "x-oss-tagging": "Tag1=1&Tag2=2",
    // 指定初始化分片上传时是否覆盖同名Object。此处设置为true，表示禁止覆盖同名Object。
    "x-oss-forbid-overwrite": "true",
  };

  function onUploadProgress(uploadFile, p, checkpoint) {
    // 只有在上传过程才会有值，上传完成时有变成null
    uploadFile.tempCheckpoint = checkpoint;

    // 上传进度
    uploadFile.percentage = Number((p * 100).toFixed(2));

    // 设置上传状态
    uploadFile.status = p === 1 ? "finish" : "uploading";
  }

  const options = {
    // 获取分片上传进度、断点和返回值
    progress: (p, cpt, res) => {
      // 可以在该函数中进行上传进度的监控, 断网的时候保存断点以便续传
      onUploadProgress(fileItem, p, cpt);
    },
    checkpoint, // 上传断点
    // 设置并发上传的分片数量
    parallel: 4,
    // 设置分片大小。默认值为1 MB，最小值为100 KB
    partSize: 1024 * 1024,
    // headers,
    // 自定义元数据，通过HeadObject接口可以获取Object的元数据
    meta: { year: 2020, people: "test" },
    mime: "text/plain",
  };

  client.multipartUpload(fileItem.name, fileItem.file, { ...options });
}
```
