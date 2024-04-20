---
outline: deep
---

# Nest - 管道

## 内置管道

以下为 `nest` 中内置的管道:

- `ValidationPipe`
- `ParseIntPipe`
- `ParseFloatPipe`
- `ParseBoolPipe`
- `ParseArrayPipe`
- `ParseUUIDPipe`
- `ParseEnumPipe`
- `DefaultValuePipe`
- `ParseFilePip`

## 使用

:::code-group

```ts [DI]
// 不需要想管道内传递选项时, 使用依赖注入
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

```ts [options]
// 当需要向管道内传递选项来自定义内置管道行为时, 需要使用实例
@Get(':id')
async findOne(
  @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))
  id: number,
) {
  return this.catsService.findOne(id);
}
```
:::

## 自定义管道

```ts
import { PipeTransform, Injectable, ArgumentMetadata } from "@nestjs/common";

export interface ArgumentMetadata {
  type: "body" | "query" | "param" | "custom";
  metatype?: Type<unknown>;
  data?: string;
}

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    // do some operation
    return value;
  }
}
```

## 使用内置的验证管道

### 安装依赖

需要先安装依赖: `yarn add class-validator class-transformer`

### 全局启用

```ts
app.useGlobalPipes(new ValidationPipe({ options }));
```

### 使用装饰器来添加校验规则

```ts
import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  email;
}
```

### 过滤多余属性

`whitelist` 配置为 `true` 时，过滤器会过滤掉没有校验装饰器绑定的属性

```ts
app.useGlobalPipes(
  new ValidationPipe({
    whitelist: true,
  })
);
```

### 自动转换负载对象

- 将传入的纯 `js` 对象转换成 `dto` 类型
- 执行基本类型转换, 例如：将路由参数的 `string` 类型转化为规定的 `number` 类型

```ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
  })
);
```

### 解析和验证数组

```ts
@Post()
create(
  @Body(new ParseArrayPipe({ items: createUserDto}))
  users: createUserDto[]
) {
  console.log(users)
}

// GET /?ids=1,2,3
@Get()
findByIds(
  @Query('ids', new ParseArrayPipe({ items: Number, separator: ',' }))
  ids: number[],
) {
  return 'This action returns users by ids';
}
```
