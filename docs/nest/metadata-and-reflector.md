# 元数据和反射

## 元数据

元数据是附加在 controller 或者 handler 上用来辅助逻辑的 data

例如 handler 上会有默认的元数据：

- type: Function
- paramtypes
- returntype

我们可以通过装饰器：@SetMetaData 来给控制器或者处理函数附加元数据

## 反射

我们想要拿到控制器或者处理函数上的元数据来编写逻辑时，就需要用到反射：

```typescript
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // handler reflector
    const handlerRequiredRoles = this.reflector.get<Role[]>(
      "roles",
      ctx.getHandler()
    );

    // controller reflector
    const controllerRquiredRoles = this.reflector.get<Role[]>(
      "roles",
      ctx.getClass()
    );

    return true;
  }
}
```
