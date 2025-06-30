# 执行上下文 - Context

主要有两个重要的执行上下文的类：

- host: ArgumentsHost
- context: ExecutionContext

## ArgumentsHost

ArgumentsHost 类提供了用于检索传递给处理程序的参数的方法

它允许选择适当的上下文：

- `host.switchToHttp`: http 环境
- `host.switchToRpc`: RPC 微服务环境
- `host.switchToWs`: Websocket

### 使用

:::code-group

```ts [app context]
if (host.getType() === "http") {
  // do something that is only important in the context of regular HTTP requests (REST)
} else if (host.getType() === "rpc") {
  // do something that is only important in the context of Microservice requests
} else if (host.getType<GqlContextType>() === "graphql") {
  // do something that is only important in the context of GraphQL requests
}
```

```ts [http Type1]
const [req, res, next] = host.getArgs();

// or

const request = host.getArgByIndex(0);
const response = host.getArgByIndex(1);
```

```ts [http Type2]
const ctx = host.switchToHttp();
const request = ctx.getRequest<Request>();
const response = ctx.getResponse<Response>();
```

```ts [ws/rpc]
export interface WsArgumentsHost {
  /**

   * Returns the data object.
   */
  getData<T>(): T;
  /**

   * Returns the client object.
   */
  getClient<T>(): T;
}

export interface RpcArgumentsHost {
  /**

   * Returns the data object.
   */
  getData<T>(): T;

  /**

   * Returns the context object.
   */
  getContext<T>(): T;
}
```

:::

## ExecutionContext

ExecutionContext(ctx) 提供了当前执行过程的信息：

- ctx.getClass: 控制器上下文
- ctx.getHandler: 处理函数上下文

```ts
export class AaaGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const methodKey = ctx.getHandler().name; // "handler name"
    const className = ctx.getClass().name; // "controller name"

    // reflector
    const requiredRoles = this.reflector.get<Role[]>("roles", ctx.getHandler());

    if (!requiredRoles) {
      return true;
    }

    const { user } = ctx.switchToHttp().getRequest();
    return requiredRoles.some((role) => user && user.roles?.includes(role));
  }
}
```

tips:

- 我们可以通过拿到控制器上下文和处理函数上下文来获取元数据
- 结合反射 (reflector), 可以获得控制器或者处理函数的元数据 (matedata)
- 从而来构建**守卫 (guard)** 或**拦截器 (interceptors)** （例如上述代码中守卫控制的角色逻辑）
- 更多样例查阅 [拦截器章节](/nest/intercept)
