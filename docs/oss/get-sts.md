# 获取 STS 临时凭证

对于大部分上传文件的场景，建议在服务端使用 `STS SDK` 获取 `STS` 临时访问凭证，然后在客户端使用 `STS` 临时凭证和 `OSS SDK` 直接上传文件

客户端能重复使用服务端生成的 `STS` 临时访问凭证生成签名，因此适用于基于分片上传大文件、基于分片断点续传的场景

```js
const express = require("express");
const { STS } = require("ali-oss");

const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, "templates")));
// 配置环境变量 ALIBABA_CLOUD_ACCESS_KEY_ID。
const accessKeyId = process.env.ALIBABA_CLOUD_ACCESS_KEY_ID;
// 配置环境变量 ALIBABA_CLOUD_ACCESS_SECRET。
const accessKeySecret = process.env.ALIBABA_CLOUD_ACCESS_SECRET;

app.get("/get_sts_token_for_oss_upload", (req, res) => {
  let sts = new STS({
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
  });
  // roleArn 填写步骤 2 获取的角色 ARN，例如 acs:ram::175708322470****:role/ramtest。
  // policy 填写自定义权限策略，用于进一步限制 STS 临时访问凭证的权限。如果不指定 Policy，则返回的 STS 临时访问凭证默认拥有指定角色的所有权限。
  // 3000 为过期时间，单位为秒。
  // sessionName 用于自定义角色会话名称，用来区分不同的令牌，例如填写为 sessiontest。
  sts
    .assumeRole("<YOUR_ROLE_ARN>", ``, "3000", "sessiontest")
    .then((result) => {
      console.log(result);
      res.json({
        AccessKeyId: result.credentials.AccessKeyId,
        AccessKeySecret: result.credentials.AccessKeySecret,
        SecurityToken: result.credentials.SecurityToken,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err.message);
    });
});

app.listen(8000, () => {
  console.log("http://127.0.0.1:8000");
});
```
