```javascript
// 辅助函数

const DONE = "4";
const Range_SIZE = 1024 * 1024 * 1;

function getContentLength(url) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onreadystatechange = function () {
      if (this.readyState === DONE) {
        resolve(this.getResponseHeader("Content-Length"));
      }
    };
    xhr.send();
  });
}

function getRangeContent(startIndex, endIndex, url) {
  return new Promise((resolve) => {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.setRequestHeader("Range", `bytes=${startIndex}-${endIndex}`);
    xhr.responseType = "arraybuffer";
    xhr.onreadystatechange = function () {
      if (this.readyState === DONE) {
        resolve(this.response);
      }
    };
    xhr.send();
  });
}

function concatArrayBuffer(arrayBufferArray) {
  let totalLength = 0;
  arrayBufferArray.forEach((arrayBuffer) => {
    totalLength += arrayBuffer.byteLength;
  });
  const result = new Uint8Array(totalLength);
  let offset = 0;
  arrayBufferArray.forEach((arrayBuffer) => {
    result.set(new Uint8Array(arrayBuffer), offset);
    offset += arrayBuffer.byteLength;
  });
  return result;
}
```

```javascript
// 文件类型
export const imageFiles = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".tiff",
  ".tif",
  ".blob",
];
export const docFiles = [".doc", ".docx"]; // word文档
export const xlsFiles = [".xls", ".xlsx"]; // excel表格
export const pptFiles = [".ppt", ".pptx"]; // ppt
export const pdfFiles = [".pdf"]; // pdf
export const jsonFiles = [".json"];

export const fileList = [
  ...imageFiles,
  ...docFiles,
  ...xlsFiles,
  ...pptFiles,
  ...pdfFiles,
  ...jsonFiles,
];
```

```javascript
function downloadArrayBufferFile(arrayBuffer, fileName) {
  const blob = new Blob([arrayBuffer], { type: "application/octet-stream" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  a.click();
}

// 通过 url 路径下载
function downloadFileUrl(url, name, size) {
  const typeName = url ? url.split(".").pop() : "";

  return new Promise(async (resolve) => {
    if (fileList.join("").toLowerCase().includes(typeName.toLowerCase())) {
      let contentLength = size;

      if (!contentLength) {
        contentLength = await getContentLength(url);
      }

      const numberRequest = Math.ceil(contentLength / RANGE_SIZE);
      const ret = [];
      for (let i = 0; i < numberRequest; i++) {
        const startIndex = i * RANGE_SIZE;
        const endIndex = startIndex + RANGE_SIZE - 1;
        ret.push(getRangeContent(startIndex, endIndex, url));
      }
      Promise.all(ret)
        .then((value) => {
          const result = concatArrayBuffer(value);
          downloadArrayBufferFile(result, name);

          resolve();
        })
        .catch(() => {});
    } else {
      const link = document.createElement("a");
      link.style.display = "none";
      link.download = name;
      link.href = url;
      link.target = "_self";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      resolve();
    }
  });
}

// 将后端返回的数据通过blob形式整合下载
function saveWithData(data, name) {
  const blob = new Blob([JSON.stringify(JSON.parse(data))]);
  if (blob instanceof Blob) {
    const a = document.createElement("a");
    a.download = name;
    a.href = window.URL.createObjectURL(blob);
    a.click();
    a.remove();
  } else {
    console.error("下载出错");
  }
}
```
