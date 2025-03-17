# 生成客户端对象

通过生成 `oss client` 来对 `oss` 上的存储空间 / 文件 / 文件夹等进行操作

```js
import { reactive } from "vue";
import { getServerTime } from "@/utils";
const ossGlobal = reactive({
  client: null, // oss client
  credentials: null, // STS credentials
  onOss: "<Function: GET_OSS>",
});

export const getCurrentClient = async () => {
  const time = await getServerTime();

  // 判断 ali 的 sts 是否有 ||  检查 oss 实例以及过期时间
  if (
    !ossGlobal.credentials ||
    new Date(ossGlobal.credentials.Expiration).getTime() < time.getTime()
  ) {
    const { data } = await ossGlobal.onOss();
    ossGlobal.credentials = data;

    // 初始化 oss client
    const { accessKeyId, accessKeySecret, securityToken } = data;

    ossGlobal.client = new OSS({
      accessKeyId, // 自己账户的accessKeyId或临时秘钥
      accessKeySecret, // 自己账户的accessKeySecret或临时秘钥
      stsToken: securityToken, //  从STS服务获取的安全令牌（SecurityToken）。
      region: '<YOUR_OSS_REGION>', // 根据那你的 Bucket 地点来填写
      bucket: '<YOUR_OSS_BUCKET>', // bucket 名字
      refreshSTSToken: async () => {
        const { data: newData } = await ossGlobal.onOss();
        ossGlobal.credentials = newData;

        return {
          accessKeyId: newData.accessKeyId,
          accessKeySecret: newData.accessKeySecret,
          stsToken: newData.securityToken,
        };
      },
      refreshSTSTokenInterval: 3600 * 1000, // 刷新临时访问凭证的时间间隔，单位为毫秒
    });
  }

  return ossGlobal.client;
};
```
