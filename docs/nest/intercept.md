# Nest - 拦截器

拦截器的作用:

- 在 `handler` 执行前后绑定额外逻辑
- 转换 `handler` 返回的结果
- 转换 `handler` 抛出的异常
- 扩展基本功能行为 （例如：`logged`）
- 根据特定条件完全覆盖函数（例如：缓存）

## 基本构成

```ts
@Injectable()
export class MyIntercept implements NestIntercept {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // do some operation...
    return next.handle().pipe(`<some operator>`);
  }
}
```

## 绑定拦截器

控制器作用域:

```ts
@UseInterceptors(MyIntercept)
export class PersonController {}
```

全局:

```ts
app.useGlobalInterceptors(new MyIntercept());
```

## 响应映射

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface Response<T> {
  code: number;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(map((data) => ({ code: 200, data })));
  }
}

// response
// {
//   "code": 200,
//   "data": []
// }
```

## 异常映射

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  BadGatewayException,
  CallHandler,
} from "@nestjs/common";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(catchError((err) => throwError(() => new BadGatewayException())));
  }
}
```

## 流覆盖

```ts
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable, of } from "rxjs";

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true;

    // 假设有缓存的情况下, 直接跳过 handler 返回缓存数据
    if (isCached) {
      return of([]);
    }
    return next.handle();
  }
}
```

## 更多运算符

更多关于 `rxjs` 的运算符可以查看文档:

[查看资料](https://next.rxjs.dev/api)
