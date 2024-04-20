# Nest - 项目文件结构

![struct](/images/nest-struct.png)

以上为 `nest` 核心成员推荐的目录格式，采用 `monorepo` 风格的结构，将不同模块视作不同的 `project`, 它们共同的逻辑 `(such as guards, filters, interceptors and so on...)` 放进公共的文件下，并且允许模块内部有自己的 `nest` 工具 `(such as: scoped interceptors)`

```txt
# 项目资源
src
|- common [公共文件]
|---- decorators 装饰器
|---- guards 路由守卫
|---- interceptors 拦截器
|---- middlewares 中间件
|---- filters 过滤器
|---- exceptions 自定义异常
|- constants 常量文件夹
|----------------|
|- users 路由模块
|---- users.module.ts 模块入口
|---- users.controller.ts 控制器
|---- users.service.ts 服务
|---- interceptors (scoped interceptors)
|---- dto DTO 类
|---- entities 实体类
|----------------|
|- auth 路由模块
|- auth.module.ts
|- auth.controller.ts
|- ...
|----------------|
|- ...

# 顶层文件
app.module.ts
app.controller.ts
app.service.ts
main.ts

# 配置文件
nest-cli.json
package.json
tsconfig.json
.eslint.config.js
.prettierrc
.gitignore
...
```
