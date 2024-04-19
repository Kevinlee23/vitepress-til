# Nest - 执行上下文

主要有两个重要的执行上下文的类:

`{ host: ArgumentsHost, context: ExecutionContext }`

## ArgumentsHost

`ArgumentsHost` 类提供了用于检索传递给处理程序的参数的方法

它允许选择适当的上下文:

- `host.switchToHttp`: `http` 环境
- `host.switchToRpc`: `RPC` 微服务环境
- `host.switchToWs`: `Websocket`

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

`ExecutionContext` 提供了当前执行过程的信息:
- `getClass`: 控制器上下文
- `getHandler`: 处理函数上下文

```ts
const methodKey = ctx.getHandler().name; // "create"
const className = ctx.getClass().name; // "PersonController"
```

我们可以通过拿到`控制器上下文`和`处理函数上下文`来获取元数据来构建`守卫 (guard)` 或`拦截器 (interceptors)` 的逻辑