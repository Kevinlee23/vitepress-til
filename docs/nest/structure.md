# Nest - 项目文件结构

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
|
|- constants 常量文件
|
|- routes
|---- person 路由实例
|---- person.controller.ts 控制器
|---- person.service.ts 服务
|-------- dto DTO 类
|-------- entities 实体类

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
```
