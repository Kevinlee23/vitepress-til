# 动态注入

> 在运行时需要动态访问单例提供者（service）可以借助核心类：ModuleRef

> moduleRef.get(service)

例如下面的业务代码：

```typescript
export class IsAuthorGuard implements CanActivate {
  constructor(
    private readonly module: ModuleRef,
    private readonly reflector: Reflector
  ) {}

  async canActivate(context: ExecutionContext) {
    const request = context
      .switchToHttp()
      .getRequest<Request<{ id: string }>>();

    const kindOf = this.reflector.get<Entities>(
      ENTITY_METADATA_KEY,
      context.getHandler()
    );

    const service = this.module.get<ArticleService | CommentService>(
      kindOf === Entities.COMMENT ? CommentService : ArticleService
    );

    // other logic
  }
}
```

读取上下文中的元数据，当 `ENTITY_METADATA_KEY === Entities.COMMENT` 时

下面的逻辑使用 `CommentService` 中提供的方法，否则使用 `ArticleService` 中提供的方法
