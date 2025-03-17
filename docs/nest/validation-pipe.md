# 验证管道 validationPipe 与 类型验证器 class-validator

## 安装包

`yarn add class-validator class-transformer`

## 使用 class-validator 校验规则

我们可以在 `dto` 类中定义属性应该满足的规则：

```ts
export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  password: string;
}
```

也可以与请求对象属性一起使用

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

## 启用 validation 管道

全局启用：

```ts
app.useGlobalPipes(
  new ValidationPipe({
    // options
  })
);
```

模块 / `handler` 启用：

```ts
@UsePipes([ValidationPipe])
@Controller("user")
class UserControler {
  // or @UsePipes([ValidationPipe])
  @Get(":id")
  findOne(@Param() params: FindOneParams) {
    return "...";
  }
}
```

## some options

`options`:

- `whitelist`: 过滤掉不应该由方法处理程序接受的属性
- `skipMissingProperties` 过滤掉 `null` 和 `undefined` 的属性

这两条配合使用做到校验的同时，过滤掉不需要的属性

更多关于 `class-validator` 的用法查询：[链接](https://github.com/typestack/class-validator)
