---
outline: deep
---

# 管道 - Pipe

> 在参数传给 handler 之前对参数做一些验证和转换

## 内置管道

以下为 `nest` 中内置的管道：

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

```typescript [DI]
// 不需要向管道内传递选项时，使用依赖注入
@Get(':id')
async findOne(@Param('id', ParseIntPipe) id: number) {
  return this.catsService.findOne(id);
}
```

```typescript [options]
// 当需要向管道内传递选项来自定义内置管道行为时，需要使用实例
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

## 结合第三方库

### 安装依赖

需要先安装依赖：`yarn add class-validator class-transformer`

### 全局启用

```ts
app.useGlobalPipes(new ValidationPipe({ options }));
```

### 方法级别启用

```typescript
@Post()
@UsePipes(new ValidationPipe({ transform: true }))
async create(@Body() createCatDto: CreateCatDto) {
  this.catsService.create(createCatDto);
}
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

### 与请求对象属性一起使用

```ts
export class FindOneParams {
  @IsNumberString()
  id: number;
}

@Controller("user")
class UserControler {
  @Get(":id")
  findOne(@Param() params: FindOneParams) {
    return "...";
  }
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
- 执行基本类型转换，例如：将路由参数的 `string` 类型转化为规定的 `number` 类型

```ts
app.useGlobalPipes(
  new ValidationPipe({
    transform: true,
  })
);
```

另外，ValidationPipe 还有其他的配置选项，查看 [文档](https://nest.nodejs.cn/techniques/validation#%E4%BD%BF%E7%94%A8%E5%86%85%E7%BD%AE%E7%9A%84-validationpipe)

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

参考：

- [文档：nest 官网](https://nest.nodejs.cn/techniques/validation)
- [文档：class-validator](https://github.com/typestack/class-validator)
- [文档：class-transformer](https://github.com/typestack/class-transformer)
