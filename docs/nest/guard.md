# 守卫 - guard

守卫是一个带有 @Injectable() 装饰器的类，它实现了 CanActivate 接口：

```typescript
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}
```

- 守卫是沟通客户端请求侧和执行函数侧的中间逻辑
- 当 canActivate 返回 true 时，代表逻辑通过，可以进入到执行函数
- 为 false 时，表示该次路由访问被阻止

像[执行上下文](/nest/context)和[反射](/nest/metadata-and-reflector)中提到：

在守卫中可以借助上下文和反射，拿到该次路由访问的元数据，用来进行逻辑的判断

## 应用

- [基于 RBAC 的授权](/nest/RBAC-role)
- [利用 JWT 来做身份验证](/nest/jwt-for-auth)