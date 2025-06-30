# 中间件 - Middleware

## 全局中间件

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(function (req: Request, res: Response, next: NextFunction) {
    console.log("before", req.url);
    next();
    console.log("after");
  });

  await app.listen(3030);
}
```

## 路由中间件

定义：

```typescript
@Injectable()
export class LogMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    // handle before: middleware logic
    console.log("before2", req.url);

    // handle logic, separation: next()
    next();

    // handle after: middleware logic
    console.log("after2");
  }
}
```

启用：

```typescript
@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // /aaa/* 下的逻辑启用该 middleware
    consumer.apply(LogMiddleware).forRoutes({
      path: "aaa*", // 应用路径
      method: RequestMethod.GET, // 应用方法
    });
  }
}
```

## 在中间件中依赖注入其他服务

```typescript
@Injectable()
export class AaaMiddleware implements NestMiddleware {
  // 注入了 appService
  @Inject(AppService)
  private readonly appService: AppService;

  use(req: Request, res: Response, next: () => void) {
    console.log("brefore");
    // 调用 appService 中的逻辑
    console.log("-------" + this.appService.getHello());
    next();
    console.log("after");
  }
}
```

## 与 interceptor 的区别

interceptor 有两点特殊：

- interceptor 是能从 ExecutionContext 里拿到目标 class 和 handler，进而通过 reflector 拿到它的 metadata 等信息的，这些 middleware 就不可以
- interceptor 里是可以用 rxjs 的操作符来组织响应处理流程的，middleware 里也不可以

所以：interceptor 更适合处理与具体业务相关的逻辑，而 middleware 适合更通用的处理逻辑