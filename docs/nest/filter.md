---
outline: deep
---

# 异常过滤器 - Filter

> Nest 带有一个内置的异常层，负责处理应用中所有未处理的异常。当你的应用代码未处理异常时，该层会捕获该异常，然后自动发送适当的用户友好响应

## 内置异常

Nest 提供了一组继承自基 HttpException 的标准异常：

- BadRequestException
- UnauthorizedException
- NotFoundException
- ForbiddenException
- NotAcceptableException
- RequestTimeoutException
- ConflictException
- GoneException
- HttpVersionNotSupportedException
- PayloadTooLargeException
- UnsupportedMediaTypeException
- UnprocessableEntityException
- InternalServerErrorException
- NotImplementedException
- ImATeapotException
- MethodNotAllowedException
- BadGatewayException
- ServiceUnavailableException
- GatewayTimeoutException
- PreconditionFailedException

## 抛出标准异常

```typescript
throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);

// {
//   "statusCode": 403,
//   "message": "Forbidden"
// }
```

## 自定义异常

```typescript
export class ForbiddenException extends HttpException {
  constructor() {
    super("Forbidden", HttpStatus.FORBIDDEN);
  }
}

throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
// equal to
throw new ForbiddenException();
```

## 异常过滤器

> 所有异常过滤器都应实现通用 `ExceptionFilter<T>` 接口。这要求你提供 `catch(exception: T, host: ArgumentsHost)` 方法及其指示的签名。T 表示异常的类型

### 指定捕获异常类型

捕获 HttpException 异常：`@Catch(HttpException)`

捕获一切：`@Catch()`

warning:

- 当将捕获所有内容的异常过滤器与绑定到特定类型的过滤器组合时，应首先声明 "抓住任何东西" 过滤器，以允许特定过滤器正确处理绑定类型

### 实例

```typescript
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // 提供了上下文 HttpException 和 ArgumentsHost, 获取报错环境信息
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
```

### 继承

扩展某一类过滤器：

```typescript
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    super.catch(exception, host);
  }
}
```

扩展内置的过滤器，不应该使用 new 实例化它，而是让 nest 自动实例化他们

## 绑定过滤器

### 局部

```typescript
@Controller()
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  @Post()
  @UseFilters(new HttpExceptionFilter())
  async create(@Body() createCatDto: CreateCatDto) {
    throw new ForbiddenException();
  }
}
```

### 全局

```typescript
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
```
