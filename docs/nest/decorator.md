# 装饰器 - Decorator

装饰器是 nest 中实现功能的核心，例如：

- @Module 用来声明模块
- @Controller 用来声明控制器
- @Injectable 用来声明可注入对象等

## 内置装饰器

- @Module：声明 Nest 模块
- @Controller：声明模块里的 controller
- @Injectable：声明模块里可以注入的 provider
- @Inject：通过 token 手动指定注入的 provider，token 可以是 class 或者 string
- @Optional：声明注入的 provider 是可选的，可以为空
- @Global：声明全局模块
- @Catch：声明 exception filter 处理的 exception 类型
- @UseFilters：路由级别使用 exception filter
- @UsePipes：路由级别使用 pipe
- @UseInterceptors：路由级别使用 interceptor
- @SetMetadata：在 class 或者 handler 上添加 metadata
- @Get、@Post、@Put、@Delete、@Patch、@Options、@Head：声明 get、post、put、delete、patch、options、head 的请求方式
- @Param：取出 url 中的参数，比如 /aaa/:id 中的 id
- @Query: 取出 query 部分的参数，比如 /aaa?name=xx 中的 name
- @Body：取出请求 body，通过 dto class 来接收
- @Headers：取出某个或全部请求头
- @Session：取出 session 对象，需要启用 express-session 中间件
- @HostParm：取出 host 里的参数
- @Req、@Request：注入 request 对象
- @Res、@Response：注入 response 对象，一旦注入了这个 Nest 就不会把返回值作为响应了，除非指定 passthrough 为 true
- @Next：注入调用下一个 handler 的 next 方法
- @HttpCode：修改响应的状态码
- @Header：修改响应头
- @Redirect：指定重定向的 url
- @Render：指定渲染用的模版引擎

## 自定义装饰器

装饰器可以是个普通的函数：

```typescript
export const SetRoles = (...arg: stgring[]) => setMetaData("roles", args);

@SetRoles('admin')
```

合并装饰器：

```typescript
export function PathRoleAndGuard(path, role) {
  return applyDecorators(
    Get(path), // 内置 Get 装饰器
    SetRoles(role), // 自定义装饰器：设置 metadata(role)
    UseGuards(RoleGuard) // 使用守卫：RoleGuard
  );
}
```

自定义参数装饰器：

```typescript
import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CustomQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    // 通过上下文拿到 request 对象
    const request: Request = ctx.switchToHttp().getRequest();
    // 拿到指定的 query
    return request.query[key];
  }
);
```